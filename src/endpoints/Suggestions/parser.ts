import {
	type ExtendOption,
	type SuggestionsEndpointParams,
	SuggestionsEndpointParamsDefaults,
} from "./types";

export function parseSearchParams(query: string): SuggestionsEndpointParams {
	const params = new URLSearchParams(
		query.startsWith("?") ? query : `?${query}`,
	);
	const result: SuggestionsEndpointParams = {};

	for (const [key, value] of params.entries()) {
		// Handle nested keys like "fields[albums]" or "art[music-videos:url]"
		const match = key.match(/^([^[\]]+)\[([^[\]]+)\]$/);

		if (match) {
			const mainKey = match[1] as keyof SuggestionsEndpointParams;
			const subKey = match[2];

			switch (mainKey) {
				case "fields":
				case "include":
				case "relate":
					result[mainKey] ??= {};
					result[mainKey][subKey] = value.split(",") as any;
					break;

				case "art": {
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
				}

				case "omit":
				case "format":
					result[mainKey] ??= {};
					(result[mainKey] as any)[subKey] = value;
					break;

				case "limit":
					result[mainKey] ??= {};
					(result[mainKey] as any)[subKey] = parseInt(value, 10);
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
					result.extend = value.includes(",")
						? (value.split(",") as ExtendOption[])
						: (value as ExtendOption);
					break;

				case "types":
					result.types = value.split(",") as any;
					break;

				case "with":
					result.with = value.split(",") as any;
					break;

				case "kinds":
					result.kinds = value.split(",") as any;
					break;

				default:
					(result as any)[key] = value;
					break;
			}
		}
	}

	return result;
}

export function buildSearchQuery(
	params: SuggestionsEndpointParams,
	encode: boolean = true,
	includeDefaults: boolean = true,
): string {
	const query = new URLSearchParams();

	// Test if input is urlencoded already
	if (params.term && (params.term.includes("%") || params.term.includes("+"))) {
		try {
			params.term = decodeURIComponent(params.term);
		} catch {}
	}

	// Append defaults
	if (includeDefaults) {
		params = { ...SuggestionsEndpointParamsDefaults, ...params };
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
					query.append(
						`${key}[${subKey}]`,
						Array.isArray(subValue) ? subValue.join(",") : String(subValue),
					);
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
