import { beforeEach, describe, expect, test, vi } from "vitest";
import type { AxiosInstance } from "axios";
import { AppleMusic } from "./AppleMusic";
import { AppleMusicConfig } from "./utils/Config";

const createEndpointMock = vi.hoisted(() => {
  return (
    methodNames: readonly string[]
  ): {
    ctor: ReturnType<typeof vi.fn>;
    init: ReturnType<typeof vi.fn>;
    methods: Record<string, ReturnType<typeof vi.fn>>;
  } => {
    const init = vi.fn();
    const methods = Object.fromEntries(
      methodNames.map((name) => [name, vi.fn()])
    ) as Record<string, ReturnType<typeof vi.fn>>;

    const ctor = vi.fn().mockImplementation((config: AppleMusicConfig) => ({
      config,
      init,
      ...methods,
    }));

    return { ctor, init, methods } as const;
  };
});

const endpointMocks = vi.hoisted(() => {
  return {
    Search: createEndpointMock(["search"]),
    Suggestions: createEndpointMock(["suggestions"]),
    Hints: createEndpointMock(["hints"]),
    Albums: createEndpointMock(["get", "getView", "getRelationship"]),
    Artists: createEndpointMock(["get", "getView", "getRelationship"]),
    Songs: createEndpointMock(["get", "getRelationship"]),
    MusicVideos: createEndpointMock(["get", "getView", "getRelationship"]),
  } as const;
});

const mockGetAuthenticatedAxios = vi.hoisted(() => vi.fn());

vi.mock("./utils/AxiosManager", () => ({
  getAuthenticatedAxios: mockGetAuthenticatedAxios,
}));

vi.mock("./endpoints/Search", () => ({
  SearchEndpoint: endpointMocks.Search.ctor,
  SearchEndpointTypes: {},
}));

vi.mock("./endpoints/Suggestions", () => ({
  SuggestionsEndpoint: endpointMocks.Suggestions.ctor,
  SuggestionsEndpointTypes: {},
}));

vi.mock("./endpoints/Hints", () => ({
  HintsEndpoint: endpointMocks.Hints.ctor,
  HintsEndpointTypes: {},
}));

vi.mock("./endpoints/Albums", () => ({
  AlbumsEndpoint: endpointMocks.Albums.ctor,
  AlbumsEndpointTypes: {
    AlbumRelationshipName: {},
  },
}));

vi.mock("./endpoints/Artists", () => ({
  ArtistsEndpoint: endpointMocks.Artists.ctor,
  ArtistsEndpointTypes: {
    ArtistRelationshipName: {},
  },
}));

vi.mock("./endpoints/Songs", () => ({
  SongsEndpoint: endpointMocks.Songs.ctor,
  SongsEndpointTypes: {
    SongRelationshipName: {},
  },
}));

vi.mock("./endpoints/MusicVideos", () => ({
  MusicVideosEndpoint: endpointMocks.MusicVideos.ctor,
  MusicVideosEndpointTypes: {
    MusicVideoRelationshipName: {},
  },
}));

