import { AxiosInstance } from "axios";
import * as parser from "./parser";
import { Region } from "../../types/SharedSearchParams";
export * as SuggestionsEndpointTypes from "./types";
import * as SuggestionsEndpointTypes from "./types";
import { getAuthenticatedAxios } from "../../utils/AxiosManager";

export class SuggestionsEndpoint {
    private ax: AxiosInstance;
    private apiBase = "https://amp-api-edge.music.apple.com/v1/catalog/";

    constructor(region: Region = Region.US) {
        this.apiBase += `${region}/search/suggestions`;
    }

    public async init() {
        this.ax = await getAuthenticatedAxios();
    }

    public async suggestions(params: SuggestionsEndpointTypes.SuggestionsEndpointParams): Promise<SuggestionsEndpointTypes.SearchSuggestionsResponse> {
        const res = (await this.ax.get(this.apiBase + "?" + parser.buildSearchQuery(params)));
        if (res.status !== 200) {
            throw new Error("Got non-200 status code when trying to get suggestions!")
        }
        if (!res.data) {
            throw new Error("Got none or invalid data from suggestions request")
        }

        return res.data as SuggestionsEndpointTypes.SearchSuggestionsResponse;
    }

}