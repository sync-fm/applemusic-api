import { AxiosInstance } from "axios";
import { getAuthenticatedAxios } from "./utils/AxiosManager";
import { SearchEndpointTypes, SearchEndpoint } from "./endpoints/Search";
import {
  SuggestionsEndpointTypes,
  SuggestionsEndpoint,
} from "./endpoints/Suggestions";
import { HintsEndpointTypes, HintsEndpoint } from "./endpoints/Hints";
import { AlbumsEndpointTypes, AlbumsEndpoint } from "./endpoints/Albums";
import { SongsEndpointTypes, SongsEndpoint } from "./endpoints/Songs";
import { ArtistsEndpoint, ArtistsEndpointTypes } from "./endpoints/Artists";
import {
  MusicVideosEndpoint,
  MusicVideosEndpointTypes,
} from "./endpoints/MusicVideos";
import { DestinationName, Logger, LogLevel } from "./utils/Logger";
import { AppleMusicConfig, AppleMusicConfigParams } from "./utils/Config";

export class AppleMusic {
  private client: AxiosInstance | null = null;
  private initialized = false;

  // Endpoint instances
  private searchEndpoint: SearchEndpoint | null = null;
  private suggestionsEndpoint: SuggestionsEndpoint | null = null;
  private hintsEndpoint: HintsEndpoint | null = null;
  private albumsEndpoint: AlbumsEndpoint | null = null;
  private songsEndpoint: SongsEndpoint | null = null;
  private artistsEndpoint: ArtistsEndpoint | null = null;
  private musicVideosEndpoint: MusicVideosEndpoint | null = null;

  public log: Logger = new Logger({
    destinations: [DestinationName.Console],
    level: LogLevel.Log,
  });

  public config: AppleMusicConfig = new AppleMusicConfig();

  private assertInitialized(): void {
    if (!this.initialized) {
      throw new Error("Apple Music client not initialized. Call init() first.");
    }
  }

  public Search = {
    Get: async (
      params: SearchEndpointTypes.SearchEndpointParams
    ): Promise<SearchEndpointTypes.SearchEndpointResponse> => {
      this.assertInitialized();
      return this.searchEndpoint!.search(params);
    },
  };

  public Suggestions = {
    Get: async (
      params: SuggestionsEndpointTypes.SuggestionsEndpointParams
    ): Promise<SuggestionsEndpointTypes.SearchSuggestionsResponse> => {
      this.assertInitialized();
      return this.suggestionsEndpoint!.suggestions(params);
    },
  };

  public Hints = {
    Get: async (
      params: HintsEndpointTypes.HintsEndpointParams
    ): Promise<HintsEndpointTypes.HintsResponse> => {
      this.assertInitialized();
      return this.hintsEndpoint!.hints(params);
    },
  };

  public Albums = {
    Get: async (
      params: AlbumsEndpointTypes.AlbumParams
    ): Promise<AlbumsEndpointTypes.AlbumsResponse> => {
      this.assertInitialized();
      return this.albumsEndpoint!.get(params);
    },
    GetView: async (
      params: AlbumsEndpointTypes.AlbumViewParams
    ): Promise<AlbumsEndpointTypes.AlbumsViewResponse> => {
      this.assertInitialized();
      return this.albumsEndpoint!.getView(params);
    },
    GetRelationship: async <
      T extends AlbumsEndpointTypes.AlbumRelationshipName = AlbumsEndpointTypes.AlbumRelationshipName
    >(
      params: AlbumsEndpointTypes.AlbumRelationshipParams
    ): Promise<AlbumsEndpointTypes.AlbumsRelationshipResponse<T>> => {
      this.assertInitialized();
      return this.albumsEndpoint!.getRelationship<T>(params);
    },
  };

  public Artists = {
    Get: async (
      params: ArtistsEndpointTypes.ArtistParams
    ): Promise<ArtistsEndpointTypes.ArtistsResponse> => {
      this.assertInitialized();
      return this.artistsEndpoint!.get(params);
    },
    GetView: async (
      params: ArtistsEndpointTypes.ArtistViewParams
    ): Promise<ArtistsEndpointTypes.ArtistsViewResponse> => {
      this.assertInitialized();
      return this.artistsEndpoint!.getView(params);
    },
    GetRelationship: async <
      T extends ArtistsEndpointTypes.ArtistRelationshipName = ArtistsEndpointTypes.ArtistRelationshipName
    >(
      params: ArtistsEndpointTypes.ArtistRelationshipParams
    ): Promise<ArtistsEndpointTypes.ArtistsRelationshipResponse<T>> => {
      this.assertInitialized();
      return this.artistsEndpoint!.getRelationship<T>(params);
    },
  };

