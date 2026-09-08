import { createServerFn } from "@tanstack/react-start";
import type { SupabaseRuntimeConfig } from "@/lib/runtime-config";

// Mengambil alamat Supabase + publishable key dari secret server.
// Nama secret SB_* dipakai untuk instance Supabase self-hosted; nama
// SUPABASE_* tetap didukung agar kompatibel dengan Lovable Cloud.
//
// Browser selalu memakai proxy same-origin di /api/public. Selain mencegah
// mixed content untuk instance http://, ini juga menghindari kegagalan CORS
// pada instance https:// yang belum mengizinkan origin preview/deployment.
export const fetchSupabaseConfig = createServerFn({ method: "GET" }).handler(
  async (): Promise<SupabaseRuntimeConfig> => {
    return {
      url: "self",
      publishableKey:
        process.env["SB_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "",
    };
  },
);
