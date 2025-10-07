import { Locale, Platform } from "../../types/SharedSearchParams";
import {
  MusicVideoParams,
  MusicVideoParamsDefaults,
  MusicVideoRequestOptions,
  MusicVideoViewOptions,
  MusicVideoRelationshipOptions,
  ExtendOption,
  IncludeOption,
  WithOption,
  MusicVideoViewName,
} from "./types";

const localeOptions = new Set<Locale>(Object.values(Locale));
const platformOptions = new Set<Platform>(Object.values(Platform));
const includeOptions = new Set<IncludeOption>(Object.values(IncludeOption));
const extendOptions = new Set<ExtendOption>(Object.values(ExtendOption));
const withOptions = new Set<WithOption>(Object.values(WithOption));
const viewOptions = new Set<MusicVideoViewName>(
  Object.values(MusicVideoViewName)
);

type MusicVideoQueryParams = MusicVideoRequestOptions &
  MusicVideoRelationshipOptions & { limit?: number };

/**
 * Parse a query string (?l=en-US&views=more-by-artist,more-in-genre) into MusicVideoParams.
 */
export const parseMusicVideoParams = (query: string): MusicVideoParams => {
  const params = new URLSearchParams(
    query.startsWith("?") ? query : `?${query}`
  );
  const result: Partial<MusicVideoParams> &
    Partial<MusicVideoViewOptions> &
    Partial<MusicVideoRelationshipOptions> = {};

  for (const [key, value] of params.entries()) {
    switch (key) {
      case "id": {
        result.id = value;
        break;
      }

      case "limit": {
        const parsed = Number.parseInt(value, 10);
        if (Number.isFinite(parsed)) {
          (result as MusicVideoViewOptions).limit = parsed;
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
        const filtered = values.filter((v): v is MusicVideoViewName =>
          viewOptions.has(v as MusicVideoViewName)
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

  return result as MusicVideoParams;
};

/**
 * Build a query string from MusicVideo params.
 */
export const buildMusicVideoQuery = (
  params: Partial<MusicVideoQueryParams> = {},
  encode: boolean = true,
  includeDefaults: boolean = true,
  defaults: Partial<MusicVideoQueryParams> = MusicVideoParamsDefaults
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
