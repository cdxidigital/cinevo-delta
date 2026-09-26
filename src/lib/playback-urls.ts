export function isLoopbackUrl(url?: string) {
  if (!url) return false;
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^\[|\]$/g, "");
    return host === "localhost" || host === "127.0.0.1" || host === "::1" || host.endsWith(".local");
  } catch {
    return /localhost|127\.0\.0\.1/.test(url);
  }
}

/** Reject schemes and cloud-metadata hosts. Private LAN addresses stay allowed. */
export function serverAddressError(uri: string) {
  let url: URL;
  try {
    url = new URL(uri);
  } catch {
    return "That server address is not allowed.";
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return "That server address is not allowed.";
  const host = url.hostname.toLowerCase();
  if (host === "169.254.169.254" || host === "metadata.google.internal") return "That server address is not allowed.";
  return null;
}

export function plexStreamTarget(uri: string, ratingKey: string, token: string, clientId: string) {
  const key = ratingKey.replace(/^plex-/, "").replace(/^\//, "");
  const client = clientId || "cinevo-web";
  const params = new URLSearchParams({
    hasMDE: "1",
    path: `/library/metadata/${key}`,
    mediaIndex: "0",
    partIndex: "0",
    protocol: "http",
    fastSeek: "1",
    directPlay: "0",
    directStream: "1",
    directStreamAudio: "1",
    videoQuality: "100",
    maxVideoBitrate: "200000",
    location: "lan",
    mediaBufferSize: "20480",
    subtitleSize: "100",
    audioBoost: "100",
    autoAdjustQuality: "0",
    copyts: "1",
    offset: "0",
    session: `cinevo-${key}`.slice(0, 48),
    "X-Plex-Product": "CINEVO",
    "X-Plex-Client-Identifier": client,
    "X-Plex-Platform": "Chrome",
    "X-Plex-Version": "1.0.0",
    "X-Plex-Token": token,
  });
  return {
    url: `${uri.replace(/\/$/, "")}/video/:/transcode/universal/start.mp4?${params.toString()}`,
    headers: {
      "X-Plex-Token": token,
      "X-Plex-Product": "CINEVO",
      "X-Plex-Client-Identifier": client,
      "X-Plex-Platform": "Chrome",
      Accept: "*/*",
    },
  };
}

export function jellyfinStreamTarget(base: string, itemId: string, token: string, clientId: string) {
  const id = itemId.replace(/^jellyfin-/, "").replace(/^jf-/, "");
  const client = clientId || "cinevo-web";
  const params = new URLSearchParams({
    static: "true",
    mediaSourceId: id,
    MaxStreamingBitrate: "200000000",
    api_key: token,
  });
  return {
    url: `${base.replace(/\/$/, "")}/Videos/${encodeURIComponent(id)}/stream.mp4?${params.toString()}`,
    headers: {
      "X-Emby-Token": token,
      Authorization: `MediaBrowser Client="CINEVO", Device="Web", DeviceId="${client}", Version="1.0.0", Token="${token}"`,
      Accept: "*/*",
    },
  };
}

/** Token stays on the Authorization header so it is not written into the stream URL. */
export function nodeStreamTarget(base: string, token: string, filePath: string, id?: string) {
  const params = new URLSearchParams({ path: filePath });
  if (id) params.set("id", id);
  return {
    url: `${base.replace(/\/$/, "")}/v1/play?${params.toString()}`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
  };
}