describe("AppleMusic", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mockGetAuthenticatedAxios.mockReset();
    for (const mock of Object.values(endpointMocks)) {
      mock.ctor.mockClear();
      mock.init.mockReset();
      for (const method of Object.values(mock.methods)) {
        method.mockReset();
      }
    }
  });

  const createClient = (): {
    client: AxiosInstance;
    get: ReturnType<typeof vi.fn>;
  } => {
    const get = vi.fn();
    const client = { get } as unknown as AxiosInstance;
    mockGetAuthenticatedAxios.mockResolvedValue(client);
    return { client, get } as const;
  };

  test("init authenticates client and initializes endpoints", async () => {
    const { client } = createClient();

    const appleMusic = new AppleMusic();
    await appleMusic.init();

    expect(mockGetAuthenticatedAxios).toHaveBeenCalled();
    expect(appleMusic.config).toBeInstanceOf(AppleMusicConfig);
    for (const mock of Object.values(endpointMocks)) {
      expect(mock.ctor).toHaveBeenCalledWith(appleMusic.config);
      expect(mock.init).toHaveBeenCalledTimes(1);
    }
    expect(appleMusic["client"]).toBe(client);
  });

  test("endpoint methods throw before initialization", async () => {
    const appleMusic = new AppleMusic();

    await expect(appleMusic.Search.search({} as never)).rejects.toThrow(
      "Apple Music client not initialized. Call init() first."
    );
  });

  test("endpoint methods delegate to underlying endpoint implementations", async () => {
    createClient();

    const appleMusic = new AppleMusic();
    await appleMusic.init();

    expect(endpointMocks.Search.ctor).toHaveBeenCalled();
    endpointMocks.Search.methods.search.mockResolvedValueOnce({ ok: true });
    const searchParams = { term: "foo" } as never;
    const searchResult = await appleMusic.Search.search(searchParams);
    expect(endpointMocks.Search.methods.search).toHaveBeenCalledWith(
      searchParams
    );
    expect(searchResult).toEqual({ ok: true });

    endpointMocks.Suggestions.methods.suggestions.mockResolvedValueOnce({
      suggestions: [],
    });
    const suggestionsParams = { term: "foo" } as never;
    const suggestionsResult = await appleMusic.Suggestions.suggestions(
      suggestionsParams
    );
    expect(endpointMocks.Suggestions.methods.suggestions).toHaveBeenCalledWith(
      suggestionsParams
    );
    expect(suggestionsResult).toEqual({ suggestions: [] });

    endpointMocks.Hints.methods.hints.mockResolvedValueOnce({ hints: [] });
    const hintsParams = { term: "foo" } as never;
    const hintsResult = await appleMusic.Hints.hints(hintsParams);
    expect(endpointMocks.Hints.methods.hints).toHaveBeenCalledWith(hintsParams);
    expect(hintsResult).toEqual({ hints: [] });

    endpointMocks.Albums.methods.get.mockResolvedValueOnce({ album: true });
    const albumParams = { id: "1" } as never;
    const albumResult = await appleMusic.Albums.get(albumParams);
    expect(endpointMocks.Albums.methods.get).toHaveBeenCalledWith(albumParams);
    expect(albumResult).toEqual({ album: true });

    endpointMocks.Albums.methods.getView.mockResolvedValueOnce({
      view: "appears",
    });
    const albumViewParams = { id: "1", view: "appears-on" } as never;
    const albumView = await appleMusic.Albums.getView(albumViewParams);
    expect(endpointMocks.Albums.methods.getView).toHaveBeenCalledWith(
      albumViewParams
    );
    expect(albumView).toEqual({ view: "appears" });

    endpointMocks.Albums.methods.getRelationship.mockResolvedValueOnce({
      data: ["rel"],
    });
    const albumRelationshipParams = {
      id: "1",
      relationship: "artists",
    } as never;
    const albumRelationship = await appleMusic.Albums.getRelationship(
      albumRelationshipParams
    );
    expect(endpointMocks.Albums.methods.getRelationship).toHaveBeenCalledWith(
      albumRelationshipParams
    );
    expect(albumRelationship).toEqual({ data: ["rel"] });

    endpointMocks.Artists.methods.get.mockResolvedValueOnce({ artist: true });
    const artistParams = { id: "artist" } as never;
    const artistResult = await appleMusic.Artists.get(artistParams);
    expect(endpointMocks.Artists.methods.get).toHaveBeenCalledWith(
      artistParams
    );
    expect(artistResult).toEqual({ artist: true });

    endpointMocks.Artists.methods.getView.mockResolvedValueOnce({ data: [] });
    const artistViewParams = { id: "artist", view: "top-songs" } as never;
    const artistView = await appleMusic.Artists.getView(artistViewParams);
    expect(endpointMocks.Artists.methods.getView).toHaveBeenCalledWith(
      artistViewParams
    );
    expect(artistView).toEqual({ data: [] });

    endpointMocks.Artists.methods.getRelationship.mockResolvedValueOnce({
      data: [1],
    });
    const artistRelationshipParams = {
      id: "artist",
      relationship: "albums",
    } as never;
    const artistRelationship = await appleMusic.Artists.getRelationship(
      artistRelationshipParams
    );
    expect(endpointMocks.Artists.methods.getRelationship).toHaveBeenCalledWith(
      artistRelationshipParams
    );
    expect(artistRelationship).toEqual({ data: [1] });

    endpointMocks.Songs.methods.get.mockResolvedValueOnce({ song: true });
    const songParams = { id: "song" } as never;
    const songResult = await appleMusic.Songs.get(songParams);
    expect(endpointMocks.Songs.methods.get).toHaveBeenCalledWith(songParams);
    expect(songResult).toEqual({ song: true });

    endpointMocks.Songs.methods.getRelationship.mockResolvedValueOnce({
      data: [],
    });
    const songRelationshipParams = {
      id: "1",
      relationship: "artists",
    } as never;
    const songRelationship = await appleMusic.Songs.getRelationship(
      songRelationshipParams
    );
    expect(endpointMocks.Songs.methods.getRelationship).toHaveBeenCalledWith(
      songRelationshipParams
    );
    expect(songRelationship).toEqual({ data: [] });

    endpointMocks.MusicVideos.methods.get.mockResolvedValueOnce({ mv: true });
    const musicVideoParams = { id: "mv" } as never;
    const mvResult = await appleMusic.MusicVideos.get(musicVideoParams);
    expect(endpointMocks.MusicVideos.methods.get).toHaveBeenCalledWith(
      musicVideoParams
    );
    expect(mvResult).toEqual({ mv: true });

    endpointMocks.MusicVideos.methods.getView.mockResolvedValueOnce({
      view: true,
    });
    const musicVideoViewParams = { id: "mv", view: "more-by-artist" } as never;
    const mvView = await appleMusic.MusicVideos.getView(musicVideoViewParams);
    expect(endpointMocks.MusicVideos.methods.getView).toHaveBeenCalledWith(
      musicVideoViewParams
    );
    expect(mvView).toEqual({ view: true });

    endpointMocks.MusicVideos.methods.getRelationship.mockResolvedValueOnce({
      data: [],
    });
    const musicVideoRelationshipParams = {
      id: "mv",
      relationship: "artists",
    } as never;
    const mvRelationship = await appleMusic.MusicVideos.getRelationship(
      musicVideoRelationshipParams
    );
    expect(
      endpointMocks.MusicVideos.methods.getRelationship
    ).toHaveBeenCalledWith(musicVideoRelationshipParams);
    expect(mvRelationship).toEqual({ data: [] });
  });

  test("verifyTokenValidity returns true for 200 status and false otherwise", async () => {
    const { get } = createClient();

    const appleMusic = new AppleMusic();
    await appleMusic.init();

    get.mockResolvedValueOnce({ status: 200 });
    await expect(appleMusic.verifyTokenValidity()).resolves.toBe(true);

    get.mockResolvedValueOnce({ status: 500 });
    await expect(appleMusic.verifyTokenValidity()).resolves.toBe(false);

    get.mockRejectedValueOnce(new Error("network"));
    await expect(appleMusic.verifyTokenValidity()).resolves.toBe(false);
  });
});
