/**
 * Represents the detailed metadata of a page.
 */
interface EleventyPage {
  /**
   * The relative path to the input file.
   * @example "./content/index.md"
   */
  inputPath: string;

  /**
   * The slug generated from the file name.
   * @example "first"
   */
  fileSlug: string;

  /**
   * The file path without extension, used as a base for URLs.
   * @example "/index"
   */
  filePathStem: string;

  /**
   * The extension of the output file.
   * @example "html"
   */
  outputFileExtension: string;

  /**
   * The template syntax used in the file.
   * @example "njk,md"
   */
  templateSyntax: string;

  /**
   * The timestamp when the file was last modified or generated.
   * @example "2025-01-04T14:03:56.000Z"
   */
  date: string;

  /**
   * The raw content of the input file as a string.
   */
  rawInput: string;

  /**
   * The public URL of the generated output file.
   * @example "/"
   */
  url: string;

  /**
   * The path to the generated output file.
   * @example "./_site/index.html"
   */
  outputPath: string;
}

/**
 * Represents the data structure for content metadata.
 * From   //src/Template.js Line 770  (https://github.dev/11ty/eleventy)
 */
export interface EleventyContent {
  /**
   * The base file path without extension, used for URLs and organization.
   * @example "/index"
   */
  filePathStem: string;

  /**
   * The public URL of the content.
   * @example "/posts/first/"
   */
  url: string;

  /**
   * The detailed metadata of the content's page.
   */
  page: EleventyPage;

  /**
   * The raw content of the file as a string.
   */
  rawInput: string;

  /**
   * The group number used for grouping related content.
   * @example 0
   */
  groupNumber: number;

  /**
   * The relative path to the input file.
   * @example "./content/posts/first.md"
   */
  inputPath: string;

  /**
   * The slug generated from the file name.
   * @example "first"
   */
  fileSlug: string;

  /**
   * The timestamp when the file was last modified or generated.
   * @example "2025-01-04T14:18:33.257Z"
   */
  date: string;

  /**
   * The path to the generated output file.
   * @example "./_site/posts/first/index.html"
   */
  outputPath: string;

  /**
   * The data object for the content.
   */
  data: Record<string, unknown>;
}

/**
 * Represents the configuration for Eleventy.
 */
interface EleventyConfig {
  /**
   * The version of the Eleventy generator.
   * @example "3.0.0"
   */
  version: string;

  /**
   * The generator string including name and version.
   * @example "Eleventy v3.0.0"
   */
  generator: string;

  /**
   * The environment details for the Eleventy build.
   */
  env: {
    /**
     * The source of the environment configuration.
     * @example "cli"
     */
    source: string;

    /**
     * The mode in which Eleventy is running (e.g., "build" or "serve").
     * @example "build"
     */
    runMode: string;

    /**
     * The path to the Eleventy configuration file.
     * @example "/Users/.../eleventy.config.ts"
     */
    config: string;

    /**
     * The root directory for the Eleventy project.
     * @example "/Users/.../digital-garden-new"
     */
    root: string;
  };

  /**
   * The directories used in the Eleventy project.
   */
  directories: {
    /**
     * The input directory for source files.
     * @example "./content/"
     */
    input: string;

    /**
     * The directory for data files.
     * @example "./_data/"
     */
    data: string;

    /**
     * The directory for included template files.
     * @example "./_includes/"
     */
    includes: string;

    /**
     * The output directory for generated files.
     * @example "./_site/"
     */
    output: string;
  };
}

export interface GlobalData {
  title: string;
  page: EleventyPage;
  eleventy: EleventyConfig;
  collections: {
    all: EleventyContent[];
  };
}
