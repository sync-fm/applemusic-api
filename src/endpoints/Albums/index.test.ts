import { beforeEach, describe, expect, test, vi } from "vitest";
import type { AxiosInstance } from "axios";
import { AppleMusicConfig } from "../../utils/Config";
import { View } from "../../types/SharedSearchParams";
import * as AlbumsEndpointTypes from "./types";

const mockBuildAlbumQuery = vi.hoisted(() => vi.fn());

vi.mock("./parser", () => ({
  buildAlbumQuery: mockBuildAlbumQuery,
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

describe("AlbumsEndpoint", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mockBuildAlbumQuery.mockReset();
    mockGetAuthenticatedAxios.mockReset();
    mockIsAxiosError.mockReset();
    mockIsAxiosError.mockImplementation((error: unknown) => {
      return Boolean((error as { response?: unknown })?.response);
    });
  });

  const loadEndpoint = async (): Promise<
    typeof import("./index")["AlbumsEndpoint"]
  > => {
    const mod = await import("./index");
    return mod.AlbumsEndpoint;
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
    const AlbumsEndpoint = await loadEndpoint();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new AlbumsEndpoint(new AppleMusicConfig());
    await endpoint.init();

    expect(mockGetAuthenticatedAxios).toHaveBeenCalledTimes(1);
  });

  test("get retrieves album data with built query", async () => {
    const AlbumsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildAlbumQuery.mockReturnValue("include=artists");

    const endpoint = new AlbumsEndpoint(config);
    await endpoint.init();

    const responseData = { data: [{ id: "1" }], meta: {} };
    axiosGet.mockResolvedValueOnce({ data: responseData });

    const includeOptions = [AlbumsEndpointTypes.IncludeOption.Artists];
    const result = await endpoint.get({ id: "1", include: includeOptions });

    expect(mockBuildAlbumQuery).toHaveBeenCalledWith({
      include: includeOptions,
    });
    const expectedUrl = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/albums/1?include=artists`;
    expect(axiosGet).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(responseData);
  });

  test("get requires id", async () => {
    const AlbumsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new AlbumsEndpoint(config);
    await endpoint.init();

    await expect(
      endpoint.get({} as AlbumsEndpointTypes.AlbumParams)
    ).rejects.toThrow("AlbumParams.id is required");
  });

  test("get returns empty data for 404", async () => {
    const AlbumsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildAlbumQuery.mockReturnValue("");

    const endpoint = new AlbumsEndpoint(config);
    await endpoint.init();

    const error = { response: { status: 404 } } as unknown as Error;
    axiosGet.mockRejectedValueOnce(error);

    const result = await endpoint.get({ id: "missing" });

    expect(result).toEqual({ data: [], meta: {} });
  });

  test("get rethrows non-404 errors", async () => {
    const AlbumsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildAlbumQuery.mockReturnValue("");

    const endpoint = new AlbumsEndpoint(config);
    await endpoint.init();

    const error = new Error("boom");
    mockIsAxiosError.mockImplementation(() => false);
    axiosGet.mockRejectedValueOnce(error);

    await expect(endpoint.get({ id: "1" })).rejects.toThrow(
      "Got non-200 status code when trying to get album!Error: boom"
    );
  });

  test("getView validates id and view", async () => {
    const AlbumsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new AlbumsEndpoint(config);
    await endpoint.init();

    await expect(
      endpoint.getView({
        view: View.AppearsOn,
      } as AlbumsEndpointTypes.AlbumViewParams)
    ).rejects.toThrow("AlbumParams.id is required");

    await expect(
      endpoint.getView({ id: "1" } as AlbumsEndpointTypes.AlbumViewParams)
    ).rejects.toThrow("AlbumParams.view is required for getView()");
  });

  test("getView builds query with defaults and returns data", async () => {
    const AlbumsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildAlbumQuery.mockReturnValue("limit=2");

    const endpoint = new AlbumsEndpoint(config);
    await endpoint.init();

    const responseData = { data: [{ id: "view" }], meta: {} };
    axiosGet.mockResolvedValueOnce({ data: responseData });

    const result = await endpoint.getView({
      id: "1",
      view: View.OtherVersions,
      limit: 2,
    });

    expect(mockBuildAlbumQuery).toHaveBeenCalledWith(
      { limit: 2 },
      true,
      true,
      AlbumsEndpointTypes.AlbumViewParamsDefaults
    );
    const expectedUrl = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/albums/1/view/${View.OtherVersions}?limit=2`;
    expect(axiosGet).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(responseData);
  });

  test("getView returns empty data for 404", async () => {
    const AlbumsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildAlbumQuery.mockReturnValue("");

    const endpoint = new AlbumsEndpoint(config);
    await endpoint.init();

    const error = { response: { status: 404 } } as unknown as Error;
    axiosGet.mockRejectedValueOnce(error);

    const result = await endpoint.getView({
      id: "1",
      view: View.OtherVersions,
    });

    expect(result).toEqual({ data: [], meta: {} });
  });

  test("getRelationship validates params", async () => {
    const AlbumsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new AlbumsEndpoint(config);
    await endpoint.init();

    await expect(
      endpoint.getRelationship({
        relationship: AlbumsEndpointTypes.IncludeOption.Artists,
      } as AlbumsEndpointTypes.AlbumRelationshipParams)
    ).rejects.toThrow("AlbumRelationshipParams.id is required");

    await expect(
      endpoint.getRelationship({
        id: "1",
      } as AlbumsEndpointTypes.AlbumRelationshipParams)
    ).rejects.toThrow(
      "AlbumRelationshipParams.relationship is required for getRelationship()"
    );
  });

  test("getRelationship builds query with defaults and returns data", async () => {
    const AlbumsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildAlbumQuery.mockReturnValue("limit=3");

    const endpoint = new AlbumsEndpoint(config);
    await endpoint.init();

    axiosGet.mockResolvedValueOnce({ data: { data: [{ id: "rel" }] } });

    const result = await endpoint.getRelationship({
      id: "1",
      relationship: AlbumsEndpointTypes.IncludeOption.Artists,
      limit: 3,
    });

    expect(mockBuildAlbumQuery).toHaveBeenCalledWith(
      { limit: 3 },
      true,
      true,
      AlbumsEndpointTypes.AlbumRelationshipParamsDefaults
    );
    const expectedUrl = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/albums/1/artists?limit=3`;
    expect(axiosGet).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual({ data: [{ id: "rel" }] });
  });

  test("getRelationship returns empty data for 404", async () => {
    const AlbumsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildAlbumQuery.mockReturnValue("limit=3");

    const endpoint = new AlbumsEndpoint(config);
    await endpoint.init();

    const error = { response: { status: 404 } } as unknown as Error;
    axiosGet.mockRejectedValueOnce(error);

    const result = await endpoint.getRelationship({
      id: "1",
      relationship: AlbumsEndpointTypes.IncludeOption.Artists,
    });

    expect(result).toEqual({ data: [] });
  });
});
