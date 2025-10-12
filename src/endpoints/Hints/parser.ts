import { type HintsEndpointParams, HintsEndpointParamsDefaults } from "./types";

export function parseSearchParams(query: string): Partial<HintsEndpointParams> {
	const params = new URLSearchParams(
		query.startsWith("?") ? query : `?${query}`,
	);
	const result: Partial<HintsEndpointParams> = {};

	for (const [key, value] of params.entries()) {
		const match = key.match(/^([^[\]]+)\[([^[\]]+)\]$/);

		if (match) {
			const mainKey = match[1] as keyof HintsEndpointParams;
			const subKey = match[2];

			switch (mainKey) {
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

				default:
					(result as any)[key] = value;
					break;
			}
		}
	}

	return { ...HintsEndpointParamsDefaults, ...result };
}

export function buildSearchQuery(
	params: HintsEndpointParams,
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
		params = { ...HintsEndpointParamsDefaults, ...params };
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
