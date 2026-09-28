// Build-time SEO for the SPA: every route gets its own static HTML file with unique
// title/description/canonical/Open Graph/Twitter tags and JSON-LD, so crawlers and
// link-preview bots that don't run JavaScript still see correct metadata.
// Also emits 404.html, sitemap.xml and robots.txt from the same config.
import fs from "node:fs";
import path from "node:path";

import {
  NOT_FOUND,
  OG_IMAGE,
  PERSON,
  ROUTES,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildJsonLd,
} from "./src/seo/config.js";

const START = "<!--seo:start-->";
const END = "<!--seo:end-->";

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const headTags = (route, { noindex = false } = {}) => {
  const url = route.path ? absoluteUrl(route.path) : `${SITE_URL}/`;
  const image = `${SITE_URL}${OG_IMAGE.path}`;
  const isHome = route.path === "/";
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<meta name="author" content="${esc(PERSON.name)}" />`,
    `<meta name="robots" content="${noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"}" />`,
    noindex ? "" : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${isHome ? "profile" : "website"}" />`,
    isHome ? `<meta property="profile:first_name" content="${esc(PERSON.givenName)}" />` : "",
    isHome ? `<meta property="profile:last_name" content="${esc(PERSON.familyName)}" />` : "",
    isHome ? `<meta property="profile:username" content="DabhiAniket" />` : "",
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${esc(OG_IMAGE.alt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${esc(OG_IMAGE.alt)}" />`,
    // Home LCP element on desktop is the avatar – let the browser fetch it early.
    isHome
      ? `<link rel="preload" as="image" type="image/webp" href="/myavatar.webp" imagesrcset="/myavatar-640.webp 640w, /myavatar.webp 1254w" imagesizes="(min-width: 1200px) 737px, (min-width: 640px) 420px, 320px" fetchpriority="high" />`
      : "",
    noindex
      ? ""
      : `<script type="application/ld+json">${JSON.stringify(buildJsonLd(route)).replace(/</g, "\\u003c")}</script>`,
  ];
  return tags.filter(Boolean).join("\n  ");
};

const withHead = (html, route, opts) => {
  const start = html.indexOf(START);
  const end = html.indexOf(END);
  if (start === -1 || end === -1) {
    throw new Error(`[seo] index.html is missing ${START} / ${END} markers`);
  }
  return `${html.slice(0, start + START.length)}\n  ${headTags(route, opts)}\n  ${html.slice(end)}`;
};

const sitemap = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = ROUTES.map(
    (r) =>
      `  <url>\n    <loc>${absoluteUrl(r.path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

const robots = () =>
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

export default function seoPlugin() {
  let outDir = "dist";
  return {
    name: "portfolio-seo",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    // Dev server + the built index.html get the home page tags.
    transformIndexHtml(html) {
      return withHead(html, ROUTES[0]);
    },
    closeBundle() {
      const indexFile = path.join(outDir, "index.html");
      if (!fs.existsSync(indexFile)) return;
      const html = fs.readFileSync(indexFile, "utf8");

      for (const route of ROUTES.slice(1)) {
        fs.writeFileSync(path.join(outDir, route.file), withHead(html, route));
      }
      fs.writeFileSync(
        path.join(outDir, "404.html"),
        withHead(html, { ...NOT_FOUND, path: null }, { noindex: true }),
      );
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap());
      fs.writeFileSync(path.join(outDir, "robots.txt"), robots());
    },
  };
}
