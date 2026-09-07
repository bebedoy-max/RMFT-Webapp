import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BUd3fAPK.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { c as __exportAll } from "./server-DCpvnnjU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C9FPYSkn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D_mvlwZo.css";
var AuthContext = (0, import_react.createContext)({
	user: null,
	session: null,
	loading: true,
	signOut: async () => {}
});
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
			setSession(next);
			setLoading(false);
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setLoading(false);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			session,
			user: session?.user ?? null,
			loading,
			signOut: async () => {
				await supabase.auth.signOut();
			}
		},
		children
	});
}
function useAuth() {
	return (0, import_react.useContext)(AuthContext);
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "BO Teluk Betung — Pengelolaan Data RMFT" },
			{
				name: "description",
				content: "Aplikasi pengelolaan data giro, tabungan, deposito, QRIS, dan EDC BO Teluk Betung."
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "BO Teluk Betung"
			},
			{
				property: "og:description",
				content: "Aplikasi pengelolaan data BO Teluk Betung."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] })
	});
}
var $$splitComponentImporter$7 = () => import("./routes-B8ybfkjt.mjs");
var Route$9 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Dashboard — BO Teluk Betung" },
		{
			name: "description",
			content: "Kalender agenda dan pengingat nasabah untuk tim RMFT BO Teluk Betung dalam satu dashboard."
		},
		{
			property: "og:title",
			content: "Dashboard — BO Teluk Betung"
		},
		{
			property: "og:description",
			content: "Kalender agenda dan pengingat nasabah tim RMFT BO Teluk Betung."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./compare-data-DqpF2j7m.mjs");
var Route$8 = createFileRoute("/compare-data")({
	head: () => ({ meta: [
		{ title: "Compare Data — BO Teluk Betung" },
		{
			name: "description",
			content: "Bandingkan kenaikan dan penurunan saldo giro serta tabungan MTD dan YTD."
		},
		{
			property: "og:title",
			content: "Compare Data — BO Teluk Betung"
		},
		{
			property: "og:description",
			content: "Bandingkan kenaikan dan penurunan saldo giro serta tabungan MTD dan YTD."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./links-EYehAdRk.mjs");
var Route$7 = createFileRoute("/links")({
	head: () => ({ meta: [
		{ title: "Links — BO Teluk Betung" },
		{
			name: "description",
			content: "Kumpulan tautan kerja cepat untuk tim RMFT Teluk Betung."
		},
		{
			property: "og:title",
			content: "Links — BO Teluk Betung"
		},
		{
			property: "og:description",
			content: "Kumpulan tautan kerja cepat tim RMFT Teluk Betung."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./login-CY5ec2zC.mjs");
var Route$6 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Masuk — BO Teluk Betung" },
		{
			name: "description",
			content: "Halaman masuk aplikasi pengelolaan data BO Teluk Betung oleh RMFT Teluk Betung."
		},
		{
			property: "og:title",
			content: "Masuk — BO Teluk Betung"
		},
		{
			property: "og:description",
			content: "Masuk ke aplikasi pengelolaan data BO Teluk Betung."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./logs-CM2IBfdy.mjs");
var Route$5 = createFileRoute("/logs")({
	head: () => ({ meta: [
		{ title: "Activity Logs — BO Teluk Betung" },
		{
			name: "description",
			content: "Riwayat aktivitas pengguna aplikasi BO Teluk Betung."
		},
		{
			property: "og:title",
			content: "Activity Logs — BO Teluk Betung"
		},
		{
			property: "og:description",
			content: "Riwayat aktivitas pengguna aplikasi BO Teluk Betung."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./settings-4hpKxgnN.mjs");
var Route$4 = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "Settings — BO Teluk Betung" },
		{
			name: "description",
			content: "Pengaturan aplikasi data BO Teluk Betung."
		},
		{
			property: "og:title",
			content: "Settings — BO Teluk Betung"
		},
		{
			property: "og:description",
			content: "Pengaturan aplikasi data BO Teluk Betung."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./users-B-D049uQ.mjs");
var Route$3 = createFileRoute("/users")({
	head: () => ({ meta: [
		{ title: "System Users — BO Teluk Betung" },
		{
			name: "description",
			content: "Kelola akun dan hak akses pengguna aplikasi BO Teluk Betung."
		},
		{
			property: "og:title",
			content: "System Users — BO Teluk Betung"
		},
		{
			property: "og:description",
			content: "Kelola akun dan hak akses pengguna aplikasi BO Teluk Betung."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./data._slug-xjJC8foq.mjs");
var Route$2 = createFileRoute("/data/$slug")({
	head: () => ({ meta: [
		{ title: "Detail Kategori Data — BO Teluk Betung" },
		{
			name: "description",
			content: "Lihat, cari, dan ekspor catatan data kategori terpilih di BO Teluk Betung."
		},
		{
			property: "og:title",
			content: "Detail Kategori Data — BO Teluk Betung"
		},
		{
			property: "og:description",
			content: "Lihat, cari, dan ekspor catatan data kategori terpilih."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var json$1 = (body, status = 200) => new Response(JSON.stringify(body), {
	status,
	headers: {
		"content-type": "application/json",
		"cache-control": "no-store"
	}
});
var fail = (message, status = 400) => json$1({
	error: status === 401 ? "invalid_grant" : "bad_request",
	message,
	msg: message
}, status);
async function handle$1(request, splat) {
	const auth = await import("./auth-core.server-CfggGdeA.mjs");
	const { query } = await import("./db.server-KkUbJ8kx.mjs");
	const url = new URL(request.url);
	const path = splat.replace(/^\/+|\/+$/g, "");
	const body = request.method === "GET" || request.method === "HEAD" ? {} : await request.json().catch(() => ({}));
	if (path === "token" && request.method === "POST") {
		const grant = url.searchParams.get("grant_type") ?? "password";
		if (grant === "password") {
			const username = auth.toUsername(String(body["email"] ?? body["username"] ?? ""));
			const password = String(body["password"] ?? "");
			const user = await auth.findUserByUsername(username);
			if (!user || !auth.verifyPassword(password, user.password_hash)) return fail("Username atau password salah.", 401);
			if (!user.is_active) return fail("Akun dinonaktifkan.", 401);
			return json$1(await auth.createSession(user));
		}
		if (grant === "refresh_token") {
			const userId = (await query(`delete from public.auth_refresh_tokens
          where token::text = $1 and expires_at > now() returning user_id::text`, [String(body["refresh_token"] ?? "")]))[0]?.user_id;
			if (!userId) return fail("Refresh token tidak valid.", 401);
			const user = await auth.findUserById(userId);
			if (!user || !user.is_active) return fail("Akun tidak aktif.", 401);
			return json$1(await auth.createSession(user));
		}
		return fail(`grant_type ${grant} tidak didukung.`);
	}
	if (path === "signup" && request.method === "POST") {
		if (process.env["ALLOW_SIGNUP"] !== "true") return fail("Pendaftaran mandiri dinonaktifkan. Hubungi admin.", 403);
		const username = auth.toUsername(String(body["email"] ?? ""));
		const password = String(body["password"] ?? "");
		if (!username || password.length < 6) return fail("Username wajib, password minimal 6 karakter.");
		if (await auth.findUserByUsername(username)) return fail("Username sudah terpakai.");
		const rows = await query(`insert into public.app_users (username, nama, password_hash, role, is_active)
       values ($1,$2,$3,'viewer',true) returning id::text, created_at::text`, [
			username,
			String(body["data"]?.["nama"] ?? username),
			auth.hashPassword(password)
		]);
		await query(`insert into public.user_roles (user_id, role) values ($1,'viewer') on conflict do nothing`, [rows[0].id]);
		const user = await auth.findUserById(rows[0].id);
		return json$1(await auth.createSession(user));
	}
	if (path === "user" && request.method === "GET") {
		const claims = await auth.requireUser(request);
		const user = await auth.findUserById(claims.sub);
		if (!user) return fail("User tidak ditemukan.", 401);
		return json$1(auth.toSessionUser(user));
	}
	if (path === "logout" && request.method === "POST") {
		const token = auth.bearerFrom(request);
		if (token) try {
			await query(`delete from public.auth_refresh_tokens where user_id = $1`, [(await auth.verifyAccessToken(token)).sub]);
		} catch {}
		return new Response(null, { status: 204 });
	}
	if (path === "settings" && request.method === "GET") return json$1({
		external: {},
		disable_signup: process.env["ALLOW_SIGNUP"] !== "true",
		mailer_autoconfirm: true
	});
	return fail(`Endpoint auth tidak dikenal: ${path}`, 404);
}
var Route$1 = createFileRoute("/api/public/auth/v1/$")({ server: { handlers: {
	GET: async ({ request, params }) => run$1(request, params),
	POST: async ({ request, params }) => run$1(request, params),
	PUT: async ({ request, params }) => run$1(request, params),
	DELETE: async ({ request, params }) => run$1(request, params),
	OPTIONS: async () => new Response(null, { status: 204 })
} } });
async function run$1(request, params) {
	try {
		return await handle$1(request, params._splat ?? "");
	} catch (error) {
		if (error instanceof Response) return error;
		const message = error instanceof Error ? error.message : String(error);
		console.error("[auth]", message);
		return json$1({
			error: "server_error",
			message
		}, 500);
	}
}
var json = (body, status = 200, headers = {}) => new Response(body === null ? null : JSON.stringify(body), {
	status,
	headers: {
		"content-type": "application/json",
		"cache-control": "no-store",
		...headers
	}
});
var pgError = (message, status = 400) => json({
	message,
	code: String(status),
	details: null,
	hint: null
}, status);
function parseFilterValue(raw) {
	const idx = raw.indexOf(".");
	if (idx < 0) return null;
	const op = raw.slice(0, idx);
	let value = raw.slice(idx + 1);
	if (op === "in") {
		const inner = String(value).replace(/^\(/, "").replace(/\)$/, "");
		value = inner ? inner.split(",").map((v) => v.replace(/^"|"$/g, "")) : [];
	}
	return {
		op,
		value
	};
}
var OPS = {
	eq: "=",
	neq: "<>",
	gt: ">",
	gte: ">=",
	lt: "<",
	lte: "<=",
	like: "like",
	ilike: "ilike"
};
function buildCondition(ctx, columns, column, raw, params) {
	if (!columns.has(column)) throw new Error(`Kolom tidak dikenal: ${column}`);
	const parsed = parseFilterValue(raw);
	if (!parsed) throw new Error(`Filter tidak valid: ${column}=${raw}`);
	const col = ctx.ident(column);
	if (parsed.op === "is") {
		const v = String(parsed.value).toLowerCase();
		if (v === "null") return `${col} is null`;
		if (v === "not.null") return `${col} is not null`;
		return `${col} is ${v === "true"}`;
	}
	if (parsed.op === "in") {
		params.push(parsed.value);
		return `${col}::text = any($${params.length}::text[])`;
	}
	const sqlOp = OPS[parsed.op];
	if (!sqlOp) throw new Error(`Operator tidak didukung: ${parsed.op}`);
	params.push(parsed.value);
	return `${col}::text ${sqlOp} $${params.length}`;
}
function buildWhere(ctx, columns, url, params) {
	const reserved = /* @__PURE__ */ new Set([
		"select",
		"order",
		"limit",
		"offset",
		"and",
		"or",
		"columns",
		"on_conflict"
	]);
	const parts = [];
	for (const [key, raw] of url.searchParams.entries()) {
		if (reserved.has(key)) continue;
		parts.push(buildCondition(ctx, columns, key, raw, params));
	}
	const or = url.searchParams.get("or");
	if (or) {
		const clauses = or.replace(/^\(/, "").replace(/\)$/, "").split(/,(?![^(]*\))/).map((piece) => {
			const dot = piece.indexOf(".");
			return buildCondition(ctx, columns, piece.slice(0, dot), piece.slice(dot + 1), params);
		});
		if (clauses.length) parts.push(`(${clauses.join(" or ")})`);
	}
	return parts.length ? ` where ${parts.join(" and ")}` : "";
}
function buildSelect(ctx, columns, url) {
	const select = url.searchParams.get("select");
	if (!select || select.trim() === "*") return "*";
	const cols = select.split(",").map((c) => c.trim()).filter(Boolean);
	if (cols.some((c) => c === "*")) return "*";
	return cols.map((c) => {
		if (!columns.has(c)) throw new Error(`Kolom tidak dikenal: ${c}`);
		return ctx.ident(c);
	}).join(", ");
}
function buildOrder(ctx, columns, url) {
	const order = url.searchParams.get("order");
	if (!order) return "";
	return ` order by ${order.split(",").map((piece) => {
		const [col, ...mods] = piece.split(".");
		if (!col || !columns.has(col)) throw new Error(`Kolom order tidak dikenal: ${col}`);
		const dir = mods.includes("desc") ? "desc" : "asc";
		const nulls = mods.includes("nullsfirst") ? " nulls first" : mods.includes("nullslast") ? " nulls last" : "";
		return `${ctx.ident(col)} ${dir}${nulls}`;
	}).join(", ")}`;
}
function parseRange(request, url) {
	const limitParam = url.searchParams.get("limit");
	const offsetParam = url.searchParams.get("offset");
	if (limitParam) return {
		limit: Number(limitParam),
		offset: Number(offsetParam ?? 0)
	};
	const range = request.headers.get("range");
	if (range && /^\d+-\d*$/.test(range)) {
		const [fromStr, toStr] = range.split("-");
		const from = Number(fromStr);
		const to = toStr ? Number(toStr) : void 0;
		return {
			offset: from,
			...to !== void 0 ? { limit: to - from + 1 } : {}
		};
	}
	return { offset: Number(offsetParam ?? 0) };
}
function wantsCount(request) {
	return (request.headers.get("prefer") ?? "").includes("count=exact");
}
function wantsRepresentation(request) {
	return (request.headers.get("prefer") ?? "").includes("return=representation");
}
async function handleRpc(ctx, fn, body, isAdmin) {
	const need = {
		run_compare: "admin",
		has_role: "any"
	}[fn];
	if (!need) return pgError(`Fungsi tidak diizinkan: ${fn}`, 404);
	if (need === "admin" && !isAdmin) return pgError("Hanya admin yang dapat menjalankan fungsi ini.", 403);
	const keys = Object.keys(body);
	const params = keys.map((k) => body[k]);
	const args = keys.map((k, i) => `${ctx.ident(k)} => $${i + 1}`).join(", ");
	return json((await ctx.query(`select public.${ctx.ident(fn)}(${args}) as result`, params))[0]?.["result"] ?? null);
}
async function handle(request, splat) {
	const auth = await import("./auth-core.server-CfggGdeA.mjs");
	const db = await import("./db.server-KkUbJ8kx.mjs");
	const claims = await auth.requireUser(request);
	const ctx = {
		query: db.query,
		ident: db.ident,
		columnsOf: async (table) => {
			const cols = (await db.getSchema()).get(table);
			if (!cols) throw new Error(`Tabel tidak dikenal: ${table}`);
			return cols;
		}
	};
	const url = new URL(request.url);
	const path = splat.replace(/^\/+|\/+$/g, "");
	if (path.startsWith("rpc/")) {
		if (request.method !== "POST") return pgError("RPC harus POST.", 405);
		const body = await request.json().catch(() => ({}));
		return handleRpc(ctx, path.slice(4), body, claims.app_role === "admin");
	}
	const table = path;
	const columns = await ctx.columnsOf(table);
	const rel = ctx.ident(table);
	if (request.method === "GET" || request.method === "HEAD") {
		const params = [];
		const where = buildWhere(ctx, columns, url, params);
		const count = wantsCount(request);
		let total = null;
		if (count) {
			const rows = await ctx.query(`select count(*)::text as c from public.${rel}${where}`, params);
			total = Number(rows[0]?.c ?? 0);
		}
		if (request.method === "HEAD") return new Response(null, {
			status: 200,
			headers: { "content-range": `0-0/${total ?? "*"}` }
		});
		const { limit, offset } = parseRange(request, url);
		let sql = `select ${buildSelect(ctx, columns, url)} from public.${rel}${where}${buildOrder(ctx, columns, url)}`;
		if (limit !== void 0) {
			params.push(limit);
			sql += ` limit $${params.length}`;
		}
		if (offset) {
			params.push(offset);
			sql += ` offset $${params.length}`;
		}
		const rows = await ctx.query(sql, params);
		return json(rows, 200, { "content-range": `${offset}-${rows.length ? offset + rows.length - 1 : offset}/${total ?? "*"}` });
	}
	if (request.method === "POST") {
		const payload = await request.json().catch(() => null);
		const list = (Array.isArray(payload) ? payload : [payload]).filter(Boolean);
		if (!list.length) return pgError("Body kosong.");
		const keys = Array.from(new Set(list.flatMap((r) => Object.keys(r)))).filter((k) => columns.has(k));
		if (!keys.length) return pgError("Tidak ada kolom valid pada payload.");
		const params = [];
		const valueRows = list.map((row) => {
			return `(${keys.map((k) => {
				params.push(row[k] ?? null);
				return `$${params.length}`;
			}).join(", ")})`;
		});
		const returning = wantsRepresentation(request) ? " returning *" : "";
		const rows = await ctx.query(`insert into public.${rel} (${keys.map(ctx.ident).join(", ")}) values ${valueRows.join(", ")}${returning}`, params);
		return json(returning ? rows : null, 201);
	}
	if (request.method === "PATCH") {
		const payload = await request.json().catch(() => ({}));
		const keys = Object.keys(payload).filter((k) => columns.has(k));
		if (!keys.length) return pgError("Tidak ada kolom valid untuk diupdate.");
		const params = [];
		const sets = keys.map((k) => {
			params.push(payload[k]);
			return `${ctx.ident(k)} = $${params.length}`;
		});
		const where = buildWhere(ctx, columns, url, params);
		if (!where) return pgError("Update tanpa filter ditolak.", 400);
		const returning = wantsRepresentation(request) ? " returning *" : "";
		const rows = await ctx.query(`update public.${rel} set ${sets.join(", ")}${where}${returning}`, params);
		return json(returning ? rows : null, returning ? 200 : 204);
	}
	if (request.method === "DELETE") {
		const params = [];
		const where = buildWhere(ctx, columns, url, params);
		if (!where) return pgError("Delete tanpa filter ditolak.", 400);
		const returning = wantsRepresentation(request) ? " returning *" : "";
		const rows = await ctx.query(`delete from public.${rel}${where}${returning}`, params);
		return json(returning ? rows : null, returning ? 200 : 204);
	}
	return pgError("Method tidak didukung.", 405);
}
async function run(request, params) {
	try {
		return await handle(request, params._splat ?? "");
	} catch (error) {
		if (error instanceof Response) return error;
		const message = error instanceof Error ? error.message : String(error);
		console.error("[rest]", message);
		return pgError(message, 400);
	}
}
var Route = createFileRoute("/api/public/rest/v1/$")({ server: { handlers: {
	GET: async ({ request, params }) => run(request, params),
	HEAD: async ({ request, params }) => run(request, params),
	POST: async ({ request, params }) => run(request, params),
	PATCH: async ({ request, params }) => run(request, params),
	DELETE: async ({ request, params }) => run(request, params),
	OPTIONS: async () => new Response(null, { status: 204 })
} } });
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	CompareDataRoute: Route$8.update({
		id: "/compare-data",
		path: "/compare-data",
		getParentRoute: () => Route$10
	}),
	LinksRoute: Route$7.update({
		id: "/links",
		path: "/links",
		getParentRoute: () => Route$10
	}),
	LoginRoute: Route$6.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$10
	}),
	LogsRoute: Route$5.update({
		id: "/logs",
		path: "/logs",
		getParentRoute: () => Route$10
	}),
	SettingsRoute: Route$4.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$10
	}),
	UsersRoute: Route$3.update({
		id: "/users",
		path: "/users",
		getParentRoute: () => Route$10
	}),
	DataSlugRoute: Route$2.update({
		id: "/data/$slug",
		path: "/data/$slug",
		getParentRoute: () => Route$10
	}),
	ApiPublicAuthV1SplatRoute: Route$1.update({
		id: "/api/public/auth/v1/$",
		path: "/api/public/auth/v1/$",
		getParentRoute: () => Route$10
	}),
	ApiPublicRestV1SplatRoute: Route.update({
		id: "/api/public/rest/v1/$",
		path: "/api/public/rest/v1/$",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Route$2 as n, useAuth as r, router_exports as t };
