import { Locale, Platform, View } from "../../types/SharedSearchParams";
import {
  AlbumParams,
  AlbumParamsDefaults,
  AlbumViewOptions,
  AlbumRelationshipOptions,
  ExtendOption,
  IncludeOption,
  WithOption,
  AlbumViewName,
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
const viewOptions = new Set<AlbumViewName>([
  View.AppearsOn,
  View.OtherVersions,
  View.RelatedAlbums,
  View.RelatedVideos,
] as AlbumViewName[]);

type AlbumQueryParams =
  | AlbumViewOptions
  | AlbumRelationshipOptions
  | AlbumParams;

const parseAlbum = parseQuery<
  Partial<AlbumParams> &
    Partial<AlbumViewOptions> &
    Partial<AlbumRelationshipOptions>
>({
  factory: () =>
    ({} as Partial<AlbumParams> &
      Partial<AlbumViewOptions> &
      Partial<AlbumRelationshipOptions>),
  handlers: {
    id: (value, result) => {
      result.id = value;
    },
    limit: (value, result) => {
      const parsed = parseNumber(value);
      if (parsed !== undefined) {
        (result as AlbumViewOptions).limit = parsed;
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
 * Parse a query string (?l=en-US&views=appears-on,related-albums) into AlbumParams.
 */
export const parseAlbumParams = (query: string): AlbumParams =>
  parseAlbum(query) as AlbumParams;

/**
 * Build a query string from AlbumParams.
 */
export const buildAlbumQuery = (
  params: Partial<AlbumQueryParams> = {},
  encode: boolean = true,
  includeDefaults: boolean = true,
  defaults: Partial<AlbumQueryParams> = AlbumParamsDefaults
): string => {
  return buildQueryString<AlbumQueryParams>(params, {
    defaults,
    includeDefaults,
    encode,
  });
};
