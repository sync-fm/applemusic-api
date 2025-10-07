import { beforeEach, describe, expect, test, vi } from "vitest";
import type { AxiosInstance } from "axios";
import { AppleMusicConfig } from "../../utils/Config";
import * as MusicVideosEndpointTypes from "./types";

const mockBuildMusicVideoQuery = vi.hoisted(() => vi.fn());

vi.mock("./parser", () => ({
  buildMusicVideoQuery: mockBuildMusicVideoQuery,
}));

const mockGetAuthenticatedAxios = vi.hoisted(() => vi.fn());

vi.mock("../../utils/AxiosManager", () => ({
  getAuthenticatedAxios: mockGetAuthenticatedAxios,
}));

const mockIsAxiosError = vi.hoisted(() => vi.fn());

vi.mock("axios", async () => {
  const actual = await vi.importActual<typeof import("axios")>("axios");
  const axiosDefault = actual.default;
  (
    axiosDefault as unknown as { isAxiosError: typeof mockIsAxiosError }
  ).isAxiosError = mockIsAxiosError;
  return {
    ...actual,
    default: axiosDefault,
    isAxiosError: mockIsAxiosError,
  };
});

describe("MusicVideosEndpoint", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mockBuildMusicVideoQuery.mockReset();
    mockGetAuthenticatedAxios.mockReset();
    mockIsAxiosError.mockReset();
    mockIsAxiosError.mockImplementation((error: unknown) => {
      return Boolean((error as { response?: unknown })?.response);
    });
  });

  const loadEndpoint = async (): Promise<
    typeof import("./index")["MusicVideosEndpoint"]
  > => {
    const mod = await import("./index");
    return mod.MusicVideosEndpoint;
  };

  const createAxiosInstance = (): {
    instance: AxiosInstance;
    get: ReturnType<typeof vi.fn>;
  } => {
    const get = vi.fn();
    const instance = { get } as unknown as AxiosInstance;
    return { instance, get } as const;
  };

  test("init obtains authenticated axios", async () => {
    const MusicVideosEndpoint = await loadEndpoint();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new MusicVideosEndpoint(new AppleMusicConfig());
    await endpoint.init();

    expect(mockGetAuthenticatedAxios).toHaveBeenCalledTimes(1);
  });

  test("get retrieves music video data with built query", async () => {
    const MusicVideosEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildMusicVideoQuery.mockReturnValue("include=artists");

    const endpoint = new MusicVideosEndpoint(config);
    await endpoint.init();

    const responseData = { data: [{ id: "1" }], meta: {} };
    axiosGet.mockResolvedValueOnce({ data: responseData });

    const includeOptions = [MusicVideosEndpointTypes.IncludeOption.Artists];
    const result = await endpoint.get({ id: "1", include: includeOptions });

    expect(mockBuildMusicVideoQuery).toHaveBeenCalledWith({
      include: includeOptions,
    });
    const expectedUrl = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/music-videos/1?include=artists`;
    expect(axiosGet).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(responseData);
  });

  test("get requires id", async () => {
    const MusicVideosEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new MusicVideosEndpoint(config);
    await endpoint.init();

    await expect(
      endpoint.get({} as MusicVideosEndpointTypes.MusicVideoParams)
    ).rejects.toThrow("MusicVideoParams.id is required");
  });

  test("get returns empty data for 404", async () => {
    const MusicVideosEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildMusicVideoQuery.mockReturnValue("");

    const endpoint = new MusicVideosEndpoint(config);
    await endpoint.init();

    const error = { response: { status: 404 } } as unknown as Error;
    axiosGet.mockRejectedValueOnce(error);

    const result = await endpoint.get({ id: "missing" });

    expect(result).toEqual({ data: [], meta: {} });
  });

  test("get rethrows non-404 errors", async () => {
    const MusicVideosEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildMusicVideoQuery.mockReturnValue("");

    const endpoint = new MusicVideosEndpoint(config);
    await endpoint.init();

    const error = new Error("boom");
    mockIsAxiosError.mockImplementation(() => false);
    axiosGet.mockRejectedValueOnce(error);

    await expect(endpoint.get({ id: "1" })).rejects.toThrow(
      "Got non-200 status code when trying to get music video!Error: boom"
    );
  });

  test("getView validates id and view", async () => {
    const MusicVideosEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new MusicVideosEndpoint(config);
    await endpoint.init();

    await expect(
      endpoint.getView({
        view: MusicVideosEndpointTypes.MusicVideoViewName.MoreByArtist,
      } as MusicVideosEndpointTypes.MusicVideoViewParams)
    ).rejects.toThrow("MusicVideoParams.id is required");

    await expect(
      endpoint.getView({
        id: "1",
      } as MusicVideosEndpointTypes.MusicVideoViewParams)
    ).rejects.toThrow("MusicVideoParams.view is required for getView()");
  });

  test("getView builds query with defaults and returns data", async () => {
    const MusicVideosEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildMusicVideoQuery.mockReturnValue("limit=4");

    const endpoint = new MusicVideosEndpoint(config);
    await endpoint.init();

    const responseData = { data: [{ id: "view" }], meta: {} };
    axiosGet.mockResolvedValueOnce({ data: responseData });

    const result = await endpoint.getView({
      id: "1",
      view: MusicVideosEndpointTypes.MusicVideoViewName.MoreByArtist,
      limit: 4,
    });

    expect(mockBuildMusicVideoQuery).toHaveBeenCalledWith(
      { limit: 4 },
      true,
      true,
      MusicVideosEndpointTypes.MusicVideoViewParamsDefaults
    );
    const expectedUrl = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/music-videos/1/view/${
      MusicVideosEndpointTypes.MusicVideoViewName.MoreByArtist
    }?limit=4`;
    expect(axiosGet).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(responseData);
  });

  test("getView returns empty data for 404", async () => {
    const MusicVideosEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildMusicVideoQuery.mockReturnValue("");

    const endpoint = new MusicVideosEndpoint(config);
    await endpoint.init();

    const error = { response: { status: 404 } } as unknown as Error;
    axiosGet.mockRejectedValueOnce(error);

    const result = await endpoint.getView({
      id: "1",
      view: MusicVideosEndpointTypes.MusicVideoViewName.MoreByArtist,
    });

    expect(result).toEqual({ data: [], meta: {} });
  });

  test("getRelationship validates params", async () => {
    const MusicVideosEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new MusicVideosEndpoint(config);
    await endpoint.init();

    await expect(
      endpoint.getRelationship({
        relationship: MusicVideosEndpointTypes.IncludeOption.Artists,
      } as MusicVideosEndpointTypes.MusicVideoRelationshipParams)
    ).rejects.toThrow("MusicVideoParams.id is required");

    await expect(
      endpoint.getRelationship({
        id: "1",
      } as MusicVideosEndpointTypes.MusicVideoRelationshipParams)
    ).rejects.toThrow(
      "MusicVideoParams.relationship is required for getRelationship()"
    );
  });

  test("getRelationship builds query with defaults and returns data", async () => {
    const MusicVideosEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildMusicVideoQuery.mockReturnValue("limit=6");

    const endpoint = new MusicVideosEndpoint(config);
    await endpoint.init();

    axiosGet.mockResolvedValueOnce({ data: { data: [{ id: "rel" }] } });

    const result = await endpoint.getRelationship({
      id: "1",
      relationship: MusicVideosEndpointTypes.IncludeOption.Artists,
      limit: 6,
    });

    expect(mockBuildMusicVideoQuery).toHaveBeenCalledWith(
      { limit: 6 },
      true,
      true,
      MusicVideosEndpointTypes.MusicVideoRelationshipParamsDefaults
    );
    const expectedUrl = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/music-videos/1/artists?limit=6`;
    expect(axiosGet).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual({ data: [{ id: "rel" }] });
  });

  test("getRelationship returns empty data for 404", async () => {
    const MusicVideosEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildMusicVideoQuery.mockReturnValue("limit=6");

    const endpoint = new MusicVideosEndpoint(config);
    await endpoint.init();

    const error = { response: { status: 404 } } as unknown as Error;
    axiosGet.mockRejectedValueOnce(error);

    const result = await endpoint.getRelationship({
      id: "1",
      relationship: MusicVideosEndpointTypes.IncludeOption.Artists,
    });

    expect(result).toEqual({ data: [], meta: {} });
  });
});
