// Halaman diagnosa singkat: memastikan server tahu alamat Supabase.
// Tidak pernah menampilkan nilai kunci, hanya status terisi/kosong.
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/diag")({
  server: {
    handlers: {
      GET: async () => {
        const url = (process.env["SB_URL"] ?? process.env["SUPABASE_URL"] ?? "").trim();
        const body = {
          supabase_url: url || "(kosong)",
          publishable_key_terisi: Boolean(
            process.env["SB_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_PUBLISHABLE_KEY"],
          ),
          service_role_key_terisi: Boolean(
            process.env["SB_SERVICE_ROLE_KEY"] ?? process.env["SUPABASE_SERVICE_ROLE_KEY"],
          ),
          mode: "supabase-proxy",
        };
        return new Response(JSON.stringify(body, null, 2), {
          headers: { "content-type": "application/json", "cache-control": "no-store" },
        });
      },
    },
  },
});
