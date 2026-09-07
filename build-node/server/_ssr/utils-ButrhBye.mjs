import { t as supabase } from "./client-BUd3fAPK.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-ButrhBye.js
async function logActivity(username, action, description) {
	try {
		await supabase.from("activity_logs").insert({
			username,
			action,
			description,
			ip_address: "-"
		});
	} catch {}
}
async function logVisitOnce(username, path) {
	if (typeof window === "undefined") return;
	const key = `visit:${username}:${path}`;
	if (window.sessionStorage.getItem(key)) return;
	window.sessionStorage.setItem(key, "1");
	await logActivity(username, "visit", `Membuka halaman ${path}`);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { logActivity as n, logVisitOnce as r, cn as t };
