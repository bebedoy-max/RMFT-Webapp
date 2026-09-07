import { createServerFn } from "@tanstack/react-start";
import type { SupabaseRuntimeConfig } from "@/lib/runtime-config";

// Mengambil alamat Supabase + publishable key dari secret server.
// Nama secret SB_* dipakai untuk instance Supabase self-hosted; nama
// SUPABASE_* tetap didukung agar kompatibel dengan Lovable Cloud.
export const fetchSupabaseConfig = createServerFn({ method: "GET" }).handler(
  async (): Promise<SupabaseRuntimeConfig> => ({
    url: process.env["SB_URL"] ?? process.env["SUPABASE_URL"] ?? "",
    publishableKey:
      process.env["SB_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "",
  }),
);
