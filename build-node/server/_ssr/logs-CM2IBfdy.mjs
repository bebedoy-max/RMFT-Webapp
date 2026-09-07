import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BUd3fAPK.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Trash2 } from "../_libs/lucide-react.mjs";
import { r as useRole, t as AppLayout } from "./AppLayout-CohIiiJx.mjs";
import { n as StatCard, t as PageHeader } from "./PageHeader-DWCmr_U8.mjs";
import { t as Button } from "./button-BjCZoT9f.mjs";
import { t as Skeleton } from "./skeleton-CSuGE30O.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, l as AlertDialogTrigger, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-ClMqiTo2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logs-CM2IBfdy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LogsPage() {
	const [rows, setRows] = (0, import_react.useState)(null);
	const [stats, setStats] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.from("activity_logs").select("id,username,action,description,ip_address,created_at").order("created_at", { ascending: false }).limit(200).then(({ data }) => setRows(data ?? []));
	}, []);
	(0, import_react.useEffect)(() => {
		const now = Date.now();
		const since7d = (/* @__PURE__ */ new Date(now - 6048e5)).toISOString();
		const startToday = /* @__PURE__ */ new Date();
		startToday.setHours(0, 0, 0, 0);
		const online5m = (/* @__PURE__ */ new Date(now - 3e5)).toISOString();
		supabase.from("activity_logs").select("username,action,created_at").gte("created_at", since7d).then(({ data }) => {
			const list = data ?? [];
			const today = list.filter((r) => new Date(r.created_at) >= startToday);
			setStats({
				online: new Set(list.filter((r) => r.created_at >= online5m).map((r) => r.username)).size,
				visitsToday: today.length,
				usersToday: new Set(today.map((r) => r.username)).size,
				visits7d: list.length
			});
		});
	}, []);
	const { isAdmin } = useRole();
	const [clearing, setClearing] = (0, import_react.useState)(false);
	const clearLogs = async () => {
		setClearing(true);
		const { error } = await supabase.from("activity_logs").delete().gte("id", 0);
		setClearing(false);
		if (error) {
			toast.error("Gagal menghapus log: " + error.message);
			return;
		}
		setRows([]);
		setStats({
			online: 0,
			visitsToday: 0,
			usersToday: 0,
			visits7d: 0
		});
		toast.success("Activity logs berhasil dibersihkan.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Activity Logs",
			description: "System-wide audit trail of user actions.",
			actions: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "destructive",
					size: "sm",
					disabled: clearing,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 size-4" }), clearing ? "Menghapus…" : "Clear Activity Logs"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Hapus semua activity logs?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Seluruh riwayat aktivitas akan dihapus permanen dan tidak dapat dikembalikan." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Batal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: clearLogs,
				children: "Hapus Semua"
			})] })] })] }) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: stats === null ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[92px] w-full" }, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Online (5 menit terakhir)",
					value: stats.online,
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Pengguna aktif hari ini",
					value: stats.usersToday,
					tone: "primary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Aktivitas hari ini",
					value: stats.visitsToday,
					tone: "warning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Aktivitas 7 hari",
					value: stats.visits7d,
					tone: "primary"
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "card-elevated overflow-x-auto",
			children: rows === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2 p-4",
				children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-full" }, i))
			}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "p-8 text-center text-sm text-muted-foreground",
				children: "Belum ada aktivitas."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
						"Waktu",
						"Username",
						"Action",
						"Keterangan",
						"IP Address"
					].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "whitespace-nowrap px-4 py-3 text-left font-semibold",
						children: h
					}, h)) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t transition-colors hover:bg-muted/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "whitespace-nowrap px-4 py-2.5 text-muted-foreground",
							children: new Date(r.created_at).toLocaleString("id-ID")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "whitespace-nowrap px-4 py-2.5",
							children: r.username
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "whitespace-nowrap px-4 py-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded border bg-muted/60 px-2 py-0.5 text-xs",
								children: r.action
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2.5",
							children: r.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "whitespace-nowrap px-4 py-2.5 font-mono text-xs text-muted-foreground",
							children: r.ip_address
						})
					]
				}, r.id)) })]
			})
		})
	] });
}
//#endregion
export { LogsPage as component };
