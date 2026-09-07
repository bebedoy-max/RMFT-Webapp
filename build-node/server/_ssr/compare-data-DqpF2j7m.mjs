import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BUd3fAPK.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as GitCompare } from "../_libs/lucide-react.mjs";
import { r as useRole, t as AppLayout } from "./AppLayout-CohIiiJx.mjs";
import { t as PageHeader } from "./PageHeader-DWCmr_U8.mjs";
import { t as Button } from "./button-BjCZoT9f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compare-data-DqpF2j7m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var JOBS = [
	{
		kind: "mtd_giro",
		title: "DI321 DATA2 vs DATA3 → MTD GIRO",
		source: "DATA2",
		target: "MTD GIRO"
	},
	{
		kind: "mtd_tab",
		title: "DI319 DATA2 vs DATA3 → MTD TAB",
		source: "DATA2",
		target: "MTD TAB"
	},
	{
		kind: "ytd_giro",
		title: "DI321 DATA1 vs DATA3 → YTD GIRO",
		source: "DATA1",
		target: "YTD GIRO"
	},
	{
		kind: "ytd_tab",
		title: "DI319 DATA1 vs DATA3 → YTD TAB",
		source: "DATA1",
		target: "YTD TAB"
	}
];
function CompareDataPage() {
	const { isAdmin } = useRole();
	const [running, setRunning] = (0, import_react.useState)(null);
	const run = async (kind) => {
		if (!isAdmin) {
			toast.error("Hanya admin yang dapat menjalankan compare data.");
			return;
		}
		setRunning(kind);
		const { data, error } = await supabase.rpc("run_compare", { _kind: kind });
		setRunning(null);
		if (error) {
			toast.error(error.message);
			return;
		}
		const res = data;
		toast.success(`Compare selesai — kenaikan ${res?.kenaikan ?? 0}, penurunan ${res?.penurunan ?? 0}.`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Compare Data",
		description: "Bandingkan saldo antar data (DATA2 vs DATA3 untuk MTD, DATA1 vs DATA3 untuk YTD), lalu perbarui tabel MTD/YTD GIRO (DI321) dan MTD/YTD TAB (DI319) secara otomatis."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-3xl space-y-4",
		children: JOBS.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-elevated px-6 py-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-base font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCompare, { className: "size-4 text-primary" }), j.title]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"Setiap nomor rekening pada DATA3 akan dicocokkan (vlookup) dengan nomor rekening yang sama di ",
						j.source,
						". Selisihnya (Saldo ",
						j.source,
						" − Saldo DATA3) menjadi DELTA. Rekening yang saldonya naik akan masuk ke tabel ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [j.target, " → Kenaikan"] }),
						", dan yang turun akan masuk ke ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [j.target, " → Penurunan"] }),
						". Data lama pada kedua tabel tersebut akan diganti dengan hasil compare terbaru."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-4",
					disabled: running === j.kind,
					onClick: () => run(j.kind),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCompare, { className: "mr-2 size-4" }), running === j.kind ? "Memproses…" : "Jalankan Compare Data"]
				})
			]
		}, j.kind))
	})] });
}
//#endregion
export { CompareDataPage as component };
