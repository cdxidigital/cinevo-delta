import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as Download } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/installers-BtI_dh71.js
var import_jsx_runtime = require_jsx_runtime();
async function nodeFetch(base, path, init = {}) {
	const url = `${base.replace(/\/$/, "")}${path}`;
	try {
		const res = await fetch(url, {
			...init,
			headers: {
				"Content-Type": "application/json",
				...init.headers || {}
			}
		});
		return {
			res,
			data: await res.json().catch(() => ({}))
		};
	} catch {
		return {
			res: {
				ok: false,
				status: 0
			},
			data: { error: "CINEVO Node is not reachable." }
		};
	}
}
async function checkNode(base) {
	try {
		const { res, data } = await nodeFetch(base, "/health");
		if (!res.ok) return {
			ok: false,
			error: "CINEVO Node is not responding"
		};
		return {
			ok: true,
			deviceId: String(data.deviceId || ""),
			version: String(data.version || "")
		};
	} catch {
		return {
			ok: false,
			error: "CINEVO Node was not found at this address."
		};
	}
}
async function pairNode(base, code) {
	const { res, data } = await nodeFetch(base, "/v1/pair", {
		method: "POST",
		body: JSON.stringify({ code: code.trim().toUpperCase() })
	});
	if (!res.ok || typeof data.token !== "string") return {
		ok: false,
		error: String(data.error || "Pairing was not accepted")
	};
	return {
		ok: true,
		token: data.token,
		deviceId: String(data.deviceId || "")
	};
}
async function nodeStatus(base, token) {
	const { res, data } = await nodeFetch(base, "/v1/status", { headers: { Authorization: `Bearer ${token}` } });
	if (!res.ok) return {
		ok: false,
		error: String(data.error || "The local pairing session expired")
	};
	return {
		ok: true,
		status: data
	};
}
async function revokeConnection(base, token, connectionId) {
	const { res, data } = await nodeFetch(base, "/v1/connections/revoke", {
		method: "POST",
		headers: { Authorization: `Bearer ${token}` },
		body: JSON.stringify({ connectionId })
	});
	if (!res.ok) return {
		ok: false,
		error: String(data.error || "Could not remove that connection")
	};
	return { ok: true };
}
async function addNodeFolder(base, token, folderPath) {
	const { res, data } = await nodeFetch(base, "/v1/folders", {
		method: "POST",
		headers: { Authorization: `Bearer ${token}` },
		body: JSON.stringify({ path: folderPath })
	});
	if (!res.ok) return {
		ok: false,
		error: String(data.error || "Could not add that folder")
	};
	return {
		ok: true,
		id: String(data.id || ""),
		name: String(data.name || folderPath),
		titles: data.titles || [],
		count: Number(data.count || 0)
	};
}
function nodePlayUrl(base, token, filePath, id) {
	const params = new URLSearchParams({
		token,
		path: filePath
	});
	if (id) params.set("id", id);
	return `${base.replace(/\/$/, "")}/v1/play?${params.toString()}`;
}
var INSTALLERS = [
	{
		id: "win",
		label: "Windows",
		arch: "x64",
		href: "/installers/CINEVO-Node-Windows-x64.zip",
		hint: "Signed · CINEVO icon · loopback exe"
	},
	{
		id: "mac-arm",
		label: "macOS",
		arch: "Apple Silicon",
		href: "/installers/CINEVO-Node-macOS-Apple-Silicon.zip",
		hint: "CINEVO icon · drag to Applications"
	},
	{
		id: "mac-intel",
		label: "macOS",
		arch: "Intel",
		href: "/installers/CINEVO-Node-macOS-Intel.zip",
		hint: "CINEVO icon · drag to Applications"
	}
];
function InstallerCards() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flow-grid flow-grid--install",
		children: INSTALLERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: item.href,
			download: true,
			className: "group rounded-xl border border-cine-border bg-cine-surface p-4 transition hover:border-cine-cyan",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/node-icon.png",
					alt: "",
					className: "size-11 rounded-lg"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-ui text-xs font-semibold uppercase tracking-[0.08em] text-cine-muted",
					children: item.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-ui text-lg font-semibold tracking-tight",
					children: item.arch
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-cine-faint",
					children: item.hint
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-4 inline-flex h-11 items-center gap-2 font-ui text-sm font-bold text-cine-cyan",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }), " Download"]
				})
			]
		}, item.id))
	});
}
//#endregion
export { nodeStatus as a, nodePlayUrl as i, addNodeFolder as n, pairNode as o, checkNode as r, revokeConnection as s, InstallerCards as t };
