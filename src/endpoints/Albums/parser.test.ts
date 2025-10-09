import { describe, expect, test } from "vitest";
import { Locale, Platform, View } from "../../types/SharedSearchParams";
import { buildAlbumQuery, parseAlbumParams } from "./parser";
import {
	AlbumViewParamsDefaults,
	ExtendOption,
	IncludeOption,
	WithOption,
} from "./types";

describe("albums parser", () => {
	test("parseAlbumParams filters and normalises values", () => {
		const query = [
			"id=420",
			`platform=${Platform.IOS}`,
			`l=${Locale.FR_FR}`,
			"include=artists,genres,invalid,tracks",
			"extend=artistUrl,invalid",
			"views=appears-on,related-videos,invalid",
			"with=attributes,invalid",
			"limit=25",
		].join("&");

		const result = parseAlbumParams(query);

		expect(result).toEqual({
			id: "420",
			platform: Platform.IOS,
			l: Locale.FR_FR,
			include: [
				IncludeOption.Artists,
				IncludeOption.Genres,
				IncludeOption.Tracks,
			],
			extend: [ExtendOption.ArtistUrl],
			views: [View.AppearsOn, View.RelatedVideos],
			with: [WithOption.Attributes],
			limit: 25,
		});
	});

	test("parseAlbumParams ignores invalid limit", () => {
		const result = parseAlbumParams("id=99&limit=oops");
		expect(result).toEqual({
			id: "99",
		});
	});

	test("buildAlbumQuery applies defaults", () => {
		const query = buildAlbumQuery({}, false);
		expect(query).toBe("platform=web&l=en-US");
	});

	test("buildAlbumQuery merges provided overrides", () => {
		const query = buildAlbumQuery(
			{
				platform: Platform.Android,
				include: [IncludeOption.Artists, IncludeOption.Tracks],
				views: [View.RelatedAlbums, View.AppearsOn],
				extend: [ExtendOption.ArtistUrl],
				with: [WithOption.Attributes],
				limit: 15,
			},
			false,
			false,
		);

		expect(query).toBe(
			"platform=android&include=artists,tracks&views=related-albums,appears-on&extend=artistUrl&with=attributes&limit=15",
		);
	});

	test("buildAlbumQuery respects custom defaults", () => {
		const query = buildAlbumQuery({}, true, true, {
			...AlbumViewParamsDefaults,
		});
		expect(query).toBe("platform=web&l=en-US&limit=5");
	});
});
