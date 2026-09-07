import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BUd3fAPK.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-ButrhBye.mjs";
import { t as AppLayout } from "./AppLayout-CohIiiJx.mjs";
import { t as Button } from "./button-BjCZoT9f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B8ybfkjt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DAYS = [
	"MIN",
	"SEN",
	"SEL",
	"RAB",
	"KAM",
	"JUM",
	"SAB"
];
var MONTHS = [
	"Januari",
	"Februari",
	"Maret",
	"April",
	"Mei",
	"Juni",
	"Juli",
	"Agustus",
	"September",
	"Oktober",
	"November",
	"Desember"
];
var DOT = {
	amber: "bg-warning",
	green: "bg-success",
	pink: "bg-destructive",
	blue: "bg-primary"
};
function DashboardPage() {
	const today = /* @__PURE__ */ new Date();
	const [cursor, setCursor] = (0, import_react.useState)(new Date(today.getFullYear(), today.getMonth(), 1));
	const [events, setEvents] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		supabase.from("calendar_events").select("id,tanggal,judul,warna").order("tanggal").then(({ data }) => setEvents(data ?? []));
	}, []);
	const cells = (0, import_react.useMemo)(() => {
		const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
		const gridStart = new Date(start);
		gridStart.setDate(1 - start.getDay());
		return Array.from({ length: 42 }, (_, i) => {
			const d = new Date(gridStart);
			d.setDate(gridStart.getDate() + i);
			return d;
		});
	}, [cursor]);
	const byDate = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const e of events) {
			const key = e.tanggal.slice(5);
			map.set(key, [...map.get(key) ?? [], e]);
		}
		return map;
	}, [events]);
	const key = (d) => `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
	const isSameDay = (a, b) => a.toDateString() === b.toDateString();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-elevated mb-4 flex flex-wrap items-center justify-between gap-3 px-6 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "text-2xl font-bold tracking-tight",
			children: [
				MONTHS[cursor.getMonth()],
				" ",
				cursor.getFullYear()
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "sm",
					onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1)),
					children: "← Sebelumnya"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "sm",
					onClick: () => setCursor(new Date(today.getFullYear(), today.getMonth(), 1)),
					children: "Hari Ini"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					size: "sm",
					onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)),
					children: "Selanjutnya →"
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-elevated overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-7 border-b bg-card",
			children: DAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 py-3 text-center text-xs font-semibold tracking-widest text-muted-foreground",
				children: d
			}, d))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-7",
			children: cells.map((d, i) => {
				const inMonth = d.getMonth() === cursor.getMonth();
				const dayEvents = byDate.get(key(d)) ?? [];
				const isToday = isSameDay(d, today);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("min-h-[100px] border-b border-r p-2 last:border-r-0", !inMonth && "bg-muted/40 text-muted-foreground", dayEvents.length > 0 && inMonth && "bg-warning/10", isToday && "bg-primary/5"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("inline-flex size-6 items-center justify-center rounded-full text-sm font-medium", isToday && "bg-primary text-primary-foreground"),
						children: d.getDate()
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 space-y-1",
						children: dayEvents.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 truncate rounded border bg-card px-1.5 py-0.5 text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 shrink-0 rounded-full", DOT[e.warna ?? "blue"] ?? "bg-primary") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: e.judul
							})]
						}, e.id))
					})]
				}, i);
			})
		})]
	})] });
}
//#endregion
export { DashboardPage as component };
