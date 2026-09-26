import { _ as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PublicFrame } from "./public-frame-L0H5DzSS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/help-7wO7hY_O.js
var import_jsx_runtime = require_jsx_runtime();
function Help() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicFrame, {
		kicker: "HELP",
		title: "How the house works.",
		lede: "CINEVO only shows media you connect. There is no public catalog and no sample library.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Sign in" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use Google, X, or email and a password. After that, claim a username so friends can share a catalog with you." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Add a library" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Open Library and pick one source at a time: a folder on this computer, Plex, Jellyfin, or CINEVO Node. Folder names stay in this browser. Plex and Jellyfin stay on the server you sign in to." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Watch" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Playback is proxied through CINEVO for servers you own. Choose Grid, List, or Hybrid on Movies, TV, and Library, and sort by title, year, or when it was added." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Share" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Sharing sends a catalog invite, not the files. Open ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app",
					search: { core: "sharing" },
					children: "Sharing"
				}),
				" after you sign in."
			] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Node and the remote" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/node",
				children: "Pair Node"
			}), " on the computer that holds the files. The phone remote controls titles already in this house."] })] })
		]
	});
}
//#endregion
export { Help as component };
