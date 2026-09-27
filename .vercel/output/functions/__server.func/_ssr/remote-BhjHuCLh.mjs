import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as Download, b as Play, f as SkipForward, p as SkipBack, u as Square, x as Pause } from "../_libs/lucide-react.mjs";
import { d as sendRemoteCommand, m as normalizeCode, o as InstallCinevo, s as REMOTE_APK, u as readPhoneRemote } from "./router-9dS_U4af.mjs";
import { r as Logo } from "./logo-CUuDfWlp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/remote-BhjHuCLh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PHONE_CODE = "cinevo-phone-code";
function RemotePage() {
	const [draft, setDraft] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [now, setNow] = (0, import_react.useState)(null);
	const [ageMs, setAgeMs] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const saved = normalizeCode(localStorage.getItem(PHONE_CODE));
			if (saved) {
				setCode(saved);
				setDraft(saved);
			}
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!code) return;
		let stop = false;
		const tick = async () => {
			const res = await readPhoneRemote(code);
			if (stop) return;
			if (!res.ok || !res.now) {
				setError(res.error || "The house did not answer.");
				setNow(null);
				return;
			}
			setError("");
			setNow(res.now);
			setAgeMs(res.ageMs ?? 0);
		};
		tick();
		const timer = window.setInterval(() => void tick(), 1e3);
		return () => {
			stop = true;
			window.clearInterval(timer);
		};
	}, [code]);
	const join = (event) => {
		event.preventDefault();
		const next = normalizeCode(draft);
		if (!next) {
			setError("Enter the six-character code from the house.");
			return;
		}
		setError("");
		setCode(next);
		try {
			localStorage.setItem(PHONE_CODE, next);
		} catch {}
	};
	const send = async (command) => {
		if (!code) return;
		setPending(true);
		const res = await sendRemoteCommand(code, command);
		setPending(false);
		if (!res.ok) setError(res.error || "The house did not take that.");
		else if (now && (command.type === "play" || command.type === "pause" || command.type === "toggle")) setNow({
			...now,
			playing: command.type === "pause" ? false : command.type === "play" ? true : !now.playing
		});
	};
	const live = Boolean(now && ageMs < 8e3);
	const playing = Boolean(now?.playing);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "remote-app",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "remote-app__bar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
					size: "sm",
					tagline: false
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Remote" })]
			}),
			!code ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "remote-join glass-strong",
				onSubmit: join,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Control the house" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This remote does not play video itself. It talks to the CINEVO screen that is already signed in." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["House code", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: draft,
						autoCapitalize: "characters",
						autoCorrect: "off",
						spellCheck: false,
						inputMode: "text",
						maxLength: 7,
						placeholder: "ABC-DEF",
						onChange: (event) => setDraft(event.target.value.toUpperCase())
					})] }),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "remote-app__error",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "house-btn",
						children: "Connect"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "remote-pad",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "remote-now glass",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: live ? "is-live" : "",
								children: live ? "House is open" : "Waiting for the house"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: now?.title || "Nothing is playing" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: now?.detail || (live ? "Pick a title below, or press play on the house." : "Keep CINEVO open on the screen you want to control.") })
						]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "remote-app__error",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "remote-transport",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Back 10 seconds",
								disabled: !live || pending,
								onClick: () => void send({
									type: "seek",
									by: -10
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "is-main",
								"aria-label": playing ? "Pause" : "Play",
								disabled: !live || pending,
								onClick: () => void send({ type: playing ? "pause" : "play" }),
								children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Forward 10 seconds",
								disabled: !live || pending,
								onClick: () => void send({
									type: "seek",
									by: 10
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, {})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "remote-sliders",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Position", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 100,
							step: 1,
							disabled: !live || !now?.title,
							value: Math.round(now?.position ?? 0),
							onChange: (event) => now && setNow({
								...now,
								position: Number(event.target.value)
							}),
							onPointerUp: (event) => void send({
								type: "seek",
								to: Number(event.target.value)
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Volume", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 100,
							step: 1,
							disabled: !live,
							value: Math.round((now?.volume ?? 1) * 100),
							onChange: (event) => now && setNow({
								...now,
								volume: Number(event.target.value) / 100
							}),
							onPointerUp: (event) => void send({
								type: "volume",
								value: Number(event.target.value) / 100
							})
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "house-btn house-btn--ghost remote-stop",
						disabled: !live || pending,
						onClick: () => void send({ type: "stop" }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { size: 14 }), " Stop"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "remote-titles",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "In this library" }), now?.titles.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: now.titles.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !live || pending,
							onClick: () => void send({
								type: "playTitle",
								titleId: item.id
							}),
							children: item.name
						}) }, item.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No imported titles yet. Add a library on the house, then they show up here." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "remote-forget",
						onClick: () => {
							setCode("");
							setNow(null);
							try {
								localStorage.removeItem(PHONE_CODE);
							} catch {}
						},
						children: "Use a different code"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "remote-app__foot",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallCinevo, { compact: true }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: REMOTE_APK,
						download: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }), " Download the Android remote"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The APK is a sideload remote, not a Play Store app. It opens this page after you enter your CINEVO address." })
				]
			})
		]
	});
}
//#endregion
export { RemotePage as component };
