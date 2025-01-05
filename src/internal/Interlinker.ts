import type { EleventyContent, GlobalData } from './eleventy-types.ts';
import { pageLookup } from './find-page.js';

/**
 * Replacer function for processing wikilinks into Markdown links.
 * @param match - Full regex match (e.g., [[Link]])
 * @param link - The captured link target (e.g., "Link")
 * @param _ - Placeholder for the optional pipe (`|`) match
 * @param displayText - The optional display text (e.g., "Display Text")
 * @param options - Plugin options for customization
 * @returns - Transformed Markdown link
 */
const wikilinkReplacer = (
  match: string,
  link: string,
  _: string | undefined,
  displayText: string | undefined,
  context: {
    contentData: EleventyContent;
  }
): string => {
  const { contentData: item } = context;
  console.log(`File: "${item.filePathStem}" - Found link: "${link}" (match: ${match})`);
  const text = displayText || link.trim();

  return `[${text}](${link}#wiki)`;
};

export class Interlinker {
  isComputed: boolean = false;

  async compute(data: GlobalData) {
    // 11ty will invoke this several times during its build cycle, accessing the values we
    // need helps 11ty automatically detect data dependency and invoke the function only
    // once they are met.
    // @see https://www.11ty.dev/docs/data-computed/#declaring-your-dependencies
    if (!data.page.inputPath || data.collections.all.length === 0) return [];

    const pageDirectory = pageLookup(data.collections.all);
    const currentPage = pageDirectory.findByFile(data);
    // console.log(`Current page:`, currentPage);
    if (!currentPage) return [];

    console.log(`Current page rawInput:`, currentPage.page.filePathStem);

    const wikiLinkRegex = /\[\[([\w\s/.'-]+)(\|([\w\s/.'-]+))?\]\]/g;
    const pasredWikiLinks = currentPage.rawInput.replace(wikiLinkRegex, (match, link, pipe, displayText) =>
      wikilinkReplacer(match, link, pipe, displayText, {
        contentData: currentPage,
      })
    );

    // Set the new rawInput
    currentPage.rawInput = pasredWikiLinks;

    return [];
  }
}
