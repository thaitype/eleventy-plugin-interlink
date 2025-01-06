import type { EleventyContent } from "./eleventy-types.js";
import path from 'path';

 /**
 * Resolves an Obsidian WikiLink `linkId` to an absolute path from the root.
 * Mimics Obsidian's resolution logic.
 * @param linkId - The `linkId` from the WikiLink (e.g., "React" in `[[React]]`).
 * @param linkIdPage - The current EleventyContent page where the link is used.
 * @param allPages - Array of EleventyContent objects representing all available pages.
 * @returns - The resolved absolute path as a string or `/not-found` if the link cannot be resolved.
 */
export function pathResolver(
  linkId: string,
  linkIdPage: EleventyContent,
  allPages: EleventyContent[]
): string {
  const foundPage = allPages.filter(page => {
    // Pre-process

    // Step 0.1: Clean up the linkId, removing any trailing slashes, Case-insensitive, it's not affecting the search
    linkId = linkId.trim().toLowerCase().replace(/\/$/, '');

    // Step 0.2: Identity if linkId is a path or id e.g. [[path/to/file]] or [[id]]
    const isPath = linkId.includes('/');

    // ----------------
    // Search Algorithm

    // Step 1: If the linkId is a path, check if the path matches the current page's `filePathStem`
    if (isPath) {
      console.log(`Found at Step 1: ${linkId} === ${page.filePathStem}`);
      return page.filePathStem === linkId;
    }

    // Step 2: If the linkIdPage is in same directory with the linkId, return the linkIdPage url
    const linkIdPageDir = path.dirname(linkIdPage.filePathStem).toLowerCase();
    // Make current page is the same directory with the linkId page
    if(path.dirname(page.filePathStem).toLowerCase() === linkIdPageDir){
      // Found the page in the same directory
      if(page.fileSlug.toLowerCase() === linkId){
        return true;
      }
    }



  });

  for(const page of foundPage) {
    console.log(`XXX => foundPage: ${page.filePathStem} (${page.fileSlug})`);
  }

  if(foundPage.length > 0){
    return foundPage[0].url;
  }

  return '/not-found';
}
