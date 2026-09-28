import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { NOT_FOUND, ROUTES, absoluteUrl } from "@/seo/config";

// Keeps <head> in sync on client-side navigation. The first load already has the right
// tags from the per-route HTML generated at build time; this only updates them in place.
const setMeta = (selector, attr, value) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    const [, key, name] = selector.match(/\[(\w+(?::\w+)?)="([^"]+)"\]/) || [];
    if (key) el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
    const route = ROUTES.find((r) => r.path === path);
    const { title, description } = route ?? NOT_FOUND;

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta(
      'meta[name="robots"]',
      "content",
      route ? "index, follow, max-image-preview:large, max-snippet:-1" : "noindex, follow",
    );
    if (route) {
      const url = absoluteUrl(route.path);
      setMeta('link[rel="canonical"]', "href", url);
      setMeta('meta[property="og:url"]', "content", url);
    }
  }, [pathname]);

  return null;
};

export default Seo;
