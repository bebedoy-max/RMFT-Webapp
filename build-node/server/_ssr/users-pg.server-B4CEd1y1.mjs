import { query } from "./db.server-KkUbJ8kx.mjs";
import { hashPassword, toEmail, toUsername } from "./auth-core.server-CfggGdeA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users-pg.server-B4CEd1y1.js
async function listUsersPg() {
	return (await query(`select u.id::text, u.nama, u.username, coalesce(r.role::text, u.role) as role, u.is_active
       from public.app_users u
       left join public.user_roles r on r.user_id = u.id
      order by u.created_at asc`)).map((u) => ({
		id: u.id,
		nama: u.nama,
		username: u.username,
		email: toEmail(u.username),
		role: u.role === "admin" ? "admin" : "viewer",
		active: u.is_active
	}));
}
async function createUserPg(data) {
	const username = toUsername(data.username);
	const rows = await query(`insert into public.app_users (nama, username, password_hash, role, is_active)
     values ($1,$2,$3,$4,true) returning id::text`, [
		data.nama.trim() || username,
		username,
		hashPassword(data.password),
		data.role
	]);
	await query(`insert into public.user_roles (user_id, role) values ($1,$2::public.app_role)
     on conflict (user_id, role) do nothing`, [rows[0].id, data.role]);
	return { ok: true };
}
async function updateUserPg(data) {
	const sets = [];
	const params = [];
	if (data.nama !== void 0) {
		params.push(data.nama);
		sets.push(`nama = $${params.length}`);
	}
	if (data.password) {
		params.push(hashPassword(data.password));
		sets.push(`password_hash = $${params.length}`);
	}
	if (data.active !== void 0) {
		params.push(data.active);
		sets.push(`is_active = $${params.length}`);
	}
	if (data.role) {
		params.push(data.role);
		sets.push(`role = $${params.length}`);
	}
	if (sets.length) {
		params.push(data.id);
		await query(`update public.app_users set ${sets.join(", ")}, updated_at = now() where id = $${params.length}`, params);
	}
	if (data.role) {
		await query(`delete from public.user_roles where user_id = $1`, [data.id]);
		await query(`insert into public.user_roles (user_id, role) values ($1,$2::public.app_role)`, [data.id, data.role]);
	}
	if (data.password || data.active === false) await query(`delete from public.auth_refresh_tokens where user_id = $1`, [data.id]);
	return { ok: true };
}
async function deleteUserPg(id) {
	await query(`delete from public.app_users where id = $1`, [id]);
	return { ok: true };
}
//#endregion
export { createUserPg, deleteUserPg, listUsersPg, updateUserPg };
