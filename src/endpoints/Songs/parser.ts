import {
  AllowedViews,
  Locale,
  Platform,
  View,
} from "../../types/SharedSearchParams";
import {
  SongParams,
  SongParamsDefaults,
  SongsRelationshipParams,
  ExtendOption,
  IncludeOption,
  SongRequestOptions,
  SongRelationshipOptions,
} from "./types";

const localeOptions = new Set<Locale>(Object.values(Locale));
const platformOptions = new Set<Platform>(Object.values(Platform));
const includeOptions = new Set<IncludeOption>(Object.values(IncludeOption));
const extendOptions = new Set<ExtendOption>(Object.values(ExtendOption));
const songViewList: AllowedViews<"songs">[] = [
  View.Genres,
  View.Composers,
  View.Albums,
  View.Artists,
  View.Videos,
  View.Library,
  View.MusicVideos,
];
const viewOptions = new Set<AllowedViews<"songs">>(songViewList);

type SongQueryParams = SongRequestOptions & SongRelationshipOptions;

/**
 * Parse a query string (?l=en-US&views=genres,albums) into SongParams.
 */
export const parseSongParams = (query: string): SongParams => {
  const params = new URLSearchParams(
    query.startsWith("?") ? query : `?${query}`
  );
  const result: Partial<SongParams> & Partial<SongsRelationshipParams> = {};

  for (const [key, value] of params.entries()) {
    switch (key) {
      case "id": {
        result.id = value;
        break;
      }

      case "limit": {
        const parsed = Number.parseInt(value, 10);
        if (Number.isFinite(parsed)) {
          (result as SongsRelationshipParams).limit = parsed;
        }
        break;
      }

      case "l": {
        if (localeOptions.has(value as Locale)) {
          result.l = value as Locale;
        }
        break;
      }

      case "platform": {
        if (platformOptions.has(value as Platform)) {
          result.platform = value as Platform;
        }
        break;
      }

      case "views": {
        const values = value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
        const filtered = values.filter((v): v is AllowedViews<"songs"> =>
          viewOptions.has(v as AllowedViews<"songs">)
        );
        if (filtered.length > 0) {
          result.views = Array.from(new Set(filtered));
        }
        break;
      }

      case "include": {
        const values = value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
        const filtered = values.filter((v): v is IncludeOption =>
          includeOptions.has(v as IncludeOption)
        );
        if (filtered.length > 0) {
          result.include = Array.from(new Set(filtered));
        }
        break;
      }

      case "extend": {
        const values = value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
        const filtered = values.filter((v): v is ExtendOption =>
          extendOptions.has(v as ExtendOption)
        );
        if (filtered.length > 0) {
          result.extend = Array.from(new Set(filtered));
        }
        break;
      }

      default:
        break;
    }
  }

  return result as SongParams;
};

/**
 * Build a query string from SongParams or relationship options.
 */
export const buildSongQuery = (
  params: Partial<SongQueryParams> = {},
  encode: boolean = true,
  includeDefaults: boolean = true,
  defaults: Partial<SongQueryParams> = SongParamsDefaults
): string => {
  const query = new URLSearchParams();

  const baseParams = includeDefaults
    ? { ...defaults, ...params }
    : { ...params };

  for (const [key, value] of Object.entries(baseParams)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      if (value.length > 0) {
        query.append(key, value.join(","));
      }
    } else if (typeof value === "number") {
      if (Number.isFinite(value)) {
        query.append(key, String(value));
      }
    } else {
      query.append(key, String(value));
    }
  }

  return encode ? query.toString() : decodeURIComponent(query.toString());
};
