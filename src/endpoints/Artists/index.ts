/**
 * Apple Music catalog artist endpoint.
 *
 * @module Endpoints/Artists
 */
import axios, { type AxiosInstance } from "axios";
import * as parser from "./parser";

export * as ArtistsEndpointTypes from "./types";

import { getAuthenticatedAxios } from "../../utils/AxiosManager";
import type { AppleMusicConfig } from "../../utils/Config";
import * as ArtistsEndpointTypes from "./types";

const NOT_INITIALIZED_ERROR =
	"ArtistsEndpoint.init() must be called before performing requests.";

/**
 * Strongly-typed helper for the Apple Music artists endpoint.
 *
 * @category Endpoints
 */
export class ArtistsEndpoint {
	private ax: AxiosInstance | null = null;
	private apiBase: string;

	/** @internal */
	constructor(config: AppleMusicConfig) {
		this.apiBase = `${config.getBaseURL()}/v1/catalog/${
			config.region
		}/artists/`;
	}

	/** @internal */
	public async init(): Promise<void> {
		this.ax = await getAuthenticatedAxios();
	}

	/**
	 * Fetch a catalog artist by identifier.
	 *
	 * @expandType ArtistsEndpointTypes.ArtistParams
	 * @param params - {@link ArtistsEndpointTypes.ArtistParams | ArtistParams} containing the artist identifier and optional query filters.
	 * @returns Complete artist resource payload returned by Apple Music.
	 *
	 * @throws {@link Error} When the endpoint has not been initialized.
	 * @throws {@link Error} When Apple Music returns an unexpected response.
	 *
	 * @example
	 * ```ts
	 * const artist = await appleMusic.Artists.get({ id: "909253" });
	 * console.log(artist.data[0].attributes?.name);
	 * ```
	 */
	public async get(
		params: ArtistsEndpointTypes.ArtistParams,
	): Promise<ArtistsEndpointTypes.ArtistsResponse> {
		if (!params.id) {
			throw new Error("ArtistParams.id is required");
		}

		const { id, ...rest } = params;
		const query = parser.buildArtistQuery(rest);
		const url = `${this.apiBase}${id}${query ? `?${query}` : ""}`;
		const client = this.requireClient();

		try {
			const res = await client.get(url);
			if (!res.data) {
				throw new Error("Got none or invalid data from artist request");
			}
			return res.data as ArtistsEndpointTypes.ArtistsResponse;
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response?.status === 404) {
				return {
					data: [],
					meta: {},
				};
			}
			throw new Error(
				`Got non-200 status code when trying to get artist!${String(error)}`,
			);
		}
	}

	/**
	 * Fetch a curated relationship view on an artist.
	 *
	 * @remarks
	 * Wraps `GET /v1/catalog/{storefront}/artists/{id}/view/{view}`.
	 *
	 * @expandType ArtistsEndpointTypes.ArtistViewParams
	 * @param params - {@link ArtistsEndpointTypes.ArtistViewParams | ArtistViewParams} describing the artist identifier, view name, and optional query options.
	 * @returns A collection representing the requested view.
	 *
	 * @throws {@link Error} When the endpoint has not been initialized.
	 * @throws {@link Error} When Apple Music returns an unexpected response.
	 *
	 * @example
	 * ```ts
	 * const playlists = await appleMusic.Artists.getView({
	 *   id: "909253",
	 *   view: ArtistsEndpointTypes.ArtistViewName.FeaturedPlaylists,
	 * });
	 * ```
	 */
	public async getView(
		params: ArtistsEndpointTypes.ArtistViewParams,
	): Promise<ArtistsEndpointTypes.ArtistsViewResponse> {
		if (!params.id) {
			throw new Error("ArtistParams.id is required");
		}
		if (!params.view) {
			throw new Error("ArtistParams.view is required for getView()");
		}

		const { id, view, ...rest } = params;
		const query = parser.buildArtistQuery(
			rest,
			true,
			true,
			ArtistsEndpointTypes.ArtistViewParamsDefaults,
		);

		const url = `${this.apiBase}${id}/view/${view}${query ? `?${query}` : ""}`;
		const client = this.requireClient();
		try {
			const res = await client.get(url);
			if (!res.data) {
				throw new Error("Got none or invalid data from artist view request");
			}
			return res.data as ArtistsEndpointTypes.ArtistsViewResponse;
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response?.status === 404) {
				return {
					data: [],
					meta: {},
				};
			}
			throw error;
		}
	}

	/**
	 * Fetch a direct relationship collection for an artist.
	 *
	 * @remarks
	 * Wraps `GET /v1/catalog/{storefront}/artists/{id}/{relationship}`.
	 *
	 * @expandType ArtistsEndpointTypes.ArtistRelationshipParams
	 * @param params - {@link ArtistsEndpointTypes.ArtistRelationshipParams | ArtistRelationshipParams} describing the artist identifier, relationship name, and optional query options.
	 * @returns The requested relationship data.
	 *
	 * @throws {@link Error} When the endpoint has not been initialized.
	 * @throws {@link Error} When Apple Music returns an unexpected response.
	 *
	 * @example
	 * ```ts
	 * const albums = await appleMusic.Artists.getRelationship({
	 *   id: "909253",
	 *   relationship: ArtistsEndpointTypes.IncludeOption.Albums,
	 * });
	 * ```
	 */
	public async getRelationship<
		T extends
			ArtistsEndpointTypes.ArtistRelationshipName = ArtistsEndpointTypes.ArtistRelationshipName,
	>(
		params: ArtistsEndpointTypes.ArtistRelationshipParams,
	): Promise<ArtistsEndpointTypes.ArtistsRelationshipResponse<T>> {
		if (!params.id) {
			throw new Error("ArtistRelationshipParams.id is required");
		}
		if (!params.relationship) {
			throw new Error(
				"ArtistRelationshipParams.relationship is required for getRelationship()",
			);
		}

		const { id, relationship, ...rest } = params;
		const query = parser.buildArtistQuery(
			rest,
			true,
			true,
			ArtistsEndpointTypes.ArtistRelationshipParamsDefaults,
		);

		const url = `${this.apiBase}${id}/${relationship}${
			query ? `?${query}` : ""
		}`;
		const client = this.requireClient();
		try {
			const res = await client.get(url);
			if (!res.data) {
				throw new Error(
					"Got none or invalid data from artist relationship request",
				);
			}
			return res.data as ArtistsEndpointTypes.ArtistsRelationshipResponse<T>;
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response?.status === 404) {
				return {
					data: [],
				} as ArtistsEndpointTypes.ArtistsRelationshipResponse<T>;
			}
			throw error;
		}
	}

	/** @internal */
	private requireClient(): AxiosInstance {
		if (!this.ax) {
			throw new Error(NOT_INITIALIZED_ERROR);
		}
		return this.ax;
	}
}
