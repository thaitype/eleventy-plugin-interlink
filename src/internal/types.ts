// Data structure for internal links identified by HTMLLinkParser.
// This is a subset of WikilinkMeta.
export type LinkMeta = {
  href: string;
  isEmbed: false;
};

// Data structure for wikilinks identified by WikiLinkParser.
export interface WikilinkMeta {
  title: string | null;
  name: string;
  anchor: string | null;
  link: string;
  isEmbed: boolean;
  isPath: boolean;

  // If linked page has been found in the all collection exists will be
  // true and page will be the 11ty page object.
  exists: boolean;
  page?: any;

  // name of the resolving fn, if set it must exist
  resolvingFnName?: string;
  // the resulting HTML of the resolving function
  content?: string;

  // href and path are loaded from the linked page, if the href is
  // false then it disables the transformation of wikilink into html link.
  href?: string | false;
  path?: string;
}
