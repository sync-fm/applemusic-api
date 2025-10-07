import { AxiosInstance } from "axios";
import * as parser from "./parser";
export * as HintsEndpointTypes from "./types";
import * as HintsEndpointTypes from "./types";
import { getAuthenticatedAxios } from "../../utils/AxiosManager";
import { AppleMusicConfig } from "../../utils/Config";

export class HintsEndpoint {
  private ax: AxiosInstance;
  private apiBase: string;
  private config: AppleMusicConfig;

  constructor(config: AppleMusicConfig) {
    this.config = config;
    this.apiBase = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/search/hints`;
  }

  public async init(): Promise<void> {
    this.ax = await getAuthenticatedAxios();
  }

  public async hints(
    params: HintsEndpointTypes.HintsEndpointParams
  ): Promise<HintsEndpointTypes.HintsResponse> {
    const res = await this.ax.get(
      `${this.apiBase}?${parser.buildSearchQuery(params)}`
    );
    if (res.status !== 200) {
      throw new Error("Got non-200 status code when trying to get hints!");
    }
    if (!res.data) {
      throw new Error("Got none or invalid data from hints request");
    }

    return res.data as HintsEndpointTypes.HintsResponse;
  }
}
