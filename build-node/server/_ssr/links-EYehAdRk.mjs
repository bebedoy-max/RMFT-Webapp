import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BUd3fAPK.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as Search, d as Pencil, o as Trash2, u as Plus, y as ExternalLink } from "../_libs/lucide-react.mjs";
import { r as useRole, t as AppLayout } from "./AppLayout-CohIiiJx.mjs";
import { t as PageHeader } from "./PageHeader-DWCmr_U8.mjs";
import { t as Button } from "./button-BjCZoT9f.mjs";
import { n as Label, t as Input } from "./label-BNIPdzLg.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BEMCYZjf.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-ClMqiTo2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/links-EYehAdRk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LinksPage() {
	const { isAdmin } = useRole();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [nama, setNama] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [deleteTarget, setDeleteTarget] = (0, import_react.useState)(null);
	const [term, setTerm] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => {
		const q = term.trim().toLowerCase();
		if (!q) return rows;
		return rows.filter((r) => r.nama.toLowerCase().includes(q) || r.url.toLowerCase().includes(q));
	}, [rows, term]);
	const load = (0, import_react.useCallback)(async () => {
		const { data } = await supabase.from("links").select("id,nama,url").order("id");
		setRows(data ?? []);
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	function openCreate() {
		setEditing(null);
		setNama("");
		setUrl("");
		setOpen(true);
	}
	function openEdit(row) {
		setEditing(row);
		setNama(row.nama);
		setUrl(row.url);
		setOpen(true);
	}
	async function save() {
		if (!nama.trim() || !url.trim()) {
			toast.error("Nama dan URL wajib diisi.");
			return;
		}
		setSaving(true);
		const payload = {
			nama: nama.trim(),
			url: url.trim()
		};
		const { error } = editing ? await supabase.from("links").update(payload).eq("id", editing.id) : await supabase.from("links").insert(payload);
		setSaving(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(editing ? "Link diperbarui." : "Link ditambahkan.");
		setOpen(false);
		load();
	}
	async function confirmDelete() {
		if (!deleteTarget) return;
		const { error } = await supabase.from("links").delete().eq("id", deleteTarget.id);
		setDeleteTarget(null);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Link dihapus.");
		load();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "System Links",
			description: "Manage external URLs and resources.",
			actions: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: openCreate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Tambah Link"]
			}) : void 0
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mb-4 w-full max-w-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: term,
				onChange: (e) => setTerm(e.target.value),
				placeholder: "Search...",
				className: "pl-9"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "card-elevated overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted/60",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left font-semibold",
							children: "Nama"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left font-semibold",
							children: "URL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-right font-semibold",
							children: "Actions"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t transition-colors hover:bg-muted/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-medium",
							children: l.nama
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: l.url,
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center gap-1.5 break-all text-primary hover:underline",
								children: [l.url, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5 shrink-0" })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end gap-1",
								children: isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									"aria-label": "Edit",
									onClick: () => openEdit(l),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									"aria-label": "Hapus",
									className: "text-destructive",
									onClick: () => setDeleteTarget(l),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "—"
								})
							})
						})
					]
				}, l.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 3,
					className: "p-8 text-center text-sm text-muted-foreground",
					children: "Tidak ada data."
				}) })] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "Edit Link" : "Tambah Link" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Isi nama tautan dan alamat URL lengkap." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "nama",
							children: "Nama"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "nama",
							value: nama,
							onChange: (e) => setNama(e.target.value),
							placeholder: "Contoh: BRISPOT"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "url",
							children: "URL"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "url",
							value: url,
							onChange: (e) => setUrl(e.target.value),
							placeholder: "https://..."
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setOpen(false),
					children: "Batal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: save,
					disabled: saving,
					children: saving ? "Menyimpan..." : "Simpan"
				})] })
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: !!deleteTarget,
			onOpenChange: (o) => !o && setDeleteTarget(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Hapus link ini?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [deleteTarget?.nama, " akan dihapus permanen dari daftar."] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Batal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: confirmDelete,
				children: "Hapus"
			})] })] })
		})
	] });
}
//#endregion
export { LinksPage as component };
