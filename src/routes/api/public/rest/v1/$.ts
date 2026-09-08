// Same-origin proxy to the self-hosted Supabase PostgREST API behind Kong.
import { createFileRoute } from "@tanstack/react-router";

const jsonError = (message: string, status = 500) =>
  new Response(JSON.stringify({ message, code: String(status), details: null, hint: null }), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

async function handle(request: Request, splat: string): Promise<Response> {
  const proxy = await import("@/lib/api/supabase-proxy.server");
  if (!proxy.supabaseBaseUrl()) {
    throw new Error(
      "SB_URL belum terbaca oleh aplikasi. Tambahkan SB_URL pada Environment Variables Coolify lalu redeploy.",
    );
  }
  return proxy.proxyToSupabase(request, "rest/v1", splat);
}

async function run(
  request: Request,
  params: { _splat?: string | undefined },
): Promise<Response> {
  try {
    return await handle(request, params._splat ?? "");
  } catch (error) {
    if (error instanceof Response) return error;
    const message = error instanceof Error ? error.message : String(error);
    console.error("[rest-proxy]", message);
    return jsonError(message);
  }
}

export const Route = createFileRoute("/api/public/rest/v1/$")({
  server: {
    handlers: {
      GET: async ({ request, params }) => run(request, params),
      HEAD: async ({ request, params }) => run(request, params),
      POST: async ({ request, params }) => run(request, params),
      PATCH: async ({ request, params }) => run(request, params),
      DELETE: async ({ request, params }) => run(request, params),
      OPTIONS: async () => new Response(null, { status: 204 }),
    },
  },
});