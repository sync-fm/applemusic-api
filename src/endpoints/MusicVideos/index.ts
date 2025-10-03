import axios, { AxiosInstance } from "axios";
import * as parser from "./parser";
import { Region } from "../../types/SharedSearchParams";
export * as MusicVideosEndpointTypes from "./types";
import * as MusicVideosEndpointTypes from "./types";
import { getAuthenticatedAxios } from "../../utils/AxiosManager";

export class MusicVideosEndpoint {
    private ax: AxiosInstance;
    private apiBase = "https://amp-api-edge.music.apple.com/v1/catalog/";

    constructor(region: Region = Region.US) {
        this.apiBase += `${region}/music-videos/`;
    }

    public async init() {
        this.ax = await getAuthenticatedAxios();
    }

    /**
     * Fetch a catalog music video by ID with optional query params (include, extend, views).
     */
    public async get(
        params: MusicVideosEndpointTypes.MusicVideoParams
    ): Promise<MusicVideosEndpointTypes.MusicVideosResponse> {
        if (!params.id) {
            throw new Error("MusicVideoParams.id is required");
        }

        const { id, ...rest } = params;
        const query = parser.buildMusicVideoQuery(rest);
        const url = `${this.apiBase}${id}${query ? "?" + query : ""}`;

        try {
            const res = await this.ax.get(url);
            if (!res.data) {
                throw new Error("Got none or invalid data from music video request");
            }
            return res.data as MusicVideosEndpointTypes.MusicVideosResponse;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return {
                    data: [],
                    meta: {}
                };
            }
            throw new Error("Got non-200 status code when trying to get music video!" + error);
        }
    }

    /**
     * Fetch a specific relationship view on a music video.
     * Example: /music-videos/{id}/view/more-by-artist
     */
    public async getView(
        params: MusicVideosEndpointTypes.MusicVideoViewParams
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
            MusicVideosEndpointTypes.MusicVideoViewParamsDefaults
        );

        const url = `${this.apiBase}${id}/view/${view}${query ? "?" + query : ""}`;
        try {
            const res = await this.ax.get(url);
            if (!res.data) {
                throw new Error("Got none or invalid data from music video view request");
            }
            return res.data as MusicVideosEndpointTypes.MusicVideoViewResponse;
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

    /**
     * Fetch a relationship on a music video directly.
     * Example: /music-videos/{id}/artists
     */
    public async getRelationship<
        T extends MusicVideosEndpointTypes.MusicVideoRelationshipName = MusicVideosEndpointTypes.MusicVideoRelationshipName
    >(
        params: MusicVideosEndpointTypes.MusicVideoRelationshipParams
    ): Promise<MusicVideosEndpointTypes.MusicVideoRelationshipResponse<T>> {
        if (!params.id) {
            throw new Error("MusicVideoParams.id is required");
        }
        if (!params.relationship) {
            throw new Error("MusicVideoParams.relationship is required for getRelationship()");
        }

        const { id, relationship, ...rest } = params;
        const query = parser.buildMusicVideoQuery(
            rest,
            true,
            true,
            MusicVideosEndpointTypes.MusicVideoRelationshipParamsDefaults
        );

        const url = `${this.apiBase}${id}/${relationship}${query ? "?" + query : ""}`;
        try {
            const res = await this.ax.get(url);
            if (!res.data) {
                throw new Error("Got none or invalid data from music video relationship request");
            }
            return res.data as MusicVideosEndpointTypes.MusicVideoRelationshipResponse<T>;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return {
                    data: [],
                    meta: {},
                } as MusicVideosEndpointTypes.MusicVideoRelationshipResponse<T>;
            }
            throw error;
        }
    }
}