  public MusicVideos = {
    Get: async (
      params: MusicVideosEndpointTypes.MusicVideoParams
    ): Promise<MusicVideosEndpointTypes.MusicVideosResponse> => {
      this.assertInitialized();
      return this.musicVideosEndpoint!.get(params);
    },
    GetView: async (
      params: MusicVideosEndpointTypes.MusicVideoViewParams
    ): Promise<MusicVideosEndpointTypes.MusicVideoViewResponse> => {
      this.assertInitialized();
      return this.musicVideosEndpoint!.getView(params);
    },
    GetRelationship: async <
      T extends MusicVideosEndpointTypes.MusicVideoRelationshipName = MusicVideosEndpointTypes.MusicVideoRelationshipName
    >(
      params: MusicVideosEndpointTypes.MusicVideoRelationshipParams
    ): Promise<MusicVideosEndpointTypes.MusicVideoRelationshipResponse<T>> => {
      this.assertInitialized();
      return this.musicVideosEndpoint!.getRelationship<T>(params);
    },
  };

  public Songs = {
    Get: async (
      params: SongsEndpointTypes.SongParams
    ): Promise<SongsEndpointTypes.SongsResponse> => {
      this.assertInitialized();
      return this.songsEndpoint!.get(params);
    },
    GetRelationship: async <
      T extends SongsEndpointTypes.SongRelationshipName = SongsEndpointTypes.SongRelationshipName
    >(
      params: SongsEndpointTypes.SongsRelationshipParams
    ): Promise<SongsEndpointTypes.SongsRelationshipResponse<T>> => {
      this.assertInitialized();
      return this.songsEndpoint!.getRelationship<T>(params);
    },
  };

  public constructor(config?: AppleMusicConfigParams) {
    this.config = new AppleMusicConfig(config);
  }

  public async init(): Promise<void> {
    this.client = await getAuthenticatedAxios();
    this.log.debug("Base Apple Music client ready");

    this.searchEndpoint = new SearchEndpoint(this.config);
    await this.searchEndpoint.init();
    this.log.debug("Search endpoint ready");

    this.suggestionsEndpoint = new SuggestionsEndpoint(this.config);
    await this.suggestionsEndpoint.init();
    this.log.debug("Suggestions endpoint ready");

    this.hintsEndpoint = new HintsEndpoint(this.config);
    await this.hintsEndpoint.init();
    this.log.debug("Hints endpoint ready");

    this.albumsEndpoint = new AlbumsEndpoint(this.config);
    await this.albumsEndpoint.init();
    this.log.debug("Albums endpoint ready");

    this.songsEndpoint = new SongsEndpoint(this.config);
    await this.songsEndpoint.init();
    this.log.debug("Songs endpoint ready");

    this.artistsEndpoint = new ArtistsEndpoint(this.config);
    await this.artistsEndpoint.init();
    this.log.debug("Artists endpoint ready");

    this.musicVideosEndpoint = new MusicVideosEndpoint(this.config);
    await this.musicVideosEndpoint.init();
    this.log.debug("Music Videos endpoint ready");

    this.initialized = true;
    this.log.debug("Apple Music API initialized :333");
  }

  public async verifyTokenValidity(): Promise<boolean> {
    this.assertInitialized();
    try {
      const res = await this.client!.get(
        "https://amp-api-edge.music.apple.com/v1/test"
      );
      return res.status === 200;
    } catch {
      return false;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AppleMusic {
  export import SearchTypes = SearchEndpointTypes;
  export import SuggestionsTypes = SuggestionsEndpointTypes;
  export import HintsTypes = HintsEndpointTypes;
  export import AlbumsTypes = AlbumsEndpointTypes;
  export import ArtistsTypes = ArtistsEndpointTypes;
  export import MusicVideosTypes = MusicVideosEndpointTypes;
  export import SongsTypes = SongsEndpointTypes;
}
