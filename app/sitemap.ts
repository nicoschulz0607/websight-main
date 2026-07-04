import type { MetadataRoute } from "next";

const SITE_URL = "https://websight-design.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/anfragen", "/impressum", "/datenschutz", "/agb"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "yearly",
    priority: route === "" ? 1 : 0.5,
  }));
}
