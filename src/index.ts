import { Interlinker } from "./internal/Interlinker";

/**
 * Reimplement of eleventy-plugin-interlink
 * @param eleventyConfig 
 * @param options 
 */
export default function registerInterlinkPlugin(eleventyConfig: any, options: any) {
  const { permalinkBase = '/', extension = '.html' } = options;

  // eleventyConfig.addTransform('addWikiLinks', (content: any, outputPath: any) => {
  //   // // Only process HTML files
  //   if (outputPath && outputPath.endsWith('.html')) {
  //     //   // Replace wikilinks with proper anchor tags
  //     const regex = /\[\[([\w\s/.'-]+)(\|([\w\s/.'-]+))?\]\]/g;
  //     const matches = content.match(regex);
  //     console.log(outputPath, matches);

  //   }

  //   return content;
  // });
  const interlinker = new Interlinker();

  // Add outboundLinks computed global data, this is executed before the templates are compiled and
  // thus markdown parsed.
  eleventyConfig.addGlobalData('eleventyComputed.outboundLinks', () => {
    return async (data: any) => interlinker.compute(data);
  });
}