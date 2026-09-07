// Minimal PostgREST-compatible API (/rest/v1) backed by self-hosted PostgreSQL.
// Supports the subset used by this app: select/insert/update/delete, filters
// (eq, neq, gt, gte, lt, lte, like, ilike, in, is), or=(...), order, limit,
// offset, Range header pagination, exact counts and rpc() calls.
import { createFileRoute } from "@tanstack/react-router";

type Ctx = {
  query: <T = Record<string, unknown>>(text: string, params?: unknown[]) => Promise<T[]>;
  ident: (name: string) => string;
  columnsOf: (table: string) => Promise<Set<string>>;
};

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(body === null ? null : JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", ...headers },
  });

const pgError = (message: string, status = 400) =>
  json({ message, code: String(status), details: null, hint: null }, status);

function parseFilterValue(raw: string): { op: string; value: unknown } | null {
  const idx = raw.indexOf(".");
  if (idx < 0) return null;
  const op = raw.slice(0, idx);
  let value: unknown = raw.slice(idx + 1);
  if (op === "in") {
    const inner = String(value).replace(/^\(/, "").replace(/\)$/, "");
    value = inner
      ? inner.split(",").map((v) => v.replace(/^"|"$/g, ""))
      : [];
  }
  return { op, value };
}

const OPS: Record<string, string> = {
  eq: "=",
  neq: "<>",
  gt: ">",
  gte: ">=",
  lt: "<",
  lte: "<=",
  like: "like",
  ilike: "ilike",
};

