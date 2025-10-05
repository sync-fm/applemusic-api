import { SearchEndpointResponse, ExtendOption, SearchEndpointParams, SearchEndpointParamsDefaults, SearchResults } from "./types";

export type AnyObject = { [k: string]: any };
export class Parser {

    public parseSearchParams(query: string): SearchEndpointParams {
        const params = new URLSearchParams(query.startsWith("?") ? query : "?" + query);
        const result: SearchEndpointParams = {};

        for (const [key, value] of params.entries()) {
            // Handle nested keys like "fields[albums]" or "art[music-videos:url]"
            const match = key.match(/^([^\[\]]+)\[([^\[\]]+)\]$/);

            if (match) {
                const mainKey = match[1] as keyof SearchEndpointParams;
                const subKey = match[2];

                switch (mainKey) {
                    case "fields":
                    case "include":
                    case "relate":
                        result[mainKey] ??= {};
                        result[mainKey]![subKey] = value.split(",") as any;
                        break;

                    case "art":
                        if (!result.art) result.art = {};
                        const subMatch = subKey.match(/^(.+):(.+)$/);
                        if (subMatch) {
                            const [_, resource, artKey] = subMatch;
                            result.art[resource] ??= {};
                            (result.art[resource] as any)[artKey] = value;
                        } else {
                            (result.art as any)[subKey] = value;
                        }
                        break;

                    case "omit":
                    case "format":
                        result[mainKey] ??= {};
                        (result[mainKey] as any)[subKey] = value;
                        break;

                    default:
                        (result as any)[mainKey] ??= {};
                        (result as any)[mainKey][subKey] = value;
                        break;
                }

            } else {
                // Handle top-level keys
                switch (key) {
                    case "term":
                        result.term = value;
                        break;

                    case "limit":
                        result.limit = parseInt(value, 10);
                        break;

                    case "l":
                        result.l = value as any;
                        break;

                    case "platform":
                        result.platform = value as any;
                        break;

                    case "extend":
                        result.extend = value.includes(",") ? value.split(",") as ExtendOption[] : (value as ExtendOption);
                        break;

                    case "types":
                        result.types = value.split(",") as any;
                        break;

                    case "with":
                        result.with = value.split(",") as any;
                        break;

                    default:
                        (result as any)[key] = value;
                        break;
                }
            }
        }

        return result;
    }


    public buildSearchQuery(params: SearchEndpointParams, encode: boolean = true, includeDefaults: boolean = true): string {
        const query = new URLSearchParams();

        // Test if input is urlencoded already
        if (params.term && (params.term.includes("%") || params.term.includes("+"))) {
            try {
                params.term = decodeURIComponent(params.term);
            } catch { }
        }

        // Append defaults
        if (includeDefaults) {
            params = { ...SearchEndpointParamsDefaults, ...params };
        }

        // Build query
        for (const [key, value] of Object.entries(params)) {
            if (value === undefined) continue;

            if (typeof value === "object" && !Array.isArray(value)) {
                // Handle nested objects
                for (const [subKey, subValue] of Object.entries(value)) {
                    if (subValue === undefined) continue;

                    if (typeof subValue === "object" && !Array.isArray(subValue)) {
                        // Handle deeper nested objects like art[music-videos:url]
                        for (const [deepKey, deepValue] of Object.entries(subValue)) {
                            if (deepValue === undefined) continue;
                            query.append(`${key}[${subKey}:${deepKey}]`, String(deepValue));
                        }
                    } else {
                        query.append(`${key}[${subKey}]`, Array.isArray(subValue) ? subValue.join(",") : String(subValue));
                    }
                }
            } else {
                // Handle top-level keys
                query.append(key, Array.isArray(value) ? value.join(",") : String(value));
            }
        }

        if (encode) {
            return query.toString();
        }
        return decodeURIComponent(query.toString());
    }

    public parseToAppleMusicAPI(
        res: any,
        url?: string
    ): SearchEndpointResponse {
        const resources = res.resources ?? {};

        // Flatten resource index: id -> full object
        const resourceIndex: Record<string, any> = {};
        for (const coll of Object.values(resources) as any[]) {
            for (const [id, obj] of Object.entries(coll)) {
                resourceIndex[id] = obj;
            }
        }

        const results: Partial<SearchResults> = {};

        for (const [groupKey, groupVal] of Object.entries<any>(res.results)) {
            const pluralKey = this.normalizeGroupKey(groupKey);

            results[pluralKey as keyof SearchResults] = {
                href: groupVal.href,
                next: groupVal.next,
                name: groupVal.name,
                groupId: groupVal.groupId,
                data: (groupVal.data ?? []).map((item: any) => {
                    const full = resourceIndex[item.id];
                    return full ? full : item;
                }),
            };
        }

        return { results: results as SearchResults, meta: res.meta };
    }

    private normalizeGroupKey(key: string): string {
        const map: Record<string, string> = {
            album: "albums",
            artist: "artists",
            curator: "curators",
            "music-video": "music-videos",
        };
        if (map[key]) return map[key];
        if (key.endsWith("s")) return key;
        return key + "s";
    }
}