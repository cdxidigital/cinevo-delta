import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as authMiddleware } from "./middleware-R7GbGJlf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/artwork-DxRiSON9.js
var refreshLibraryArt_createServerFn_handler = createServerRpc({
	id: "b670e38f35357464eddb77d89fbbffb163995da493c86e56e6512e69a50dc1d3",
	name: "refreshLibraryArt",
	filename: "src/lib/artwork.ts"
}, (opts) => refreshLibraryArt.__executeServer(opts));
var refreshLibraryArt = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(refreshLibraryArt_createServerFn_handler, async ({ data, context }) => {
	const { refreshArtwork } = await import("./artwork.server-DUwZjqvO.mjs");
	return refreshArtwork({
		...data,
		userId: context.userId
	});
});
//#endregion
export { refreshLibraryArt_createServerFn_handler };
