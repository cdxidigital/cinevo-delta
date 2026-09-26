import { createFileRoute } from "@tanstack/react-router";
import { loadTicket } from "@/lib/playback.server";

function isVideoResponse(status: number, type: string) {
  if (status !== 200 && status !== 206) return false;
  if (!type) return true;
  return !/xml|html|json|text\/plain/i.test(type);
}

export const Route = createFileRoute("/api/stream/$ticket")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const ticket = await loadTicket(params.ticket);
        if (!ticket) return new Response("Playback expired", { status: 410 });
        const range = request.headers.get("Range") || request.headers.get("range") || "";
        const headers = new Headers(ticket.headers);
        if (range) headers.set("Range", range);
        let upstream: Response;
        try {
          upstream = await fetch(ticket.url, { headers, redirect: "follow" });
        } catch {
          return new Response("CINEVO could not reach that media server.", { status: 502 });
        }
        const type = upstream.headers.get("content-type") || "";
        if (!isVideoResponse(upstream.status, type)) {
          return new Response("The media server did not return a video stream.", { status: 502 });
        }
        const out = new Headers();
        for (const key of ["content-type", "content-length", "content-range", "accept-ranges", "content-disposition"]) {
          const value = upstream.headers.get(key);
          if (value) out.set(key, value);
        }
        if (!out.has("Accept-Ranges")) out.set("Accept-Ranges", "bytes");
        if (!out.has("Content-Type")) out.set("Content-Type", "video/mp4");
        out.set("Cache-Control", "no-store");
        return new Response(upstream.body, { status: upstream.status, headers: out });
      },
      HEAD: async ({ params }) => {
        const ticket = await loadTicket(params.ticket);
        if (!ticket) return new Response(null, { status: 410 });
        return new Response(null, {
          status: 200,
          headers: { "Content-Type": "video/mp4", "Accept-Ranges": "bytes", "Cache-Control": "no-store" },
        });
      },
    },
  },
});
