import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-CUuDfWlp.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/** Official CINEVO play-crystal (Logo Kit v1.0). Do not recolor, rotate, or stroke. */
var FACETS = [
	{
		d: "80.32,51.04 80.32,460.96 207.2,260.88",
		fill: "#FF4DA5"
	},
	{
		d: "80.32,460.96 451.2,256 207.2,260.88",
		fill: "#FF9F1C"
	},
	{
		d: "80.32,51.04 295.4304,169.9168 207.2,260.88",
		fill: "#8B2FFF"
	},
	{
		d: "295.4304,169.9168 451.2,256 207.2,260.88",
		fill: "#55CFFF"
	},
	{
		d: "391.8592,223.2064 451.2,256 391.8592,288.7936",
		fill: "#C8F0FF"
	}
];
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 512 512",
		className: cn("brand__gem", className),
		"aria-hidden": "true",
		children: FACETS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: f.d,
			fill: f.fill
		}, f.fill))
	});
}
function Logo({ size = "md", className, tagline = true, layout }) {
	const lockup = layout ?? (size === "lg" || size === "xl" ? "stacked" : "horizontal");
	const showTag = tagline && size !== "sm";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("brand", className),
		"data-size": size,
		"data-layout": lockup,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "CINEVO" }), showTag ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Your media. Your moment." }) : null] })]
	});
}
function BrandKicker({ children = "CINEVO" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "brand-kicker",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })]
	});
}
function BrandWatermark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("brand-watermark", className),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "CINEVO" })]
	});
}
//#endregion
export { cn as a, Mark as i, BrandWatermark as n, Logo as r, BrandKicker as t };
