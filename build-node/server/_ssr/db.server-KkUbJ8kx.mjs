import { t as esm_default } from "../_libs/pg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/db.server-KkUbJ8kx.js
var _pool;
function getPool() {
	if (_pool) return _pool;
	const connectionString = process.env["DATABASE_URL"];
	const ssl = process.env["PGSSL"] === "true" ? { rejectUnauthorized: false } : void 0;
	_pool = connectionString ? new esm_default.Pool({
		connectionString,
		...ssl ? { ssl } : {},
		max: 10
	}) : new esm_default.Pool({
		host: process.env["PGHOST"] ?? "127.0.0.1",
		port: Number(process.env["PGPORT"] ?? 5432),
		database: process.env["PGDATABASE"],
		user: process.env["PGUSER"],
		password: process.env["PGPASSWORD"],
		...ssl ? { ssl } : {},
		max: 10
	});
	return _pool;
}
async function query(text, params = []) {
	return (await getPool().query(text, params)).rows;
}
/** Cache of public tables/columns so identifiers can be validated before interpolation. */
var schemaCache;
var schemaCacheAt = 0;
async function getSchema() {
	if (schemaCache && Date.now() - schemaCacheAt < 6e4) return schemaCache;
	const rows = await query(`select table_name, column_name from information_schema.columns where table_schema = 'public'`);
	const map = /* @__PURE__ */ new Map();
	for (const r of rows) {
		if (!map.has(r.table_name)) map.set(r.table_name, /* @__PURE__ */ new Set());
		map.get(r.table_name).add(r.column_name);
	}
	schemaCache = map;
	schemaCacheAt = Date.now();
	return map;
}
function ident(name) {
	if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) throw new Error(`Invalid identifier: ${name}`);
	return `"${name}"`;
}
//#endregion
export { getSchema, ident, query };