function buildCondition(
  ctx: Ctx,
  columns: Set<string>,
  column: string,
  raw: string,
  params: unknown[],
): string {
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

function buildWhere(ctx: Ctx, columns: Set<string>, url: URL, params: unknown[]): string {
  const reserved = new Set(["select", "order", "limit", "offset", "and", "or", "columns", "on_conflict"]);
  const parts: string[] = [];

  for (const [key, raw] of url.searchParams.entries()) {
    if (reserved.has(key)) continue;
    parts.push(buildCondition(ctx, columns, key, raw, params));
  }

  const or = url.searchParams.get("or");
  if (or) {
    const inner = or.replace(/^\(/, "").replace(/\)$/, "");
    const clauses = inner
      .split(/,(?![^(]*\))/)
      .map((piece) => {
        const dot = piece.indexOf(".");
        return buildCondition(ctx, columns, piece.slice(0, dot), piece.slice(dot + 1), params);
      });
    if (clauses.length) parts.push(`(${clauses.join(" or ")})`);
  }

  return parts.length ? ` where ${parts.join(" and ")}` : "";
}

function buildSelect(ctx: Ctx, columns: Set<string>, url: URL): string {
  const select = url.searchParams.get("select");
  if (!select || select.trim() === "*") return "*";
  const cols = select
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  if (cols.some((c) => c === "*")) return "*";
  return cols
    .map((c) => {
      if (!columns.has(c)) throw new Error(`Kolom tidak dikenal: ${c}`);
      return ctx.ident(c);
    })
    .join(", ");
}

function buildOrder(ctx: Ctx, columns: Set<string>, url: URL): string {
  const order = url.searchParams.get("order");
  if (!order) return "";
  const parts = order.split(",").map((piece) => {
    const [col, ...mods] = piece.split(".");
    if (!col || !columns.has(col)) throw new Error(`Kolom order tidak dikenal: ${col}`);
    const dir = mods.includes("desc") ? "desc" : "asc";
    const nulls = mods.includes("nullsfirst") ? " nulls first" : mods.includes("nullslast") ? " nulls last" : "";
    return `${ctx.ident(col)} ${dir}${nulls}`;
  });
  return ` order by ${parts.join(", ")}`;
}

function parseRange(request: Request, url: URL): { limit?: number; offset: number } {
  const limitParam = url.searchParams.get("limit");
  const offsetParam = url.searchParams.get("offset");
  if (limitParam) return { limit: Number(limitParam), offset: Number(offsetParam ?? 0) };

  const range = request.headers.get("range");
  if (range && /^\d+-\d*$/.test(range)) {
    const [fromStr, toStr] = range.split("-");
    const from = Number(fromStr);
    const to = toStr ? Number(toStr) : undefined;
    return { offset: from, ...(to !== undefined ? { limit: to - from + 1 } : {}) };
  }
  return { offset: Number(offsetParam ?? 0) };
}

function wantsCount(request: Request): boolean {
  return (request.headers.get("prefer") ?? "").includes("count=exact");
}

function wantsRepresentation(request: Request): boolean {
  return (request.headers.get("prefer") ?? "").includes("return=representation");
}

async function handleRpc(ctx: Ctx, fn: string, body: Record<string, unknown>, isAdmin: boolean) {
  const allowed: Record<string, "admin" | "any"> = { run_compare: "admin", has_role: "any" };
  const need = allowed[fn];
  if (!need) return pgError(`Fungsi tidak diizinkan: ${fn}`, 404);
  if (need === "admin" && !isAdmin) return pgError("Hanya admin yang dapat menjalankan fungsi ini.", 403);

  const keys = Object.keys(body);
  const params = keys.map((k) => body[k]);
  const args = keys.map((k, i) => `${ctx.ident(k)} => $${i + 1}`).join(", ");
  const rows = await ctx.query(`select public.${ctx.ident(fn)}(${args}) as result`, params);
  const result = (rows[0] as Record<string, unknown> | undefined)?.["result"] ?? null;
  return json(result);
}

async function handle(request: Request, splat: string): Promise<Response> {
  const proxy = await import("@/lib/api/supabase-proxy.server");
  if (proxy.supabaseBaseUrl()) return proxy.proxyToSupabase(request, "rest/v1", splat);
  const auth = await import("@/lib/api/auth-core.server");
  const db = await import("@/lib/api/db.server");
  const claims = await auth.requireUser(request);

  const ctx: Ctx = {
    query: db.query,
    ident: db.ident,
    columnsOf: async (table: string) => {
      const schema = await db.getSchema();
      const cols = schema.get(table);
      if (!cols) throw new Error(`Tabel tidak dikenal: ${table}`);
      return cols;
    },
  };

  const url = new URL(request.url);
  const path = splat.replace(/^\/+|\/+$/g, "");

  if (path.startsWith("rpc/")) {
    if (request.method !== "POST") return pgError("RPC harus POST.", 405);
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    return handleRpc(ctx, path.slice(4), body, claims.app_role === "admin");
  }

  const table = path;
  const columns = await ctx.columnsOf(table);
  const rel = ctx.ident(table);

  if (request.method === "GET" || request.method === "HEAD") {
    const params: unknown[] = [];
    const where = buildWhere(ctx, columns, url, params);
    const count = wantsCount(request);
    let total: number | null = null;
    if (count) {
      const rows = await ctx.query<{ c: string }>(`select count(*)::text as c from public.${rel}${where}`, params);
      total = Number(rows[0]?.c ?? 0);
    }

    if (request.method === "HEAD") {
      return new Response(null, {
        status: 200,
        headers: { "content-range": `0-0/${total ?? "*"}` },
      });
    }

    const { limit, offset } = parseRange(request, url);
    let sql = `select ${buildSelect(ctx, columns, url)} from public.${rel}${where}${buildOrder(ctx, columns, url)}`;
    if (limit !== undefined) {
      params.push(limit);
      sql += ` limit $${params.length}`;
    }
    if (offset) {
      params.push(offset);
      sql += ` offset $${params.length}`;
    }
    const rows = await ctx.query(sql, params);
    const to = rows.length ? offset + rows.length - 1 : offset;
    return json(rows, 200, { "content-range": `${offset}-${to}/${total ?? "*"}` });
  }

  if (request.method === "POST") {
    const payload = (await request.json().catch(() => null)) as unknown;
    const list = (Array.isArray(payload) ? payload : [payload]).filter(Boolean) as Record<string, unknown>[];
    if (!list.length) return pgError("Body kosong.");

    const keys = Array.from(new Set(list.flatMap((r) => Object.keys(r)))).filter((k) => columns.has(k));
    if (!keys.length) return pgError("Tidak ada kolom valid pada payload.");

    const params: unknown[] = [];
    const valueRows = list.map((row) => {
      const placeholders = keys.map((k) => {
        params.push(row[k] ?? null);
        return `$${params.length}`;
      });
      return `(${placeholders.join(", ")})`;
    });

    const returning = wantsRepresentation(request) ? " returning *" : "";
    const rows = await ctx.query(
      `insert into public.${rel} (${keys.map(ctx.ident).join(", ")}) values ${valueRows.join(", ")}${returning}`,
      params,
    );
    return json(returning ? rows : null, 201);
  }

  if (request.method === "PATCH") {
    const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const keys = Object.keys(payload).filter((k) => columns.has(k));
    if (!keys.length) return pgError("Tidak ada kolom valid untuk diupdate.");
    const params: unknown[] = [];
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
    const params: unknown[] = [];
    const where = buildWhere(ctx, columns, url, params);
    if (!where) return pgError("Delete tanpa filter ditolak.", 400);
    const returning = wantsRepresentation(request) ? " returning *" : "";
    const rows = await ctx.query(`delete from public.${rel}${where}${returning}`, params);
    return json(returning ? rows : null, returning ? 200 : 204);
  }

  return pgError("Method tidak didukung.", 405);
}

async function run(request: Request, params: { _splat?: string | undefined }): Promise<Response> {
  try {
    return await handle(request, params._splat ?? "");
  } catch (error) {
    if (error instanceof Response) return error;
    const message = error instanceof Error ? error.message : String(error);
    console.error("[rest]", message);
    return pgError(message, 400);
  }
}

export const Route = createFileRoute("/api/public/rest/v1/$")({
  server: {
    handlers: {
      GET: async ({ request, params }) => run(request, params),
      HEAD: async ({ request, params }) => run(request, params),
      POST: async ({ request, params }) => run(request, params),
      PATCH: async ({ request, params }) => run(request, params),
      DELETE: async ({ request, params }) => run(request, params),
      OPTIONS: async () => new Response(null, { status: 204 }),
    },
  },
});
