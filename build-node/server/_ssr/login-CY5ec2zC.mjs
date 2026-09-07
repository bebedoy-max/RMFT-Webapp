import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BUd3fAPK.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useAuth } from "./router-C9FPYSkn.mjs";
import { n as logActivity } from "./utils-ButrhBye.mjs";
import { t as Button } from "./button-BjCZoT9f.mjs";
import { n as Label, t as Input } from "./label-BNIPdzLg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CY5ec2zC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const { user, loading } = useAuth();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [nama, setNama] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && user) navigate({ to: "/" });
	}, [
		loading,
		user,
		navigate
	]);
	function toEmail(value) {
		const v = value.trim().toLowerCase();
		return v.includes("@") ? v : `${v}@app.local`;
	}
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			if (mode === "signin") {
				const { error } = await supabase.auth.signInWithPassword({
					email: toEmail(email),
					password
				});
				if (error) throw error;
				await logActivity(email.trim().toLowerCase(), "login", "Berhasil masuk ke aplikasi");
				navigate({ to: "/" });
			} else {
				const { error } = await supabase.auth.signUp({
					email: toEmail(email),
					password,
					options: {
						emailRedirectTo: `${window.location.origin}/`,
						data: { nama }
					}
				});
				if (error) throw error;
				toast.success("Akun dibuat. Silakan cek email untuk konfirmasi bila diminta.");
				setMode("signin");
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Gagal masuk");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-elevated w-full max-w-md px-8 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-center text-2xl font-bold tracking-tight",
					children: "BO Teluk Betung"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-sm text-muted-foreground",
					children: "Development by RMFT Teluk Betung"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "mt-6 space-y-4",
					children: [
						mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "nama",
								children: "Nama"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "nama",
								value: nama,
								onChange: (e) => setNama(e.target.value),
								placeholder: "Nama lengkap",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "Username / Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "text",
								autoComplete: "username",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "admin",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: "password",
								autoComplete: mode === "signin" ? "current-password" : "new-password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: "••••••••",
								required: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full",
							disabled: busy,
							children: busy ? "Memproses…" : mode === "signin" ? "Sign In" : "Daftar"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-4 w-full text-center text-xs text-muted-foreground underline-offset-4 hover:underline",
					onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
					children: mode === "signin" ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
