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

/**
 * Parse a query string (?l=en-US&views=appears-on,related-albums) into AlbumParams.
 */
export const parseAlbumParams = (query: string): AlbumParams => {
  const params = new URLSearchParams(
    query.startsWith("?") ? query : `?${query}`
  );
  const result: Partial<AlbumParams> &
    Partial<AlbumViewOptions> &
    Partial<AlbumRelationshipOptions> = {};

  for (const [key, value] of params.entries()) {
    switch (key) {
      case "id": {
        result.id = value;
        break;
      }

      case "limit": {
        const parsed = Number.parseInt(value, 10);
        if (Number.isFinite(parsed)) {
          (result as AlbumViewOptions).limit = parsed;
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
        const filtered = values.filter((v): v is AlbumViewName =>
          viewOptions.has(v as AlbumViewName)
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

      case "with": {
        const values = value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
        const filtered = values.filter((v): v is WithOption =>
          withOptions.has(v as WithOption)
        );
        if (filtered.length > 0) {
          result.with = Array.from(new Set(filtered));
        }
        break;
      }

      default:
        break;
    }
  }

  return result as AlbumParams;
};

/**
 * Build a query string from AlbumParams.
 */
export const buildAlbumQuery = (
  params: Partial<AlbumQueryParams> = {},
  encode: boolean = true,
  includeDefaults: boolean = true,
  defaults: Partial<AlbumQueryParams> = AlbumParamsDefaults
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
