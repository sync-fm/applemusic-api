import axios, { AxiosInstance } from "axios";
import * as parser from "./parser";
import { Region } from "../../types/SharedSearchParams";
export * as AlbumsEndpointTypes from "./types";
import * as AlbumsEndpointTypes from "./types";
import { getAuthenticatedAxios } from "../../utils/AxiosManager";

export class AlbumsEndpoint {
    private ax: AxiosInstance;
    private apiBase = "https://amp-api-edge.music.apple.com/v1/catalog/";

    constructor(region: Region = Region.US) {
        this.apiBase += `${region}/albums/`;
    }

    public async init() {
        this.ax = await getAuthenticatedAxios();
    }

    /**
     * Fetch a catalog album by ID with optional query params (include, extend, views).
     */
    public async get(params: AlbumsEndpointTypes.AlbumParams): Promise<AlbumsEndpointTypes.AlbumsResponse> {
        if (!params.id) {
            throw new Error("AlbumParams.id is required");
        }

        const { id, ...rest } = params;
        const query = parser.buildAlbumQuery(rest);
        const url = `${this.apiBase}${id}${query ? "?" + query : ""}`;

        try {
            const res = await this.ax.get(url);
            if (!res.data) {
                throw new Error("Got none or invalid data from album request");
            }
            return res.data as AlbumsEndpointTypes.AlbumsResponse;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return {
                    data: [],
                    meta: {}
                };
            }
            throw new Error("Got non-200 status code when trying to get album!" + error);
        }
    }

    /**
     * Fetch a specific relationship view on an album.
     * Example: /albums/{id}/view/appears-on
     */
    public async getView(
        params: AlbumsEndpointTypes.AlbumViewParams
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
            AlbumsEndpointTypes.AlbumViewParamsDefaults
        );

        const url = `${this.apiBase}${id}/view/${view}${query ? "?" + query : ""}`;
        try {
            const res = await this.ax.get(url);
            if (!res.data) {
                throw new Error("Got none or invalid data from album view request");
            }
            return res.data as AlbumsEndpointTypes.AlbumsViewResponse;
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
