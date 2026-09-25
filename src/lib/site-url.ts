const fallbackSiteUrl = "https://js-construction--jsproject-16910.asia-east1.hosted.app";

export const siteUrl = (process.env.SITE_URL || fallbackSiteUrl).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl}/`).toString();
}
