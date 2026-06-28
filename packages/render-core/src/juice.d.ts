declare module 'juice' {
  interface JuiceOptions {
    extraCss?: string;
    applyStyleTags?: boolean;
    removeStyleTags?: boolean;
    preserveMediaQueries?: boolean;
    preserveFontFaces?: boolean;
    preserveKeyFrames?: boolean;
    preservePseudos?: boolean;
    applyWidthAttributes?: boolean;
    applyHeightAttributes?: boolean;
    applyAttributesTableElements?: boolean;
    xmlMode?: boolean;
    webResources?: {
      images?: boolean | number;
      svgs?: boolean;
      scripts?: boolean;
      links?: boolean;
      relativeTo?: string;
    };
    inlinePseudoElements?: boolean;
    excludedProperties?: string[];
  }

  function juice(html: string, options?: JuiceOptions): string;
  namespace juice {
    function inlineContent(html: string, css: string, options?: JuiceOptions): string;
  }

  export = juice;
}
