/**
 * Apple Music catalog music videos endpoint.
 *
 * @module Endpoints/MusicVideos
 */
import axios, { type AxiosInstance } from "axios";
import * as parser from "./parser";

export * as MusicVideosEndpointTypes from "./types";

import { getAuthenticatedAxios } from "../../utils/AxiosManager";
import type { AppleMusicConfig } from "../../utils/Config";
import * as MusicVideosEndpointTypes from "./types";

const NOT_INITIALIZED_ERROR =
	"MusicVideosEndpoint.init() must be called before performing requests.";

/**
 * Strongly-typed helper for the Apple Music music video endpoint.
 *
 * @category Endpoints
 */
export class MusicVideosEndpoint {
	private ax: AxiosInstance | null = null;
	private apiBase: string;

	/** @internal */
	constructor(config: AppleMusicConfig) {
		this.apiBase = `${config.getBaseURL()}/v1/catalog/${
			config.region
		}/music-videos/`;
	}

	/** @internal */
	public async init(): Promise<void> {
		this.ax = await getAuthenticatedAxios();
	}

	/**
	 * Fetch a catalog music video by identifier.
	 *
	 * @expandType MusicVideosEndpointTypes.MusicVideoParams
	 * @param params - {@link MusicVideosEndpointTypes.MusicVideoParams | MusicVideoParams} containing the music video identifier and optional query filters.
	 * @returns Complete music video resource payload returned by Apple Music.
	 *
	 * @throws {@link Error} When the endpoint has not been initialized.
	 * @throws {@link Error} When Apple Music returns an unexpected response.
	 *
	 * @example
	 * ```ts
	 * const video = await appleMusic.MusicVideos.get({ id: "1440936011" });
	 * ```
	 */
	public async get(
		params: MusicVideosEndpointTypes.MusicVideoParams,
	): Promise<MusicVideosEndpointTypes.MusicVideosResponse> {
		if (!params.id) {
			throw new Error("MusicVideoParams.id is required");
		}

		const { id, ...rest } = params;
		const query = parser.buildMusicVideoQuery(rest);
		const url = `${this.apiBase}${id}${query ? `?${query}` : ""}`;
		const client = this.requireClient();

		try {
			const res = await client.get(url);
			if (!res.data) {
				throw new Error("Got none or invalid data from music video request");
			}
			return res.data as MusicVideosEndpointTypes.MusicVideosResponse;
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response?.status === 404) {
				return {
					data: [],
					meta: {},
				};
			}
			throw new Error(
				`Got non-200 status code when trying to get music video!${String(
					error,
				)}`,
			);
		}
	}

	/**
	 * Fetch a curated relationship view on a music video.
	 *
	 * @remarks
	 * Wraps `GET /v1/catalog/{storefront}/music-videos/{id}/view/{view}`.
	 *
	 * @param params - {@link MusicVideosEndpointTypes.MusicVideoViewParams | MusicVideoViewParams} describing the music video identifier, view name, and optional query options.
	 * @returns A collection representing the requested view.
	 * @expandType MusicVideosEndpointTypes.MusicVideoViewParams
	 *
	 * @throws {@link Error} When the endpoint has not been initialized.
	 * @throws {@link Error} When Apple Music returns an unexpected response.
	 *
	 * @example
	 * ```ts
	 * const similar = await appleMusic.MusicVideos.getView({
	 *   id: "1440936011",
	 *   view: MusicVideosEndpointTypes.MusicVideoViewName.MoreByArtist,
	 * });
	 * ```
	 */
	public async getView(
		params: MusicVideosEndpointTypes.MusicVideoViewParams,
	): Promise<MusicVideosEndpointTypes.MusicVideoViewResponse> {
		if (!params.id) {
			throw new Error("MusicVideoParams.id is required");
		}
		if (!params.view) {
			throw new Error("MusicVideoParams.view is required for getView()");
		}

		const { id, view, ...rest } = params;
		const query = parser.buildMusicVideoQuery(
			rest,
			true,
			true,
			MusicVideosEndpointTypes.MusicVideoViewParamsDefaults,
		);

		const url = `${this.apiBase}${id}/view/${view}${query ? `?${query}` : ""}`;
		const client = this.requireClient();
		try {
			const res = await client.get(url);
			if (!res.data) {
				throw new Error(
					"Got none or invalid data from music video view request",
				);
			}
			return res.data as MusicVideosEndpointTypes.MusicVideoViewResponse;
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
	 * Fetch a direct relationship collection for a music video.
	 *
	 * @remarks
	 * Wraps `GET /v1/catalog/{storefront}/music-videos/{id}/{relationship}`.
	 *
	 * @expandType MusicVideosEndpointTypes.MusicVideoRelationshipParams
	 * @param params - {@link MusicVideosEndpointTypes.MusicVideoRelationshipParams | MusicVideoRelationshipParams} describing the music video identifier, relationship name, and optional query options.
	 * @returns The requested relationship data.
	 *
	 * @throws {@link Error} When the endpoint has not been initialized.
	 * @throws {@link Error} When Apple Music returns an unexpected response.
	 *
	 * @example
	 * ```ts
	 * const artists = await appleMusic.MusicVideos.getRelationship({
	 *   id: "1440936011",
	 *   relationship: MusicVideosEndpointTypes.IncludeOption.Artists,
	 * });
	 * ```
	 */
	public async getRelationship<
		T extends
			MusicVideosEndpointTypes.MusicVideoRelationshipName = MusicVideosEndpointTypes.MusicVideoRelationshipName,
	>(
		params: MusicVideosEndpointTypes.MusicVideoRelationshipParams,
	): Promise<MusicVideosEndpointTypes.MusicVideoRelationshipResponse<T>> {
		if (!params.id) {
			throw new Error("MusicVideoParams.id is required");
		}
		if (!params.relationship) {
			throw new Error(
				"MusicVideoParams.relationship is required for getRelationship()",
			);
		}

		const { id, relationship, ...rest } = params;
		const query = parser.buildMusicVideoQuery(
			rest,
			true,
			true,
			MusicVideosEndpointTypes.MusicVideoRelationshipParamsDefaults,
		);

		const url = `${this.apiBase}${id}/${relationship}${
			query ? `?${query}` : ""
		}`;
		const client = this.requireClient();
		try {
			const res = await client.get(url);
			if (!res.data) {
				throw new Error(
					"Got none or invalid data from music video relationship request",
				);
			}
			return res.data as MusicVideosEndpointTypes.MusicVideoRelationshipResponse<T>;
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response?.status === 404) {
				return {
					data: [],
					meta: {},
				} as MusicVideosEndpointTypes.MusicVideoRelationshipResponse<T>;
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
