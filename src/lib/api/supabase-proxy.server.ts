// Ketika aplikasi memakai Supabase (self-hosted maupun cloud), endpoint bawaan
// /api/public/* tidak boleh lagi menyentuh PostgreSQL secara langsung. Semua
// permintaan diteruskan ke Supabase supaya tidak muncul error koneksi 5432.

export function supabaseBaseUrl(): string | null {
  const url = process.env["SB_URL"] ?? process.env["SUPABASE_URL"] ?? "";
  const trimmed = url.trim().replace(/\/+$/, "");
  if (!trimmed || trimmed === "self" || !/^https?:\/\//i.test(trimmed)) return null;
  return trimmed;
}

function anonKey(): string {
  return (
    process.env["SB_PUBLISHABLE_KEY"] ??
    process.env["SUPABASE_PUBLISHABLE_KEY"] ??
    process.env["SUPABASE_ANON_KEY"] ??
    ""
  );
}

/** Teruskan request ke Supabase. `prefix` contoh: "auth/v1" atau "rest/v1". */
export async function proxyToSupabase(
  request: Request,
  prefix: string,
  splat: string,
): Promise<Response> {
  const base = supabaseBaseUrl();
  if (!base) throw new Error("SB_URL belum diset di environment server.");

  const incoming = new URL(request.url);
  const path = splat.replace(/^\/+|\/+$/g, "");
  const target = `${base}/${prefix}${path ? `/${path}` : ""}${incoming.search}`;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("content-length");
  headers.delete("accept-encoding");
  const key = anonKey();
  if (key) {
    // Never forward the browser's portable placeholder to Kong/GoTrue.
    headers.set("apikey", key);
    const authorization = headers.get("authorization");
    if (!authorization || authorization === "Bearer self-hosted") {
      headers.set("authorization", `Bearer ${key}`);
    }
  }

  const method = request.method.toUpperCase();
  const body = method === "GET" || method === "HEAD" ? undefined : await request.arrayBuffer();

  const upstream = await fetch(target, {
    method,
    headers,
    ...(body ? { body } : {}),
    redirect: "manual",
  });

  const outHeaders = new Headers(upstream.headers);
  outHeaders.delete("content-encoding");
  outHeaders.delete("transfer-encoding");
  outHeaders.delete("content-length");
  return new Response(upstream.body, { status: upstream.status, headers: outHeaders });
}
