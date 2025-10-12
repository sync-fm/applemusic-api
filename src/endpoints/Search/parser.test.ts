import { describe, expect, test } from "vitest";
import { ResourceType } from "../../types/SharedSearchParams";
import { Parser } from "./parser";
import {
	FieldsAlbums,
	type SearchEndpointParams,
	SearchEndpointParamsDefaults,
	WithOption,
} from "./types";

const parser = new Parser();

describe("Search parser", () => {
	test("parseSearchParams returns defaults for full query", () => {
		const query =
			"art[music-videos:url]=c&art[url]=f&extend=artistUrl&fields[albums]=artistName,artistUrl,artwork,contentRating,editorialArtwork,editorialNotes,name,playParams,releaseDate,url,trackCount&fields[artists]=url,name,artwork&format[resources]=map&include[albums]=artists&include[music-videos]=artists&include[songs]=artists&include[stations]=radio-show&l=en-US&limit=21&omit[resource]=autos&platform=web&relate[albums]=artists&relate[songs]=albums&types=activities,albums,apple-curators,artists,curators,editorial-items,music-movies,music-videos,playlists,record-labels,songs,stations,tv-episodes,uploaded-videos&with=lyricHighlights,lyrics,naturalLanguage,serverBubbles,subtitles";
		const result = parser.parseSearchParams(query);
		expect(result).toEqual(SearchEndpointParamsDefaults);
	});

	test("parseSearchParams empty query", () => {
		const result = parser.parseSearchParams("");
		expect(result).toEqual({});
	});

	test("parseSearchParams splits arrays and nested objects", () => {
		const query =
			"term=hello&extend=artistUrl,lyrics&with=lyrics,subtitles&types=albums,songs&omit[resource]=autos&format[resources]=map&art[music-videos:url]=video&art[url]=cover";
		const result = parser.parseSearchParams(query);

		expect(result.term).toBe("hello");
		expect(result.extend).toEqual(["artistUrl", "lyrics"]);
		expect(result.with).toEqual(["lyrics", "subtitles"]);
		expect(result.types).toEqual(["albums", "songs"]);
		expect(result.omit).toEqual({ resource: "autos" });
		expect(result.format).toEqual({ resources: "map" });
		expect(result.art).toEqual({
			"music-videos": { url: "video" },
			url: "cover",
		});
	});

	test("parseSearchParams handles nested relation collections", () => {
		const query =
			"fields[artists]=name,artwork&include[albums]=artists&relate[songs]=albums&limit=5";
		const result = parser.parseSearchParams(query);

		expect(result.limit).toBe(5);
		expect(result.fields).toEqual({ artists: ["name", "artwork"] });
		expect(result.include).toEqual({ albums: ["artists"] });
		expect(result.relate).toEqual({ songs: ["albums"] });
	});

	test("parseSearchParams preserves unknown keys", () => {
		const result = parser.parseSearchParams("custom=value&options[flag]=true");

		expect((result as SearchEndpointParams & { custom: string }).custom).toBe(
			"value",
		);
		expect(
			(result as SearchEndpointParams & { options: { flag: boolean } }).options,
		).toEqual({ flag: "true" });
	});

	test("parseSearchParams handles URL encoded inputs", () => {
		const query =
			"art%5Bmusic-videos%3Aurl%5D=c&art%5Burl%5D=f&extend=artistUrl&fields%5Balbums%5D=artistName%2CartistUrl%2Cartwork%2CcontentRating%2CeditorialArtwork%2CeditorialNotes%2Cname%2CplayParams%2CreleaseDate%2Curl%2CtrackCount&fields%5Bartists%5D=url%2Cname%2Cartwork&format%5Bresources%5D=map&include%5Balbums%5D=artists&include%5Bmusic-videos%5D=artists&include%5Bsongs%5D=artists&include%5Bstations%5D=radio-show&l=en-US&limit=21&omit%5Bresource%5D=autos&platform=web&relate%5Balbums%5D=artists&relate%5Bsongs%5D=albums&types=activities%2Calbums%2Capple-curators%2Cartists%2Ccurators%2Ceditorial-items%2Cmusic-movies%2Cmusic-videos%2Cplaylists%2Crecord-labels%2Csongs%2Cstations%2Ctv-episodes%2Cuploaded-videos&with=lyricHighlights%2Clyrics%2CnaturalLanguage%2CserverBubbles%2Csubtitles";
		const result = parser.parseSearchParams(query);
		expect(result).toEqual(SearchEndpointParamsDefaults);
	});

	test("buildSearchQuery includes defaults and encodes output", () => {
		const params = SearchEndpointParamsDefaults;
		const decoded = parser.buildSearchQuery(params, false);
		const encoded = parser.buildSearchQuery(params, true);

		expect(decoded).toContain("types=activities,albums,apple-curators,artists");
		expect(encoded).toContain(
			"types=activities%2Calbums%2Capple-curators%2Cartists",
		);
	});

	test("buildSearchQuery decodes encoded terms and handles nested arrays", () => {
		const params = {
			term: "hello%20world",
			types: [ResourceType.Albums],
			with: [WithOption.Lyrics],
			fields: { albums: [FieldsAlbums.ArtistName, FieldsAlbums.TrackCount] },
			art: { url: "cover", "music-videos": { url: "trailer" } },
		};

		const query = parser.buildSearchQuery(params, true, false);
		const parsed = new URLSearchParams(query);

		expect(parsed.get("term")).toBe("hello world");
		expect(parsed.get("types")).toBe(ResourceType.Albums);
		expect(parsed.get("with")).toBe(WithOption.Lyrics);
		expect(parsed.get("fields[albums]")).toBe(
			`${FieldsAlbums.ArtistName},${FieldsAlbums.TrackCount}`,
		);
		expect(parsed.get("art[music-videos:url]")).toBe("trailer");
	});

	test("parseToAppleMusicAPI flattens resource references and normalizes keys", () => {
		const response = {
			resources: {
				songs: {
					song1: { id: "song1", type: "songs", attributes: { name: "Song 1" } },
				},
				albums: {
					album1: {
						id: "album1",
						type: "albums",
						attributes: { name: "Album 1" },
					},
				},
			},
			results: {
				song: {
					href: "/v1/songs",
					next: "/v1/songs?offset=1",
					name: "Songs",
					groupId: "song",
					data: [{ id: "song1" }, { id: "song2", type: "songs" }],
				},
				"music-video": {
					href: "/v1/music-videos",
					data: [{ id: "mv1" }],
				},
				genre: {
					href: "/v1/genres",
					data: [{ id: "genre1", type: "genres" }],
				},
			},
			meta: { query: "hello" },
		};

		const parsed = parser.parseToAppleMusicAPI(response);

		expect(parsed.meta).toEqual({ query: "hello" });
		expect(parsed.results.songs?.data[0]).toEqual({
			id: "song1",
			type: "songs",
			attributes: { name: "Song 1" },
		});
		expect(parsed.results.songs?.data[1]).toEqual({
			id: "song2",
			type: "songs",
		});
		expect(parsed.results["music-videos"]?.data).toEqual([{ id: "mv1" }]);
	});
});
