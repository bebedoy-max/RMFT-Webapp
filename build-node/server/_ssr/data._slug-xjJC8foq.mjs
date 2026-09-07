import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BUd3fAPK.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route$2 } from "./router-C9FPYSkn.mjs";
import { t as cn } from "./utils-ButrhBye.mjs";
import { D as ChevronLeft, E as ChevronRight, a as TrendingDown, b as Download, c as Search, d as Pencil, i as TrendingUp, m as LoaderCircle, o as Trash2, r as Upload, u as Plus, v as FileUp, w as ChevronsUpDown } from "../_libs/lucide-react.mjs";
import { n as CATEGORY_BY_SLUG, r as useRole, t as AppLayout } from "./AppLayout-CohIiiJx.mjs";
import { n as StatCard, t as PageHeader } from "./PageHeader-DWCmr_U8.mjs";
import { t as Button } from "./button-BjCZoT9f.mjs";
import { n as Label, t as Input } from "./label-BNIPdzLg.mjs";
import { t as Skeleton } from "./skeleton-CSuGE30O.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BEMCYZjf.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-ClMqiTo2.mjs";
import { n as utils, t as readSync } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data._slug-xjJC8foq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZES$1 = [
	10,
	25,
	50,
	100
];
var NUMERIC = /* @__PURE__ */ new Set([
	"decimal",
	"int",
	"bigint"
]);
function toNumber(value) {
	if (value === null || value === void 0 || value === "") return null;
	const n = Number(String(value).replace(/\./g, "").replace(",", "."));
	return Number.isFinite(n) ? n : null;
}
function formatCell(value, type) {
	if (value === null || value === void 0 || value === "") return "";
	if (NUMERIC.has(type)) {
		const n = toNumber(value);
		return n === null ? String(value) : n.toLocaleString("id-ID");
	}
	return String(value);
}
function DataTableView({ table, columns, title, showDelta, canEdit = false, canAdd = canEdit, onChanged }) {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [total, setTotal] = (0, import_react.useState)(0);
	const [page, setPage] = (0, import_react.useState)(0);
	const [pageSize, setPageSize] = (0, import_react.useState)(10);
	const [term, setTerm] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [tick, setTick] = (0, import_react.useState)(0);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [deleting, setDeleting] = (0, import_react.useState)(null);
	const searchColumns = (0, import_react.useMemo)(() => columns.filter((c) => c.type === "string").slice(0, 4).map((c) => c.field), [columns]);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => {
			setQuery(term);
			setPage(0);
		}, 350);
		return () => clearTimeout(t);
	}, [term]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoading(true);
		(async () => {
			let req = supabase.from(table).select("*", { count: "exact" }).range(page * pageSize, page * pageSize + pageSize - 1);
			if (query && searchColumns.length) req = req.or(searchColumns.map((c) => `${c}.ilike.%${query}%`).join(","));
			if (sort) req = req.order(sort.col, { ascending: sort.asc });
			else req = req.order("id", { ascending: true });
			const { data, error, count } = await req;
			if (cancelled) return;
			if (error) toast.error("Gagal memuat data");
			else {
				setRows(data ?? []);
				setTotal(count ?? 0);
			}
			setLoading(false);
		})();
		return () => {
			cancelled = true;
		};
	}, [
		table,
		page,
		pageSize,
		query,
		sort,
		searchColumns,
		tick
	]);
	const refresh = () => {
		setTick((t) => t + 1);
		onChanged?.();
	};
	const pages = Math.max(1, Math.ceil(total / pageSize));
	const from = total === 0 ? 0 : page * pageSize + 1;
	const to = Math.min(total, page * pageSize + rows.length);
	const save = async () => {
		if (!editing) return;
		const payload = {};
		for (const c of columns) payload[c.field] = editing[c.field] ?? null;
		const isNew = editing["id"] === void 0;
		const { error } = isNew ? await supabase.from(table).insert(payload) : await supabase.from(table).update(payload).eq("id", editing["id"]);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(isNew ? "Data ditambahkan." : "Data diperbarui.");
		setEditing(null);
		refresh();
	};
	const confirmDelete = async () => {
		if (!deleting) return;
		const { error } = await supabase.from(table).delete().eq("id", deleting["id"]);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Data dihapus.");
		setDeleting(null);
		refresh();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: term,
						onChange: (e) => setTerm(e.target.value),
						placeholder: "Search...",
						className: "pl-9"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm text-muted-foreground",
					children: [
						canAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setEditing({}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 size-4" }), " Add Data"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Show" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: pageSize,
							onChange: (e) => {
								setPageSize(Number(e.target.value));
								setPage(0);
							},
							className: "h-9 rounded-md border border-input bg-card px-2 text-sm text-foreground",
							children: PAGE_SIZES$1.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: n,
								children: n
							}, n))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card-elevated overflow-x-auto",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2 p-4",
					children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-full" }, i))
				}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-8 text-center text-sm text-muted-foreground",
					children: "Tidak ada data."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "whitespace-nowrap px-4 py-3 text-left font-semibold",
								children: "NO"
							}),
							columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "whitespace-nowrap px-4 py-3 text-left font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "inline-flex items-center gap-1",
									onClick: () => setSort((s) => s && s.col === c.field ? {
										col: c.field,
										asc: !s.asc
									} : {
										col: c.field,
										asc: true
									}),
									children: [c.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "size-3.5 text-muted-foreground" })]
								})
							}, c.field)),
							showDelta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "whitespace-nowrap px-4 py-3 text-left font-semibold",
								children: "DELTA"
							}),
							canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "whitespace-nowrap px-4 py-3 text-right font-semibold",
								children: "Actions"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r, i) => {
						const delta = showDelta ? (toNumber(r["tgl2"]) ?? 0) - (toNumber(r["tgl1"]) ?? 0) : 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t transition-colors hover:bg-muted/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: page * pageSize + i + 1
								}),
								columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn("whitespace-nowrap px-4 py-3", NUMERIC.has(c.type) && "text-right tabular-nums"),
									children: formatCell(r[c.field], c.type)
								}, c.field)),
								showDelta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn("whitespace-nowrap px-4 py-3 text-right font-semibold tabular-nums", delta < 0 ? "text-destructive" : "text-success"),
									children: delta.toLocaleString("id-ID")
								}),
								canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "whitespace-nowrap px-4 py-3 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											"aria-label": "Edit",
											onClick: () => setEditing({ ...r }),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											"aria-label": "Hapus",
											className: "text-destructive",
											onClick: () => setDeleting(r),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})]
									})
								})
							]
						}, i);
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"Showing ",
						from,
						" to ",
						to,
						" of ",
						total.toLocaleString("id-ID"),
						" entries"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						disabled: page === 0,
						onClick: () => setPage((p) => p - 1),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "mr-1 size-4" }), " Prev"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						disabled: page + 1 >= pages,
						onClick: () => setPage((p) => p + 1),
						children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-1 size-4" })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!editing,
				onOpenChange: (o) => !o && setEditing(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-h-[80vh] overflow-y-auto sm:max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing?.["id"] === void 0 ? "Tambah Data" : "Edit Data" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: `f-${c.field}`,
									children: c.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: `f-${c.field}`,
									value: String(editing?.[c.field] ?? ""),
									onChange: (e) => setEditing((s) => s ? {
										...s,
										[c.field]: e.target.value
									} : s)
								})]
							}, c.field))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setEditing(null),
							children: "Batal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: save,
							children: "Simpan"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: !!deleting,
				onOpenChange: (o) => !o && setDeleting(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Hapus data ini?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Tindakan ini tidak dapat dibatalkan." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Batal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: confirmDelete,
					children: "Hapus"
				})] })] })
			})
		]
	});
}
function exportTableCsv(rows, filename) {
	if (!rows.length) {
		toast.error("Tidak ada data.");
		return;
	}
	(async () => {
		const XLSX = await import("../_libs/xlsx.mjs").then((n) => n.r);
		const columns = Object.keys(rows[0]);
		const ws = XLSX.utils.json_to_sheet(rows.map((r) => Object.fromEntries(columns.map((c) => [c, r[c] ?? ""]))), { header: columns });
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Data");
		const name = filename.replace(/\.(csv|xlsx?)$/i, "") + ".xlsx";
		XLSX.writeFile(wb, name);
	})();
}
var TABLE_COLUMNS = {
	data_depo_data1: [
		"periode",
		"kode_uker",
		"cur_code",
		"cur_desc",
		"type",
		"acctno",
		"fdr_srl_no",
		"principal_amount",
		"short_name",
		"withdrawable_int",
		"issue_dt",
		"mat_dt",
		"int_rate",
		"int_tenor_disp",
		"renew",
		"remark",
		"pn_customer_service",
		"pn_rm_dana",
		"pn_rm_pinjaman",
		"pn_rm_merchant",
		"pn_relationship_officer",
		"pn_sales_person",
		"pn_pab",
		"pn_rm_referral",
		"jumlah_pn",
		"cbal_base"
	],
	data_depo_data2: [
		"periode",
		"kode_uker",
		"cur_code",
		"cur_desc",
		"type",
		"acctno",
		"fdr_srl_no",
		"principal_amount",
		"short_name",
		"withdrawable_int",
		"issue_dt",
		"mat_dt",
		"int_rate",
		"int_tenor_disp",
		"renew",
		"remark",
		"pn_customer_service",
		"pn_rm_dana",
		"pn_rm_pinjaman",
		"pn_rm_merchant",
		"pn_relationship_officer",
		"pn_sales_person",
		"pn_pab",
		"pn_rm_referral",
		"jumlah_pn",
		"cbal_base"
	],
	data_depo_data3: [
		"periode",
		"kode_uker",
		"cur_code",
		"cur_desc",
		"type",
		"acctno",
		"fdr_srl_no",
		"principal_amount",
		"short_name",
		"withdrawable_int",
		"issue_dt",
		"mat_dt",
		"int_rate",
		"int_tenor_disp",
		"renew",
		"remark",
		"pn_customer_service",
		"pn_rm_dana",
		"pn_rm_pinjaman",
		"pn_rm_merchant",
		"pn_relationship_officer",
		"pn_sales_person",
		"pn_pab",
		"pn_rm_referral",
		"jumlah_pn",
		"cbal_base"
	],
	data_depo: [
		"periode",
		"kode_uker",
		"cur_code",
		"cur_desc",
		"type",
		"acctno",
		"fdr_srl_no",
		"principal_amount",
		"short_name",
		"withdrawable_int",
		"issue_dt",
		"mat_dt",
		"int_rate",
		"int_tenor_disp",
		"renew",
		"remark",
		"pn_customer_service",
		"pn_rm_dana",
		"pn_rm_pinjaman",
		"pn_rm_merchant",
		"pn_relationship_officer",
		"pn_sales_person",
		"pn_pab",
		"pn_rm_referral",
		"jumlah_pn",
		"cbal_base"
	],
	data_di319_data1: [
		"periode",
		"uker_code",
		"curr_code",
		"curr_desc",
		"account_number",
		"ciff_no",
		"short_name",
		"open_dt",
		"balance",
		"in_balance",
		"accrued_int",
		"average_balance",
		"prod_code",
		"pn_pengelola_singlepn",
		"pn_customer_service",
		"pn_rm_dana_mantri",
		"pn_rm_pinjaman",
		"pn_rm_merchant",
		"pn_relationship_officer_rm_kredit_menengah",
		"pn_sales_person",
		"pn_pab",
		"pn_rm_referral",
		"jumlah_pn_pemasar",
		"balance_dalam_idr"
	],
	data_di319_data2: [
		"periode",
		"uker_code",
		"curr_code",
		"curr_desc",
		"account_number",
		"ciff_no",
		"short_name",
		"open_dt",
		"balance",
		"in_balance",
		"accrued_int",
		"average_balance",
		"prod_code",
		"pn_pengelola_singlepn",
		"pn_customer_service",
		"pn_rm_dana_mantri",
		"pn_rm_pinjaman",
		"pn_rm_merchant",
		"pn_relationship_officer_rm_kredit_menengah",
		"pn_sales_person",
		"pn_pab",
		"pn_rm_referral",
		"jumlah_pn_pemasar",
		"balance_dalam_idr"
	],
	data_di319_data3: [
		"periode",
		"uker_code",
		"curr_code",
		"curr_desc",
		"account_number",
		"ciff_no",
		"short_name",
		"open_dt",
		"balance",
		"in_balance",
		"accrued_int",
		"average_balance",
		"prod_code",
		"pn_pengelola_singlepn",
		"pn_customer_service",
		"pn_rm_dana_mantri",
		"pn_rm_pinjaman",
		"pn_rm_merchant",
		"pn_relationship_officer_rm_kredit_menengah",
		"pn_sales_person",
		"pn_pab",
		"pn_rm_referral",
		"jumlah_pn_pemasar",
		"balance_dalam_idr"
	],
	data_di321_data1: [
		"periode",
		"kode_kanwil",
		"kanwil",
		"kode_kanca",
		"kanca",
		"kode_uker",
		"uker",
		"curr",
		"currdesc",
		"cifno",
		"account_number",
		"product_code",
		"status",
		"short_name",
		"open_date",
		"balance",
		"avail_balance",
		"limit_amount",
		"cr_int",
		"dr_int",
		"commitment",
		"avrg_balance",
		"pn_pengelola_single_pn",
		"pn_customer_service",
		"pn_rm_dana",
		"pn_rm_pinjaman",
		"pn_rm_merchant",
		"pn_relationship_officer",
		"pn_sales_person",
		"pn_pab",
		"pn_rm_referral"
	],
	data_di321_data2: [
		"periode",
		"kode_kanwil",
		"kanwil",
		"kode_kanca",
		"kanca",
		"kode_uker",
		"uker",
		"curr",
		"currdesc",
		"cifno",
		"account_number",
		"product_code",
		"status",
		"short_name",
		"open_date",
		"balance",
		"avail_balance",
		"limit_amount",
		"cr_int",
		"dr_int",
		"commitment",
		"avrg_balance",
		"pn_pengelola_single_pn",
		"pn_customer_service",
		"pn_rm_dana",
		"pn_rm_pinjaman",
		"pn_rm_merchant",
		"pn_relationship_officer",
		"pn_sales_person",
		"pn_pab",
		"pn_rm_referral"
	],
	data_di321_data3: [
		"periode",
		"kode_kanwil",
		"kanwil",
		"kode_kanca",
		"kanca",
		"kode_uker",
		"uker",
		"curr",
		"currdesc",
		"cifno",
		"account_number",
		"product_code",
		"status",
		"short_name",
		"open_date",
		"balance",
		"avail_balance",
		"limit_amount",
		"cr_int",
		"dr_int",
		"commitment",
		"avrg_balance",
		"pn_pengelola_single_pn",
		"pn_customer_service",
		"pn_rm_dana",
		"pn_rm_pinjaman",
		"pn_rm_merchant",
		"pn_relationship_officer",
		"pn_sales_person",
		"pn_pab",
		"pn_rm_referral"
	],
	data_edc: [
		"tahun",
		"periode",
		"posisi",
		"kode_kanwil",
		"nama_kanwil",
		"kode_kanca",
		"nama_kanca",
		"kode_uker",
		"nama_uker",
		"tid",
		"mid",
		"nama_merchant",
		"jenis",
		"kanwil_pemrakarsa",
		"kanwil_nama_pemrakarsa",
		"uker_pemrakarsa",
		"uker_nama_pemrakarsa",
		"kanwil_implementor",
		"kanwil_nama_implementor",
		"uker_implementor",
		"uker_nama_implementor",
		"pn_user_pemrakarsa",
		"nama_user_pemrakarsa",
		"last_available",
		"status_available",
		"last_utility",
		"status_utility",
		"last_transactional",
		"status_transactional",
		"alamat_merchant",
		"kelurahan",
		"kecamatan",
		"kabupaten",
		"provinsi",
		"aktif_or_staging",
		"jml_transaksi",
		"sales_volume",
		"akumulasi_transaksi",
		"akumulasi_sales_volume",
		"kartu_jml_transaksi_on_us",
		"kartu_jml_transaksi_off_us",
		"jml_transaksi_qris",
		"kartu_sales_volume_on_us",
		"kartu_sales_volume_off_us",
		"sales_volume_qris",
		"ket_mcc",
		"kode_mcc",
		"norek",
		"cifno",
		"saldo_posisi",
		"ratas_saldo",
		"saldo_posisi_by_cif",
		"ratas_saldo_by_cif",
		"tgl_approval",
		"nilai",
		"source",
		"sales_volume_mid",
		"flagging",
		"flagging_bri_merchant",
		"tiering_sales_volume",
		"status_edc"
	],
	data_mtd_giro_kenaikan: [
		"norek",
		"nama_nasabah",
		"tgl1",
		"tgl2",
		"rm_pengelola"
	],
	data_mtd_giro_penurunan: [
		"norek",
		"nama_nasabah",
		"tgl1",
		"tgl2",
		"rm_pengelola"
	],
	data_mtd_giro: [
		"periode",
		"kode_kanwil",
		"kanwil",
		"kode_kanca",
		"kanca",
		"kode_uker",
		"uker",
		"curr",
		"currdesc",
		"cifno",
		"account_number",
		"product_code",
		"status",
		"short_name",
		"open_date",
		"balance",
		"avail_balance",
		"limit_amount",
		"cr_int",
		"dr_int",
		"commitment",
		"avrg_balance",
		"pn_pengelola_single_pn",
		"pn_customer_service",
		"pn_rm_dana",
		"pn_rm_pinjaman",
		"pn_rm_merchant",
		"pn_relationship_officer",
		"pn_sales_person",
		"pn_pab",
		"pn_rm_referral"
	],
	data_mtd_tab_kenaikan: [
		"norek",
		"nama_nasabah",
		"tgl1",
		"tgl2",
		"rm_pengelola"
	],
	data_mtd_tab_penurunan: [
		"norek",
		"nama_nasabah",
		"tgl1",
		"tgl2",
		"rm_pengelola"
	],
	data_mtd_tab: [
		"periode",
		"kode_kanwil",
		"kanwil",
		"kode_kanca",
		"kanca",
		"kode_uker",
		"uker",
		"curr",
		"currdesc",
		"cifno",
		"account_number",
		"product_code",
		"status",
		"short_name",
		"open_date",
		"balance",
		"avail_balance",
		"limit_amount",
		"cr_int",
		"dr_int",
		"commitment",
		"avrg_balance",
		"pn_pengelola_single_pn",
		"pn_customer_service",
		"pn_rm_dana",
		"pn_rm_pinjaman",
		"pn_rm_merchant",
		"pn_relationship_officer",
		"pn_sales_person",
		"pn_pab",
		"pn_rm_referral"
	],
	data_pic_jalan: [
		"no_urut",
		"unit_kerja",
		"nama_rmft",
		"nama_jalan",
		"nama_toko",
		"usaha",
		"rek_bri",
		"edc_bri",
		"qris_bri",
		"rek_lain",
		"edc_lain",
		"qris_lain",
		"telpon",
		"owner",
		"keterangan",
		"follow_up_terakhir"
	],
	data_pivot_multi: [
		"seq",
		"no_rek",
		"nama",
		"valuta",
		"jenis_rekening",
		"tanggal_transaksi",
		"jam_transaksi",
		"kode_transaksi",
		"desk_transaksi",
		"saldo_awal_mutasi",
		"mutasi_debet",
		"mutasi_kredit",
		"saldo_akhir_mutasi",
		"truser",
		"glsign",
		"auxtrc",
		"uker_tran",
		"uker_desc_tran"
	],
	data_produktivitas_rmft: [
		"rm",
		"dpk",
		"tgl1",
		"tgl2",
		"tgl3"
	],
	data_qris: [
		"periode",
		"posisi",
		"region",
		"rgdesc",
		"mainbr",
		"mbdesc",
		"branch",
		"x",
		"brdesc",
		"merchant_pan",
		"storeid",
		"nama_merchant",
		"kriteria",
		"jenis_usaha",
		"kode_mcc",
		"mcc",
		"alamat",
		"kode_pos",
		"kota",
		"provinsi",
		"no_rek",
		"cif",
		"pn",
		"pn_pemrakasa",
		"jabatan",
		"tgl_balikan_pten",
		"status",
		"merchant_type",
		"akumulasi_sv_onus",
		"akumulasi_sv_offus",
		"akumulasi_sv_linkaja",
		"akumulasi_sv_total",
		"posisi_sv_total",
		"akumulasi_trx_onus",
		"akumulasi_trx_offus",
		"akumulasi_trx_linkaja",
		"akumulasi_trx_total",
		"posisi_trx_total",
		"saldo_posisi",
		"ratas_saldo",
		"flagging_bri_merchant",
		"status_qris"
	],
	data_ytd_giro_kenaikan: [
		"norek",
		"nama_nasabah",
		"tgl1",
		"tgl2",
		"rm_pengelola"
	],
	data_ytd_giro_penurunan: [
		"norek",
		"nama_nasabah",
		"tgl1",
		"tgl2",
		"rm_pengelola"
	],
	data_ytd_giro: [
		"periode",
		"kode_kanwil",
		"kanwil",
		"kode_kanca",
		"kanca",
		"kode_uker",
		"uker",
		"curr",
		"currdesc",
		"cifno",
		"account_number",
		"product_code",
		"status",
		"short_name",
		"open_date",
		"balance",
		"avail_balance",
		"limit_amount",
		"cr_int",
		"dr_int",
		"commitment",
		"avrg_balance",
		"pn_pengelola_single_pn",
		"pn_customer_service",
		"pn_rm_dana",
		"pn_rm_pinjaman",
		"pn_rm_merchant",
		"pn_relationship_officer",
		"pn_sales_person",
		"pn_pab",
		"pn_rm_referral"
	],
	data_ytd_tab_kenaikan: [
		"norek",
		"nama_nasabah",
		"tgl1",
		"tgl2",
		"rm_pengelola"
	],
	data_ytd_tab_penurunan: [
		"norek",
		"nama_nasabah",
		"tgl1",
		"tgl2",
		"rm_pengelola"
	],
	data_ytd_tab: [
		"periode",
		"kode_kanwil",
		"kanwil",
		"kode_kanca",
		"kanca",
		"kode_uker",
		"uker",
		"curr",
		"currdesc",
		"cifno",
		"account_number",
		"product_code",
		"status",
		"short_name",
		"open_date",
		"balance",
		"avail_balance",
		"limit_amount",
		"cr_int",
		"dr_int",
		"commitment",
		"avrg_balance",
		"pn_pengelola_single_pn",
		"pn_customer_service",
		"pn_rm_dana",
		"pn_rm_pinjaman",
		"pn_rm_merchant",
		"pn_relationship_officer",
		"pn_sales_person",
		"pn_pab",
		"pn_rm_referral"
	]
};
var norm = (s) => s.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
function parseCsv(text) {
	const clean = text.replace(/^\uFEFF/, "");
	const firstLine = clean.split(/\r?\n/)[0] ?? "";
	const sep = [
		[",", (firstLine.match(/,/g) ?? []).length],
		[";", (firstLine.match(/;/g) ?? []).length],
		["	", (firstLine.match(/\t/g) ?? []).length],
		["|", (firstLine.match(/\|/g) ?? []).length]
	].sort((a, b) => b[1] - a[1])[0][0];
	const rows = [];
	let row = [];
	let cell = "";
	let quoted = false;
	for (let i = 0; i < clean.length; i++) {
		const ch = clean[i];
		if (quoted) {
			if (ch === "\"") {
				if (clean[i + 1] === "\"") {
					cell += "\"";
					i++;
				} else quoted = false;
			} else cell += ch;
			continue;
		}
		if (ch === "\"") quoted = true;
		else if (ch === sep) {
			row.push(cell);
			cell = "";
		} else if (ch === "\n") {
			row.push(cell);
			rows.push(row);
			row = [];
			cell = "";
		} else if (ch !== "\r") cell += ch;
	}
	row.push(cell);
	if (row.some((c) => c !== "")) rows.push(row);
	return rows;
}
function buildCsvRows(text, table) {
	const grid = parseCsv(text);
	const header = grid.shift();
	if (!header) throw new Error("File CSV kosong.");
	const allowed = TABLE_COLUMNS[table] ?? [];
	const allowedSet = new Set(allowed);
	const mapped = [];
	const unknown = /* @__PURE__ */ new Set();
	for (const line of grid) {
		const out = {};
		header.forEach((h, idx) => {
			const col = norm(h);
			if (!allowedSet.has(col)) {
				if (h.trim()) unknown.add(h.trim());
				return;
			}
			out[col] = (line[idx] ?? "").trim();
		});
		if (Object.values(out).some((v) => v !== "")) mapped.push(out);
	}
	return {
		rows: mapped,
		unknown: [...unknown],
		allowed
	};
}
function buildRows(file, table) {
	const wb = readSync(file, {
		type: "array",
		cellDates: true
	});
	const sheetName = wb.SheetNames[0];
	if (!sheetName) throw new Error("File Excel tidak memiliki sheet.");
	const sheet = wb.Sheets[sheetName];
	const raw = utils.sheet_to_json(sheet, {
		defval: "",
		raw: false
	});
	const allowed = TABLE_COLUMNS[table] ?? [];
	const allowedSet = new Set(allowed);
	const mapped = [];
	const unknown = /* @__PURE__ */ new Set();
	for (const row of raw) {
		const out = {};
		for (const [key, value] of Object.entries(row)) {
			const col = norm(key);
			if (!allowedSet.has(col)) {
				if (key.trim()) unknown.add(key.trim());
				continue;
			}
			out[col] = value instanceof Date ? value.toISOString().slice(0, 10) : value === null || value === void 0 ? "" : String(value).trim();
		}
		if (Object.values(out).some((v) => v !== "")) mapped.push(out);
	}
	return {
		rows: mapped,
		unknown: [...unknown],
		allowed
	};
}
function ExcelUploadDialog({ open, onOpenChange, table, label, onImported, mode = "excel" }) {
	const isCsv = mode === "csv";
	const accept = isCsv ? ".csv" : ".xls,.xlsx";
	const pattern = isCsv ? /\.csv$/i : /\.(xlsx|xls)$/i;
	const inputRef = (0, import_react.useRef)(null);
	const [file, setFile] = (0, import_react.useState)(null);
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [replace, setReplace] = (0, import_react.useState)(false);
	const reset = () => {
		setFile(null);
		setBusy(false);
		if (inputRef.current) inputRef.current.value = "";
	};
	const pick = (f) => {
		if (!f) return;
		if (!pattern.test(f.name)) {
			toast.error(isCsv ? "Hanya file CSV (.csv) yang didukung." : "Hanya file Excel (.xls, .xlsx) yang didukung.");
			return;
		}
		setFile(f);
	};
	const doImport = async () => {
		if (!file) return;
		setBusy(true);
		try {
			const { rows, unknown } = isCsv ? buildCsvRows(await file.text(), table) : buildRows(await file.arrayBuffer(), table);
			if (!rows.length) {
				toast.error("Tidak ada baris data yang cocok dengan kolom tabel.");
				setBusy(false);
				return;
			}
			if (replace) {
				const { error } = await supabase.from(table).delete().gte("id", 0);
				if (error) throw new Error(error.message);
			}
			const chunk = 500;
			for (let i = 0; i < rows.length; i += chunk) {
				const { error } = await supabase.from(table).insert(rows.slice(i, i + chunk));
				if (error) throw new Error(error.message);
			}
			toast.success(`${rows.length.toLocaleString("id-ID")} baris berhasil diimpor ke ${label}.` + (unknown.length ? ` ${unknown.length} kolom tidak dikenal diabaikan.` : ""));
			onImported?.();
			onOpenChange(false);
			reset();
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Gagal mengimpor file.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (!busy) {
				onOpenChange(v);
				if (!v) reset();
			}
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: isCsv ? "Upload CSV Data" : "Upload Excel Data" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: isCsv ? `Unggah file .csv untuk mengimpor data ke ${label}.` : `Unggah file .xls atau .xlsx untuk mengimpor data ke ${label}.` })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => inputRef.current?.click(),
					onDragOver: (e) => {
						e.preventDefault();
						setDragging(true);
					},
					onDragLeave: () => setDragging(false),
					onDrop: (e) => {
						e.preventDefault();
						setDragging(false);
						pick(e.dataTransfer.files?.[0]);
					},
					className: cn("flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors", dragging ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "size-8 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: file ? file.name : "Klik untuk memilih atau tarik file ke sini"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: isCsv ? "Hanya file CSV (.csv)" : "Hanya file Excel (.xls, .xlsx)"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					type: "file",
					accept,
					className: "hidden",
					onChange: (e) => pick(e.target.files?.[0])
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: replace,
						onChange: (e) => setReplace(e.target.checked),
						className: "size-4 rounded border-input"
					}), "Hapus data lama sebelum impor"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					disabled: busy,
					onClick: () => onOpenChange(false),
					children: "Batal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					disabled: !file || busy,
					onClick: doImport,
					children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }), "Import Data"]
				})] })
			]
		})
	});
}
var PAGE_SIZES = [
	10,
	25,
	50,
	100
];
function toNum(v) {
	if (!v) return 0;
	const cleaned = String(v).trim().replace(/[^0-9,.-]/g, "");
	const idStyle = /,\d{1,2}$/.test(cleaned);
	const n = Number(idStyle ? cleaned.replace(/\./g, "").replace(",", ".") : cleaned.replace(/,/g, ""));
	return Number.isFinite(n) ? n : 0;
}
var fmt$1 = (n) => n.toLocaleString("id-ID");
function PivotMutasiView({ refreshKey = 0 }) {
	const [raw, setRaw] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [page, setPage] = (0, import_react.useState)(0);
	const [pageSize, setPageSize] = (0, import_react.useState)(10);
	const [asc, setAsc] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoading(true);
		(async () => {
			const all = [];
			const chunk = 1e3;
			for (let i = 0; i < 100; i++) {
				const { data, error } = await supabase.from("data_pivot_multi").select("nama, tanggal_transaksi, mutasi_debet, mutasi_kredit").order("id", { ascending: true }).range(i * chunk, i * chunk + chunk - 1);
				if (error) {
					toast.error("Gagal memuat data pivot");
					break;
				}
				all.push(...data ?? []);
				if (!data || data.length < chunk) break;
			}
			if (!cancelled) {
				setRaw(all);
				setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [refreshKey]);
	const pivot = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const r of raw) {
			const nama = (r.nama ?? "").trim() || "(TANPA NAMA)";
			const cur = map.get(nama) ?? {
				nama,
				debet: 0,
				kredit: 0
			};
			cur.debet += toNum(r.mutasi_debet);
			cur.kredit += toNum(r.mutasi_kredit);
			map.set(nama, cur);
		}
		let list = [...map.values()].map((x) => ({
			...x,
			delta: x.kredit - x.debet
		}));
		list.sort((a, b) => asc ? a.delta - b.delta : b.delta - a.delta);
		return list;
	}, [raw, asc]);
	(0, import_react.useEffect)(() => setPage(0), [pageSize]);
	const totals = (0, import_react.useMemo)(() => pivot.reduce((acc, r) => ({
		debet: acc.debet + r.debet,
		kredit: acc.kredit + r.kredit,
		delta: acc.delta + r.delta
	}), {
		debet: 0,
		kredit: 0,
		delta: 0
	}), [pivot]);
	const pages = Math.max(1, Math.ceil(pivot.length / pageSize));
	const slice = pivot.slice(page * pageSize, page * pageSize + pageSize);
	const exportPivot = () => exportTableCsv(pivot.map((r) => ({
		Nama: r.nama,
		"Total Debet": r.debet,
		"Total Kredit": r.kredit,
		"Delta (Kredit - Debet)": r.delta
	})), "pivot-mutasi-rekening.xlsx");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: exportPivot,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 size-4" }), " Export Excel"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Show" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: pageSize,
						onChange: (e) => setPageSize(Number(e.target.value)),
						className: "h-9 rounded-md border border-input bg-card px-2 text-sm text-foreground",
						children: PAGE_SIZES.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: n,
							children: n
						}, n))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card-elevated overflow-x-auto",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2 p-4",
					children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-full" }, i))
				}) : pivot.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-8 text-center text-sm text-muted-foreground",
					children: "Tidak ada data."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted/60",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-left font-semibold",
								children: "Nama"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right font-semibold",
								children: "Total Debet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right font-semibold",
								children: "Total Kredit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "inline-flex items-center gap-1",
									onClick: () => setAsc((v) => !v),
									children: ["Delta (Kredit - Debet)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, { className: "size-3.5 text-muted-foreground" })]
								})
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [slice.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t transition-colors hover:bg-muted/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: r.nama
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right tabular-nums",
								children: fmt$1(r.debet)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right tabular-nums",
								children: fmt$1(r.kredit)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("px-4 py-3 text-right font-semibold tabular-nums", r.delta < 0 ? "text-destructive" : "text-success"),
								children: fmt$1(r.delta)
							})
						]
					}, r.nama)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t bg-muted/40 font-semibold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3",
								children: "TOTAL (seluruh data terfilter)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right tabular-nums",
								children: fmt$1(totals.debet)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-3 text-right tabular-nums",
								children: fmt$1(totals.kredit)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("px-4 py-3 text-right tabular-nums", totals.delta < 0 ? "text-destructive" : "text-success"),
								children: fmt$1(totals.delta)
							})
						]
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"Showing ",
						pivot.length === 0 ? 0 : page * pageSize + 1,
						" to",
						" ",
						Math.min(pivot.length, page * pageSize + pageSize),
						" of ",
						fmt$1(pivot.length),
						" entries"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						disabled: page === 0,
						onClick: () => setPage((p) => p - 1),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "mr-1 size-4" }), " Prev"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						disabled: page + 1 >= pages,
						onClick: () => setPage((p) => p + 1),
						children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-1 size-4" })]
					})]
				})]
			})
		]
	});
}
var DPK_ORDER = [
	"Giro",
	"Tabungan",
	"Deposito"
];
var SOURCES = [
	{
		key: "giro1",
		label: "Compare DATA1",
		tone: "bg-action-2",
		table: "data_di321_data1",
		pnColumn: "pn_rm_dana",
		valueColumn: "balance",
		dpk: "Giro",
		target: "tgl1"
	},
	{
		key: "giro2",
		label: "Compare DATA2",
		tone: "bg-action-3",
		table: "data_di321_data2",
		pnColumn: "pn_rm_dana",
		valueColumn: "balance",
		dpk: "Giro",
		target: "tgl2"
	},
	{
		key: "giro3",
		label: "Compare DATA3",
		tone: "bg-action-4",
		table: "data_di321_data3",
		pnColumn: "pn_rm_dana",
		valueColumn: "balance",
		dpk: "Giro",
		target: "tgl3"
	},
	{
		key: "tab1",
		label: "DI319→Tab tgl1",
		tone: "bg-action-5",
		table: "data_di319_data1",
		pnColumn: "pn_rm_dana_mantri",
		valueColumn: "balance",
		dpk: "Tabungan",
		target: "tgl1"
	},
	{
		key: "tab2",
		label: "DI319→Tab tgl2",
		tone: "bg-action-6",
		table: "data_di319_data2",
		pnColumn: "pn_rm_dana_mantri",
		valueColumn: "balance",
		dpk: "Tabungan",
		target: "tgl2"
	},
	{
		key: "tab3",
		label: "DI319→Tab tgl3",
		tone: "bg-action-7",
		table: "data_di319_data3",
		pnColumn: "pn_rm_dana_mantri",
		valueColumn: "balance",
		dpk: "Tabungan",
		target: "tgl3"
	},
	{
		key: "dep1",
		label: "DEPO→Dep tgl1",
		tone: "bg-action-8",
		table: "data_depo_data1",
		pnColumn: "pn_rm_dana",
		valueColumn: "principal_amount",
		dpk: "Deposito",
		target: "tgl1"
	},
	{
		key: "dep2",
		label: "DEPO→Dep tgl2",
		tone: "bg-action-9",
		table: "data_depo_data2",
		pnColumn: "pn_rm_dana",
		valueColumn: "principal_amount",
		dpk: "Deposito",
		target: "tgl2"
	},
	{
		key: "dep3",
		label: "DEPO→Dep tgl3",
		tone: "bg-action-4",
		table: "data_depo_data3",
		pnColumn: "pn_rm_dana",
		valueColumn: "principal_amount",
		dpk: "Deposito",
		target: "tgl3"
	}
];
function num(value) {
	if (value === null || value === void 0 || value === "") return 0;
	const n = Number(String(value).replace(/[^0-9.-]/g, ""));
	return Number.isFinite(n) ? n : 0;
}
function fmt(n) {
	return n.toLocaleString("id-ID");
}
/** PN pengelola diambil dari awalan kolom RM, mis. "00280983 - Nama". */
function pnOf(rm) {
	return String(rm ?? "").split("-")[0].trim();
}
async function sumByPn(table, pnColumn, valueColumn) {
	const map = /* @__PURE__ */ new Map();
	const size = 1e3;
	for (let page = 0; page < 60; page += 1) {
		const { data, error } = await supabase.from(table).select(`${pnColumn},${valueColumn}`).range(page * size, page * size + size - 1);
		if (error) throw new Error(error.message);
		const rows = data ?? [];
		for (const r of rows) {
			const pn = String(r[pnColumn] ?? "").trim();
			if (!pn) continue;
			map.set(pn, (map.get(pn) ?? 0) + num(r[valueColumn]));
		}
		if (rows.length < size) break;
	}
	return map;
}
function ProduktivitasRmftView({ canEdit }) {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [addOpen, setAddOpen] = (0, import_react.useState)(false);
	const [rmValue, setRmValue] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		const { data, error } = await supabase.from("data_produktivitas_rmft").select("id,rm,dpk,tgl1,tgl2,tgl3").order("id");
		if (error) toast.error(error.message);
		setRows(data ?? []);
		setLoading(false);
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const groups = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const r of rows) {
			const key = String(r.rm ?? "-");
			map.set(key, [...map.get(key) ?? [], r]);
		}
		return [...map.entries()].map(([rm, items]) => ({
			rm,
			items: [...items].sort((a, b) => DPK_ORDER.indexOf(String(a.dpk)) - DPK_ORDER.indexOf(String(b.dpk)))
		}));
	}, [rows]);
	async function addRm() {
		const rm = rmValue.trim();
		if (!rm) {
			toast.error("Nama RM wajib diisi.");
			return;
		}
		const payload = DPK_ORDER.map((dpk) => ({
			rm,
			dpk,
			tgl1: "0",
			tgl2: "0",
			tgl3: "0"
		}));
		const { error } = await supabase.from("data_produktivitas_rmft").insert(payload);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("RM ditambahkan.");
		setAddOpen(false);
		setRmValue("");
		load();
	}
	async function deleteRm(rm) {
		const { error } = await supabase.from("data_produktivitas_rmft").delete().eq("rm", rm);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("RM dihapus.");
		load();
	}
	async function runSource(src) {
		setBusy(src.key);
		try {
			const sums = await sumByPn(src.table, src.pnColumn, src.valueColumn);
			const targets = rows.filter((r) => String(r.dpk) === src.dpk);
			if (!targets.length) {
				toast.error(`Belum ada baris ${src.dpk}.`);
				return;
			}
			for (const r of targets) {
				const value = sums.get(pnOf(r.rm)) ?? 0;
				const patch = { [src.target]: String(value) };
				const { error } = await supabase.from("data_produktivitas_rmft").update(patch).eq("id", r.id);
				if (error) throw new Error(error.message);
			}
			toast.success(`${src.label} selesai.`);
			load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Gagal memproses data.");
		} finally {
			setBusy(null);
		}
	}
	function exportExcel() {
		exportTableCsv(rows.map((r) => ({
			RM: r.rm,
			DPK: r.dpk,
			"tgl 1": num(r.tgl1),
			"tgl 2": num(r.tgl2),
			"tgl 3": num(r.tgl3),
			MTD: num(r.tgl3) - num(r.tgl2),
			YTD: num(r.tgl3) - num(r.tgl1)
		})), "produktivitas_rmft.xlsx");
	}
	const deltaCell = (value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
		className: cn("whitespace-nowrap px-4 py-2.5 text-right tabular-nums", value < 0 ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-1",
			children: [fmt(value), value < 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-3.5" })]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mr-2 text-lg font-bold tracking-tight",
						children: "PRODUKTIVITAS RMFT"
					}),
					canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "bg-action-1 text-action-foreground hover:opacity-90",
						onClick: () => setAddOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 size-4" }), " Tambah RM"]
					}),
					canEdit && SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: busy !== null,
						onClick: () => runSource(s),
						className: cn(s.tone, "text-action-foreground hover:opacity-90"),
						children: busy === s.key ? "Memproses…" : s.label
					}, s.key)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						onClick: exportExcel,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1.5 size-4" }), " Export Excel"]
					})
				]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-full" }, i))
			}) : groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "card-elevated p-8 text-center text-sm text-muted-foreground",
				children: "Tidak ada data."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card-elevated overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "bg-table-head text-table-head-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-left font-semibold",
								children: "RM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-left font-semibold",
								children: "DPK"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right font-semibold",
								children: "tgl 1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right font-semibold",
								children: "tgl 2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right font-semibold",
								children: "tgl 3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "bg-table-accent px-4 py-3 text-right font-semibold",
								children: "MTD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "bg-table-accent px-4 py-3 text-right font-semibold",
								children: "YTD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3" })
						]
					}) }), groups.map((g) => {
						const total = g.items.reduce((acc, r) => ({
							tgl1: acc.tgl1 + num(r.tgl1),
							tgl2: acc.tgl2 + num(r.tgl2),
							tgl3: acc.tgl3 + num(r.tgl3)
						}), {
							tgl1: 0,
							tgl2: 0,
							tgl3: 0
						});
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "border-t-4 border-background",
							children: [g.items.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t",
								children: [
									i === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										rowSpan: g.items.length + 1,
										className: "px-4 py-2.5 align-top font-medium",
										children: g.rm
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "whitespace-nowrap px-4 py-2.5",
										children: r.dpk
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2.5 text-right tabular-nums",
										children: fmt(num(r.tgl1))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2.5 text-right tabular-nums",
										children: fmt(num(r.tgl2))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2.5 text-right tabular-nums",
										children: fmt(num(r.tgl3))
									}),
									deltaCell(num(r.tgl3) - num(r.tgl2)),
									deltaCell(num(r.tgl3) - num(r.tgl1)),
									i === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										rowSpan: g.items.length + 1,
										className: "px-4 py-2.5 text-right align-top",
										children: canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-sm text-destructive hover:underline",
											onClick: () => deleteRm(g.rm),
											children: "Hapus"
										})
									})
								]
							}, r.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t bg-muted/50 font-semibold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2.5",
										children: "Jumlah"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2.5 text-right tabular-nums",
										children: fmt(total.tgl1)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2.5 text-right tabular-nums",
										children: fmt(total.tgl2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2.5 text-right tabular-nums",
										children: fmt(total.tgl3)
									}),
									deltaCell(total.tgl3 - total.tgl2),
									deltaCell(total.tgl3 - total.tgl1)
								]
							})]
						}, g.rm);
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: addOpen,
				onOpenChange: setAddOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Tambah RM" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "rm",
							children: "Nama RM"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "rm",
							value: rmValue,
							onChange: (e) => setRmValue(e.target.value),
							placeholder: "00280983 - Nama RM"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setAddOpen(false),
						children: "Batal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: addRm,
						children: "Simpan"
					})] })
				] })
			})
		]
	});
}
function useCount(table, tick) {
	const [count, setCount] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setCount(null);
		supabase.from(table).select("*", {
			count: "exact",
			head: true
		}).then(({ count: c }) => setCount(c ?? 0));
	}, [table, tick]);
	return count;
}
function DataCategoryPage() {
	const { slug } = Route$2.useParams();
	const category = CATEGORY_BY_SLUG.get(slug);
	const { isAdmin } = useRole();
	const [tick, setTick] = (0, import_react.useState)(0);
	const [tab, setTab] = (0, import_react.useState)("data");
	const [confirmWipe, setConfirmWipe] = (0, import_react.useState)(false);
	const [uploadOpen, setUploadOpen] = (0, import_react.useState)(false);
	const [csvOpen, setCsvOpen] = (0, import_react.useState)(false);
	const count = useCount(category?.table ?? "settings", tick);
	if (!category) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Kategori tidak ditemukan."
	}) });
	const isCompareResult = category.readonly && !!CATEGORY_BY_SLUG.get(`${slug}_kenaikan`);
	const isProduktivitas = slug === "produktivitas_rmft";
	const canManage = isAdmin || slug === "pivot_multi";
	const exportExcel = async () => {
		const { data } = await supabase.from(category.table).select("*").limit(5e3);
		exportTableCsv(data ?? [], `${slug}.xlsx`);
	};
	const wipe = async () => {
		const { error } = await supabase.from(category.table).delete().gte("id", 0);
		setConfirmWipe(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Semua data dihapus.");
		setTick((t) => t + 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: category.label,
			description: "Manage data records for this category.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: exportExcel,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-2 size-4" }), " Export Excel"]
				}),
				canManage && !category.readonly && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setUploadOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-2 size-4" }), " Upload Excel"]
				}),
				canManage && category.csvUpload && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => setCsvOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mr-2 size-4" }), " Upload CSV"]
				}),
				canManage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "destructive",
					onClick: () => setConfirmWipe(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 size-4" }), " Hapus Semua Data"]
				})
			] })
		}),
		!isCompareResult && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
				label: `Jumlah Data · ${category.label}`,
				value: count === null ? "…" : count.toLocaleString("id-ID")
			})
		}),
		category.csvUpload && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 inline-flex rounded-lg border bg-muted/50 p-1",
			children: ["data", "pivot"].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setTab(t),
				className: cn("rounded-md px-3 py-1.5 text-sm transition-colors", tab === t ? "bg-card font-medium shadow-card" : "text-muted-foreground"),
				children: t === "data" ? "Data" : "Pivot Mutasi Rekening"
			}, t))
		}),
		category.csvUpload && tab === "pivot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PivotMutasiView, { refreshKey: tick }) : isProduktivitas ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProduktivitasRmftView, { canEdit: canManage }, `prod-${tick}`) : isCompareResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableView, {
				title: "Penurunan",
				table: `${category.table}_penurunan`,
				columns: CATEGORY_BY_SLUG.get(`${slug}_penurunan`)?.columns ?? [],
				showDelta: true,
				canEdit: canManage,
				canAdd: false
			}, `${slug}-turun-${tick}`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableView, {
				title: "Kenaikan",
				table: `${category.table}_kenaikan`,
				columns: CATEGORY_BY_SLUG.get(`${slug}_kenaikan`)?.columns ?? [],
				showDelta: true,
				canEdit: canManage,
				canAdd: false
			}, `${slug}-naik-${tick}`)]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTableView, {
			table: category.table,
			columns: category.columns,
			canEdit: canManage && !category.readonly,
			canAdd: canManage && !category.readonly && !category.noAdd,
			onChanged: () => setTick((t) => t + 1)
		}, `${slug}-${tick}`),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExcelUploadDialog, {
			open: uploadOpen,
			onOpenChange: setUploadOpen,
			table: category.table,
			label: category.label,
			onImported: () => setTick((t) => t + 1)
		}),
		category.csvUpload && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExcelUploadDialog, {
			mode: "csv",
			open: csvOpen,
			onOpenChange: setCsvOpen,
			table: category.table,
			label: category.label,
			onImported: () => setTick((t) => t + 1)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: confirmWipe,
			onOpenChange: setConfirmWipe,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
				"Hapus semua data ",
				category.label,
				"?"
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Seluruh baris pada kategori ini akan dihapus permanen." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Batal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: wipe,
				children: "Hapus Semua"
			})] })] })
		})
	] });
}
//#endregion
export { DataCategoryPage as component };
