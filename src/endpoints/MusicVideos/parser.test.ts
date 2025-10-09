import { describe, expect, test } from "vitest";
import { Locale, Platform } from "../../types/SharedSearchParams";
import { buildMusicVideoQuery, parseMusicVideoParams } from "./parser";
import {
	ExtendOption,
	IncludeOption,
	MusicVideoViewName,
	MusicVideoViewParamsDefaults,
	WithOption,
} from "./types";

describe("music videos parser", () => {
	test("parseMusicVideoParams filters and normalises values", () => {
		const query = [
			"id=420",
			`platform=${Platform.IOS}`,
			`l=${Locale.FR_FR}`,
			"include=albums,artists,genres,library,songs,invalid",
			"extend=artistUrl,invalid",
			"views=more-by-artist,more-in-genre,invalid",
			"with=attributes,invalid",
			"limit=25",
		].join("&");

		const result = parseMusicVideoParams(query);

		expect(result).toEqual({
			id: "420",
			platform: Platform.IOS,
			l: Locale.FR_FR,
			include: [
				IncludeOption.Albums,
				IncludeOption.Artists,
				IncludeOption.Genres,
				IncludeOption.Library,
				IncludeOption.Songs,
			],
			extend: [ExtendOption.ArtistUrl],
			views: [MusicVideoViewName.MoreByArtist, MusicVideoViewName.MoreInGenre],
			with: [WithOption.Attributes],
			limit: 25,
		});
	});

	test("parseMusicVideoParams ignores invalid limit", () => {
		const result = parseMusicVideoParams("id=99&limit=oops");
		expect(result).toEqual({
			id: "99",
		});
	});

	test("buildMusicVideoQuery applies defaults", () => {
		const query = buildMusicVideoQuery({}, false);
		expect(query).toBe("platform=web&l=en-US");
	});

	test("buildMusicVideoQuery merges provided overrides", () => {
		const query = buildMusicVideoQuery(
			{
				platform: Platform.Android,
				include: [
					IncludeOption.Albums,
					IncludeOption.Artists,
					IncludeOption.Songs,
				],
				views: [
					MusicVideoViewName.MoreByArtist,
					MusicVideoViewName.MoreInGenre,
				],
				extend: [ExtendOption.ArtistUrl],
				with: [WithOption.Attributes],
				limit: 15,
			},
			false,
			false,
		);

		expect(query).toBe(
			"platform=android&include=albums,artists,songs&views=more-by-artist,more-in-genre&extend=artistUrl&with=attributes&limit=15",
		);
	});

	test("buildMusicVideoQuery respects custom defaults", () => {
		const query = buildMusicVideoQuery({}, true, true, {
			...MusicVideoViewParamsDefaults,
		});
		expect(query).toBe("platform=web&l=en-US&limit=15");
	});
});
