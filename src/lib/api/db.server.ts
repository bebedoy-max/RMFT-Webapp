// Self-hosted PostgreSQL access layer (cPanel / VPS deployment).
// Only imported from server handlers — never from client code.
import pg from "pg";

let _pool: pg.Pool | undefined;

export function getPool(): pg.Pool {
  if (_pool) return _pool;

  const connectionString = process.env["DATABASE_URL"];
  const ssl = process.env["PGSSL"] === "true" ? { rejectUnauthorized: false } : undefined;

  _pool = connectionString
    ? new pg.Pool({ connectionString, ...(ssl ? { ssl } : {}), max: 10 })
    : new pg.Pool({
        host: process.env["PGHOST"] ?? "127.0.0.1",
        port: Number(process.env["PGPORT"] ?? 5432),
        database: process.env["PGDATABASE"]!,
        user: process.env["PGUSER"]!,
        password: process.env["PGPASSWORD"]!,
        ...(ssl ? { ssl } : {}),
        max: 10,
      });

  return _pool;
}

export async function query<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const res = await getPool().query(text, params);
  return res.rows as T[];
}

export function isSelfHost(): boolean {
  return process.env["SELF_HOST"] === "true";
}

/** Cache of public tables/columns so identifiers can be validated before interpolation. */
let schemaCache: Map<string, Set<string>> | undefined;
let schemaCacheAt = 0;

export async function getSchema(): Promise<Map<string, Set<string>>> {
  if (schemaCache && Date.now() - schemaCacheAt < 60_000) return schemaCache;
  const rows = await query<{ table_name: string; column_name: string }>(
    `select table_name, column_name from information_schema.columns where table_schema = 'public'`,
  );
  const map = new Map<string, Set<string>>();
  for (const r of rows) {
    if (!map.has(r.table_name)) map.set(r.table_name, new Set());
    map.get(r.table_name)!.add(r.column_name);
  }
  schemaCache = map;
  schemaCacheAt = Date.now();
  return map;
}

export function ident(name: string): string {
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) throw new Error(`Invalid identifier: ${name}`);
  return `"${name}"`;
}
