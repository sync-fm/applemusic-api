import { beforeEach, describe, expect, test, vi } from "vitest";
import { AppleMusicConfig } from "../../utils/Config";
import type { AxiosInstance } from "axios";

const mockBuildSearchQuery = vi.hoisted(() => vi.fn());

vi.mock("./parser", () => ({
  buildSearchQuery: mockBuildSearchQuery,
}));

const mockGetAuthenticatedAxios = vi.hoisted(() => vi.fn());

vi.mock("../../utils/AxiosManager", () => ({
  getAuthenticatedAxios: mockGetAuthenticatedAxios,
}));

describe("SuggestionsEndpoint", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mockBuildSearchQuery.mockReset();
    mockGetAuthenticatedAxios.mockReset();
  });

  const loadEndpoint = async (): Promise<
    typeof import("./index")["SuggestionsEndpoint"]
  > => {
    const mod = await import("./index");
    return mod.SuggestionsEndpoint;
  };

  const createAxiosInstance = (): {
    instance: AxiosInstance;
    get: ReturnType<typeof vi.fn>;
  } => {
    const get = vi.fn();
    const instance = { get } as unknown as AxiosInstance;
    return { instance, get } as const;
  };

  test("init fetches authenticated axios", async () => {
    const SuggestionsEndpoint = await loadEndpoint();
    const { instance: axiosInstance } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);

    const endpoint = new SuggestionsEndpoint(new AppleMusicConfig());
    await endpoint.init();

    expect(mockGetAuthenticatedAxios).toHaveBeenCalledTimes(1);
  });

  test("suggestions performs request and returns data", async () => {
    const SuggestionsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildSearchQuery.mockReturnValue("term=abc");

    const endpoint = new SuggestionsEndpoint(config);
    await endpoint.init();

    const responseData = { suggestions: ["abc"] };
    axiosGet.mockResolvedValueOnce({ status: 200, data: responseData });

    const result = await endpoint.suggestions({ term: "abc" });

    const expectedUrl = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/search/suggestions?term=abc`;
    expect(axiosGet).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual(responseData);
  });

  test("suggestions throws when status is not 200", async () => {
    const SuggestionsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildSearchQuery.mockReturnValue("term=abc");

    const endpoint = new SuggestionsEndpoint(config);
    await endpoint.init();

    axiosGet.mockResolvedValueOnce({ status: 500, data: { error: true } });

    await expect(endpoint.suggestions({ term: "abc" })).rejects.toThrow(
      "Got non-200 status code when trying to get suggestions!"
    );
  });

  test("suggestions throws when data is missing", async () => {
    const SuggestionsEndpoint = await loadEndpoint();
    const config = new AppleMusicConfig();
    const { instance: axiosInstance, get: axiosGet } = createAxiosInstance();
    mockGetAuthenticatedAxios.mockResolvedValueOnce(axiosInstance);
    mockBuildSearchQuery.mockReturnValue("term=abc");

    const endpoint = new SuggestionsEndpoint(config);
    await endpoint.init();

    axiosGet.mockResolvedValueOnce({ status: 200, data: undefined });

    await expect(endpoint.suggestions({ term: "abc" })).rejects.toThrow(
      "Got none or invalid data from suggestions request"
    );
  });
});
