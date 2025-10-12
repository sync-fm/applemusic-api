import { describe, expect, test } from "vitest";
import { buildSearchQuery, parseSearchParams } from "./parser";
import { type HintsEndpointParams, HintsEndpointParamsDefaults } from "./types";

describe("Hints parser", () => {
	test("parseSearchParams returns defaults when no query provided", () => {
		const result = parseSearchParams("");
		expect(result).toEqual(HintsEndpointParamsDefaults);
	});

	test("parseSearchParams merges defaults with provided values", () => {
		const result = parseSearchParams("term=hello");
		expect(result).toEqual({
			term: "hello",
			...HintsEndpointParamsDefaults,
		});
	});

	test("parseSearchParams handles nested keys and unknown top-level keys", () => {
		const result = parseSearchParams("filters[genre]=pop&extra=1");

		expect(result.term).toBeUndefined();
		expect(result.limit).toBe(5);
		expect((result as any).filters).toEqual({ genre: "pop" });
		expect((result as any).extra).toBe("1");
	});

	test("parseSearchParams handles numeric limit and locale overrides", () => {
		const result = parseSearchParams("limit=10&l=ja-JP");
		expect(result.limit).toBe(10);
		expect(result.l).toBe("ja-JP");
	});

	test("buildSearchQuery emits defaults and respects encoding option", () => {
		const params = { ...HintsEndpointParamsDefaults } as HintsEndpointParams;
		const decodedQuery = buildSearchQuery(params, false);
		const encodedQuery = buildSearchQuery(params, true);

		expect(decodedQuery).toBe("platform=web&l=en-US&limit=5");
		expect(encodedQuery).toBe("platform=web&l=en-US&limit=5");
	});

	test("buildSearchQuery decodes encoded term and serialises nested objects", () => {
		const params = {
			term: "hello%20world",
			...HintsEndpointParamsDefaults,
			filters: {
				genre: ["pop", "rock"],
			},
			art: {
				"music-videos": { url: "https://example.com/video" },
				url: "https://example.com/art",
			},
		} as unknown as HintsEndpointParams;

		const query = buildSearchQuery(params, true, false);

		const parsed = new URLSearchParams(query);
		expect(parsed.get("term")).toBe("hello world");
		expect(parsed.get("filters[genre]")).toBe("pop,rock");
		expect(parsed.get("art[music-videos:url]")).toBe(
			"https://example.com/video",
		);
		expect(parsed.get("art[url]")).toBe("https://example.com/art");
	});
});
