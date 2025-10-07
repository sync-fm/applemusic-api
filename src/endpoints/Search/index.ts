import { AxiosInstance } from "axios";
import { Parser } from "./parser";
export * as SearchEndpointTypes from "./types";
import * as SearchEndpointTypes from "./types";
import { getAuthenticatedAxios } from "../../utils/AxiosManager";
import { AppleMusicConfig } from "../../utils/Config";

const parser = new Parser();
export class SearchEndpoint {
  private ax: AxiosInstance;
  private config: AppleMusicConfig;
  private apiBase = "";

  constructor(config: AppleMusicConfig) {
    this.apiBase = `${config.getBaseURL()}/v1/catalog/`;
    this.apiBase += `${config.region}/search`;

    // Store config for later use
    this.config = config;
  }

  public async init(): Promise<void> {
    this.ax = await getAuthenticatedAxios();
  }

  public async search(
    params: SearchEndpointTypes.SearchEndpointParams
  ): Promise<SearchEndpointTypes.SearchEndpointResponse> {
    const url = `${this.apiBase}?${parser.buildSearchQuery(params)}`;
    const res = await this.ax.get(url);
    if (res.status !== 200) {
      throw new Error("Got non-200 status code when trying to search!");
    }
    if (!res.data) {
      throw new Error("Got none or invalid data from search request");
    }
    return parser.parseToAppleMusicAPI(
      res.data,
      url
    ) as SearchEndpointTypes.SearchEndpointResponse;
  }
}
