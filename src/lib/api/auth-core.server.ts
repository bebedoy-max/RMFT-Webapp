// Self-hosted auth: password hashing + HS256 JWT issuing/verification.
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { query } from "./db.server";

const ACCESS_TTL_SECONDS = 60 * 60; // 1 hour

function secret(): Uint8Array {
  const value = process.env["JWT_SECRET"];
  if (!value || value.length < 24) {
    throw new Error("JWT_SECRET belum diset (minimal 24 karakter) di file .env server.");
  }
  return new TextEncoder().encode(value);
}

export type AppUser = {
  id: string;
  username: string;
  nama: string;
  role: "admin" | "viewer";
  is_active: boolean;
  created_at: string;
};

export function toEmail(username: string): string {
  const v = String(username ?? "").trim().toLowerCase();
  return v.includes("@") ? v : `${v}@app.local`;
}

export function toUsername(emailOrUsername: string): string {
  const v = String(emailOrUsername ?? "").trim().toLowerCase();
  return v.includes("@") ? v.split("@")[0]! : v;
}

export function hashPassword(plain: string): string {
  return bcrypt.hashSync(plain, 10);
}

export function verifyPassword(plain: string, hash: string): boolean {
  try {
    return bcrypt.compareSync(plain, hash);
  } catch {
    return false;
  }
}

/** Shape mimics the Supabase user object so the frontend client stays unchanged. */
export function toSessionUser(u: AppUser) {
  return {
    id: u.id,
    aud: "authenticated",
    role: "authenticated",
    email: toEmail(u.username),
    phone: "",
    email_confirmed_at: u.created_at,
    confirmed_at: u.created_at,
    last_sign_in_at: new Date().toISOString(),
    app_metadata: { provider: "email", providers: ["email"] },
    user_metadata: { nama: u.nama, username: u.username, app_role: u.role },
    identities: [],
    created_at: u.created_at,
    updated_at: u.created_at,
  };
}

export async function createSession(u: AppUser) {
  const now = Math.floor(Date.now() / 1000);
  const accessToken = await new SignJWT({
    email: toEmail(u.username),
    role: "authenticated",
    app_role: u.role,
    user_metadata: { nama: u.nama, username: u.username },
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(u.id)
    .setAudience("authenticated")
    .setIssuedAt(now)
    .setExpirationTime(now + ACCESS_TTL_SECONDS)
    .sign(secret());

  const rows = await query<{ token: string }>(
    `insert into public.auth_refresh_tokens (user_id, expires_at)
     values ($1, now() + interval '30 days') returning token`,
    [u.id],
  );

  return {
    access_token: accessToken,
    token_type: "bearer",
    expires_in: ACCESS_TTL_SECONDS,
    expires_at: now + ACCESS_TTL_SECONDS,
    refresh_token: rows[0]!.token,
    user: toSessionUser(u),
  };
}

export type TokenClaims = { sub: string; email: string; app_role: "admin" | "viewer" };

export async function verifyAccessToken(token: string): Promise<TokenClaims> {
  const { payload } = await jwtVerify(token, secret(), { audience: "authenticated" });
  if (!payload.sub) throw new Error("Token tidak memuat user id");
  return {
    sub: payload.sub,
    email: String(payload["email"] ?? ""),
    app_role: payload["app_role"] === "admin" ? "admin" : "viewer",
  };
}

export function bearerFrom(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header || !header.toLowerCase().startsWith("bearer ")) return null;
  const token = header.slice(7).trim();
  return token && token.split(".").length === 3 ? token : null;
}

export async function requireUser(request: Request): Promise<TokenClaims> {
  const token = bearerFrom(request);
  if (!token) throw new Response("Unauthorized", { status: 401 });
  try {
    return await verifyAccessToken(token);
  } catch {
    throw new Response("Unauthorized", { status: 401 });
  }
}

export async function findUserByUsername(username: string) {
  const rows = await query<AppUser & { password_hash: string }>(
    `select id::text, username, nama, role, is_active, created_at::text, password_hash
       from public.app_users where lower(username) = lower($1) limit 1`,
    [username],
  );
  return rows[0] ?? null;
}

export async function findUserById(id: string) {
  const rows = await query<AppUser>(
    `select id::text, username, nama, role, is_active, created_at::text
       from public.app_users where id = $1 limit 1`,
    [id],
  );
  return rows[0] ?? null;
}
