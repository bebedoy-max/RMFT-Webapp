import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { o as getRequest, s as createMiddleware } from "./server-DCpvnnjU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/require-auth-BlU75E8Z.js
function isNewSupabaseApiKey(value) {
	return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}
function supabaseFetch(key) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((v, k) => headers.set(k, v));
		if (isNewSupabaseApiKey(key) && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
		headers.set("apikey", key);
		return fetch(input, {
			...init,
			headers
		});
	};
}
function bearer() {
	const header = getRequest()?.headers?.get("authorization");
	if (!header?.startsWith("Bearer ")) throw new Error("Unauthorized: token tidak ada");
	const token = header.slice(7).trim();
	if (token.split(".").length !== 3) throw new Error("Unauthorized: token tidak valid");
	return token;
}
var requireAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	const token = bearer();
	if (process.env["SELF_HOST"] === "true") {
		const { verifyAccessToken } = await import("./auth-core.server-CfggGdeA.mjs");
		const claims = await verifyAccessToken(token).catch(() => {
			throw new Error("Unauthorized: token tidak valid");
		});
		return next({ context: {
			selfHost: true,
			userId: claims.sub,
			email: claims.email,
			isAdmin: claims.app_role === "admin",
			supabase: null
		} });
	}
	const SUPABASE_URL = process.env["SUPABASE_URL"];
	const SUPABASE_PUBLISHABLE_KEY = process.env["SUPABASE_PUBLISHABLE_KEY"];
	if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) throw new Error("Konfigurasi backend belum lengkap.");
	const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
		global: {
			fetch: supabaseFetch(SUPABASE_PUBLISHABLE_KEY),
			headers: { Authorization: `Bearer ${token}` }
		},
		auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		}
	});
	const { data, error } = await supabase.auth.getClaims(token);
	if (error || !data?.claims?.sub) throw new Error("Unauthorized: token tidak valid");
	const { data: isAdmin } = await supabase.rpc("has_role", {
		_user_id: data.claims.sub,
		_role: "admin"
	});
	return next({ context: {
		selfHost: false,
		userId: data.claims.sub,
		email: String(data.claims["email"] ?? ""),
		isAdmin: Boolean(isAdmin),
		supabase
	} });
});
function assertAdmin(context) {
	if (!context.isAdmin) throw new Error("Forbidden: hanya admin.");
}
//#endregion
export { requireAuth as n, assertAdmin as t };
