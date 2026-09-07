globalThis.__nitro_main__ = import.meta.url;
import { i as serve, r as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { i as toEventHandler, n as defineHandler, o as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/.htaccess": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"79f-yj/FWvpRUjtfq2i1GZPpFsQq+5I\"",
		"mtime": "2026-08-23T04:28:18.293Z",
		"size": 1951,
		"path": "../public/.htaccess"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-23T04:28:18.293Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/AppLayout-C4iYl4nu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e3a-WdLfGEC5VFv28sYuD67uvTiu7Qo\"",
		"mtime": "2026-08-23T04:28:17.735Z",
		"size": 36410,
		"path": "../public/assets/AppLayout-C4iYl4nu.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-08-23T04:28:18.293Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/PageHeader-B-g-nTU3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3cc-+yirCjr65JtGoc5tTt9iMZS42k8\"",
		"mtime": "2026-08-23T04:28:17.735Z",
		"size": 972,
		"path": "../public/assets/PageHeader-B-g-nTU3.js"
	},
	"/assets/button-D5-5Ne-S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1272-6LpqxZaqGRNAzGWu7TkAyQbzzI0\"",
		"mtime": "2026-08-23T04:28:17.735Z",
		"size": 4722,
		"path": "../public/assets/button-D5-5Ne-S.js"
	},
	"/assets/compare-data-BzjGUSi_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8eb-FH1zeo+ZNVjgzi7m/NQml+MgP0w\"",
		"mtime": "2026-08-23T04:28:17.735Z",
		"size": 2283,
		"path": "../public/assets/compare-data-BzjGUSi_.js"
	},
	"/assets/dialog-BfpGz-G5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a07-6Xulp2RCxxbY0gkEkhzZpkBQH2E\"",
		"mtime": "2026-08-23T04:28:17.737Z",
		"size": 2567,
		"path": "../public/assets/dialog-BfpGz-G5.js"
	},
	"/assets/alert-dialog-CqfzxNlA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"95f1-mHWU1MyUKGP9Vn5O5/pkGSUp59E\"",
		"mtime": "2026-08-23T04:28:17.735Z",
		"size": 38385,
		"path": "../public/assets/alert-dialog-CqfzxNlA.js"
	},
	"/assets/dist-Cs8XguHk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c0-bbmYY1teouiql7sMNJSEcjXFbOE\"",
		"mtime": "2026-08-23T04:28:17.737Z",
		"size": 704,
		"path": "../public/assets/dist-Cs8XguHk.js"
	},
	"/assets/auth-BSbsaO6H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"364d9-sZFatP3xy+D27EI6epuirDAchc4\"",
		"mtime": "2026-08-23T04:28:17.735Z",
		"size": 222425,
		"path": "../public/assets/auth-BSbsaO6H.js"
	},
	"/assets/link-CpL-O--N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"667d-xHpShssGS+lBx3Hdjnl4ebODhag\"",
		"mtime": "2026-08-23T04:28:17.737Z",
		"size": 26237,
		"path": "../public/assets/link-CpL-O--N.js"
	},
	"/assets/label-GxdQPFWM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e4-X18gp767jV1Z/HfSdlYotSX88w4\"",
		"mtime": "2026-08-23T04:28:17.737Z",
		"size": 1252,
		"path": "../public/assets/label-GxdQPFWM.js"
	},
	"/assets/login-Dt5NyB5K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aed-/QtOG3i/SN0ZnuxKBONdjw8c3Hc\"",
		"mtime": "2026-08-23T04:28:17.738Z",
		"size": 2797,
		"path": "../public/assets/login-Dt5NyB5K.js"
	},
	"/assets/logs-BuEMvBxM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa9-WUbor2TIRvCG8oGHFZuZeUp3G8Q\"",
		"mtime": "2026-08-23T04:28:17.738Z",
		"size": 4009,
		"path": "../public/assets/logs-BuEMvBxM.js"
	},
	"/assets/links-CZOFlPFg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1405-oQl+qjNQdZZeO1SmwO/btUnDn+I\"",
		"mtime": "2026-08-23T04:28:17.738Z",
		"size": 5125,
		"path": "../public/assets/links-CZOFlPFg.js"
	},
	"/assets/rolldown-runtime-CbXtAM7H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24d-+aXgvbJ1Wwcp2A8AXKIBByksYC8\"",
		"mtime": "2026-08-23T04:28:17.738Z",
		"size": 589,
		"path": "../public/assets/rolldown-runtime-CbXtAM7H.js"
	},
	"/assets/data._slug-2qM1xVn_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70704-JSD1l11kjIbZVu0vsvUI+nqCy1M\"",
		"mtime": "2026-08-23T04:28:17.736Z",
		"size": 460548,
		"path": "../public/assets/data._slug-2qM1xVn_.js"
	},
	"/assets/index-BqmaRXj_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57580-yUzFayKU7qzzdhUxKQ3ah0LvWgw\"",
		"mtime": "2026-08-23T04:28:17.734Z",
		"size": 357760,
		"path": "../public/assets/index-BqmaRXj_.js"
	},
	"/assets/routes-DOsNm55N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c04-qrIO0IOQl6i71CM5ZY3ecA0NGe0\"",
		"mtime": "2026-08-23T04:28:17.738Z",
		"size": 3076,
		"path": "../public/assets/routes-DOsNm55N.js"
	},
	"/assets/skeleton-4kUe-7p3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d8-z5XOA7g+g4qEUvdtwWJU1l+08b8\"",
		"mtime": "2026-08-23T04:28:17.738Z",
		"size": 216,
		"path": "../public/assets/skeleton-4kUe-7p3.js"
	},
	"/assets/settings-Bgu1wv--.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"393-t34sSXzWAGbNISi+S1d2WWwgVQo\"",
		"mtime": "2026-08-23T04:28:17.738Z",
		"size": 915,
		"path": "../public/assets/settings-Bgu1wv--.js"
	},
	"/assets/search-DhUhLNgf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-NKHd6nnq1I5KVy8LA0LiWkpk/XM\"",
		"mtime": "2026-08-23T04:28:17.738Z",
		"size": 167,
		"path": "../public/assets/search-DhUhLNgf.js"
	},
	"/assets/styles-D_mvlwZo.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13c66-DmFLzBrf1iEvqwz3erNlEofPxno\"",
		"mtime": "2026-08-23T04:28:17.739Z",
		"size": 80998,
		"path": "../public/assets/styles-D_mvlwZo.css"
	},
	"/assets/users-DzPT3UJY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"107b7-0OU35CBmkQPMTy+om7wovVhCR/0\"",
		"mtime": "2026-08-23T04:28:17.739Z",
		"size": 67511,
		"path": "../public/assets/users-DzPT3UJY.js"
	},
	"/assets/xlsx-D8JtAJC0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19f-OExVBdS4yvWX9aHMgDcdMYkdpW8\"",
		"mtime": "2026-08-23T04:28:17.739Z",
		"size": 415,
		"path": "../public/assets/xlsx-D8JtAJC0.js"
	},
	"/assets/utils-C5V2NP_J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bfd-0bnSHZAXfa9vMkHjfFKE02KhVOs\"",
		"mtime": "2026-08-23T04:28:17.739Z",
		"size": 27645,
		"path": "../public/assets/utils-C5V2NP_J.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_ap0hR4 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_ap0hR4
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
