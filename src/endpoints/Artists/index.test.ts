import { beforeEach, describe, expect, test, vi } from "vitest";
import type { AxiosInstance } from "axios";
import { AppleMusicConfig } from "../../utils/Config";
import * as ArtistsEndpointTypes from "./types";

const mockBuildArtistQuery = vi.hoisted(() => vi.fn());

vi.mock("./parser", () => ({
  buildArtistQuery: mockBuildArtistQuery,
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

describe("ArtistsEndpoint", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mockBuildArtistQuery.mockReset();
    mockGetAuthenticatedAxios.mockReset();
    mockIsAxiosError.mockReset();
    mockIsAxiosError.mockImplementation((error: unknown) => {
      return Boolean((error as { response?: unknown })?.response);
    });
  });

  const loadEndpoint = async (): Promise<
    typeof import("./index")["ArtistsEndpoint"]
  > => {
    const mod = await import("./index");
    return mod.ArtistsEndpoint;
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
    const ArtistsEndpoint = await loadEndpoint();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new ArtistsEndpoint(new AppleMusicConfig());
    await endpoint.init();

    expect(mockGetAuthenticatedAxios).toHaveBeenCalledTimes(1);
  });

  test("get retrieves artist data with built query", async () => {
    const ArtistsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildArtistQuery.mockReturnValue("include=albums");

    const endpoint = new ArtistsEndpoint(config);
    await endpoint.init();

    const responseData = { data: [{ id: "1" }], meta: {} };
    axiosGet.mockResolvedValueOnce({ data: responseData });

    const includeOptions = [ArtistsEndpointTypes.IncludeOption.Albums];
    const result = await endpoint.get({ id: "1", include: includeOptions });

    expect(mockBuildArtistQuery).toHaveBeenCalledWith({
      include: includeOptions,
    });
    const expectedUrl = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/artists/1?include=albums`;
    expect(axiosGet).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(responseData);
  });

  test("get requires id", async () => {
    const ArtistsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new ArtistsEndpoint(config);
    await endpoint.init();

    await expect(
      endpoint.get({} as ArtistsEndpointTypes.ArtistParams)
    ).rejects.toThrow("ArtistParams.id is required");
  });

  test("get returns empty data for 404", async () => {
    const ArtistsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildArtistQuery.mockReturnValue("");

    const endpoint = new ArtistsEndpoint(config);
    await endpoint.init();

    const error = { response: { status: 404 } } as unknown as Error;
    axiosGet.mockRejectedValueOnce(error);

    const result = await endpoint.get({ id: "missing" });

    expect(result).toEqual({ data: [], meta: {} });
  });

  test("get rethrows non-404 errors", async () => {
    const ArtistsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildArtistQuery.mockReturnValue("");

    const endpoint = new ArtistsEndpoint(config);
    await endpoint.init();

    const error = new Error("boom");
    mockIsAxiosError.mockImplementation(() => false);
    axiosGet.mockRejectedValueOnce(error);

    await expect(endpoint.get({ id: "1" })).rejects.toThrow(
      "Got non-200 status code when trying to get artist!Error: boom"
    );
  });

  test("getView validates id and view", async () => {
    const ArtistsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new ArtistsEndpoint(config);
    await endpoint.init();

    await expect(
      endpoint.getView({
        view: ArtistsEndpointTypes.ArtistViewName.TopSongs,
      } as ArtistsEndpointTypes.ArtistViewParams)
    ).rejects.toThrow("ArtistParams.id is required");

    await expect(
      endpoint.getView({ id: "1" } as ArtistsEndpointTypes.ArtistViewParams)
    ).rejects.toThrow("ArtistParams.view is required for getView()");
  });

  test("getView builds query with defaults and returns data", async () => {
    const ArtistsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildArtistQuery.mockReturnValue("limit=10");

    const endpoint = new ArtistsEndpoint(config);
    await endpoint.init();

    const responseData = { data: [{ id: "view" }], meta: {} };
    axiosGet.mockResolvedValueOnce({ data: responseData });

    const result = await endpoint.getView({
      id: "1",
      view: ArtistsEndpointTypes.ArtistViewName.TopSongs,
      limit: 10,
    });

    expect(mockBuildArtistQuery).toHaveBeenCalledWith(
      { limit: 10 },
      true,
      true,
      ArtistsEndpointTypes.ArtistViewParamsDefaults
    );
    const expectedUrl = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/artists/1/view/${ArtistsEndpointTypes.ArtistViewName.TopSongs}?limit=10`;
    expect(axiosGet).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(responseData);
  });

  test("getView returns empty data for 404", async () => {
    const ArtistsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildArtistQuery.mockReturnValue("");

    const endpoint = new ArtistsEndpoint(config);
    await endpoint.init();

    const error = { response: { status: 404 } } as unknown as Error;
    axiosGet.mockRejectedValueOnce(error);

    const result = await endpoint.getView({
      id: "1",
      view: ArtistsEndpointTypes.ArtistViewName.TopSongs,
    });

    expect(result).toEqual({ data: [], meta: {} });
  });

  test("getRelationship validates params", async () => {
    const ArtistsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new ArtistsEndpoint(config);
    await endpoint.init();

    await expect(
      endpoint.getRelationship({
        relationship: ArtistsEndpointTypes.IncludeOption.Albums,
      } as ArtistsEndpointTypes.ArtistRelationshipParams)
    ).rejects.toThrow("ArtistRelationshipParams.id is required");

    await expect(
      endpoint.getRelationship({
        id: "1",
      } as ArtistsEndpointTypes.ArtistRelationshipParams)
    ).rejects.toThrow(
      "ArtistRelationshipParams.relationship is required for getRelationship()"
    );
  });

  test("getRelationship builds query with defaults and returns data", async () => {
    const ArtistsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildArtistQuery.mockReturnValue("limit=5");

    const endpoint = new ArtistsEndpoint(config);
    await endpoint.init();

    axiosGet.mockResolvedValueOnce({ data: { data: [{ id: "rel" }] } });

    const result = await endpoint.getRelationship({
      id: "1",
      relationship: ArtistsEndpointTypes.IncludeOption.Albums,
      limit: 5,
    });

    expect(mockBuildArtistQuery).toHaveBeenCalledWith(
      { limit: 5 },
      true,
      true,
      ArtistsEndpointTypes.ArtistRelationshipParamsDefaults
    );
    const expectedUrl = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/artists/1/albums?limit=5`;
    expect(axiosGet).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual({ data: [{ id: "rel" }] });
  });

  test("getRelationship returns empty data for 404", async () => {
    const ArtistsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildArtistQuery.mockReturnValue("limit=5");

    const endpoint = new ArtistsEndpoint(config);
    await endpoint.init();

    const error = { response: { status: 404 } } as unknown as Error;
    axiosGet.mockRejectedValueOnce(error);

    const result = await endpoint.getRelationship({
      id: "1",
      relationship: ArtistsEndpointTypes.IncludeOption.Albums,
    });

    expect(result).toEqual({ data: [] });
  });
});
