import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BUd3fAPK.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as AppLayout } from "./AppLayout-CohIiiJx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-4hpKxgnN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		supabase.from("settings").select("id,key,value").order("id").then(({ data }) => setRows(data ?? []));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mb-4 text-2xl font-bold tracking-tight",
		children: "Settings"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-elevated divide-y",
		children: [rows.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-4 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: s.key.replace(/_/g, " ")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-muted-foreground",
				children: s.value || "—"
			})]
		}, s.id)), rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-4 py-6 text-sm text-muted-foreground",
			children: "Tidak ada data."
		})]
	})] });
}
//#endregion
export { SettingsPage as component };
