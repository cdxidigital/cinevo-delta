import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { t as authMiddleware } from "./middleware-R7GbGJlf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/playback-BL85Zaz_.js
var issuePlayback_createServerFn_handler = createServerRpc({
	id: "285ba666976a3441837695ddd867727ae066a2557f7d04def4368d428fa219cc",
	name: "issuePlayback",
	filename: "src/lib/playback.ts"
}, (opts) => issuePlayback.__executeServer(opts));
var issuePlayback = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(issuePlayback_createServerFn_handler, async ({ data, context }) => {
	const { createTicket } = await import("./playback.server-BUB6NozS.mjs").then((n) => n.n);
	return createTicket({
		...data,
		userId: context.userId
	});
});
//#endregion
export { issuePlayback_createServerFn_handler };
