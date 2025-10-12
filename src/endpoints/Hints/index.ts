/**
 * Apple Music search hints endpoint.
 *
 * @module Endpoints/Hints
 */
import type { AxiosInstance } from "axios";
import * as parser from "./parser";

export * as HintsEndpointTypes from "./types";

import { getAuthenticatedAxios } from "../../utils/AxiosManager";
import type { AppleMusicConfig } from "../../utils/Config";
import type * as HintsEndpointTypes from "./types";

const NOT_INITIALIZED_ERROR =
	"HintsEndpoint.init() must be called before performing requests.";

/**
 * Provides lightweight typeahead suggestions for search terms.
 *
 * @category Endpoints
 */
export class HintsEndpoint {
	private ax: AxiosInstance | null = null;
	private apiBase: string;

	/** @internal */
	constructor(config: AppleMusicConfig) {
		this.apiBase = `${config.getBaseURL()}/v1/catalog/${
			config.region
		}/search/hints`;
	}

	/** @internal */
	public async init(): Promise<void> {
		this.ax = await getAuthenticatedAxios();
	}

	/**
	 * Retrieve search hints for a partially typed query.
	 *
	 * @expandType HintsEndpointTypes.HintsEndpointParams
	 * @param params - {@link HintsEndpointTypes.HintsEndpointParams | HintsEndpointParams} including storefront, search term, and optional pagination options.
	 * @returns Structured hint results grouped by content type.
	 *
	 * @throws {@link Error} When the endpoint has not been initialized or the request fails.
	 *
	 * @example
	 * ```ts
	 * const hints = await appleMusic.Hints.hints({ term: "taylor" });
	 * console.log(hints.hints.map((hint) => hint.displayTerm));
	 * ```
	 */
	public async hints(
		params: HintsEndpointTypes.HintsEndpointParams,
	): Promise<HintsEndpointTypes.HintsResponse> {
		const client = this.requireClient();
		const res = await client.get(
			`${this.apiBase}?${parser.buildSearchQuery(params)}`,
		);
		if (res.status !== 200) {
			throw new Error("Got non-200 status code when trying to get hints!");
		}
		if (!res.data) {
			throw new Error("Got none or invalid data from hints request");
		}

		return res.data as HintsEndpointTypes.HintsResponse;
	}

	/** @internal */
	private requireClient(): AxiosInstance {
		if (!this.ax) {
			throw new Error(NOT_INITIALIZED_ERROR);
		}
		return this.ax;
	}
}
