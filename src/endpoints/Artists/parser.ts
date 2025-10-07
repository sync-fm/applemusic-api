import { Locale, Platform } from "../../types/SharedSearchParams";
import {
  ArtistParams,
  ArtistParamsDefaults,
  ArtistViewOptions,
  ArtistRelationshipOptions,
  ExtendOption,
  IncludeOption,
  WithOption,
  ArtistViewName,
  ArtistRequestOptions,
} from "./types";
import {
  buildQueryString,
  parseDelimitedEnum,
  parseNumber,
  parseQuery,
} from "../shared/query";

const localeOptions = new Set<Locale>(Object.values(Locale));
const platformOptions = new Set<Platform>(Object.values(Platform));
const includeOptions = new Set<IncludeOption>(Object.values(IncludeOption));
const extendOptions = new Set<ExtendOption>(Object.values(ExtendOption));
const withOptions = new Set<WithOption>(Object.values(WithOption));
const viewOptions = new Set<ArtistViewName>(Object.values(ArtistViewName));

type ArtistQueryParams = ArtistRequestOptions &
  ArtistRelationshipOptions & { limit?: number };

const parseArtist = parseQuery<
  Partial<ArtistParams> &
    Partial<ArtistViewOptions> &
    Partial<ArtistRelationshipOptions>
>({
  factory: () =>
    ({} as Partial<ArtistParams> &
      Partial<ArtistViewOptions> &
      Partial<ArtistRelationshipOptions>),
  handlers: {
    id: (value, result) => {
      result.id = value;
    },
    limit: (value, result) => {
      const parsed = parseNumber(value);
      if (parsed !== undefined) {
        (result as ArtistViewOptions).limit = parsed;
      }
    },
    l: (value, result) => {
      if (localeOptions.has(value as Locale)) {
        result.l = value as Locale;
      }
    },
    platform: (value, result) => {
      if (platformOptions.has(value as Platform)) {
        result.platform = value as Platform;
      }
    },
    views: (value, result) => {
      const filtered = parseDelimitedEnum(value, viewOptions);
      if (filtered.length > 0) {
        result.views = filtered;
      }
    },
    include: (value, result) => {
      const filtered = parseDelimitedEnum(value, includeOptions);
      if (filtered.length > 0) {
        result.include = filtered;
      }
    },
    extend: (value, result) => {
      const filtered = parseDelimitedEnum(value, extendOptions);
      if (filtered.length > 0) {
        result.extend = filtered;
      }
    },
    with: (value, result) => {
      const filtered = parseDelimitedEnum(value, withOptions);
      if (filtered.length > 0) {
        result.with = filtered;
      }
    },
  },
});

/**
 * Parse a query string (?l=en-US&views=appears-on,related-artists) into ArtistParams.
 */
export const parseArtistParams = (query: string): ArtistParams =>
  parseArtist(query) as ArtistParams;

/**
 * Build a query string from ArtistParams.
 */
export const buildArtistQuery = (
  params: Partial<ArtistQueryParams> = {},
  encode: boolean = true,
  includeDefaults: boolean = true,
  defaults: Partial<ArtistQueryParams> = ArtistParamsDefaults
): string => {
  return buildQueryString<ArtistQueryParams>(params, {
    defaults,
    includeDefaults,
    encode,
  });
};
