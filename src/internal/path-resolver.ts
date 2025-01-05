import type { EleventyContent } from "./eleventy-types.js";

/**
   * In Obsidian WikiLink style links: [[linkId|optional text]] 
   * We need to resolve the linkId to a path.
   * 
   * Return the path to the file that the linkId points to.
   * 
   */
export function pathResolver(linkId: string, allPages: EleventyContent[]): string {
  // Normalize the linkId (strip slashes, lowercase, replace spaces with hyphens)
  const normalizedLinkId = linkId.trim().toLowerCase().replace(/\s+/g, "-");

  // Attempt to find the page by matching the `fileSlug` or `filePathStem`
  const matchingPage = allPages.find((page) => {
    const slugMatch = page.fileSlug.toLowerCase() === normalizedLinkId;
    const pathStemMatch = page.filePathStem.toLowerCase().endsWith(`/${normalizedLinkId}`);
    return slugMatch || pathStemMatch;
  });

  // Return the URL if a match is found; otherwise, return an empty string
  return matchingPage?.url || "/not-found";
}
