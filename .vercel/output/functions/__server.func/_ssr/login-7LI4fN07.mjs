import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, v as Navigate, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import "./client-COXjRbXB.mjs";
import "./verify.server-A72BAZzm.mjs";
import { r as Route$9 } from "./router-DHGcFAsj.mjs";
import { r as Logo } from "./logo-CUuDfWlp.mjs";
import { u as useCurrentUserState } from "./sharing-CkO7Qny-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-7LI4fN07.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	useNavigate();
	const { mode: initial, room, core } = Route$9.useSearch();
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)(initial);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMode(initial);
	}, [initial]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "login-stage",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "login-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-28 animate-pulse rounded bg-cine-surface" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 h-10 w-56 animate-pulse rounded bg-cine-surface" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-4 w-full animate-pulse rounded bg-cine-surface" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-12 w-full animate-pulse rounded-xl bg-cine-surface" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 h-12 w-full animate-pulse rounded-xl bg-cine-surface" })
			]
		})
	});
	if (!isPending && user && !user.isDevFallback) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/app",
		search: {
			...room ? { room } : {},
			...core ? { core } : {}
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "login-stage",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "login-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mb-8 inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
						size: "lg",
						layout: "stacked"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-ui text-xs font-semibold tracking-[0.12em] text-cine-cyan",
					children: "CINEVO · PRIVATE CINEMA"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-ui text-4xl font-semibold leading-tight tracking-tight",
					children: mode === "up" ? "Create your house." : "Take your seat."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-cine-muted",
					children: "A username lets friends share Plex and Jellyfin catalogs with you. Your dashboard stays private until you sign in."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-sm text-cine-muted",
					children: "Sign-in is disabled."
				})
			]
		})
	});
}
//#endregion
export { Login as component };
