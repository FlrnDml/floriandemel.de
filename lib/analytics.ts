import { useEffect } from "react";
import { useRouter } from "next/router";

type EventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void };
  }
}

// Longer visible times are almost always an idle window, not reading.
const MAX_SECONDS = 30 * 60;

function track(event: string, data: EventData) {
  window.umami?.track(event, data);
}

const pathOf = (url: string) => url.split(/[?#]/)[0];

/**
 * Custom Umami events on top of the automatic page views:
 * - `time-on-page`: seconds the page was visible, sent once per page view
 *   when the visitor navigates away or hides the tab.
 * - `read-article`: the end of an article was scrolled into view.
 * - `outbound-link`: a link to another website was clicked.
 */
export function useAnalytics() {
  const router = useRouter();

  useEffect(() => {
    let path = pathOf(router.asPath);
    let visibleMs = 0;
    let visibleSince: number | null = null;
    let timeSent = false;
    let stopReadTracking = () => {};

    const startView = (url: string) => {
      path = pathOf(url);
      visibleMs = 0;
      visibleSince =
        document.visibilityState === "visible" ? performance.now() : null;
      timeSent = false;
      stopReadTracking();
      stopReadTracking = trackArticleRead(path);
    };

    const sendTime = () => {
      if (timeSent) return;
      if (visibleSince !== null) visibleMs += performance.now() - visibleSince;
      visibleSince = null;
      const seconds = Math.min(Math.round(visibleMs / 1000), MAX_SECONDS);
      if (seconds < 1) return;
      track("time-on-page", { path, seconds });
      timeSent = true;
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendTime();
      } else if (!timeSent) {
        visibleSince = performance.now();
      }
    };

    const onRouteChangeComplete = (url: string) => {
      requestAnimationFrame(() => startView(url));
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a");
      if (!link?.href) return;
      const url = new URL(link.href, window.location.href);
      if (!url.protocol.startsWith("http")) return;
      if (url.host === window.location.host) return;
      track("outbound-link", { url: url.origin + url.pathname, from: path });
    };

    startView(router.asPath);
    router.events.on("routeChangeStart", sendTime);
    router.events.on("routeChangeComplete", onRouteChangeComplete);
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("click", onClick);

    return () => {
      stopReadTracking();
      router.events.off("routeChangeStart", sendTime);
      router.events.off("routeChangeComplete", onRouteChangeComplete);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("click", onClick);
    };
    // Runs once; the router object is stable and routes are handled via events.
  }, []);
}

function trackArticleRead(path: string) {
  const prose = path.startsWith("/blog/")
    ? document.querySelector("article .prose")
    : null;
  if (!prose) return () => {};

  const onScroll = () => {
    if (prose.getBoundingClientRect().bottom > window.innerHeight) return;
    track("read-article", { path });
    stop();
  };
  const stop = () => window.removeEventListener("scroll", onScroll);

  window.addEventListener("scroll", onScroll, { passive: true });
  return stop;
}
