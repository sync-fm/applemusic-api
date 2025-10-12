/**
 * Apple Music search suggestions endpoint.
 *
 * @module Endpoints/Suggestions
 */
import type { AxiosInstance } from "axios";
import * as parser from "./parser";

export * as SuggestionsEndpointTypes from "./types";

import { getAuthenticatedAxios } from "../../utils/AxiosManager";
import type { AppleMusicConfig } from "../../utils/Config";
import type * as SuggestionsEndpointTypes from "./types";

const NOT_INITIALIZED_ERROR =
	"SuggestionsEndpoint.init() must be called before performing requests.";

/**
 * Retrieve query suggestions based on trending and historic search activity.
 *
 * @category Endpoints
 */
export class SuggestionsEndpoint {
	private ax: AxiosInstance | null = null;
	private apiBase: string;

	/** @internal */
	constructor(config: AppleMusicConfig) {
		this.apiBase = `${config.getBaseURL()}/v1/catalog/${
			config.region
		}/search/suggestions`;
	}

	/** @internal */
	public async init(): Promise<void> {
		this.ax = await getAuthenticatedAxios();
	}

	/**
	 * Request related search suggestions for a given term.
	 *
	 * @expandType SuggestionsEndpointTypes.SuggestionsEndpointParams
	 * @param params - {@link SuggestionsEndpointTypes.SuggestionsEndpointParams | SuggestionsEndpointParams} including storefront, search term, and optional limits.
	 * @returns A collection of suggestion groups.
	 *
	 * @throws {@link Error} When the endpoint has not been initialized or the request fails.
	 *
	 * @example
	 * ```ts
	 * const suggestions = await appleMusic.Suggestions.suggestions({
	 *   term: "taylor",
	 * });
	 * ```
	 */
	public async suggestions(
		params: SuggestionsEndpointTypes.SuggestionsEndpointParams,
	): Promise<SuggestionsEndpointTypes.SearchSuggestionsResponse> {
		const client = this.requireClient();
		const res = await client.get(
			`${this.apiBase}?${parser.buildSearchQuery(params)}`,
		);
		if (res.status !== 200) {
			throw new Error(
				"Got non-200 status code when trying to get suggestions!",
			);
		}
		if (!res.data) {
			throw new Error("Got none or invalid data from suggestions request");
		}

		return res.data as SuggestionsEndpointTypes.SearchSuggestionsResponse;
	}

	/** @internal */
	private requireClient(): AxiosInstance {
		if (!this.ax) {
			throw new Error(NOT_INITIALIZED_ERROR);
		}
		return this.ax;
	}
}
