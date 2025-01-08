import type { EleventyContent, GlobalData } from './eleventy-types.ts';
import { pageLookup } from './find-page.js';
import { pathResolver } from './path-resolver.js';
import fs from 'fs';
import { getDateTimeSlug } from './utils.js';

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
    targetLink: string | null;
    logger: (message: string) => void;
  }
): string => {
  const { contentData: item, targetLink, logger } = context;
  logger(`Found link  "${link}" in "${item.filePathStem}" will link to "${targetLink}"`);
  const text = displayText || link.trim();

  // if(!targetLink){
  //   return match;
  // }

  const _link = encodeURI(targetLink ?? '/not-found');

  return `${match} => [${text}](${_link})`;
};


function convertEleventyContentToObject(data: EleventyContent): object{
  return {
    filePathStem: data.filePathStem,
    url: data.url,
    fileSlug: data.fileSlug,
    page: data.page,
  } as EleventyContent;
}

export class Interlinker {

  logFile = `interlinker-${getDateTimeSlug()}.log`;

  private logger(message: string) {
    fs.appendFileSync(this.logFile, `${message}\n`);
  }

  async compute(data: GlobalData) {
    // 11ty will invoke this several times during its build cycle, accessing the values we
    // need helps 11ty automatically detect data dependency and invoke the function only
    // once they are met.
    // @see https://www.11ty.dev/docs/data-computed/#declaring-your-dependencies
    if (!data.page.inputPath || data.collections.all.length === 0) return [];
    // Only process markdown files
    if (!data.page.inputPath.endsWith('.md')) return [];

    const pageDirectory = pageLookup(data.collections.all);
    const currentPage = pageDirectory.findByFile(data);
    // console.log(`Current page:`, currentPage);
    if (!currentPage) return [];

    console.log(`------------------------`);

    console.log(`Current page rawInput:`, currentPage.page.filePathStem);
    this.logger(`---------------- Current page rawInput: ${currentPage.page.filePathStem} ----------------\n\n`);

    const wikiLinkRegex = /\[\[([\w\s/.'-]+)(\|([\w\s/.'-]+))?\]\]/g;
    const pasredWikiLinks = currentPage.rawInput.replace(wikiLinkRegex, (match, foundLinkId, pipe, displayText) => {
      const targetLink = pathResolver(foundLinkId, currentPage, data.collections.all);
      
      // if(foundLinkId === 'React'){
      //   this.logger(`\n\n > current page: ${JSON.stringify(convertEleventyContentToObject(currentPage), null, 2)} ----------`);
      //   this.logger(JSON.stringify(data.collections.all.map(data => ({
      //     filePathStem: data.filePathStem,
      //     url: data.url,
      //     fileSlug: data.fileSlug,
      //   })), null, 2));
      // }
      
      // this.logger(`---------- Found Link Id "${foundLinkId}" ----------`);
      // this.logger(`match: ${match} - foundLinkId: ${foundLinkId} - displayText: ${displayText}`);
      const result = wikilinkReplacer(match, foundLinkId, pipe, displayText, {
        contentData: currentPage,
        targetLink,
        logger: this.logger.bind(this),
      });
      return result;
    }
    );

    // Set the new rawInput
    currentPage.rawInput = pasredWikiLinks;

    return [];
  }
}
