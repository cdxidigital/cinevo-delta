//#region node_modules/.nitro/vite/services/ssr/assets/artwork-model-BKkPUVTK.js
/** Shared metadata and artwork paths. No network, no tokens. */
function formatRuntime(ms) {
	if (!Number.isFinite(ms) || ms <= 0) return "";
	const mins = Math.round(ms / 6e4);
	if (mins <= 0) return "";
	const h = Math.floor(mins / 60);
	const m = mins % 60;
	if (h <= 0) return `${m}m`;
	return m ? `${h}h ${m}m` : `${h}h`;
}
function normalizeRating(value) {
	const n = Number(value);
	if (!Number.isFinite(n) || n <= 0) return 0;
	const scaled = n <= 1 ? n * 10 : n > 10 && n <= 100 ? n / 10 : n;
	return Math.round(Math.min(10, scaled) * 10) / 10;
}
function artProxyUrl(ticket, path) {
	return `/api/art/${ticket}?path=${encodeURIComponent(path)}`;
}
/** Relative image path on the user's own server. Rejects off-host URLs. */
function safeArtPath(input) {
	const [pathname, query] = (input.split("#")[0] || "").split("?");
	if (!pathname || pathname.includes("..") || pathname.includes("\\") || pathname.includes("://")) return null;
	const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
	if (path.length > 400) return null;
	if (!/^\/(library\/|photo\/|Items\/)/.test(path)) return null;
	if (query && !/^[\w&=%.\-]+$/.test(query)) return null;
	return query ? `${path}?${query}` : path;
}
function tags(list) {
	if (!Array.isArray(list)) return [];
	return list.map((item) => String(item.tag || "")).map((item) => item.trim()).filter(Boolean);
}
function factsFromPlex(raw, ratingKey) {
	const genres = tags(raw.Genre);
	const key = ratingKey.replace(/^plex-/, "");
	const thumb = safeArtPath(String(raw.thumb || "")) || (key ? safeArtPath(`/library/metadata/${key}/thumb`) : null);
	const art = safeArtPath(String(raw.art || "")) || (key ? safeArtPath(`/library/metadata/${key}/art`) : null);
	return {
		synopsis: String(raw.summary || "").trim(),
		year: raw.year ? String(raw.year) : "",
		runtime: formatRuntime(Number(raw.duration) || 0),
		rating: normalizeRating(raw.rating ?? raw.audienceRating),
		genre: genres[0] || "",
		genres,
		cast: tags(raw.Role).slice(0, 8),
		director: tags(raw.Director)[0] || "",
		posterPath: thumb || "",
		stillPath: art || thumb || ""
	};
}
function factsFromJellyfin(item) {
	const id = String(item.Id || "");
	const genres = (item.Genres || []).map((genre) => genre.trim()).filter(Boolean);
	const people = item.People || [];
	const cast = people.filter((person) => /actor/i.test(person.Type || "")).map((person) => String(person.Name || "").trim()).filter(Boolean).slice(0, 8);
	const director = people.find((person) => /director/i.test(person.Type || ""));
	const poster = id ? safeArtPath(`/Items/${id}/Images/Primary?maxWidth=480&quality=80`) : null;
	const still = id ? item.BackdropImageTags?.length ? safeArtPath(`/Items/${id}/Images/Backdrop/0?maxWidth=1280&quality=70`) : poster : null;
	const year = item.ProductionYear ? String(item.ProductionYear) : String(item.PremiereDate || "").slice(0, 4);
	return {
		synopsis: String(item.Overview || "").trim(),
		year: /^\d{4}$/.test(year) ? year : "",
		runtime: formatRuntime((Number(item.RunTimeTicks) || 0) / 1e4),
		rating: normalizeRating(item.CommunityRating),
		genre: genres[0] || "",
		genres,
		cast,
		director: String(director?.Name || "").trim(),
		posterPath: item.ImageTags?.Primary ? poster || "" : poster || "",
		stillPath: still || ""
	};
}
//#endregion
export { safeArtPath as i, factsFromJellyfin as n, factsFromPlex as r, artProxyUrl as t };
