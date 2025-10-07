import { describe, expect, test } from "vitest";
import { buildSongQuery, parseSongParams } from "./parser";
import {
  ExtendOption,
  IncludeOption,
  SongsRelationshipParamsDefaults,
} from "./types";
import { Platform, Locale, View } from "../../types/SharedSearchParams";

describe("songs parser", () => {
  test("parseSongParams extracts and filters values", () => {
    const query = [
      "id=9000",
      `platform=${Platform.IOS}`,
      `l=${Locale.FR_FR}`,
      "include=artists,albums,unknown",
      "extend=artistUrl,audioVariants,invalid",
      "views=genres,albums,invalid",
      "limit=7",
    ].join("&");

    const result = parseSongParams(query);

    expect(result).toEqual({
      id: "9000",
      platform: Platform.IOS,
      l: Locale.FR_FR,
      include: [IncludeOption.Artists, IncludeOption.Albums],
      extend: [ExtendOption.ArtistUrl, ExtendOption.AudioVariants],
      views: [View.Genres, View.Albums],
      limit: 7,
    });
  });

  test("parseSongParams ignores invalid limit", () => {
    const query = "id=42&limit=not-a-number";
    const result = parseSongParams(query);

    expect(result).toEqual({
      id: "42",
    });
  });

  test("buildSongQuery applies defaults", () => {
    const query = buildSongQuery({}, false);
    expect(query).toBe("platform=web&l=en-US");
  });

  test("buildSongQuery merges overrides", () => {
    const query = buildSongQuery(
      {
        platform: Platform.Android,
        include: [IncludeOption.Artists, IncludeOption.MusicVideos],
        extend: [ExtendOption.AudioVariants],
        views: [View.Genres, View.Albums],
        limit: 12,
      },
      false,
      false
    );

    expect(query).toBe(
      "platform=android&include=artists,music-videos&extend=audioVariants&views=genres,albums&limit=12"
    );
  });

  test("buildSongQuery respects provided defaults", () => {
    const query = buildSongQuery(
      {},
      true,
      true,
      SongsRelationshipParamsDefaults
    );
    expect(query).toBe("platform=web&l=en-US&limit=5");
  });
});
