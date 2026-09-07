import { query } from "./db.server-KkUbJ8kx.mjs";
import { t as bcryptjs_default } from "../_libs/bcryptjs.mjs";
import { n as jwtVerify, t as SignJWT } from "../_libs/jose.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-core.server-CfggGdeA.js
var ACCESS_TTL_SECONDS = 3600;
function secret() {
	const value = process.env["JWT_SECRET"];
	if (!value || value.length < 24) throw new Error("JWT_SECRET belum diset (minimal 24 karakter) di file .env server.");
	return new TextEncoder().encode(value);
}
function toEmail(username) {
	const v = String(username ?? "").trim().toLowerCase();
	return v.includes("@") ? v : `${v}@app.local`;
}
function toUsername(emailOrUsername) {
	const v = String(emailOrUsername ?? "").trim().toLowerCase();
	return v.includes("@") ? v.split("@")[0] : v;
}
function hashPassword(plain) {
	return bcryptjs_default.hashSync(plain, 10);
}
function verifyPassword(plain, hash) {
	try {
		return bcryptjs_default.compareSync(plain, hash);
	} catch {
		return false;
	}
}
/** Shape mimics the Supabase user object so the frontend client stays unchanged. */
function toSessionUser(u) {
	return {
		id: u.id,
		aud: "authenticated",
		role: "authenticated",
		email: toEmail(u.username),
		phone: "",
		email_confirmed_at: u.created_at,
		confirmed_at: u.created_at,
		last_sign_in_at: (/* @__PURE__ */ new Date()).toISOString(),
		app_metadata: {
			provider: "email",
			providers: ["email"]
		},
		user_metadata: {
			nama: u.nama,
			username: u.username,
			app_role: u.role
		},
		identities: [],
		created_at: u.created_at,
		updated_at: u.created_at
	};
}
async function createSession(u) {
	const now = Math.floor(Date.now() / 1e3);
	const accessToken = await new SignJWT({
		email: toEmail(u.username),
		role: "authenticated",
		app_role: u.role,
		user_metadata: {
			nama: u.nama,
			username: u.username
		}
	}).setProtectedHeader({
		alg: "HS256",
		typ: "JWT"
	}).setSubject(u.id).setAudience("authenticated").setIssuedAt(now).setExpirationTime(now + ACCESS_TTL_SECONDS).sign(secret());
	const rows = await query(`insert into public.auth_refresh_tokens (user_id, expires_at)
     values ($1, now() + interval '30 days') returning token`, [u.id]);
	return {
		access_token: accessToken,
		token_type: "bearer",
		expires_in: ACCESS_TTL_SECONDS,
		expires_at: now + ACCESS_TTL_SECONDS,
		refresh_token: rows[0].token,
		user: toSessionUser(u)
	};
}
async function verifyAccessToken(token) {
	const { payload } = await jwtVerify(token, secret(), { audience: "authenticated" });
	if (!payload.sub) throw new Error("Token tidak memuat user id");
	return {
		sub: payload.sub,
		email: String(payload["email"] ?? ""),
		app_role: payload["app_role"] === "admin" ? "admin" : "viewer"
	};
}
function bearerFrom(request) {
	const header = request.headers.get("authorization");
	if (!header || !header.toLowerCase().startsWith("bearer ")) return null;
	const token = header.slice(7).trim();
	return token && token.split(".").length === 3 ? token : null;
}
async function requireUser(request) {
	const token = bearerFrom(request);
	if (!token) throw new Response("Unauthorized", { status: 401 });
	try {
		return await verifyAccessToken(token);
	} catch {
		throw new Response("Unauthorized", { status: 401 });
	}
}
async function findUserByUsername(username) {
	return (await query(`select id::text, username, nama, role, is_active, created_at::text, password_hash
       from public.app_users where lower(username) = lower($1) limit 1`, [username]))[0] ?? null;
}
async function findUserById(id) {
	return (await query(`select id::text, username, nama, role, is_active, created_at::text
       from public.app_users where id = $1 limit 1`, [id]))[0] ?? null;
}
//#endregion
export { bearerFrom, createSession, findUserById, findUserByUsername, hashPassword, requireUser, toEmail, toSessionUser, toUsername, verifyAccessToken, verifyPassword };
