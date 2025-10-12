/**
 * Apple Music catalog songs endpoint.
 *
 * @module Endpoints/Songs
 */
import axios, { type AxiosInstance } from "axios";
import * as parser from "./parser";

export * as SongsEndpointTypes from "./types";

import { getAuthenticatedAxios } from "../../utils/AxiosManager";
import type { AppleMusicConfig } from "../../utils/Config";
import * as SongsEndpointTypes from "./types";

const NOT_INITIALIZED_ERROR =
	"SongsEndpoint.init() must be called before performing requests.";

/**
 * Strongly-typed helper for the Apple Music songs endpoint.
 *
 * @category Endpoints
 */
export class SongsEndpoint {
	private ax: AxiosInstance | null = null;
	private apiBase: string;

	/** @internal */
	constructor(config: AppleMusicConfig) {
		this.apiBase = `${config.getBaseURL()}/v1/catalog/${config.region}/songs/`;
	}

	/** @internal */
	public async init(): Promise<void> {
		this.ax = await getAuthenticatedAxios();
	}

	/**
	 * Fetch a catalog song by identifier.
	 *
	 * @expandType SongsEndpointTypes.SongParams
	 * @param params - {@link SongsEndpointTypes.SongParams | SongParams} containing the song identifier and optional query filters.
	 * @returns Complete song resource payload returned by Apple Music.
	 *
	 * @throws {@link Error} When the endpoint has not been initialized.
	 * @throws {@link Error} When Apple Music returns an unexpected response.
	 *
	 * @example
	 * ```ts
	 * const song = await appleMusic.Songs.get({ id: "1468058165" });
	 * console.log(song.data[0].attributes?.name);
	 * ```
	 */
	public async get(
		params: SongsEndpointTypes.SongParams,
	): Promise<SongsEndpointTypes.SongsResponse> {
		if (!params.id) {
			throw new Error("SongParams.id is required");
		}

		const { id, ...rest } = params;
		const query = parser.buildSongQuery(rest);
		const url = `${this.apiBase}${id}${query ? `?${query}` : ""}`;
		const client = this.requireClient();

		try {
			const res = await client.get(url);
			if (!res.data) {
				throw new Error("Got none or invalid data from song request");
			}
			return res.data as SongsEndpointTypes.SongsResponse;
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response?.status === 404) {
				return {
					data: [],
					meta: {},
				};
			}
			throw new Error(
				`Got non-200 status code when trying to get song!${String(error)}`,
			);
		}
	}

	/**
	 * Fetch a direct relationship collection for a song.
	 *
	 * @remarks
	 * Wraps `GET /v1/catalog/{storefront}/songs/{id}/{relationship}`.
	 *
	 * @expandType SongsEndpointTypes.SongsRelationshipParams
	 * @param params - {@link SongsEndpointTypes.SongsRelationshipParams | SongsRelationshipParams} describing the song identifier, relationship name, and optional query options.
	 * @returns The requested relationship data.
	 *
	 * @throws {@link Error} When the endpoint has not been initialized.
	 * @throws {@link Error} When Apple Music returns an unexpected response.
	 *
	 * @example
	 * ```ts
	 * const artists = await appleMusic.Songs.getRelationship({
	 *   id: "1468058165",
	 *   relationship: SongsEndpointTypes.IncludeOption.Artists,
	 * });
	 * ```
	 */
	public async getRelationship<
		T extends
			SongsEndpointTypes.SongRelationshipName = SongsEndpointTypes.SongRelationshipName,
	>(
		params: SongsEndpointTypes.SongsRelationshipParams,
	): Promise<SongsEndpointTypes.SongsRelationshipResponse<T>> {
		if (!params.id) {
			throw new Error("SongsRelationshipParams.id is required");
		}
		if (!params.relationship) {
			throw new Error(
				"SongsRelationshipParams.relationship is required for getRelationship()",
			);
		}

		const { id, relationship, ...rest } = params;
		const query = parser.buildSongQuery(
			rest,
			true,
			true,
			SongsEndpointTypes.SongsRelationshipParamsDefaults,
		);

		const url = `${this.apiBase}${id}/${relationship}${
			query ? `?${query}` : ""
		}`;
		const client = this.requireClient();
		try {
			const res = await client.get(url);
			if (!res.data) {
				throw new Error(
					"Got none or invalid data from song relationship request",
				);
			}
			return res.data as SongsEndpointTypes.SongsRelationshipResponse<T>;
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response?.status === 404) {
				return {
					data: [],
				} as SongsEndpointTypes.SongsRelationshipResponse<T>;
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
