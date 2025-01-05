import { Interlinker } from './internal/Interlinker.js';

/**
 * Reimplement of eleventy-plugin-interlink
 * @param eleventyConfig
 * @param options
 */
export default function registerInterlinkPlugin(eleventyConfig: any, options: any) {
  const { permalinkBase = '/', extension = '.html' } = options;

  const interlinker = new Interlinker();

  // Add outboundLinks computed global data, this is executed before the templates are compiled and
  // thus markdown parsed.
  eleventyConfig.addGlobalData('eleventyComputed.outboundLinks', () => {
    return async (data: any) => interlinker.compute(data);
  });
}
