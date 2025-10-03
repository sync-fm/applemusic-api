import { AxiosInstance } from "axios";
import * as parser from "./parser";
import { Region } from "../../types/SharedSearchParams";
export * as HintsEndpointTypes from "./types";
import * as HintsEndpointTypes from "./types";
import { getAuthenticatedAxios } from "../../utils/AxiosManager";

export class HintsEndpoint {
    private ax: AxiosInstance;
    private apiBase = "https://amp-api-edge.music.apple.com/v1/catalog/";

    constructor(region: Region = Region.US) {
        this.apiBase += `${region}/search/hints`;
    }

    public async init() {
        this.ax = await getAuthenticatedAxios();
    }

    public async hints(params: HintsEndpointTypes.HintsEndpointParams): Promise<HintsEndpointTypes.HintsResponse> {
        const res = (await this.ax.get(this.apiBase + "?" + parser.buildSearchQuery(params)));
        if (res.status !== 200) {
            throw new Error("Got non-200 status code when trying to get hints!")
        }
        if (!res.data) {
            throw new Error("Got none or invalid data from hints request")
        }

        return res.data as HintsEndpointTypes.HintsResponse;
    }

}