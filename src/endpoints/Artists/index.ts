import axios, { AxiosInstance } from "axios";
import * as parser from "./parser";
import { Region } from "../../types/SharedSearchParams";
export * as ArtistsEndpointTypes from "./types";
import * as ArtistsEndpointTypes from "./types";
import { getAuthenticatedAxios } from "../../utils/AxiosManager";

export class ArtistsEndpoint {
    private ax: AxiosInstance;
    private apiBase = "https://amp-api-edge.music.apple.com/v1/catalog/";

    constructor(region: Region = Region.US) {
        this.apiBase += `${region}/artists/`;
    }

    public async init() {
        this.ax = await getAuthenticatedAxios();
    }

    /**
     * Fetch a catalog artist by ID with optional query params (include, extend, views).
     */
    public async get(params: ArtistsEndpointTypes.ArtistParams): Promise<ArtistsEndpointTypes.ArtistsResponse> {
        if (!params.id) {
            throw new Error("ArtistParams.id is required");
        }

        const { id, ...rest } = params;
        const query = parser.buildArtistQuery(rest);
        const url = `${this.apiBase}${id}${query ? "?" + query : ""}`;

        try {
            const res = await this.ax.get(url);
            if (!res.data) {
                throw new Error("Got none or invalid data from artist request");
            }
            return res.data as ArtistsEndpointTypes.ArtistsResponse;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return {
                    data: [],
                    meta: {}
                };
            }
            throw new Error("Got non-200 status code when trying to get artist!" + error);
        }
    }

    /**
     * Fetch a specific relationship view on an artist.
     * Example: /artists/{id}/view/appears-on
     */
    public async getView(
        params: ArtistsEndpointTypes.ArtistViewParams
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
            ArtistsEndpointTypes.ArtistViewParamsDefaults
        );

        const url = `${this.apiBase}${id}/view/${view}${query ? "?" + query : ""}`;
        try {
            const res = await this.ax.get(url);
            if (!res.data) {
                throw new Error("Got none or invalid data from artist view request");
            }
            return res.data as ArtistsEndpointTypes.ArtistsViewResponse;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return {
                    data: [],
                    meta: {}
                };
            }
            throw error;
        }
    }
}
