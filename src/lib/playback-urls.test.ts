import assert from "node:assert/strict";
import test from "node:test";
import {
  isLoopbackUrl,
  jellyfinStreamTarget,
  nodeStreamTarget,
  plexStreamTarget,
  serverAddressError,
} from "./playback-urls.ts";

test("plex playback is a CINEVO-side stream, not direct play", () => {
  const target = plexStreamTarget("https://plex.example:32400/", "plex-99", "secret-token", "client-1");
  const url = new URL(target.url);
  assert.equal(url.pathname, "/video/:/transcode/universal/start.mp4");
  assert.equal(url.searchParams.get("directPlay"), "0");
  assert.equal(url.searchParams.get("directStream"), "1");
  assert.equal(url.searchParams.get("path"), "/library/metadata/99");
  assert.equal(url.searchParams.get("X-Plex-Token"), "secret-token");
  assert.equal(target.headers["X-Plex-Token"], "secret-token");
  assert.equal(target.url.includes("/api/stream"), false);
});

test("jellyfin playback keeps the key on the server URL", () => {
  const target = jellyfinStreamTarget("http://jellyfin.example:8096", "jellyfin-abc", "jf-secret", "client-1");
  const url = new URL(target.url);
  assert.equal(url.pathname, "/Videos/abc/stream.mp4");
  assert.equal(url.searchParams.get("static"), "true");
  assert.equal(url.searchParams.get("api_key"), "jf-secret");
  assert.match(target.headers.Authorization, /Token="jf-secret"/);
});

test("node playback does not put the pairing token in the URL", () => {
  const target = nodeStreamTarget("http://nas.local:48184", "pair-token", "/media/film.mkv", "title-1");
  const url = new URL(target.url);
  assert.equal(url.pathname, "/v1/play");
  assert.equal(url.searchParams.get("token"), null);
  assert.equal(url.searchParams.get("path"), "/media/film.mkv");
  assert.equal(target.headers.Authorization, "Bearer pair-token");
});

test("loopback and blocked addresses", () => {
  assert.equal(isLoopbackUrl("http://127.0.0.1:48184"), true);
  assert.equal(isLoopbackUrl("https://plex.example:32400"), false);
  assert.equal(serverAddressError("file:///etc/passwd"), "That server address is not allowed.");
  assert.equal(serverAddressError("http://169.254.169.254/"), "That server address is not allowed.");
  assert.equal(serverAddressError("http://192.168.1.20:32400"), null);
});
