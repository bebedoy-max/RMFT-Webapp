// Konfigurasi Supabase (self-hosted) yang dikirim dari server ke browser.
// Kunci publishable dan URL bersifat publik, jadi aman diserahkan ke browser.
// Kunci service role TIDAK pernah masuk ke sini.

export type SupabaseRuntimeConfig = { url: string; publishableKey: string };

let cached: SupabaseRuntimeConfig | null = null;

export const RUNTIME_CONFIG_GLOBAL = "__SB_CONFIG__";

export function setSupabaseRuntimeConfig(config: SupabaseRuntimeConfig | null) {
  if (config?.url && config.publishableKey) cached = config;
}

export function getSupabaseRuntimeConfig(): SupabaseRuntimeConfig | null {
  if (cached) return cached;
  if (typeof window !== "undefined") {
    const fromWindow = (window as unknown as Record<string, unknown>)[RUNTIME_CONFIG_GLOBAL] as
      | SupabaseRuntimeConfig
      | undefined;
    if (fromWindow?.url && fromWindow.publishableKey) {
      cached = fromWindow;
      return cached;
    }
  }
  return null;
}
