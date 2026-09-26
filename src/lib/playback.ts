import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";

export const issuePlayback = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      provider: "plex" | "jellyfin" | "node";
      uri: string;
      key: string;
      token: string;
      clientId?: string;
    }) => input,
  )
  .handler(async ({ data, context }) => {
    const { createTicket } = await import("./playback.server");
    return createTicket({ ...data, userId: context.userId });
  });
