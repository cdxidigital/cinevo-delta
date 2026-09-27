import { o as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { V as require_react, b as useRouter, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as safeArtPath } from "./artwork-model-BgxZamve.mjs";
import { r as getSql } from "./db-Om--2ukh.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { r as getBearerToken } from "./client-COXjRbXB.mjs";
import { i as auth, n as requireUserId, t as UnauthorizedError } from "./verify.server-CpYHinRg.mjs";
import { t as loadTicket } from "./playback.server-BUB6NozS.mjs";
import { I as Download, d as Smartphone, s as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-CK9yrCYC.js
var library_exports = /* @__PURE__ */ __exportAll({
	THEMES: () => THEMES,
	VIDEO_EXT: () => VIDEO_EXT,
	applySourceFilter: () => applySourceFilter,
	forgetAllBlobs: () => forgetAllBlobs,
	forgetBlob: () => forgetBlob,
	isVideoFile: () => isVideoFile,
	makePoster: () => makePoster,
	mediaUrl: () => mediaUrl,
	parseFilename: () => parseFilename,
	playableCount: () => playableCount,
	rememberBlob: () => rememberBlob,
	remoteTitle: () => remoteTitle,
	scanFileList: () => scanFileList,
	sourceForTitle: () => sourceForTitle,
	titleFromFile: () => titleFromFile
});
var VIDEO_EXT = /\.(mp4|mkv|mov|avi|webm|m4v|wmv|ts|m2ts)$/i;
var blobs = /* @__PURE__ */ new Map();
function mediaUrl(id) {
	return blobs.get(id);
}
function playableCount() {
	return blobs.size;
}
function rememberBlob(id, file) {
	const prev = blobs.get(id);
	if (prev) URL.revokeObjectURL(prev);
	const url = URL.createObjectURL(file);
	blobs.set(id, url);
	return url;
}
function forgetBlob(id) {
	const prev = blobs.get(id);
	if (!prev) return;
	URL.revokeObjectURL(prev);
	blobs.delete(id);
}
function forgetAllBlobs() {
	for (const url of blobs.values()) URL.revokeObjectURL(url);
	blobs.clear();
}
function parseFilename(fileName) {
	const base = fileName.split(/[/\\]/).pop() || fileName;
	let stem = base.replace(VIDEO_EXT, "");
	const yearHit = /\(?((?:19|20)\d{2})\)?/.exec(stem);
	const year = yearHit ? yearHit[1] : "";
	stem = stem.replace(/[._]+/g, " ").replace(/\((?:19|20)\d{2}\)/g, " ").replace(/\b(?:19|20)\d{2}\b/g, " ").replace(/\b(1080p|720p|2160p|480p|4k|uhd|hdr|bluray|webrip|web-dl|x264|x265|hevc|dts|aac|remux)\b/gi, " ").replace(/\s+/g, " ").trim();
	return {
		title: stem || base.replace(VIDEO_EXT, ""),
		year,
		fileName: base
	};
}
function isVideoFile(name) {
	return VIDEO_EXT.test(name);
}
var ACCENTS = [
	"cyan",
	"magenta",
	"violet",
	"amber"
];
function titleFromFile(file, folderName, index) {
	const parsed = parseFilename(file.name);
	const id = `folder-${hash(`${folderName}:${file.name}:${file.size}`)}`;
	rememberBlob(id, file);
	const accent = ACCENTS[index % ACCENTS.length];
	return {
		id,
		title: parsed.title,
		kind: /s\d{2}e\d{2}/i.test(file.name) ? "series" : "movie",
		year: parsed.year || "—",
		runtime: file.size > 2e9 ? "2h+" : file.size > 7e8 ? "~2h" : "~90m",
		genre: "Home library",
		genres: ["Home library", folderName],
		synopsis: `Imported from ${folderName}. File stays on this device — CINEVO only indexes the name.`,
		cast: [],
		director: folderName,
		rating: 0,
		addedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		poster: makePoster(parsed.title, accent),
		still: "/stills/theater.jpg",
		accent,
		source: "folder",
		sourceLabel: folderName,
		path: file.name
	};
}
function scanFileList(files, folderName = "Home folder") {
	const list = Array.from(files).filter((f) => isVideoFile(f.name) || isVideoFile(f.webkitRelativePath || ""));
	const name = folderName || guessFolder(list) || "Home folder";
	return list.slice(0, 80).map((file, i) => titleFromFile(file, name, i));
}
function guessFolder(files) {
	return (files.find((f) => f.webkitRelativePath)?.webkitRelativePath || "").split("/")[0] || "";
}
function hash(s) {
	let h = 0;
	for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
	return h.toString(16);
}
function makePoster(title, accent) {
	if (typeof document === "undefined") return "/stills/theater.jpg";
	const c = document.createElement("canvas");
	c.width = 400;
	c.height = 600;
	const ctx = c.getContext("2d");
	if (!ctx) return "/stills/theater.jpg";
	const ink = {
		cyan: "#f5f5f5",
		magenta: "#3b7bff",
		violet: "#8aa0c4",
		amber: "#d6d0c4"
	};
	ctx.fillStyle = "#0b0b0b";
	ctx.fillRect(0, 0, 400, 600);
	ctx.strokeStyle = "rgba(255,255,255,0.16)";
	ctx.lineWidth = 1;
	ctx.strokeRect(18, 18, 364, 564);
	ctx.fillStyle = ink[accent] || "#f5f5f5";
	ctx.font = "800 28px Inter, system-ui, sans-serif";
	wrapText(ctx, title, 36, 250, 328, 34);
	ctx.fillStyle = "rgba(255,255,255,0.35)";
	ctx.font = "700 12px Inter, system-ui, sans-serif";
	ctx.fillText("CINEVO", 36, 560);
	return c.toDataURL("image/jpeg", .85);
}
function wrapText(ctx, text, x, y, max, lh) {
	const words = text.split(" ");
	let line = "";
	let yy = y;
	for (const w of words) {
		const next = line ? `${line} ${w}` : w;
		if (ctx.measureText(next).width > max) {
			ctx.fillText(line, x, yy);
			line = w;
			yy += lh;
		} else line = next;
	}
	if (line) ctx.fillText(line, x, yy);
}
function remoteTitle(input) {
	const accent = input.source === "plex" ? "amber" : input.source === "shared" ? "magenta" : "violet";
	const label = input.source === "plex" ? "Plex" : input.source === "jellyfin" ? "Jellyfin" : "Shared";
	const genres = input.genres?.length ? input.genres : [input.genre || label, input.sourceLabel];
	return {
		id: input.id,
		title: input.title,
		kind: input.kind ?? "movie",
		year: input.year || "—",
		runtime: input.runtime || "—",
		genre: input.genre || genres[0] || label,
		genres,
		synopsis: input.synopsis || (input.source === "shared" ? `Indexed from ${input.sourceLabel}. Playback stays on the original server.` : `Indexed from ${input.sourceLabel}. CINEVO can proxy playback from this server.`),
		cast: input.cast || [],
		director: input.director || input.sourceLabel,
		rating: input.rating || 0,
		addedAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		poster: input.poster || makePoster(input.title, accent),
		still: input.still || input.poster || "/stills/theater.jpg",
		accent,
		source: input.source,
		sourceLabel: input.sourceLabel,
		path: input.path
	};
}
function applySourceFilter(filter, local, remote) {
	const all = [...local, ...remote];
	if (filter === "all") return all;
	return all.filter((t) => t.source === filter);
}
function sourceForTitle(title, sources) {
	const kind = title.source;
	const label = title.sourceLabel;
	if (!kind || !label) return void 0;
	return sources.find((s) => {
		if (s.kind !== kind) return false;
		if (s.name === label) return true;
		const handle = s.name.replace(/^@/, "");
		return label.startsWith(`${handle} ·`) || label.startsWith(`${s.name} ·`);
	});
}
var THEMES = [
	{
		id: "noir",
		label: "Noir",
		feel: "Black and white",
		accent: "#ffffff"
	},
	{
		id: "pulse",
		label: "Pulse",
		feel: "Cyan on black",
		accent: "#7ee7ff"
	},
	{
		id: "violet",
		label: "Violet",
		feel: "Lilac night",
		accent: "#ddcfff"
	},
	{
		id: "ember",
		label: "Ember",
		feel: "Warm lamplight",
		accent: "#ffd0b8"
	},
	{
		id: "sage",
		label: "Sage",
		feel: "Quiet green",
		accent: "#b6f6d8"
	},
	{
		id: "day",
		label: "Day",
		feel: "Paper and ink",
		accent: "#0c5f72"
	}
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/app-destination-CB7c60JT.js
var APP_ROOMS = [
	"movies",
	"shows",
	"library",
	"tools",
	"browse"
];
var APP_CORES = [
	"libraries",
	"sharing",
	"stewardship",
	"ai"
];
function appDestination(search) {
	const room = APP_ROOMS.includes(search.room) ? search.room : void 0;
	const core = APP_CORES.includes(search.core) ? search.core : void 0;
	return {
		...room ? { room } : {},
		...core ? { core } : {}
	};
}
function roomFromParam(room) {
	if (!room) return void 0;
	if (room === "library") return "sidebar";
	return room;
}
function paramFromRoom(room) {
	if (room === "stage") return void 0;
	if (room === "sidebar") return "library";
	return room;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-9dS_U4af.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DB = "cinevo-fs";
var STORE = "handles";
var THUMBS = "thumbs";
async function permission(handle, request) {
	const h = handle;
	if ((h.queryPermission ? await h.queryPermission({ mode: "read" }) : "granted") === "granted") return true;
	if (!request || !h.requestPermission) return false;
	return await h.requestPermission({ mode: "read" }) === "granted";
}
function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB, 2);
		req.onupgradeneeded = () => {
			if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
			if (!req.result.objectStoreNames.contains(THUMBS)) req.result.createObjectStore(THUMBS);
		};
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}
async function saveFolderHandle(id, handle, folderName) {
	try {
		const db = await openDb();
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE, "readwrite");
			tx.objectStore(STORE).put({
				handle,
				folderName
			}, id);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
	} catch {}
}
async function saveThumb(id, dataUrl) {
	try {
		const db = await openDb();
		await new Promise((resolve, reject) => {
			const tx = db.transaction(THUMBS, "readwrite");
			tx.objectStore(THUMBS).put(dataUrl, id);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
	} catch {}
}
async function loadThumbs(ids) {
	const out = {};
	if (!ids.length) return out;
	try {
		const db = await openDb();
		await new Promise((resolve, reject) => {
			const tx = db.transaction(THUMBS, "readonly");
			const store = tx.objectStore(THUMBS);
			let left = ids.length;
			for (const id of ids) {
				const req = store.get(id);
				req.onsuccess = () => {
					if (typeof req.result === "string" && req.result.startsWith("data:image/")) out[id] = req.result;
					left -= 1;
					if (!left) resolve();
				};
				req.onerror = () => reject(req.error);
			}
			tx.onerror = () => reject(tx.error);
		});
	} catch {}
	return out;
}
async function deleteFolderHandle(id) {
	try {
		const db = await openDb();
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE, "readwrite");
			tx.objectStore(STORE).delete(id);
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
	} catch {}
}
async function clearFolderHandles() {
	try {
		const db = await openDb();
		await new Promise((resolve, reject) => {
			const tx = db.transaction(STORE, "readwrite");
			tx.objectStore(STORE).clear();
			tx.oncomplete = () => resolve();
			tx.onerror = () => reject(tx.error);
		});
	} catch {}
}
async function walk(dir, out, depth = 0) {
	if (depth > 6 || out.length > 80) return;
	for await (const entry of dir.values()) {
		if (out.length >= 80) return;
		if (entry.kind === "file") {
			const file = await entry.getFile();
			if (isVideoFile(file.name)) out.push(file);
		} else if (entry.kind === "directory") await walk(entry, out, depth + 1);
	}
}
function folderTitleId(folderName, file) {
	let h = 0;
	const s = `${folderName}:${file.name}:${file.size}`;
	for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
	return `folder-${h.toString(16)}`;
}
async function loadAll() {
	const db = await openDb();
	return new Promise((resolve, reject) => {
		const req = db.transaction(STORE, "readonly").objectStore(STORE).getAll();
		req.onsuccess = () => resolve(req.result || []);
		req.onerror = () => reject(req.error);
	});
}
async function restoreFolderBlobs() {
	if (typeof indexedDB === "undefined") return 0;
	try {
		const records = await loadAll();
		let n = 0;
		for (const rec of records) {
			if (!rec?.handle) continue;
			if (!await permission(rec.handle, false)) continue;
			const files = [];
			await walk(rec.handle, files);
			for (const file of files) {
				rememberBlob(folderTitleId(rec.folderName, file), file);
				n += 1;
			}
		}
		return n;
	} catch {
		return 0;
	}
}
async function reconnectFolders() {
	if (typeof indexedDB === "undefined") return 0;
	try {
		const records = await loadAll();
		let n = 0;
		for (const rec of records) {
			if (!rec?.handle) continue;
			if (!await permission(rec.handle, true)) continue;
			const files = [];
			await walk(rec.handle, files);
			for (const file of files) {
				rememberBlob(folderTitleId(rec.folderName, file), file);
				n += 1;
			}
		}
		return n;
	} catch {
		return 0;
	}
}
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var CATALOG = [];
function genresIn(pool) {
	const names = pool.flatMap((t) => t.genres ?? []).map((g) => typeof g === "string" ? g.trim() : "").filter((g) => g.length > 0 && g !== "All");
	return ["All", ...Array.from(new Set(names)).sort((a, b) => a.localeCompare(b))];
}
function similarTo(title, pool = CATALOG) {
	const mine = title.genres ?? [];
	return pool.filter((t) => t.id !== title.id && (t.genres ?? []).some((g) => mine.includes(g))).slice(0, 6);
}
function filterCatalog(opts) {
	const q = (opts.query ?? "").trim().toLowerCase();
	return (opts.pool ?? CATALOG).filter((t) => {
		const cast = t.cast ?? [];
		const genres = t.genres ?? [];
		const hay = `${t.title} ${t.synopsis} ${t.genre} ${cast.join(" ")} ${t.director}`.toLowerCase();
		if (q && !hay.includes(q)) return false;
		if (opts.kind && opts.kind !== "all" && t.kind !== opts.kind) return false;
		if (opts.genre && opts.genre !== "All" && !genres.includes(opts.genre)) return false;
		if (opts.minRating && t.rating < opts.minRating) return false;
		return true;
	});
}
function recentlyAdded(n = 8, pool = CATALOG) {
	return [...pool].sort((a, b) => b.addedAt.localeCompare(a.addedAt)).slice(0, n);
}
var MOODS = [
	{
		id: "all",
		label: "All",
		hint: "Find your next scene.",
		genres: []
	},
	{
		id: "neon",
		label: "Neon",
		hint: "Stay with the shadows.",
		genres: [
			"Action",
			"Noir",
			"Crime",
			"Cyberpunk",
			"Thriller"
		]
	},
	{
		id: "quiet",
		label: "Quiet",
		hint: "Settle into something human.",
		genres: [
			"Drama",
			"Romance",
			"Mystery"
		]
	},
	{
		id: "far",
		label: "Far",
		hint: "Leave the city for a while.",
		genres: ["Sci-Fi", "Adventure"]
	},
	{
		id: "warm",
		label: "Warm",
		hint: "Same tokens. Warmer grade.",
		genres: [
			"Nostalgia",
			"History",
			"Western",
			"Music"
		]
	}
];
function byMood(mood, pool = CATALOG) {
	if (mood === "all") return pool;
	const genres = MOODS.find((m) => m.id === mood)?.genres ?? [];
	const hits = pool.filter((t) => (t.genres ?? []).some((g) => genres.includes(g)) || genres.includes(t.genre));
	return hits.length ? hits : pool;
}
function pickFeatured(opts) {
	const all = opts.pool ?? CATALOG;
	if (!all.length) return void 0;
	const pool = byMood(opts.mood, all);
	for (const id of opts.tonight) {
		const hit = pool.find((t) => t.id === id) ?? all.find((t) => t.id === id);
		if (hit) return hit;
	}
	const cont = pool.find((t) => {
		const p = opts.progress[t.id];
		return p != null && p > 0 && p < 100;
	});
	if (cont) return cont;
	return [...pool].sort((a, b) => b.rating - a.rating)[0] ?? all[0];
}
var DEFAULT_DASHBOARD_WIDGETS = [
	"playlist",
	"continue",
	"suggestions",
	"my-list"
];
function sanitizeDashboardWidgets(value) {
	if (!Array.isArray(value)) return [...DEFAULT_DASHBOARD_WIDGETS];
	const valid = value.filter((item) => DEFAULT_DASHBOARD_WIDGETS.includes(item));
	return Array.from(new Set(valid)).concat(DEFAULT_DASHBOARD_WIDGETS.filter((item) => !valid.includes(item)));
}
var DEFAULT_PREFS = {
	nightMode: true,
	zenMode: false,
	focusMode: false,
	audioHints: true,
	theme: "pulse",
	dashboardWidgets: [...DEFAULT_DASHBOARD_WIDGETS],
	introSkip: 0,
	subtitleOffset: 0,
	libraryView: "grid",
	librarySort: "title"
};
var FRESH = {
	progress: {},
	favorites: [],
	invites: [],
	notices: [],
	selectedId: null,
	playingId: null,
	playing: false,
	tonight: [],
	notes: [],
	party: null,
	mood: "all",
	sources: [],
	localTitles: [],
	remoteTitles: [],
	sourceFilter: "all",
	plexToken: "",
	plexUser: "",
	plexServers: []
};
function catalogPool(get) {
	return [...get().localTitles, ...get().remoteTitles];
}
function inviteToken() {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID().replace(/-/g, "").slice(0, 22);
	return `t${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}
function hydrateInvites(raw) {
	if (!Array.isArray(raw)) return [];
	return raw.map((item) => {
		const row = item;
		const createdAt = Number(row.createdAt) || Date.now();
		const days = Number(row.days) || 7;
		return {
			id: String(row.id || `inv-${createdAt}`),
			token: String(row.token || inviteToken()),
			name: String(row.name || "Friend"),
			days,
			status: row.status === "paused" || row.status === "revoked" ? row.status : "active",
			createdAt,
			expiresAt: Number(row.expiresAt) || createdAt + days * 864e5,
			libraries: Array.isArray(row.libraries) ? row.libraries.map(String) : []
		};
	});
}
function clampNumber(value, min, max, fallback) {
	const n = typeof value === "number" ? value : Number(value);
	if (!Number.isFinite(n)) return fallback;
	return Math.min(max, Math.max(min, n));
}
var useCinevo = create()(persist((set, get) => ({
	room: "stage",
	searchOpen: false,
	settingsOpen: false,
	coreOpen: false,
	coreTab: "libraries",
	noticesOpen: false,
	hydrated: false,
	toast: "",
	prefs: DEFAULT_PREFS,
	libraries: [],
	aiConsent: false,
	nodeUrl: "http://127.0.0.1:48184",
	nodeToken: "",
	nodeDevice: "",
	plexClientId: "",
	...FRESH,
	activeSourceId: "all",
	collections: [],
	markers: [],
	plays: [],
	patches: {},
	setRoom: (room) => set({
		room,
		selectedId: null
	}),
	openTitle: (id) => set({ selectedId: id }),
	closeTitle: () => set({ selectedId: null }),
	play: (id) => {
		set({
			playingId: id,
			playing: true,
			selectedId: null,
			progress: (get().progress[id] ?? 0) >= 100 ? {
				...get().progress,
				[id]: 0
			} : get().progress,
			plays: [{
				id: `play-${Date.now()}`,
				titleId: id,
				at: Date.now()
			}, ...get().plays].slice(0, 200)
		});
	},
	stopPlay: () => set({
		playingId: null,
		playing: false
	}),
	togglePlay: () => {
		const id = get().playingId;
		if (id && (get().progress[id] ?? 0) >= 100) {
			get().play(id);
			return;
		}
		set({ playing: !get().playing });
	},
	setProgress: (id, value) => set({ progress: {
		...get().progress,
		[id]: Math.max(0, Math.min(100, value))
	} }),
	toggleFavorite: (id) => {
		const has = get().favorites.includes(id);
		set({ favorites: has ? get().favorites.filter((x) => x !== id) : [...get().favorites, id] });
		get().flash(has ? "Removed from My List" : "Saved to My List");
	},
	addTonight: (id) => {
		if (get().tonight.includes(id)) {
			get().flash("Already in tonight");
			return;
		}
		if (get().tonight.length >= 8) {
			get().flash("Tonight is full");
			return;
		}
		set({ tonight: [...get().tonight, id] });
		get().flash("Queued for tonight");
	},
	removeTonight: (id) => set({ tonight: get().tonight.filter((x) => x !== id) }),
	addNote: (titleId, body) => {
		const text = body.trim().slice(0, 280);
		if (!text) return;
		set({ notes: [{
			id: `n-${Date.now()}`,
			titleId,
			body: text,
			createdAt: Date.now()
		}, ...get().notes].slice(0, 40) });
		get().flash("Note saved");
	},
	removeNote: (id) => set({ notes: get().notes.filter((n) => n.id !== id) }),
	startParty: (titleId, withName) => {
		set({ party: {
			titleId,
			with: withName.trim()
		} });
		get().play(titleId);
		get().flash(withName.trim() ? `Watching with ${withName.trim()}` : "Private watch started");
	},
	endParty: () => set({ party: null }),
	setMood: (mood) => set({ mood }),
	shufflePlay: () => {
		const pool = byMood(get().mood, catalogPool(get));
		const fresh = pool.filter((t) => {
			const p = get().progress[t.id];
			return p == null || p >= 100;
		});
		const list = fresh.length ? fresh : pool;
		const pick = list[Math.floor(Math.random() * list.length)];
		if (pick) get().play(pick.id);
		else get().flash("Add a library first");
	},
	setSearchOpen: (searchOpen) => set({ searchOpen }),
	setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
	setCoreOpen: (coreOpen, tab) => set({
		coreOpen,
		coreTab: tab ?? get().coreTab
	}),
	setCoreTab: (coreTab) => set({ coreTab }),
	setNoticesOpen: (noticesOpen) => set({ noticesOpen }),
	flash: (toast) => {
		set({ toast });
		window.setTimeout(() => {
			if (get().toast === toast) set({ toast: "" });
		}, 2200);
	},
	notify: (input) => {
		set({ notices: [{
			id: `nt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
			createdAt: Date.now(),
			readAt: null,
			...input
		}, ...get().notices].slice(0, 40) });
	},
	markNoticeRead: (id) => set({ notices: get().notices.map((n) => n.id === id && !n.readAt ? {
		...n,
		readAt: Date.now()
	} : n) }),
	markAllNoticesRead: () => set({ notices: get().notices.map((n) => n.readAt ? n : {
		...n,
		readAt: Date.now()
	}) }),
	dismissNotice: (id) => set({ notices: get().notices.filter((n) => n.id !== id) }),
	clearNotices: () => set({ notices: [] }),
	patchPrefs: (p) => set({ prefs: {
		...get().prefs,
		...p
	} }),
	setTheme: (theme) => {
		set({ prefs: {
			...get().prefs,
			theme
		} });
		if (typeof document !== "undefined") document.documentElement.setAttribute("data-theme", theme);
	},
	setDashboardWidgets: (dashboardWidgets) => set({ prefs: {
		...get().prefs,
		dashboardWidgets: sanitizeDashboardWidgets(dashboardWidgets)
	} }),
	toggleLibrary: (id) => set({
		libraries: get().libraries.map((l) => l.id === id ? {
			...l,
			selected: !l.selected
		} : l),
		sources: get().sources.map((s) => s.id === id ? {
			...s,
			selected: !s.selected
		} : s)
	}),
	addInvite: (name, days) => {
		const createdAt = Date.now();
		const invite = {
			id: `inv-${createdAt}`,
			token: inviteToken(),
			name: name.trim() || "Friend",
			days,
			status: "active",
			createdAt,
			expiresAt: createdAt + days * 864e5,
			libraries: get().sources.filter((s) => s.selected).map((s) => s.id)
		};
		set({ invites: [invite, ...get().invites] });
		get().notify({
			category: "sharing",
			title: "Private invitation created",
			message: `${invite.name} has ${days} days of access to selected libraries.`,
			href: "/app?core=sharing"
		});
		return invite;
	},
	setInviteStatus: (id, status) => {
		const current = get().invites.find((i) => i.id === id);
		set({ invites: get().invites.map((i) => i.id === id ? {
			...i,
			status
		} : i) });
		if (current) get().notify({
			category: "sharing",
			title: status === "revoked" ? "Invitation revoked" : status === "paused" ? "Invitation paused" : "Invitation restored",
			message: `${current.name} is now ${status}.`,
			href: "/app?core=sharing"
		});
	},
	setAiConsent: (aiConsent) => {
		set({ aiConsent });
		get().notify({
			category: "privacy",
			title: aiConsent ? "AI concierge enabled" : "AI concierge disabled",
			message: aiConsent ? "CINEVO may use selected library metadata when you ask." : "Metadata assistance is off until you opt in again.",
			href: "/app?core=ai"
		});
	},
	setNodeUrl: (nodeUrl) => set({ nodeUrl }),
	setNodeSession: (nodeToken, nodeDevice) => set({
		nodeToken,
		nodeDevice
	}),
	clearNodeSession: () => set({
		nodeToken: "",
		nodeDevice: ""
	}),
	setPlexSession: (plexToken, plexUser, plexServers, plexClientId) => set({
		plexToken,
		plexUser,
		plexServers,
		plexClientId
	}),
	setPlexServers: (plexServers) => set({ plexServers }),
	clearPlexSession: () => set({
		plexToken: "",
		plexUser: "",
		plexServers: []
	}),
	addFolderTitles: (titles, source) => {
		const existing = new Set(get().localTitles.map((t) => t.id));
		const next = titles.filter((t) => !existing.has(t.id));
		const sources = get().sources.filter((s) => s.id !== source.id);
		set({
			localTitles: [...next, ...get().localTitles].slice(0, 200),
			sources: [{
				...source,
				count: next.length + get().localTitles.filter((t) => t.sourceLabel === source.name).length
			}, ...sources]
		});
		get().flash(next.length ? `Added ${next.length} titles from ${source.name}` : "No new video files in that folder");
		if (next.length) get().notify({
			category: "library",
			title: "Folder indexed",
			message: `${next.length} titles from ${source.name} are now in CINEVO.`,
			href: "/app?core=libraries"
		});
	},
	addRemoteTitles: (titles, source) => {
		const existing = new Set(get().remoteTitles.map((t) => t.id));
		const next = titles.filter((t) => !existing.has(t.id));
		const merged = [...next, ...get().remoteTitles].slice(0, 300);
		const sources = get().sources.filter((s) => s.id !== source.id);
		const count = merged.filter((t) => t.source === source.kind && (t.sourceLabel === source.name || t.sourceLabel.startsWith(`${source.name.replace(/^@/, "")} ·`))).length || next.length;
		set({
			remoteTitles: merged,
			sources: [{
				...source,
				count: count || next.length
			}, ...sources]
		});
		get().flash(next.length ? `Imported ${next.length} titles from ${source.name}` : "No titles in that section");
		if (next.length) {
			const kindLabel = source.kind === "plex" ? "Plex" : source.kind === "jellyfin" ? "Jellyfin" : source.kind === "shared" ? "Shared" : "Library";
			get().notify({
				category: "library",
				title: `${kindLabel} library imported`,
				message: `${next.length} titles from ${source.name} are ready to browse.`,
				href: "/app?core=libraries"
			});
		}
	},
	removeSource: (id) => {
		const src = get().sources.find((s) => s.id === id);
		const matches = (label) => {
			if (!src) return false;
			if (label === src.name) return true;
			const handle = src.name.replace(/^@/, "");
			return label.startsWith(`${handle} ·`) || label.startsWith(`${src.name} ·`);
		};
		const droppedLocal = get().localTitles.filter((t) => src && t.source === src.kind && matches(t.sourceLabel));
		const localTitles = get().localTitles.filter((t) => !(src && t.source === src.kind && matches(t.sourceLabel)));
		const remoteTitles = get().remoteTitles.filter((t) => !(src && t.source === src.kind && matches(t.sourceLabel)));
		const keep = new Set([...localTitles, ...remoteTitles].map((t) => t.id));
		const sources = get().sources.filter((s) => s.id !== id);
		set({
			sources,
			localTitles,
			remoteTitles,
			sourceFilter: sources.length <= 1 ? "all" : get().sourceFilter,
			activeSourceId: get().activeSourceId === id ? "all" : get().activeSourceId,
			tonight: get().tonight.filter((tid) => keep.has(tid)),
			favorites: get().favorites.filter((tid) => keep.has(tid))
		});
		import("../_libs/_.mjs").then((n) => n.i).then((m) => {
			for (const t of droppedLocal) m.forgetBlob(t.id);
		});
		import("./folder-handles-CD41fTsv.mjs").then((m) => m.deleteFolderHandle(id));
		get().flash("Source removed");
	},
	setSourceFilter: (sourceFilter) => set({ sourceFilter }),
	setActiveSource: (activeSourceId) => set({ activeSourceId }),
	createCollection: (name) => {
		const label = name.trim().slice(0, 40);
		if (!label) return;
		set({ collections: [...get().collections, {
			id: `col-${Date.now()}`,
			name: label,
			titleIds: []
		}] });
		get().flash(`Collection "${label}" created`);
	},
	addToCollection: (collectionId, titleId) => {
		set({ collections: get().collections.map((collection) => collection.id === collectionId && !collection.titleIds.includes(titleId) ? {
			...collection,
			titleIds: [...collection.titleIds, titleId]
		} : collection) });
	},
	removeFromCollection: (collectionId, titleId) => {
		set({ collections: get().collections.map((collection) => collection.id === collectionId ? {
			...collection,
			titleIds: collection.titleIds.filter((id) => id !== titleId)
		} : collection) });
	},
	deleteCollection: (collectionId) => {
		set({ collections: get().collections.filter((collection) => collection.id !== collectionId) });
		get().flash("Collection deleted");
	},
	patchTitle: (id, patch) => {
		set({ patches: {
			...get().patches,
			[id]: {
				...get().patches[id],
				...patch
			}
		} });
		get().flash("Details saved in this house");
	},
	hideTitle: (id) => {
		set({
			localTitles: get().localTitles.filter((title) => title.id !== id),
			remoteTitles: get().remoteTitles.filter((title) => title.id !== id),
			tonight: get().tonight.filter((titleId) => titleId !== id),
			favorites: get().favorites.filter((titleId) => titleId !== id),
			collections: get().collections.map((collection) => ({
				...collection,
				titleIds: collection.titleIds.filter((titleId) => titleId !== id)
			}))
		});
		get().flash("Removed from this house. The file was not deleted.");
	},
	patchArtwork: (items) => {
		const apply = (title) => {
			const patch = items.find((item) => item.id === title.id || item.id === title.path);
			if (!patch) return title;
			return {
				...title,
				poster: patch.poster || title.poster,
				still: patch.still || title.still,
				synopsis: patch.synopsis || title.synopsis,
				year: patch.year || title.year,
				runtime: patch.runtime || title.runtime,
				rating: typeof patch.rating === "number" && patch.rating > 0 ? patch.rating : title.rating,
				genre: patch.genre || title.genre,
				genres: patch.genres?.length ? patch.genres : title.genres,
				cast: patch.cast?.length ? patch.cast : title.cast,
				director: patch.director || title.director
			};
		};
		set({
			localTitles: get().localTitles.map(apply),
			remoteTitles: get().remoteTitles.map(apply)
		});
	},
	addMarker: (titleId, at, label) => {
		if (!Number.isFinite(at)) return;
		set({ markers: [...get().markers, {
			id: `mk-${Date.now()}`,
			titleId,
			at,
			label: label.slice(0, 40)
		}].slice(-80) });
	},
	removeMarker: (id) => set({ markers: get().markers.filter((marker) => marker.id !== id) }),
	clearLocalData: () => {
		set({
			...FRESH,
			libraries: [],
			searchOpen: false,
			coreOpen: false,
			noticesOpen: false,
			nodeToken: "",
			nodeDevice: "",
			plexToken: "",
			plexUser: "",
			plexServers: [],
			activeSourceId: "all",
			collections: [],
			markers: [],
			plays: [],
			patches: {},
			prefs: {
				...get().prefs,
				theme: get().prefs.theme,
				dashboardWidgets: [...DEFAULT_DASHBOARD_WIDGETS]
			}
		});
		try {
			localStorage.removeItem("cinevo-state");
			localStorage.removeItem("cinevo-storage");
		} catch {}
		import("../_libs/_.mjs").then((n) => n.i).then((m) => m.forgetAllBlobs());
		import("./folder-handles-CD41fTsv.mjs").then((m) => m.clearFolderHandles());
		get().flash("Local data cleared");
	}
}), {
	name: "cinevo-local-v4",
	skipHydration: true,
	merge: (persisted, current) => {
		const p = persisted ?? {};
		const theme = p.prefs?.theme && THEMES.some((t) => t.id === p.prefs?.theme) ? p.prefs.theme : "pulse";
		return {
			...current,
			...p,
			tonight: Array.isArray(p.tonight) ? p.tonight : [],
			notes: Array.isArray(p.notes) ? p.notes : [],
			party: p.party ?? null,
			mood: p.mood ?? "all",
			nodeUrl: p.nodeUrl || "http://127.0.0.1:48184",
			nodeToken: p.nodeToken ?? "",
			nodeDevice: p.nodeDevice ?? "",
			plexClientId: p.plexClientId ?? "",
			plexToken: p.plexToken ?? "",
			plexUser: p.plexUser ?? "",
			plexServers: Array.isArray(p.plexServers) ? p.plexServers : [],
			sources: Array.isArray(p.sources) ? p.sources : [],
			invites: hydrateInvites(p.invites),
			notices: Array.isArray(p.notices) ? p.notices : [],
			localTitles: Array.isArray(p.localTitles) ? p.localTitles.map((t) => ({
				...t,
				cast: t.cast ?? [],
				genres: t.genres?.length ? t.genres : ["Home library"],
				poster: t.poster && !t.poster.startsWith("data:") ? t.poster : makePoster(t.title, t.accent || "cyan")
			})) : [],
			remoteTitles: Array.isArray(p.remoteTitles) ? p.remoteTitles.map((t) => ({
				...t,
				cast: t.cast ?? [],
				genres: t.genres?.length ? t.genres : [t.genre || "Library"]
			})) : [],
			sourceFilter: Array.isArray(p.sources) && p.sources.length > 1 && (p.sourceFilter === "folder" || p.sourceFilter === "plex" || p.sourceFilter === "jellyfin" || p.sourceFilter === "shared") ? p.sourceFilter : "all",
			activeSourceId: typeof p.activeSourceId === "string" ? p.activeSourceId : "all",
			collections: Array.isArray(p.collections) ? p.collections : [],
			markers: Array.isArray(p.markers) ? p.markers : [],
			plays: Array.isArray(p.plays) ? p.plays : [],
			patches: p.patches && typeof p.patches === "object" ? p.patches : {},
			room: p.room === "browse" || p.room === "movies" || p.room === "shows" || p.room === "sidebar" || p.room === "tools" ? p.room : "stage",
			prefs: {
				...DEFAULT_PREFS,
				...p.prefs,
				theme,
				dashboardWidgets: sanitizeDashboardWidgets(p.prefs?.dashboardWidgets),
				audioHints: p.prefs?.audioHints ?? true,
				introSkip: clampNumber(p.prefs?.introSkip, 0, 180, 0),
				subtitleOffset: clampNumber(p.prefs?.subtitleOffset, -15, 15, 0),
				libraryView: p.prefs?.libraryView === "list" || p.prefs?.libraryView === "hybrid" ? p.prefs.libraryView : "grid",
				librarySort: p.prefs?.librarySort === "year" || p.prefs?.librarySort === "added" ? p.prefs.librarySort : "title"
			}
		};
	},
	partialize: (s) => ({
		progress: s.progress,
		favorites: s.favorites,
		prefs: s.prefs,
		libraries: s.libraries,
		invites: s.invites,
		notices: s.notices,
		aiConsent: s.aiConsent,
		tonight: s.tonight,
		notes: s.notes,
		party: s.party,
		mood: s.mood,
		nodeUrl: s.nodeUrl,
		nodeToken: s.nodeToken,
		nodeDevice: s.nodeDevice,
		plexClientId: s.plexClientId,
		plexToken: s.plexToken,
		plexUser: s.plexUser,
		plexServers: s.plexServers,
		sources: s.sources,
		localTitles: s.localTitles.map((t) => ({
			...t,
			poster: t.poster?.startsWith("data:") ? "" : t.poster
		})),
		remoteTitles: s.remoteTitles,
		sourceFilter: s.sourceFilter,
		activeSourceId: s.activeSourceId,
		collections: s.collections,
		markers: s.markers,
		plays: s.plays,
		patches: s.patches,
		room: s.room
	})
}));
function titleById(id) {
	if (!id) return void 0;
	const s = useCinevo.getState();
	return s.localTitles.find((t) => t.id === id) ?? s.remoteTitles.find((t) => t.id === id);
}
function libraryPool() {
	const s = useCinevo.getState();
	return [...s.localTitles, ...s.remoteTitles];
}
var STALE_KEYS = [
	"cinevo-state",
	"cinevo-storage",
	"cinevo-local-v2",
	"cinevo-local-v3"
];
function Rehydrate() {
	(0, import_react.useEffect)(() => {
		try {
			for (const key of STALE_KEYS) localStorage.removeItem(key);
		} catch {}
		Promise.resolve(useCinevo.persist.rehydrate()).then(async () => {
			const theme = useCinevo.getState().prefs.theme || "noir";
			document.documentElement.setAttribute("data-theme", theme);
			if (await restoreFolderBlobs()) {
				const s = useCinevo.getState();
				useCinevo.setState({ localTitles: [...s.localTitles] });
			}
		}).finally(() => {
			useCinevo.setState({ hydrated: true });
		});
	}, []);
	return null;
}
var CONTROL = /[\x00-\x1f]/g;
function normalizeCode(input) {
	const raw = String(input ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
	return raw.length === 6 ? raw : "";
}
function formatCode(code) {
	const clean = normalizeCode(code);
	if (!clean) return "";
	return `${clean.slice(0, 3)}-${clean.slice(3)}`;
}
function makeRemoteCode() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	const bytes = /* @__PURE__ */ new Uint8Array(6);
	crypto.getRandomValues(bytes);
	return [...bytes].map((byte) => alphabet[byte % 32]).join("");
}
function clip(value, max) {
	return String(value ?? "").replace(CONTROL, " ").replace(/\s+/g, " ").trim().slice(0, max);
}
function clamp(value, min, max, fallback) {
	const n = Number(value);
	if (!Number.isFinite(n)) return fallback;
	return Math.min(max, Math.max(min, n));
}
function sanitizeNow(input) {
	const row = input && typeof input === "object" ? input : {};
	const titles = [];
	if (Array.isArray(row.titles)) for (const item of row.titles) {
		if (titles.length >= 24) break;
		const entry = item && typeof item === "object" ? item : {};
		const id = clip(entry.id, 160);
		const name = clip(entry.name, 80);
		if (!id || !name) continue;
		titles.push({
			id,
			name
		});
	}
	return {
		title: clip(row.title, 120),
		detail: clip(row.detail, 80),
		playing: row.playing === true,
		position: clamp(row.position, 0, 100, 0),
		volume: clamp(row.volume, 0, 1, 1),
		titles
	};
}
function sanitizeCommand(input) {
	const row = input && typeof input === "object" ? input : {};
	const type = clip(row.type, 20);
	const id = clip(row.id, 40) || "cmd";
	if (type === "toggle" || type === "play" || type === "pause" || type === "stop") return {
		id,
		type
	};
	if (type === "seek") {
		const command = {
			id,
			type: "seek"
		};
		if (row.to !== void 0) command.to = clamp(row.to, 0, 100, 0);
		if (row.by !== void 0) command.by = clamp(row.by, -60, 60, 0);
		if (command.to === void 0 && command.by === void 0) return null;
		return command;
	}
	if (type === "volume") return {
		id,
		type: "volume",
		value: clamp(row.value, 0, 1, 1)
	};
	if (type === "playTitle") {
		const titleId = clip(row.titleId, 160);
		if (!titleId) return null;
		return {
			id,
			type: "playTitle",
			titleId
		};
	}
	return null;
}
function parseCommandList(value) {
	const list = Array.isArray(value) ? value : [];
	const out = [];
	for (const item of list) {
		const command = sanitizeCommand(item);
		if (command) out.push(command);
		if (out.length >= 24) break;
	}
	return out;
}
var HOUSE_CODE = "cinevo-house-code";
function readHouseCode() {
	if (typeof window === "undefined") return "";
	try {
		return normalizeCode(sessionStorage.getItem(HOUSE_CODE));
	} catch {
		return "";
	}
}
function writeHouseCode(code) {
	const clean = normalizeCode(code);
	try {
		if (clean) sessionStorage.setItem(HOUSE_CODE, clean);
		else sessionStorage.removeItem(HOUSE_CODE);
	} catch {}
	window.dispatchEvent(new CustomEvent("cinevo-house-code", { detail: clean }));
}
function formatHouseCode(code) {
	return formatCode(code);
}
function headers() {
	const token = getBearerToken();
	return {
		"content-type": "application/json",
		...token ? { Authorization: `Bearer ${token}` } : {}
	};
}
async function post(body) {
	const data = await (await fetch("/api/remote", {
		method: "POST",
		headers: headers(),
		credentials: "same-origin",
		body: JSON.stringify(body)
	})).json().catch(() => ({}));
	return {
		ok: Boolean(data.ok),
		error: data.error,
		code: data.code,
		commands: data.commands
	};
}
function openHouseRemote(code = readHouseCode()) {
	return post({
		action: "open",
		code
	});
}
function rotateHouseRemote() {
	return post({ action: "rotate" });
}
function closeHouseRemote(code) {
	return post({
		action: "close",
		code
	});
}
function syncHouseRemote(code, now) {
	return post({
		action: "sync",
		code,
		now
	});
}
async function sendRemoteCommand(code, command) {
	const data = await (await fetch("/api/remote", {
		method: "POST",
		headers: { "content-type": "application/json" },
		credentials: "same-origin",
		body: JSON.stringify({
			action: "command",
			code,
			command: {
				...command,
				id: `p-${Date.now()}`
			}
		})
	})).json().catch(() => ({}));
	return {
		ok: Boolean(data.ok),
		error: data.error
	};
}
async function readPhoneRemote(code) {
	const data = await (await fetch(`/api/remote?code=${encodeURIComponent(normalizeCode(code))}`, { cache: "no-store" })).json().catch(() => ({}));
	return {
		ok: Boolean(data.ok),
		error: data.error,
		now: data.now,
		ageMs: data.ageMs
	};
}
var REMOTE_APK = "/installers/CINEVO-Remote.apk";
function HouseRemote() {
	const [code, setCode] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const read = () => setCode(readHouseCode());
		read();
		window.addEventListener("cinevo-house-code", read);
		return () => window.removeEventListener("cinevo-house-code", read);
	}, []);
	const rotate = async () => {
		setBusy(true);
		setError("");
		try {
			const res = await rotateHouseRemote();
			if (!res.ok || !res.code) {
				setError(res.error || "Could not start a new code.");
				return;
			}
			writeHouseCode(res.code);
		} catch {
			setError("Could not reach CINEVO.");
		} finally {
			setBusy(false);
		}
	};
	const stop = async () => {
		setBusy(true);
		if (code) await closeHouseRemote(code).catch(() => void 0);
		writeHouseCode("");
		setBusy(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tool-card remote-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-ui text-xs font-semibold tracking-[0.12em] text-cine-cyan",
				children: "PHONE REMOTE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Control this house" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Open the remote on a phone, enter this code, and it can play, pause, and seek titles already in this library. Playback stays on this screen. The code is the key — rotate it if someone else had it." }),
			code ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "remote-code",
				"aria-live": "polite",
				children: formatHouseCode(code)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "tool-empty",
				children: "The remote starts when this house is open. Refresh if a code does not appear."
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-cine-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "remote-card__actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "house-btn",
						disabled: busy,
						onClick: () => void rotate(),
						children: "New code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "house-btn house-btn--ghost",
						disabled: busy || !code,
						onClick: () => void stop(),
						children: "Stop remote"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "house-btn house-btn--ghost",
						href: "/remote",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { size: 16 }), " Open remote"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "house-btn house-btn--ghost",
						href: REMOTE_APK,
						download: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }), " Android APK"]
					})
				]
			})
		]
	});
}
var deferred = null;
function rememberInstallPrompt(event) {
	deferred = event;
	window.dispatchEvent(new Event("cinevo-install"));
}
function InstallCinevo({ compact = false }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [installed, setInstalled] = (0, import_react.useState)(false);
	const [ios, setIos] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
		setInstalled(standalone);
		setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
		const sync = () => setReady(Boolean(deferred));
		sync();
		window.addEventListener("cinevo-install", sync);
		return () => window.removeEventListener("cinevo-install", sync);
	}, []);
	if (installed) return null;
	const install = async () => {
		if (!deferred) return;
		await deferred.prompt();
		await deferred.userChoice.catch(() => void 0);
		deferred = null;
		setReady(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: compact ? "install-note" : "tool-card remote-card",
		children: [
			!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-ui text-xs font-semibold tracking-[0.12em] text-cine-cyan",
				children: "MOBILE APP"
			}) : null,
			!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Add CINEVO to this phone" }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: ios ? "In Safari, tap Share, then Add to Home Screen. CINEVO opens full screen, without the browser bar." : ready ? "Install the house on this device. It uses the same sign-in and the library you already imported." : "In Chrome or Edge, use the browser menu and choose Install app or Add to Home Screen." }),
			ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "house-btn",
				onClick: () => void install(),
				children: "Install app"
			}) : null
		]
	});
}
function Pwa() {
	const [dismissed, setDismissed] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (!("serviceWorker" in navigator)) return;
		navigator.serviceWorker.register("/sw.js").catch(() => void 0);
	}, []);
	(0, import_react.useEffect)(() => {
		try {
			setDismissed(sessionStorage.getItem("cinevo-install-hide") === "1");
		} catch {
			setDismissed(false);
		}
		const onPrompt = (event) => {
			event.preventDefault();
			rememberInstallPrompt(event);
		};
		window.addEventListener("beforeinstallprompt", onPrompt);
		return () => window.removeEventListener("beforeinstallprompt", onPrompt);
	}, []);
	if (dismissed) return null;
	if (window.location.pathname !== "/") return null;
	if (window.matchMedia("(min-width: 900px)").matches) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "install-bar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallCinevo, { compact: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "install-bar__close",
			"aria-label": "Dismiss install hint",
			onClick: () => {
				try {
					sessionStorage.setItem("cinevo-install-hide", "1");
				} catch {}
				setDismissed(true);
			},
			children: "Not now"
		})]
	});
}
var styles_default = "/assets/styles-C4gY220i.css";
var APP_NAME = "CINEVO";
var fetchSessionUser = createServerFn({ method: "GET" }).handler(createSsrRpc("2c4985e96c199268f7f639534cb5e8e31d6b19d43286bf77416413db60ffde26"));
var Route$14 = createRootRoute({
	beforeLoad: async () => ({ sessionUser: await fetchSessionUser() }),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: `${APP_NAME} — Your media. Your moment.` },
			{
				name: "theme-color",
				content: "#050505"
			},
			{
				name: "description",
				content: "CINEVO — Cinema, reinvented. Your library. No ads. No subscriptions."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "apple-touch-icon",
				href: "/app-icon.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..700;1,14..32,400..600&family=JetBrains+Mono:wght@400;500;600&family=Montserrat:wght@600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-cine-bg text-cine-text antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rehydrate, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pwa, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$9 = () => import("./routes-Cru_rjqm.mjs");
var Route$13 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./app-Bm80k9Ff.mjs");
var Route$12 = createFileRoute("/app")({
	validateSearch: (search) => appDestination(search),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./connect-Cqqt78s6.mjs");
var Route$11 = createFileRoute("/connect")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./help-BPcg0enI.mjs");
var Route$10 = createFileRoute("/help")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./login-S3CDzwBE.mjs");
var Route$9 = createFileRoute("/login")({
	validateSearch: (search) => ({
		mode: search.mode === "up" ? "up" : "in",
		...appDestination(search)
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./node-8d9LWbwL.mjs");
var Route$8 = createFileRoute("/node")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./remote-BhjHuCLh.mjs");
var Route$7 = createFileRoute("/remote")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [
		{ title: "CINEVO Remote" },
		{
			name: "description",
			content: "Control the CINEVO house that is open on your screen."
		},
		{
			name: "theme-color",
			content: "#050505"
		}
	] })
});
function asJson(value) {
	if (typeof value === "string") try {
		return JSON.parse(value);
	} catch {
		return null;
	}
	return value;
}
async function openRemote(userId, preferred) {
	const sql = await getSql();
	await sql`delete from cinevo_remotes where expires_at < now()`;
	const wanted = normalizeCode(preferred);
	if (wanted) {
		const row = (await sql`
      select code, expires_at from cinevo_remotes
      where code = ${wanted} and user_id = ${userId} and expires_at > now()
    `)[0];
		if (row) return {
			code: row.code,
			expiresAt: new Date(row.expires_at).toISOString()
		};
	}
	await sql`delete from cinevo_remotes where user_id = ${userId}`;
	const code = makeRemoteCode();
	const rows = await sql`
    insert into cinevo_remotes (code, user_id, expires_at)
    values (${code}, ${userId}, now() + interval '12 hours')
    returning expires_at
  `;
	return {
		code,
		expiresAt: new Date(rows[0].expires_at).toISOString()
	};
}
async function closeRemote(userId, code) {
	const sql = await getSql();
	const clean = normalizeCode(code);
	if (!clean) return;
	await sql`delete from cinevo_remotes where code = ${clean} and user_id = ${userId}`;
}
async function syncRemote(userId, code, now) {
	const sql = await getSql();
	const clean = normalizeCode(code);
	if (!clean) return [];
	return parseCommandList(asJson((await sql`
    with snap as (
      select queue_json from cinevo_remotes
      where code = ${clean} and user_id = ${userId} and expires_at > now()
    ),
    upd as (
      update cinevo_remotes
      set now_json = ${JSON.stringify({
		...sanitizeNow(now),
		updatedAt: Date.now()
	})}::jsonb,
          queue_json = '[]'::jsonb,
          expires_at = now() + interval '12 hours'
      where code = ${clean} and user_id = ${userId} and expires_at > now()
      returning code
    )
    select queue_json from snap
  `)[0]?.queue_json));
}
async function pushRemoteCommand(code, command) {
	const clean = normalizeCode(code);
	const safe = sanitizeCommand(command);
	if (!clean || !safe) return false;
	const rows = await (await getSql())`
    update cinevo_remotes
    set queue_json = queue_json || ${JSON.stringify(safe)}::jsonb
    where code = ${clean} and expires_at > now() and jsonb_array_length(queue_json) < 24
    returning code
  `;
	return Boolean(rows[0]);
}
async function readRemote(code) {
	const clean = normalizeCode(code);
	if (!clean) return null;
	const row = (await (await getSql())`
    select now_json from cinevo_remotes
    where code = ${clean} and expires_at > now()
  `)[0];
	if (!row) return null;
	const raw = asJson(row.now_json);
	const updatedAt = Number((raw && typeof raw === "object" ? raw : {}).updatedAt) || 0;
	return {
		now: sanitizeNow(raw),
		ageMs: updatedAt ? Math.max(0, Date.now() - updatedAt) : 864e5
	};
}
function json(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "no-store"
		}
	});
}
async function userId(request) {
	const header = request.headers.get("authorization") || "";
	const bearer = header.toLowerCase().startsWith("bearer ") ? header.slice(7).trim() : void 0;
	return requireUserId(bearer);
}
var Route$6 = createFileRoute("/api/remote")({ server: { handlers: {
	GET: async ({ request }) => {
		const code = normalizeCode(new URL(request.url).searchParams.get("code"));
		if (!code) return json({
			ok: false,
			error: "Enter the six-character code from the house."
		}, 400);
		const row = await readRemote(code);
		if (!row) return json({
			ok: false,
			error: "That code is not active. Open CINEVO on the house and start a new one."
		}, 404);
		return json({
			ok: true,
			now: row.now,
			ageMs: row.ageMs
		});
	},
	POST: async ({ request }) => {
		let body = {};
		try {
			const text = await request.text();
			if (text.length > 12e3) return json({
				ok: false,
				error: "That update is too large."
			}, 413);
			body = text ? JSON.parse(text) : {};
		} catch {
			return json({
				ok: false,
				error: "CINEVO could not read that request."
			}, 400);
		}
		const action = String(body.action || "");
		try {
			if (action === "open" || action === "rotate" || action === "close") {
				const id = await userId(request);
				if (action === "close") {
					await closeRemote(id, String(body.code || ""));
					return json({ ok: true });
				}
				return json({
					ok: true,
					...await openRemote(id, action === "open" ? String(body.code || "") : "")
				});
			}
			if (action === "sync") return json({
				ok: true,
				commands: await syncRemote(await userId(request), String(body.code || ""), sanitizeNow(body.now))
			});
			if (action === "command") {
				const command = sanitizeCommand(body.command);
				if (!command) return json({
					ok: false,
					error: "That is not a playback control."
				}, 400);
				if (!await pushRemoteCommand(String(body.code || ""), command)) return json({
					ok: false,
					error: "The house is not accepting that code."
				}, 404);
				return json({ ok: true });
			}
			return json({
				ok: false,
				error: "Unknown remote action."
			}, 400);
		} catch (error) {
			if (error instanceof UnauthorizedError) return json({
				ok: false,
				error: "Sign in on the house first."
			}, 401);
			return json({
				ok: false,
				error: "The remote could not reach the house."
			}, 500);
		}
	}
} } });
var $$splitComponentImporter$2 = () => import("./legal.privacy-ByxeaT1k.mjs");
var Route$5 = createFileRoute("/legal/privacy")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./legal.terms-temGHg96.mjs");
var Route$4 = createFileRoute("/legal/terms")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./s._token-NhWT77rj.mjs");
var Route$3 = createFileRoute("/s/$token")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route$2 = createFileRoute("/api/art/$ticket")({ server: { handlers: { GET: async ({ request, params }) => {
	const path = safeArtPath(new URL(request.url).searchParams.get("path") || "");
	if (!path) return new Response("No artwork", { status: 404 });
	const ticket = await loadTicket(params.ticket);
	if (!ticket) return new Response("Artwork expired", { status: 410 });
	const base = ticket.url.replace(/\/$/, "");
	let upstream;
	try {
		upstream = await fetch(`${base}${path}`, {
			headers: ticket.headers,
			redirect: "follow",
			signal: AbortSignal.timeout(12e3)
		});
	} catch {
		return new Response("Artwork unavailable", { status: 502 });
	}
	const type = upstream.headers.get("content-type") || "";
	if (!upstream.ok || type && !type.startsWith("image/")) return new Response("Artwork unavailable", { status: 502 });
	const out = new Headers();
	if (type) out.set("Content-Type", type);
	const length = upstream.headers.get("content-length");
	if (length) out.set("Content-Length", length);
	out.set("Cache-Control", "private, max-age=86400");
	return new Response(upstream.body, {
		status: 200,
		headers: out
	});
} } } });
var Route$1 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
function isVideoResponse(status, type) {
	if (status !== 200 && status !== 206) return false;
	if (!type) return true;
	return !/xml|html|json|text\/plain/i.test(type);
}
function upstreamHeaders(ticketHeaders, range) {
	const headers = new Headers(ticketHeaders);
	headers.set("Accept-Encoding", "identity");
	if (range) headers.set("Range", range);
	return headers;
}
function passHeaders(upstream, download) {
	const out = new Headers();
	for (const key of [
		"content-type",
		"content-length",
		"content-range",
		"accept-ranges",
		"content-disposition"
	]) {
		const value = upstream.headers.get(key);
		if (value) out.set(key, value);
	}
	if (!out.has("Accept-Ranges")) out.set("Accept-Ranges", "bytes");
	if (!out.has("Content-Type")) out.set("Content-Type", "video/mp4");
	out.set("Cache-Control", "private, no-transform, max-age=7200");
	if (download) out.set("Content-Disposition", "attachment; filename=\"cinevo-original.mp4\"");
	return out;
}
var Route = createFileRoute("/api/stream/$ticket")({ server: { handlers: {
	GET: async ({ request, params }) => {
		const ticket = await loadTicket(params.ticket);
		if (!ticket) return new Response("Playback expired", { status: 410 });
		const download = new URL(request.url).searchParams.get("download") === "1";
		const range = request.headers.get("range") || "";
		let upstream;
		try {
			upstream = await fetch(ticket.url, {
				headers: upstreamHeaders(ticket.headers, range),
				redirect: "follow"
			});
		} catch {
			return new Response("CINEVO could not reach that media server.", { status: 502 });
		}
		const type = upstream.headers.get("content-type") || "";
		if (!isVideoResponse(upstream.status, type)) return new Response("The media server did not return a video stream.", { status: 502 });
		return new Response(upstream.body, {
			status: upstream.status,
			headers: passHeaders(upstream, download)
		});
	},
	HEAD: async ({ request, params }) => {
		const ticket = await loadTicket(params.ticket);
		if (!ticket) return new Response(null, { status: 410 });
		const range = request.headers.get("range") || "";
		try {
			let upstream = await fetch(ticket.url, {
				method: "HEAD",
				headers: upstreamHeaders(ticket.headers, range),
				redirect: "follow"
			});
			if (upstream.status === 405 || upstream.status === 501) {
				upstream = await fetch(ticket.url, {
					method: "GET",
					headers: upstreamHeaders(ticket.headers, range || "bytes=0-1"),
					redirect: "follow"
				});
				await upstream.body?.cancel();
			}
			if (upstream.status !== 200 && upstream.status !== 206) return new Response(null, { status: 502 });
			return new Response(null, {
				status: upstream.status,
				headers: passHeaders(upstream, false)
			});
		} catch {
			return new Response(null, { status: 502 });
		}
	}
} } });
var rootRouteChildren = {
	IndexRoute: Route$13.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$14
	}),
	AppRoute: Route$12.update({
		id: "/app",
		path: "/app",
		getParentRoute: () => Route$14
	}),
	ConnectRoute: Route$11.update({
		id: "/connect",
		path: "/connect",
		getParentRoute: () => Route$14
	}),
	HelpRoute: Route$10.update({
		id: "/help",
		path: "/help",
		getParentRoute: () => Route$14
	}),
	LoginRoute: Route$9.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$14
	}),
	NodeRoute: Route$8.update({
		id: "/node",
		path: "/node",
		getParentRoute: () => Route$14
	}),
	RemoteRoute: Route$7.update({
		id: "/remote",
		path: "/remote",
		getParentRoute: () => Route$14
	}),
	ApiRemoteRoute: Route$6.update({
		id: "/api/remote",
		path: "/api/remote",
		getParentRoute: () => Route$14
	}),
	LegalPrivacyRoute: Route$5.update({
		id: "/legal/privacy",
		path: "/legal/privacy",
		getParentRoute: () => Route$14
	}),
	LegalTermsRoute: Route$4.update({
		id: "/legal/terms",
		path: "/legal/terms",
		getParentRoute: () => Route$14
	}),
	STokenRoute: Route$3.update({
		id: "/s/$token",
		path: "/s/$token",
		getParentRoute: () => Route$14
	}),
	ApiArtTicketRoute: Route$2.update({
		id: "/api/art/$ticket",
		path: "/api/art/$ticket",
		getParentRoute: () => Route$14
	}),
	ApiAuthSplatRoute: Route$1.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$14
	}),
	ApiStreamTicketRoute: Route.update({
		id: "/api/stream/$ticket",
		path: "/api/stream/$ticket",
		getParentRoute: () => Route$14
	})
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { paramFromRoom as A, playableCount as B, recentlyAdded as C, deleteFolderHandle as D, clearFolderHandles as E, applySourceFilter as F, remoteTitle as H, isVideoFile as I, library_exports as L, saveThumb as M, roomFromParam as N, loadThumbs as O, THEMES as P, makePoster as R, pickFeatured as S, createSsrRpc as T, scanFileList as U, rememberBlob as V, sourceForTitle as W, useCinevo as _, HouseRemote as a, filterCatalog as b, openHouseRemote as c, sendRemoteCommand as d, syncHouseRemote as f, titleById as g, libraryPool as h, Route$12 as i, saveFolderHandle as j, reconnectFolders as k, readHouseCode as l, normalizeCode as m, Route$3 as n, InstallCinevo as o, writeHouseCode as p, Route$9 as r, REMOTE_APK as s, router_exports as t, readPhoneRemote as u, MOODS as v, similarTo as w, genresIn as x, byMood as y, mediaUrl as z };
