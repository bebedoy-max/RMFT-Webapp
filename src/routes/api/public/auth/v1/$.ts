// Self-hosted replacement for the GoTrue (/auth/v1) endpoints used by the app.
import { createFileRoute } from "@tanstack/react-router";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

const fail = (message: string, status = 400) =>
  json({ error: status === 401 ? "invalid_grant" : "bad_request", message, msg: message }, status);

async function handle(request: Request, splat: string): Promise<Response> {
  const auth = await import("@/lib/api/auth-core.server");
  const { query } = await import("@/lib/api/db.server");
  const url = new URL(request.url);
  const path = splat.replace(/^\/+|\/+$/g, "");
  const body =
    request.method === "GET" || request.method === "HEAD"
      ? {}
      : ((await request.json().catch(() => ({}))) as Record<string, any>);

  // POST /auth/v1/token?grant_type=password | refresh_token
  if (path === "token" && request.method === "POST") {
    const grant = url.searchParams.get("grant_type") ?? "password";

    if (grant === "password") {
      const username = auth.toUsername(String(body["email"] ?? body["username"] ?? ""));
      const password = String(body["password"] ?? "");
      const user = await auth.findUserByUsername(username);
      if (!user || !auth.verifyPassword(password, user.password_hash)) {
        return fail("Username atau password salah.", 401);
      }
      if (!user.is_active) return fail("Akun dinonaktifkan.", 401);
      return json(await auth.createSession(user));
    }

    if (grant === "refresh_token") {
      const token = String(body["refresh_token"] ?? "");
      const rows = await query<{ user_id: string }>(
        `delete from public.auth_refresh_tokens
          where token::text = $1 and expires_at > now() returning user_id::text`,
        [token],
      );
      const userId = rows[0]?.user_id;
      if (!userId) return fail("Refresh token tidak valid.", 401);
      const user = await auth.findUserById(userId);
      if (!user || !user.is_active) return fail("Akun tidak aktif.", 401);
      return json(await auth.createSession(user));
    }

    return fail(`grant_type ${grant} tidak didukung.`);
  }

  // POST /auth/v1/signup
  if (path === "signup" && request.method === "POST") {
    if (process.env["ALLOW_SIGNUP"] !== "true") {
      return fail("Pendaftaran mandiri dinonaktifkan. Hubungi admin.", 403);
    }
    const username = auth.toUsername(String(body["email"] ?? ""));
    const password = String(body["password"] ?? "");
    if (!username || password.length < 6) return fail("Username wajib, password minimal 6 karakter.");
    const exists = await auth.findUserByUsername(username);
    if (exists) return fail("Username sudah terpakai.");
    const nama = String((body["data"] as Record<string, unknown> | undefined)?.["nama"] ?? username);
    const rows = await query<{ id: string; created_at: string }>(
      `insert into public.app_users (username, nama, password_hash, role, is_active)
       values ($1,$2,$3,'viewer',true) returning id::text, created_at::text`,
      [username, nama, auth.hashPassword(password)],
    );
    await query(`insert into public.user_roles (user_id, role) values ($1,'viewer') on conflict do nothing`, [
      rows[0]!.id,
    ]);
    const user = await auth.findUserById(rows[0]!.id);
    return json(await auth.createSession(user!));
  }

  // GET /auth/v1/user
  if (path === "user" && request.method === "GET") {
    const claims = await auth.requireUser(request);
    const user = await auth.findUserById(claims.sub);
    if (!user) return fail("User tidak ditemukan.", 401);
    return json(auth.toSessionUser(user));
  }

  // POST /auth/v1/logout
  if (path === "logout" && request.method === "POST") {
    const token = auth.bearerFrom(request);
    if (token) {
      try {
        const claims = await auth.verifyAccessToken(token);
        await query(`delete from public.auth_refresh_tokens where user_id = $1`, [claims.sub]);
      } catch {
        /* ignore */
      }
    }
    return new Response(null, { status: 204 });
  }

  if (path === "settings" && request.method === "GET") {
    return json({ external: {}, disable_signup: process.env["ALLOW_SIGNUP"] !== "true", mailer_autoconfirm: true });
  }

  return fail(`Endpoint auth tidak dikenal: ${path}`, 404);
}

export const Route = createFileRoute("/api/public/auth/v1/$")({
  server: {
    handlers: {
      GET: async ({ request, params }) => run(request, params),
      POST: async ({ request, params }) => run(request, params),
      PUT: async ({ request, params }) => run(request, params),
      DELETE: async ({ request, params }) => run(request, params),
      OPTIONS: async () => new Response(null, { status: 204 }),
    },
  },
});

async function run(request: Request, params: { _splat?: string | undefined }): Promise<Response> {
  try {
    return await handle(request, params._splat ?? "");
  } catch (error) {
    if (error instanceof Response) return error;
    const message = error instanceof Error ? error.message : String(error);
    console.error("[auth]", message);
    return json({ error: "server_error", message }, 500);
  }
}
