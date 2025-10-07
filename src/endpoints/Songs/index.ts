import axios, { AxiosInstance } from "axios";
import * as parser from "./parser";
export * as SongsEndpointTypes from "./types";
import * as SongsEndpointTypes from "./types";
import { getAuthenticatedAxios } from "../../utils/AxiosManager";
import { AppleMusicConfig } from "../../utils/Config";

export class SongsEndpoint {
  private ax: AxiosInstance;
  private apiBase: string;
  private config: AppleMusicConfig;

  constructor(config: AppleMusicConfig) {
    this.config = config;
    this.apiBase = `${config.getBaseURL()}/v1/catalog/${config.region}/songs/`;
  }

  public async init(): Promise<void> {
    this.ax = await getAuthenticatedAxios();
  }

  /**
   * Fetch a catalog song by ID with optional query params (include, extend, views).
   */
  public async get(
    params: SongsEndpointTypes.SongParams
  ): Promise<SongsEndpointTypes.SongsResponse> {
    if (!params.id) {
      throw new Error("SongParams.id is required");
    }

    const { id, ...rest } = params;
    const query = parser.buildSongQuery(rest);
    const url = `${this.apiBase}${id}${query ? `?${query}` : ""}`;

    try {
      const res = await this.ax.get(url);
      if (!res.data) {
        throw new Error("Got none or invalid data from song request");
      }
      return res.data as SongsEndpointTypes.SongsResponse;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return {
          data: [],
          meta: {},
        };
      }
      throw new Error(
        `Got non-200 status code when trying to get song!${String(error)}`
      );
    }
  }

  /**
   * Fetch a specific relationship on a song directly.
   * Example: /songs/{id}/artists
   */
  public async getRelationship<
    T extends SongsEndpointTypes.SongRelationshipName = SongsEndpointTypes.SongRelationshipName
  >(
    params: SongsEndpointTypes.SongsRelationshipParams
  ): Promise<SongsEndpointTypes.SongsRelationshipResponse<T>> {
    if (!params.id) {
      throw new Error("SongsRelationshipParams.id is required");
    }
    if (!params.relationship) {
      throw new Error(
        "SongsRelationshipParams.relationship is required for getRelationship()"
      );
    }

    const { id, relationship, ...rest } = params;
    const query = parser.buildSongQuery(
      rest,
      true,
      true,
      SongsEndpointTypes.SongsRelationshipParamsDefaults
    );

    const url = `${this.apiBase}${id}/${relationship}${
      query ? `?${query}` : ""
    }`;
    try {
      const res = await this.ax.get(url);
      if (!res.data) {
        throw new Error(
          "Got none or invalid data from song relationship request"
        );
      }
      return res.data as SongsEndpointTypes.SongsRelationshipResponse<T>;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return {
          data: [],
        } as SongsEndpointTypes.SongsRelationshipResponse<T>;
      }
      throw error;
    }
  }
}
