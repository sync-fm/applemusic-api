import axios, { AxiosInstance } from "axios";
import * as parser from "./parser";
import { Region } from "../../types/SharedSearchParams";
export * as SongsEndpointTypes from "./types";
import * as SongsEndpointTypes from "./types";
import { getAuthenticatedAxios } from "../../utils/AxiosManager";

export class SongsEndpoint {
    private ax: AxiosInstance;
    private apiBase = "https://amp-api-edge.music.apple.com/v1/catalog/";

    constructor(region: Region = Region.US) {
        this.apiBase += `${region}/songs/`;
    }

    public async init() {
        this.ax = await getAuthenticatedAxios();
    }

    /**
     * Fetch a catalog song by ID with optional query params (include, extend, views).
     */
    public async get(params: SongsEndpointTypes.SongParams): Promise<SongsEndpointTypes.SongsResponse> {
        if (!params.id) {
            throw new Error("SongParams.id is required");
        }

        const { id, ...rest } = params;
        const query = parser.buildSongQuery(rest);
        const url = `${this.apiBase}${id}${query ? "?" + query : ""}`;

        try {
            const res = await this.ax.get(url);
            if (!res.data) {
                throw new Error("Got none or invalid data from song request");
            }
            return res.data as SongsEndpointTypes.SongsResponse;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return {
                    data: [],
                    meta: {}
                };
            }
            throw new Error("Got non-200 status code when trying to get song!" + error);
        }
    }

    /**
     * Fetch a specific relationship view on an song.
     * Example: /songs/{id}/view/appears-on
     */
    public async getRelationship(
        params: SongsEndpointTypes.SongsRelationshipParams
    ): Promise<SongsEndpointTypes.SongsRelationshipResponse> {
        if (!params.id) {
            throw new Error("SongParams.id is required");
        }
        if (!params.view) {
            throw new Error("SongParams.view is required for getView()");
        }

        const { id, view, ...rest } = params;
        const query = parser.buildSongQuery(rest, true, true, SongsEndpointTypes.SongsRelationshipParamsDefaults);

        const url = `${this.apiBase}${id}/${view}${query ? "?" + query : ""}`;
        try {
            const res = await this.ax.get(url);
            if (!res.data) {
                throw new Error("Got none or invalid data from song view request");
            }
            return res.data as SongsEndpointTypes.SongsRelationshipResponse;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return {
                    data: [],
                };
            }
            throw error
        }
    }
}
