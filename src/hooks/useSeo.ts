import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description?: string;
  /** Path-only canonical (e.g. "/shop"). Origin is auto-prefixed. */
  canonical?: string;
  /** Set to true on 404 pages to inform crawlers via a meta robots tag. */
  noindex?: boolean;
  /** Optional JSON-LD structured data — stringified and injected into <head>. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  } else {
    Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
  }
  return el;
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return el;
};

/**
 * Sets per-page <title>, meta description, canonical, robots and optional
 * JSON-LD. Cleans up the JSON-LD script on unmount; meta tags are intentionally
 * left in place so the next page can overwrite them without a flash.
 */
export function useSeo({
  title,
  description,
  canonical,
  noindex,
  jsonLd,
}: SeoOptions) {
  useEffect(() => {
    document.title = title;

    if (description) {
      upsertMeta('meta[name="description"]', {
        name: "description",
        content: description,
      });
      upsertMeta('meta[property="og:description"]', {
        property: "og:description",
        content: description,
      });
    }

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });

    if (canonical && typeof window !== "undefined") {
      const url = new URL(canonical, window.location.origin).toString();
      upsertLink("canonical", url);
      upsertMeta('meta[property="og:url"]', {
        property: "og:url",
        content: url,
      });
    }

    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noindex ? "noindex, nofollow" : "index, follow",
    });

    let scriptEl: HTMLScriptElement | null = null;
    if (jsonLd) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.text = JSON.stringify(jsonLd);
      document.head.appendChild(scriptEl);
    }

    return () => {
      if (scriptEl) scriptEl.remove();
    };
  }, [title, description, canonical, noindex, JSON.stringify(jsonLd)]);
}
