import { AxiosInstance } from "axios";
import * as parser from "./parser";
export * as SuggestionsEndpointTypes from "./types";
import * as SuggestionsEndpointTypes from "./types";
import { getAuthenticatedAxios } from "../../utils/AxiosManager";
import { AppleMusicConfig } from "../../utils/Config";

export class SuggestionsEndpoint {
  private ax: AxiosInstance;
  private apiBase: string;
  private config: AppleMusicConfig;

  constructor(config: AppleMusicConfig) {
    this.config = config;
    this.apiBase = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/search/suggestions`;
  }

  public async init(): Promise<void> {
    this.ax = await getAuthenticatedAxios();
  }

  public async suggestions(
    params: SuggestionsEndpointTypes.SuggestionsEndpointParams
  ): Promise<SuggestionsEndpointTypes.SearchSuggestionsResponse> {
    const res = await this.ax.get(
      `${this.apiBase}?${parser.buildSearchQuery(params)}`
    );
    if (res.status !== 200) {
      throw new Error(
        "Got non-200 status code when trying to get suggestions!"
      );
    }
    if (!res.data) {
      throw new Error("Got none or invalid data from suggestions request");
    }

    return res.data as SuggestionsEndpointTypes.SearchSuggestionsResponse;
  }
}
