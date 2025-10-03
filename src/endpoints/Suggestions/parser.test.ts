import { test, expect } from "vitest";
import { parseSearchParams, buildSearchQuery } from "./parser";
import { SuggestionsEndpointParamsDefaults } from "./types";

test("SUGGEST parseSearchParams basic", () => {
    const query = "art[url]=f&fields[albums]=artistName,artwork,contentRating,name,playParams,url&fields[artists]=url,name,artwork&format[resources]=map&kinds=terms,topResults&l=en-US&limit[results:terms]=5&limit[results:topResults]=10&omit[resource]=autos&platform=web&types=activities,albums,artists,editorial-items,music-movies,music-videos,playlists,record-labels,songs,stations,tv-episodes&with=naturalLanguage"
    const result = parseSearchParams(query);
    expect(result).toEqual(SuggestionsEndpointParamsDefaults);
});

test("SUGGEST parseSearchParams empty", () => {
    const query = "";
    const result = parseSearchParams(query);
    expect(result).toEqual({});
});

test("SUGGEST parseSearchParams partial", () => {
    const query = "term=hello&limit=5&fields[artists]=name,artwork&include[albums]=artists";
    const result = parseSearchParams(query);
    expect(result).toEqual({
        term: "hello",
        limit: 5,
        fields: {
            artists: ["name", "artwork"],
        },
        include: {
            albums: ["artists"],
        },
    });
});

test("SUGGEST parseSearchParams URL Encoded", () => {
    const query = "art[url]=f&fields[albums]=artistName,artwork,contentRating,name,playParams,url&fields[artists]=url,name,artwork&format[resources]=map&kinds=terms,topResults&l=en-US&limit[results:terms]=5&limit[results:topResults]=10&omit[resource]=autos&platform=web&types=activities,albums,artists,editorial-items,music-movies,music-videos,playlists,record-labels,songs,stations,tv-episodes&with=naturalLanguage"
    const result = parseSearchParams(query);
    expect(result).toEqual(SuggestionsEndpointParamsDefaults);
});

test("SUGGEST buildSearchQuery basic", () => {
    const params = SuggestionsEndpointParamsDefaults;
    const query = buildSearchQuery(params, false);
    expect(query).toBe(
        "types=activities,albums,artists,editorial-items,music-movies,music-videos,playlists,record-labels,songs,stations,tv-episodes&with=naturalLanguage&platform=web&l=en-US&limit[results:terms]=5&limit[results:topResults]=10&art[url]=f&fields[albums]=artistName,artwork,contentRating,name,playParams,url&fields[artists]=url,name,artwork&format[resources]=map&omit[resource]=autos&kinds=terms,topResults"
    );
});

test("SUGGEST buildSearchQuery encoded", () => {
    const params = SuggestionsEndpointParamsDefaults;
    const query = buildSearchQuery(params, true);
    expect(query).toBe(
        "types=activities%2Calbums%2Cartists%2Ceditorial-items%2Cmusic-movies%2Cmusic-videos%2Cplaylists%2Crecord-labels%2Csongs%2Cstations%2Ctv-episodes&with=naturalLanguage&platform=web&l=en-US&limit%5Bresults%3Aterms%5D=5&limit%5Bresults%3AtopResults%5D=10&art%5Burl%5D=f&fields%5Balbums%5D=artistName%2Cartwork%2CcontentRating%2Cname%2CplayParams%2Curl&fields%5Bartists%5D=url%2Cname%2Cartwork&format%5Bresources%5D=map&omit%5Bresource%5D=autos&kinds=terms%2CtopResults"
    );
});