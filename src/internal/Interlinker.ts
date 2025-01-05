import type { EleventyContent, GlobalData } from './eleventy-types.ts';
import { pageLookup } from './find-page.js';
import WikilinkParser from './WikiLinkParser.js';

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
  console.log(`File: "${item.filePathStem}" - Found link: "${link}" (match: ${match}) == Display text: "${displayText}"`);
  const text = displayText || link.trim();

  return `[${text}](${link}#wiki)`;
};

export class Interlinker {

  wikiLinkParser: WikilinkParser;
  linkCache: Map<string, any>;

  constructor(public opts?: {
    resolvingFns: Map<string, any>;
  }) {

    // Map of Wikilink Meta that have been resolved by the WikilinkParser
    this.linkCache = new Map();

    this.wikiLinkParser = new WikilinkParser({}, {}, this.linkCache);
  }

  reset() {
    // this.deadLinks.clear();
    this.linkCache.clear();
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
    const compilePromises: any[] = [];

    // console.log(`------------------------`);

    // console.log(`Current page rawInput:`, currentPage.page.filePathStem);

    // const wikiLinkRegex = /\[\[([\w\s/.'-]+)(\|([\w\s/.'-]+))?\]\]/g;
    // const pasredWikiLinks = currentPage.rawInput.replace(wikiLinkRegex, (match, link, pipe, displayText) =>
    //   wikilinkReplacer(match, link, pipe, displayText, {
    //     contentData: currentPage,
    //   })
    // );

    // // Set the new rawInput
    // currentPage.rawInput = pasredWikiLinks;

    // return [];

    // TODO: 1.1.0 keep track of defined aliases and throw exception if duplicates are found (#46)

    // Identify this pages outbound internal links both as wikilink _and_ regular html anchor tags. For each out-link
    // lookup the other page and add this to its backlinks data value.
    const template = await currentPage.template.read();

    if (template?.content) {
      const pageContent = template.content;
      const outboundLinks = [
        ...this.wikiLinkParser.find(pageContent, pageDirectory, currentPage.filePathStem),
        // ...this.HTMLLinkParser.find(pageContent, pageDirectory),
      ];

      // Foreach link on this page, if it has its own resolving function we invoke that
      // otherwise the default behaviour is to look up the page and add this page to
      // its backlinks list.

      for (const link of outboundLinks) {
        // if (link.resolvingFnName) {
        //   const fn = this.opts?.resolvingFns.get(link.resolvingFnName);
        //   link.content = await fn(link, currentPage, this);
        // }

        // If the linked page exists we can add the linking page to its backlinks array
        if (link.exists) {
          if (!link.page.data.backlinks) link.page.data.backlinks = [];
          if (link.page.data.backlinks.findIndex(((backlink: any) => backlink.url === currentPage.url)) === -1) {
            link.page.data.backlinks.push({
              url: currentPage.url,
              title: currentPage.data.title,
            });
          }
        }
      }

      // Block iteration until compilation complete.
      if (compilePromises.length > 0) await Promise.all(compilePromises);

      // The computed outbound links for the current page.
      return outboundLinks;
    }

    return [];
  }
}
