import { useEffect, useState } from "react";
import { InstallCinevo, rememberInstallPrompt } from "./house-remote";

export function Pwa() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    void navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, []);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem("cinevo-install-hide") === "1");
    } catch {
      setDismissed(false);
    }
    const onPrompt = (event: Event) => {
      event.preventDefault();
      rememberInstallPrompt(event as Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> });
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (dismissed) return null;
  if (window.location.pathname.startsWith("/app") || window.location.pathname.startsWith("/remote")) return null;
  if (window.matchMedia("(min-width: 900px)").matches) return null;

  return (
    <div className="install-bar">
      <InstallCinevo compact />
      <button
        type="button"
        className="install-bar__close"
        aria-label="Dismiss install hint"
        onClick={() => {
          try {
            sessionStorage.setItem("cinevo-install-hide", "1");
          } catch {
            /* ignore */
          }
          setDismissed(true);
        }}
      >
        Not now
      </button>
    </div>
  );
}
