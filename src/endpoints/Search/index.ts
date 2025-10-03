import { AxiosInstance } from "axios";
import { Parser } from "./parser";
export * as SearchEndpointTypes from "./types";
import * as SearchEndpointTypes from "./types";
import { getAuthenticatedAxios } from "../../utils/AxiosManager";
import { Region } from "../../types/SharedSearchParams";

const parser = new Parser()
export class SearchEndpoint {
    private ax: AxiosInstance;
    private apiBase = "https://amp-api-edge.music.apple.com/v1/catalog/";

    constructor(region: Region = Region.US) {
        this.apiBase += `${region}/search`;
    }

    public async init() {
        this.ax = await getAuthenticatedAxios();
    }

    public async search(params: SearchEndpointTypes.SearchEndpointParams): Promise<SearchEndpointTypes.SearchEndpointResponse> {
        const url = this.apiBase + "?" + parser.buildSearchQuery(params)
        const res = (await this.ax.get(url))
        if (res.status !== 200) {
            throw new Error("Got non-200 status code when trying to search!")
        }
        if (!res.data) {
            throw new Error("Got none or invalid data from search request")
        }
        return parser.parseToAppleMusicAPI(res.data, url) as SearchEndpointTypes.SearchEndpointResponse
    }

}