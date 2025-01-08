import type { EleventyContent } from './eleventy-types.js';
import path from 'path';

/**
 * Resolves an Obsidian WikiLink `linkId` to an absolute path from the root.
 * Mimics Obsidian's resolution logic.
 * @param linkId - The `linkId` from the WikiLink (e.g., "React" in `[[React]]`).
 * @param linkIdPage - The current EleventyContent page where the link is used.
 * @param allPages - Array of EleventyContent objects representing all available pages.
 * @returns - The resolved absolute path as a string or `/not-found` if the link cannot be resolved.
 */
export function pathResolver(linkId: string, linkIdPage: EleventyContent, allPages: EleventyContent[]): string | null {
  const normalizedLinkId = linkId.trim();

  // Rule 1: If `linkId` is an absolute path (starts with `/`)
  if (normalizedLinkId.startsWith('/')) {
    const exactMatch = allPages.find(page => page.filePathStem === normalizedLinkId);
    if (exactMatch) {
      return exactMatch.url;
    }
  }

  // Rule 2: If `linkId` is a relative path (does not start with `/`)
  if (!normalizedLinkId.startsWith('/')) {
    const partialMatch = allPages.find(page => page.filePathStem.endsWith(`/${normalizedLinkId}`));
    if (partialMatch) {
      return partialMatch.url;
    }
  }

  // Rule 3: Check if `linkId` is in the same directory as the current page
  const currentDir = path.dirname(linkIdPage.filePathStem);
  const sameDirMatch = allPages.find(
    page => page.fileSlug === normalizedLinkId && page.filePathStem.startsWith(`${currentDir}/`)
  );
  if (sameDirMatch) {
    return sameDirMatch.url;
  }

  // Rule 4: Find the `linkId` in the first subdirectory alphabetically
  const matchingSubdirPages = allPages
    .filter(page => page.fileSlug === normalizedLinkId)
    .sort((a, b) => a.filePathStem.localeCompare(b.filePathStem));

  if (matchingSubdirPages.length > 0) {
    return matchingSubdirPages[0].url;
  }

  // If no match is found, return null
  return null;
}
