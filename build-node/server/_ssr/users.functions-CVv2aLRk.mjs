import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./server-DCpvnnjU.mjs";
import { n as requireAuth, t as assertAdmin } from "./require-auth-BlU75E8Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users.functions-CVv2aLRk.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function toEmail(username) {
	const v = username.trim().toLowerCase();
	return v.includes("@") ? v : `${v}@app.local`;
}
var selfHost = () => process.env["SELF_HOST"] === "true";
var listAppUsers_createServerFn_handler = createServerRpc({
	id: "84331f4465f1b54530cd1bf975dc7ba02ac96e2f8d6442586747aafad0638898",
	name: "listAppUsers",
	filename: "src/lib/users.functions.ts"
}, (opts) => listAppUsers.__executeServer(opts));
var listAppUsers = createServerFn({ method: "GET" }).middleware([requireAuth]).handler(listAppUsers_createServerFn_handler, async ({ context }) => {
	assertAdmin(context);
	if (selfHost()) {
		const { listUsersPg } = await import("./users-pg.server-B4CEd1y1.mjs");
		return listUsersPg();
	}
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { data, error } = await supabaseAdmin.auth.admin.listUsers({
		page: 1,
		perPage: 1e3
	});
	if (error) throw new Error(error.message);
	const ids = data.users.map((u) => u.id);
	const { data: roles } = await supabaseAdmin.from("user_roles").select("user_id, role").in("user_id", ids);
	const roleMap = /* @__PURE__ */ new Map();
	for (const r of roles ?? []) roleMap.set(r.user_id, String(r.role));
	return data.users.map((u) => {
		const email = u.email ?? "";
		const meta = u.user_metadata ?? {};
		return {
			id: u.id,
			nama: typeof meta["nama"] === "string" && meta["nama"] ? meta["nama"] : email.split("@")[0],
			username: email.split("@")[0],
			email,
			role: roleMap.get(u.id) === "admin" ? "admin" : "viewer",
			active: !u.banned_until
		};
	});
});
var createAppUser_createServerFn_handler = createServerRpc({
	id: "4a7d5cc10d03dc35c24d461f6580453b2d82785295ed2e73f32af789f2916a1e",
	name: "createAppUser",
	filename: "src/lib/users.functions.ts"
}, (opts) => createAppUser.__executeServer(opts));
var createAppUser = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((d) => d).handler(createAppUser_createServerFn_handler, async ({ data, context }) => {
	assertAdmin(context);
	if (!data.username.trim() || data.password.length < 6) throw new Error("Username wajib diisi dan password minimal 6 karakter.");
	if (selfHost()) {
		const { createUserPg } = await import("./users-pg.server-B4CEd1y1.mjs");
		return createUserPg(data);
	}
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
		email: toEmail(data.username),
		password: data.password,
		email_confirm: true,
		user_metadata: { nama: data.nama.trim() || data.username.trim() }
	});
	if (error) throw new Error(error.message);
	const { error: roleErr } = await supabaseAdmin.from("user_roles").insert({
		user_id: created.user.id,
		role: data.role
	});
	if (roleErr) throw new Error(roleErr.message);
	return { ok: true };
});
var updateAppUser_createServerFn_handler = createServerRpc({
	id: "77865b4e305c95f1423001afc08de2e249b67667660b2fb28ecb0cee3b07c9f1",
	name: "updateAppUser",
	filename: "src/lib/users.functions.ts"
}, (opts) => updateAppUser.__executeServer(opts));
var updateAppUser = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((d) => d).handler(updateAppUser_createServerFn_handler, async ({ data, context }) => {
	assertAdmin(context);
	if (data.password && data.password.length < 6) throw new Error("Password minimal 6 karakter.");
	if (selfHost()) {
		const { updateUserPg } = await import("./users-pg.server-B4CEd1y1.mjs");
		return updateUserPg(data);
	}
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const attrs = {};
	if (data.nama !== void 0) attrs["user_metadata"] = { nama: data.nama };
	if (data.password) attrs["password"] = data.password;
	if (data.active !== void 0) attrs["ban_duration"] = data.active ? "none" : "876000h";
	if (Object.keys(attrs).length) {
		const { error } = await supabaseAdmin.auth.admin.updateUserById(data.id, attrs);
		if (error) throw new Error(error.message);
	}
	if (data.role) {
		await supabaseAdmin.from("user_roles").delete().eq("user_id", data.id);
		const { error } = await supabaseAdmin.from("user_roles").insert({
			user_id: data.id,
			role: data.role
		});
		if (error) throw new Error(error.message);
	}
	return { ok: true };
});
var deleteAppUser_createServerFn_handler = createServerRpc({
	id: "ec9cac7b56b1cb49c4fdb830ab7b2be6ed329f3374dada64d760e951daab2adc",
	name: "deleteAppUser",
	filename: "src/lib/users.functions.ts"
}, (opts) => deleteAppUser.__executeServer(opts));
var deleteAppUser = createServerFn({ method: "POST" }).middleware([requireAuth]).inputValidator((d) => d).handler(deleteAppUser_createServerFn_handler, async ({ data, context }) => {
	assertAdmin(context);
	if (data.id === context.userId) throw new Error("Tidak bisa menghapus akun sendiri.");
	if (selfHost()) {
		const { deleteUserPg } = await import("./users-pg.server-B4CEd1y1.mjs");
		return deleteUserPg(data.id);
	}
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	await supabaseAdmin.from("user_roles").delete().eq("user_id", data.id);
	const { error } = await supabaseAdmin.auth.admin.deleteUser(data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { createAppUser_createServerFn_handler, deleteAppUser_createServerFn_handler, listAppUsers_createServerFn_handler, updateAppUser_createServerFn_handler };
