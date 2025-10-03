import { AllowedViews, View } from "../../types/SharedSearchParams";
import { SongParams, SongParamsDefaults, SongsRelationshipParams, ExtendOption, IncludeOption, SongRequestOptions } from "./types";

/**
 * Parse a query string (?l=en-US&views=appears-on,related-songs) into SongParams.
 */
export function parseSongParams(query: string): SongParams {
    const params = new URLSearchParams(query.startsWith("?") ? query : "?" + query);
    const result: Partial<SongParams | SongsRelationshipParams> = {};

    const includeOptions = new Set<IncludeOption>(Object.values(IncludeOption) as IncludeOption[]);
    const extendOptions = new Set<ExtendOption>(Object.values(ExtendOption) as ExtendOption[]);
    const viewOptions = new Set<AllowedViews<"songs">>(Object.values(View).filter(v => typeof v === 'string') as AllowedViews<"songs">[]);

    for (const [key, value] of params.entries()) {
        switch (key) {
            case "id":
                result.id = value;
                break;

            case "limit":
                {
                    const parsed = Number.parseInt(value, 10);
                    if (Number.isFinite(parsed)) {
                        (result as SongsRelationshipParams).limit = parsed;
                    }
                }
                break;

            case "l":
                result.l = value as any;
                break;

            case "platform":
                result.platform = value as any;
                break;

            case "views":
                {
                    const values = value.split(",").map((v) => v.trim()).filter(Boolean);
                    const filtered = values.filter((v): v is AllowedViews<"songs"> => viewOptions.has(v as AllowedViews<"songs">));
                    if (filtered.length > 0) {
                        result.views = Array.from(new Set(filtered));
                    }
                }
                break;

            case "include":
                {
                    const values = value.split(",").map((v) => v.trim()).filter(Boolean);
                    const filtered = values.filter((v): v is IncludeOption => includeOptions.has(v as IncludeOption));
                    if (filtered.length > 0) {
                        result.include = Array.from(new Set(filtered));
                    }
                }
                break;

            case "extend":
                {
                    const values = value.split(",").map((v) => v.trim()).filter(Boolean);
                    const filtered = values.filter((v): v is ExtendOption => extendOptions.has(v as ExtendOption));
                    if (filtered.length > 0) {
                        result.extend = Array.from(new Set(filtered));
                    }
                }
                break;

            default:
                (result as any)[key] = value;
                break;
        }
    }

    return result as SongParams;
}

/**
 * Build a query string from SongParams.
 */
export function buildSongQuery(
    params: SongRequestOptions,
    encode: boolean = true,
    includeDefaults: boolean = true,
    defaults: SongRequestOptions = SongParamsDefaults
): string {
    const query = new URLSearchParams();

    const baseParams = includeDefaults ? { ...defaults, ...params } : { ...params };

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
}
