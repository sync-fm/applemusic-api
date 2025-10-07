import { beforeEach, describe, expect, test, vi } from "vitest";
import type { AxiosInstance } from "axios";
import { AppleMusicConfig } from "../../utils/Config";
import * as SongsEndpointTypes from "./types";

const mockBuildSongQuery = vi.hoisted(() => vi.fn());

vi.mock("./parser", () => ({
  buildSongQuery: mockBuildSongQuery,
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

describe("SongsEndpoint", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mockBuildSongQuery.mockReset();
    mockGetAuthenticatedAxios.mockReset();
    mockIsAxiosError.mockReset();
    mockIsAxiosError.mockImplementation((error: unknown) => {
      return Boolean((error as { response?: unknown })?.response);
    });
  });

  const loadEndpoint = async (): Promise<
    typeof import("./index")["SongsEndpoint"]
  > => {
    const mod = await import("./index");
    return mod.SongsEndpoint;
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
    const SongsEndpoint = await loadEndpoint();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new SongsEndpoint(new AppleMusicConfig());
    await endpoint.init();

    expect(mockGetAuthenticatedAxios).toHaveBeenCalledTimes(1);
  });

  test("get retrieves song data using built query", async () => {
    const SongsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildSongQuery.mockReturnValue("include=artists");

    const endpoint = new SongsEndpoint(config);
    await endpoint.init();

    const responseData = { data: [{ id: "1" }], meta: {} };
    axiosGet.mockResolvedValueOnce({ data: responseData });

    const includeOptions = [SongsEndpointTypes.IncludeOption.Artists];
    const result = await endpoint.get({ id: "1", include: includeOptions });

    expect(mockBuildSongQuery).toHaveBeenCalledWith({
      include: includeOptions,
    });
    const expectedUrl = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/songs/1?include=artists`;
    expect(axiosGet).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(responseData);
  });

  test("get throws when id is missing", async () => {
    const SongsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new SongsEndpoint(config);
    await endpoint.init();

    await expect(
      endpoint.get({} as SongsEndpointTypes.SongParams)
    ).rejects.toThrow("SongParams.id is required");
  });

  test("get returns empty data for 404 errors", async () => {
    const SongsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildSongQuery.mockReturnValue("limit=1");

    const endpoint = new SongsEndpoint(config);
    await endpoint.init();

    const error = { response: { status: 404 } } as unknown as Error;
    axiosGet.mockRejectedValueOnce(error);

    const result = await endpoint.get({ id: "not-found" });

    expect(mockIsAxiosError).toHaveBeenCalledWith(error);
    expect(result).toEqual({ data: [], meta: {} });
  });

  test("get rethrows non-404 errors", async () => {
    const SongsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildSongQuery.mockReturnValue("");

    const endpoint = new SongsEndpoint(config);
    await endpoint.init();

    const error = new Error("boom");
    mockIsAxiosError.mockImplementation(() => false);
    axiosGet.mockRejectedValueOnce(error);

    await expect(endpoint.get({ id: "1" })).rejects.toThrow(
      "Got non-200 status code when trying to get song!Error: boom"
    );
  });

  test("getRelationship validates inputs", async () => {
    const SongsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValue(axiosInstance);

    const endpoint = new SongsEndpoint(config);
    await endpoint.init();

    await expect(
      endpoint.getRelationship({
        relationship: "artists",
      } as SongsEndpointTypes.SongsRelationshipParams)
    ).rejects.toThrow("SongsRelationshipParams.id is required");

    await expect(
      endpoint.getRelationship({
        id: "1",
      } as SongsEndpointTypes.SongsRelationshipParams)
    ).rejects.toThrow(
      "SongsRelationshipParams.relationship is required for getRelationship()"
    );
  });

  test("getRelationship calls parser with defaults and returns data", async () => {
    const SongsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildSongQuery.mockReturnValue("limit=5");

    const endpoint = new SongsEndpoint(config);
    await endpoint.init();

    axiosGet.mockResolvedValueOnce({ data: { data: [{ id: "rel" }] } });

    const result = await endpoint.getRelationship({
      id: "1",
      relationship: SongsEndpointTypes.IncludeOption.Artists,
      limit: 5,
    });

    expect(mockBuildSongQuery).toHaveBeenCalledWith(
      { limit: 5 },
      true,
      true,
      SongsEndpointTypes.SongsRelationshipParamsDefaults
    );
    const expectedUrl = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/songs/1/artists?limit=5`;
    expect(axiosGet).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual({ data: [{ id: "rel" }] });
  });

  test("getRelationship returns empty data for 404", async () => {
    const SongsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildSongQuery.mockReturnValue("limit=5");

    const endpoint = new SongsEndpoint(config);
    await endpoint.init();

    const error = { response: { status: 404 } } as unknown as Error;
    axiosGet.mockRejectedValueOnce(error);

    const result = await endpoint.getRelationship({
      id: "1",
      relationship: SongsEndpointTypes.IncludeOption.Artists,
    });

    expect(result).toEqual({ data: [] });
  });
});
