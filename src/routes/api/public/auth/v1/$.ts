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
  const proxy = await import("@/lib/api/supabase-proxy.server");
  if (!proxy.supabaseBaseUrl()) {
    throw new Error(
      "SB_URL belum terbaca oleh aplikasi. Tambahkan SB_URL pada Environment Variables Coolify lalu redeploy.",
    );
  }
  return proxy.proxyToSupabase(request, "auth/v1", splat);
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
