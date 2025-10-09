import { describe, expect, test } from "vitest";
import { Locale, Platform } from "../../types/SharedSearchParams";
import { buildArtistQuery, parseArtistParams } from "./parser";
import {
	ArtistViewName,
	ArtistViewParamsDefaults,
	ExtendOption,
	IncludeOption,
	WithOption,
} from "./types";

describe("artists parser", () => {
	test("parseArtistParams filters and normalises values", () => {
		const query = [
			"id=420",
			`platform=${Platform.IOS}`,
			`l=${Locale.FR_FR}`,
			"include=albums,genres,invalid,music-videos,station",
			"extend=artistUrl,plainEditorialNotes,invalid",
			"views=appears-on-albums,top-songs,invalid",
			"with=attributes,invalid",
			"limit=25",
		].join("&");

		const result = parseArtistParams(query);

		expect(result).toEqual({
			id: "420",
			platform: Platform.IOS,
			l: Locale.FR_FR,
			include: [
				IncludeOption.Albums,
				IncludeOption.Genres,
				IncludeOption.MusicVideos,
				IncludeOption.Station,
			],
			extend: [ExtendOption.ArtistUrl, ExtendOption.PlainEditorialNotes],
			views: [ArtistViewName.AppearsOnAlbums, ArtistViewName.TopSongs],
			with: [WithOption.Attributes],
			limit: 25,
		});
	});

	test("parseArtistParams ignores invalid limit", () => {
		const result = parseArtistParams("id=99&limit=oops");
		expect(result).toEqual({
			id: "99",
		});
	});

	test("buildArtistQuery applies defaults", () => {
		const query = buildArtistQuery({}, false);
		expect(query).toBe("platform=web&l=en-US");
	});

	test("buildArtistQuery merges provided overrides", () => {
		const query = buildArtistQuery(
			{
				platform: Platform.Android,
				include: [IncludeOption.Albums, IncludeOption.MusicVideos],
				views: [ArtistViewName.SimilarArtists, ArtistViewName.TopSongs],
				extend: [ExtendOption.ArtistUrl, ExtendOption.EditorialArtwork],
				with: [WithOption.Attributes],
				limit: 15,
			},
			false,
			false,
		);

		expect(query).toBe(
			"platform=android&include=albums,music-videos&views=similar-artists,top-songs&extend=artistUrl,editorialArtwork&with=attributes&limit=15",
		);
	});

	test("buildArtistQuery respects custom defaults", () => {
		const query = buildArtistQuery({}, true, true, {
			...ArtistViewParamsDefaults,
		});
		expect(query).toBe("platform=web&l=en-US&limit=25");
	});
});
