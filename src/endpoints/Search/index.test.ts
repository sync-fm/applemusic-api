import { describe, expect, beforeEach, test, vi } from "vitest";
import { AppleMusicConfig } from "../../utils/Config";
import type { AxiosInstance } from "axios";

const mockBuildSearchQuery = vi.hoisted(() => vi.fn());
const mockParseToAppleMusicAPI = vi.hoisted(() => vi.fn());
const MockParser = vi.hoisted(() =>
  vi.fn(() => ({
    buildSearchQuery: mockBuildSearchQuery,
    parseToAppleMusicAPI: mockParseToAppleMusicAPI,
  }))
);

vi.mock("./parser", () => ({
  Parser: MockParser,
}));

const mockGetAuthenticatedAxios = vi.hoisted(() => vi.fn());

vi.mock("../../utils/AxiosManager", () => ({
  getAuthenticatedAxios: mockGetAuthenticatedAxios,
}));

describe("SearchEndpoint", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mockBuildSearchQuery.mockReset();
    mockParseToAppleMusicAPI.mockReset();
    MockParser.mockClear();
    mockGetAuthenticatedAxios.mockReset();
  });

  const loadEndpoint = async (): Promise<
    typeof import("./index")["SearchEndpoint"]
  > => {
    const module = await import("./index");
    return module.SearchEndpoint;
  };

  const createAxiosInstance = (): {
    instance: AxiosInstance;
    get: ReturnType<typeof vi.fn>;
  } => {
    const get = vi.fn();
    const instance = {
      get,
    } as unknown as AxiosInstance;
    return { instance, get } as const;
  };

  test("init wires authenticated axios instance", async () => {
    const SearchEndpoint = await loadEndpoint();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildSearchQuery.mockReturnValue("term=abc");
    mockParseToAppleMusicAPI.mockReturnValue({ parsed: true });
    const endpoint = new SearchEndpoint(new AppleMusicConfig());

    await endpoint.init();

    expect(mockGetAuthenticatedAxios).toHaveBeenCalledTimes(1);
  });

  test("search builds query, performs request, and parses response", async () => {
    const SearchEndpoint = await loadEndpoint();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildSearchQuery.mockReturnValue("term=jack");
    const parsed = { results: { songs: [] }, meta: {} };
    mockParseToAppleMusicAPI.mockReturnValue(parsed);
    const config = new AppleMusicConfig();
    const endpoint = new SearchEndpoint(config);

    await endpoint.init();
    axiosGet.mockResolvedValueOnce({
      status: 200,
      data: { raw: true },
    });

    const result = await endpoint.search({ term: "jack" });

    expect(mockBuildSearchQuery).toHaveBeenCalledWith({ term: "jack" });
    const expectedUrl = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/search?term=jack`;
    expect(axiosGet).toHaveBeenCalledWith(expectedUrl);
    expect(mockParseToAppleMusicAPI).toHaveBeenCalledWith(
      { raw: true },
      expectedUrl
    );
    expect(result).toBe(parsed);
  });

  test("search throws when response status is not 200", async () => {
    const SearchEndpoint = await loadEndpoint();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildSearchQuery.mockReturnValue("term=test");
    const config = new AppleMusicConfig();
    const endpoint = new SearchEndpoint(config);

    await endpoint.init();
    axiosGet.mockResolvedValueOnce({
      status: 500,
      data: { message: "oops" },
    });

    await expect(endpoint.search({ term: "test" })).rejects.toThrow(
      "Got non-200 status code when trying to search!"
    );
    expect(mockParseToAppleMusicAPI).not.toHaveBeenCalled();
  });

  test("search throws when response data is missing", async () => {
    const SearchEndpoint = await loadEndpoint();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildSearchQuery.mockReturnValue("term=test");
    const config = new AppleMusicConfig();
    const endpoint = new SearchEndpoint(config);

    await endpoint.init();
    axiosGet.mockResolvedValueOnce({
      status: 200,
      data: null,
    });

    await expect(endpoint.search({ term: "test" })).rejects.toThrow(
      "Got none or invalid data from search request"
    );
    expect(mockParseToAppleMusicAPI).not.toHaveBeenCalled();
  });
});
