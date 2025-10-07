import axios, { AxiosInstance } from "axios";
import * as parser from "./parser";
export * as ArtistsEndpointTypes from "./types";
import * as ArtistsEndpointTypes from "./types";
import { getAuthenticatedAxios } from "../../utils/AxiosManager";
import { AppleMusicConfig } from "../../utils/Config";

export class ArtistsEndpoint {
  private ax: AxiosInstance;
  private apiBase: string;
  private config: AppleMusicConfig;

  constructor(config: AppleMusicConfig) {
    this.config = config;
    this.apiBase = `${config.getBaseURL()}/v1/catalog/${
      config.region
    }/artists/`;
  }

  public async init(): Promise<void> {
    this.ax = await getAuthenticatedAxios();
  }

  /**
   * Fetch a catalog artist by ID with optional query params (include, extend, views).
   */
  public async get(
    params: ArtistsEndpointTypes.ArtistParams
  ): Promise<ArtistsEndpointTypes.ArtistsResponse> {
    if (!params.id) {
      throw new Error("ArtistParams.id is required");
    }

    const { id, ...rest } = params;
    const query = parser.buildArtistQuery(rest);
    const url = `${this.apiBase}${id}${query ? `?${query}` : ""}`;

    try {
      const res = await this.ax.get(url);
      if (!res.data) {
        throw new Error("Got none or invalid data from artist request");
      }
      return res.data as ArtistsEndpointTypes.ArtistsResponse;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return {
          data: [],
          meta: {},
        };
      }
      throw new Error(
        `Got non-200 status code when trying to get artist!${String(error)}`
      );
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

    const url = `${this.apiBase}${id}/view/${view}${query ? `?${query}` : ""}`;
    try {
      const res = await this.ax.get(url);
      if (!res.data) {
        throw new Error("Got none or invalid data from artist view request");
      }
      return res.data as ArtistsEndpointTypes.ArtistsViewResponse;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return {
          data: [],
          meta: {},
        };
      }
      throw error;
    }
  }

  /**
   * Fetch a specific relationship for an artist directly.
   * Example: /artists/{id}/{relationship}
   */
  public async getRelationship<
    T extends ArtistsEndpointTypes.ArtistRelationshipName = ArtistsEndpointTypes.ArtistRelationshipName
  >(
    params: ArtistsEndpointTypes.ArtistRelationshipParams
  ): Promise<ArtistsEndpointTypes.ArtistsRelationshipResponse<T>> {
    if (!params.id) {
      throw new Error("ArtistRelationshipParams.id is required");
    }
    if (!params.relationship) {
      throw new Error(
        "ArtistRelationshipParams.relationship is required for getRelationship()"
      );
    }

    const { id, relationship, ...rest } = params;
    const query = parser.buildArtistQuery(
      rest,
      true,
      true,
      ArtistsEndpointTypes.ArtistRelationshipParamsDefaults
    );

    const url = `${this.apiBase}${id}/${relationship}${
      query ? `?${query}` : ""
    }`;
    try {
      const res = await this.ax.get(url);
      if (!res.data) {
        throw new Error(
          "Got none or invalid data from artist relationship request"
        );
      }
      return res.data as ArtistsEndpointTypes.ArtistsRelationshipResponse<T>;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return {
          data: [],
        } as ArtistsEndpointTypes.ArtistsRelationshipResponse<T>;
      }
      throw error;
    }
  }
}
