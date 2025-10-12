/**
 * Apple Music catalog search endpoint.
 *
 * @module Endpoints/Search
 */
import type { AxiosInstance } from "axios";
import { Parser } from "./parser";

export * as SearchEndpointTypes from "./types";

import { getAuthenticatedAxios } from "../../utils/AxiosManager";
import type { AppleMusicConfig } from "../../utils/Config";
import type * as SearchEndpointTypes from "./types";

const parser = new Parser();
const NOT_INITIALIZED_ERROR =
	"SearchEndpoint.init() must be called before performing requests.";

/**
 * Perform catalog-wide search queries with precise filtering.
 *
 * @category Endpoints
 */
export class SearchEndpoint {
	private ax: AxiosInstance | null = null;
	private apiBase = "";

	/** @internal */
	constructor(config: AppleMusicConfig) {
		this.apiBase = `${config.getBaseURL()}/v1/catalog/`;
		this.apiBase += `${config.region}/search`;
	}

	/** @internal */
	public async init(): Promise<void> {
		this.ax = await getAuthenticatedAxios();
	}

	/**
	 * Execute a search query across multiple resource types.
	 *
	 * @expandType SearchEndpointTypes.SearchEndpointParams
	 * @param params - {@link SearchEndpointTypes.SearchEndpointParams | SearchEndpointParams} describing the search term, storefront, and fine-grained filtering options.
	 * @returns Normalized search results segmented by resource type.
	 *
	 * @throws {@link Error} When the endpoint has not been initialized or the request fails.
	 *
	 * @example
	 * ```ts
	 * const results = await appleMusic.Search.search({ term: "midnights" });
	 * console.log(results.results.songs?.data[0].attributes?.name);
	 * ```
	 */
	public async search(
		params: SearchEndpointTypes.SearchEndpointParams,
	): Promise<SearchEndpointTypes.SearchEndpointResponse> {
		const url = `${this.apiBase}?${parser.buildSearchQuery(params)}`;
		const client = this.requireClient();
		const res = await client.get(url);
		if (res.status !== 200) {
			throw new Error("Got non-200 status code when trying to search!");
		}
		if (!res.data) {
			throw new Error("Got none or invalid data from search request");
		}
		return parser.parseToAppleMusicAPI(
			res.data,
			url,
		) as SearchEndpointTypes.SearchEndpointResponse;
	}

	/** @internal */
	private requireClient(): AxiosInstance {
		if (!this.ax) {
			throw new Error(NOT_INITIALIZED_ERROR);
		}
		return this.ax;
	}
}
