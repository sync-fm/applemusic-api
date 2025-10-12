/**
 * Apple Music catalog album endpoint.
 *
 * @module Endpoints/Albums
 */
import axios, { type AxiosInstance } from "axios";
import * as parser from "./parser";

export * as AlbumsEndpointTypes from "./types";

import { getAuthenticatedAxios } from "../../utils/AxiosManager";
import type { AppleMusicConfig } from "../../utils/Config";
import * as AlbumsEndpointTypes from "./types";

const NOT_INITIALIZED_ERROR =
	"AlbumsEndpoint.init() must be called before performing requests.";

/**
 * Strongly-typed helper for the Apple Music albums endpoint.
 *
 * @category Endpoints
 */
export class AlbumsEndpoint {
	private ax: AxiosInstance | null = null;
	private apiBase: string;

	/** @internal */
	constructor(config: AppleMusicConfig) {
		this.apiBase = `${config.getBaseURL()}/v1/catalog/${config.region}/albums/`;
	}

	/** @internal */
	public async init(): Promise<void> {
		this.ax = await getAuthenticatedAxios();
	}

	/**
	 * Fetch a catalog album by identifier.
	 *
	 * @expandType AlbumsEndpointTypes.AlbumParams
	 * @param params - {@link AlbumsEndpointTypes.AlbumParams | AlbumParams} containing the album identifier and optional query filters.
	 * @returns Complete album resource payload returned by Apple Music.
	 *
	 * @throws {@link Error} When the endpoint has not been initialized.
	 * @throws {@link Error} When Apple Music returns an unexpected response.
	 *
	 * @example
	 * ```ts
	 * const album = await appleMusic.Albums.get({ id: "310730204" });
	 * console.log(album.data[0].attributes?.name);
	 * ```
	 */
	public async get(
		params: AlbumsEndpointTypes.AlbumParams,
	): Promise<AlbumsEndpointTypes.AlbumsResponse> {
		if (!params.id) {
			throw new Error("AlbumParams.id is required");
		}

		const { id, ...rest } = params;
		const query = parser.buildAlbumQuery(rest);
		const url = `${this.apiBase}${id}${query ? `?${query}` : ""}`;
		const client = this.requireClient();

		try {
			const res = await client.get(url);
			if (!res.data) {
				throw new Error("Got none or invalid data from album request");
			}
			return res.data as AlbumsEndpointTypes.AlbumsResponse;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 404) {
				return {
					data: [],
					meta: {},
				};
			}
			throw new Error(
				`Got non-200 status code when trying to get album!${error}`,
			);
		}
	}

	/**
	 * Fetch a curated relationship view on an album.
	 *
	 * @remarks
	 * Wraps `GET /v1/catalog/{storefront}/albums/{id}/view/{view}`.
	 *
	 * @expandType AlbumsEndpointTypes.AlbumViewParams
	 * @param params - {@link AlbumsEndpointTypes.AlbumViewParams | AlbumViewParams} describing the album identifier, view name, and optional query options.
	 * @returns A collection representing the requested view.
	 *
	 * @throws {@link Error} When the endpoint has not been initialized.
	 * @throws {@link Error} When Apple Music returns an unexpected response.
	 *
	 * @example
	 * ```ts
	 * const livePerformances = await appleMusic.Albums.getView({
	 *   id: "310730204",
	 *   view: "related-videos",
	 * });
	 * ```
	 */
	public async getView(
		params: AlbumsEndpointTypes.AlbumViewParams,
	): Promise<AlbumsEndpointTypes.AlbumsViewResponse> {
		if (!params.id) {
			throw new Error("AlbumParams.id is required");
		}
		if (!params.view) {
			throw new Error("AlbumParams.view is required for getView()");
		}

		const { id, view, ...rest } = params;
		const query = parser.buildAlbumQuery(
			rest,
			true,
			true,
			AlbumsEndpointTypes.AlbumViewParamsDefaults,
		);

		const url = `${this.apiBase}${id}/view/${view}${query ? `?${query}` : ""}`;
		const client = this.requireClient();
		try {
			const res = await client.get(url);
			if (!res.data) {
				throw new Error("Got none or invalid data from album view request");
			}
			return res.data as AlbumsEndpointTypes.AlbumsViewResponse;
		} catch (error) {
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
	 * Fetch a direct relationship collection for an album.
	 *
	 * @remarks
	 * Wraps `GET /v1/catalog/{storefront}/albums/{id}/{relationship}`.
	 *
	 * @expandType AlbumsEndpointTypes.AlbumRelationshipParams
	 * @param params - {@link AlbumsEndpointTypes.AlbumRelationshipParams | AlbumRelationshipParams} describing the album identifier, relationship name, and optional query options.
	 * @returns The requested relationship data.
	 *
	 * @throws {@link Error} When the endpoint has not been initialized.
	 * @throws {@link Error} When Apple Music returns an unexpected response.
	 *
	 * @example
	 * ```ts
	 * const tracks = await appleMusic.Albums.getRelationship({
	 *   id: "310730204",
	 *   relationship: AlbumsEndpointTypes.IncludeOption.Tracks,
	 * });
	 * ```
	 */
	public async getRelationship<
		T extends
			AlbumsEndpointTypes.AlbumRelationshipName = AlbumsEndpointTypes.AlbumRelationshipName,
	>(
		params: AlbumsEndpointTypes.AlbumRelationshipParams,
	): Promise<AlbumsEndpointTypes.AlbumsRelationshipResponse<T>> {
		if (!params.id) {
			throw new Error("AlbumRelationshipParams.id is required");
		}
		if (!params.relationship) {
			throw new Error(
				"AlbumRelationshipParams.relationship is required for getRelationship()",
			);
		}

		const { id, relationship, ...rest } = params;
		const query = parser.buildAlbumQuery(
			rest,
			true,
			true,
			AlbumsEndpointTypes.AlbumRelationshipParamsDefaults,
		);

		const url = `${this.apiBase}${id}/${relationship}${
			query ? `?${query}` : ""
		}`;
		const client = this.requireClient();
		try {
			const res = await client.get(url);
			if (!res.data) {
				throw new Error(
					"Got none or invalid data from album relationship request",
				);
			}
			return res.data as AlbumsEndpointTypes.AlbumsRelationshipResponse<T>;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 404) {
				return {
					data: [],
				} as AlbumsEndpointTypes.AlbumsRelationshipResponse<T>;
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
