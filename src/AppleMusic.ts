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

  public readonly Search: AppleMusic.Search;
  public readonly Suggestions: AppleMusic.Suggestions;
  public readonly Hints: AppleMusic.Hints;
  public readonly Albums: AppleMusic.Albums;
  public readonly Songs: AppleMusic.Songs;
  public readonly Artists: AppleMusic.Artists;
  public readonly MusicVideos: AppleMusic.MusicVideos;

  /**
   * Structured logger used across the Apple Music client.
   */
  public log: Logger = new Logger({
    destinations: [DestinationName.Console],
    level: LogLevel.Log,
  });

  /**
   * Mutable configuration backing this client instance.
   * @category Configuration
   */
  public config: AppleMusicConfig = new AppleMusicConfig();

  public constructor(config?: AppleMusicConfigParams) {
    this.config = new AppleMusicConfig(config);
    this.Search = new AppleMusic.Search(
      () => this.assertInitialized(),
      () =>
        this.requireEndpoint(
          this.searchEndpoint,
          "Search endpoint not initialized"
        )
    );
    this.Suggestions = new AppleMusic.Suggestions(
      () => this.assertInitialized(),
      () =>
        this.requireEndpoint(
          this.suggestionsEndpoint,
          "Suggestions endpoint not initialized"
        )
    );
    this.Hints = new AppleMusic.Hints(
      () => this.assertInitialized(),
      () =>
        this.requireEndpoint(
          this.hintsEndpoint,
          "Hints endpoint not initialized"
        )
    );
    this.Albums = new AppleMusic.Albums(
      () => this.assertInitialized(),
      () =>
        this.requireEndpoint(
          this.albumsEndpoint,
          "Albums endpoint not initialized"
        )
    );
    this.Songs = new AppleMusic.Songs(
      () => this.assertInitialized(),
      () =>
        this.requireEndpoint(
          this.songsEndpoint,
          "Songs endpoint not initialized"
        )
    );
    this.Artists = new AppleMusic.Artists(
      () => this.assertInitialized(),
      () =>
        this.requireEndpoint(
          this.artistsEndpoint,
          "Artists endpoint not initialized"
        )
    );
    this.MusicVideos = new AppleMusic.MusicVideos(
      () => this.assertInitialized(),
      () =>
        this.requireEndpoint(
          this.musicVideosEndpoint,
          "Music Videos endpoint not initialized"
        )
    );
  }

  private assertInitialized(): void {
    if (!this.initialized) {
      throw new Error("Apple Music client not initialized. Call init() first.");
    }
  }

  private requireEndpoint<T>(endpoint: T | null, message: string): T {
    if (!endpoint) {
      throw new Error(message);
    }
    return endpoint;
  }

  /**
   * Initialize the client by acquiring an authenticated Axios instance and preparing endpoints.
   * @category Lifecycle
   */
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

  /**
   * Perform a lightweight request to validate the configured developer token.
   * @category Lifecycle
   */
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
  type EnsureInitialized = () => void;

  export class Search {
    public constructor(
      private readonly ensureInitialized: EnsureInitialized,
      private readonly getEndpoint: () => SearchEndpoint
    ) {}

    public async search(
      params: SearchEndpointTypes.SearchEndpointParams
    ): Promise<SearchEndpointTypes.SearchEndpointResponse> {
      this.ensureInitialized();
      return this.getEndpoint().search(params);
    }
  }

  export class Suggestions {
    public constructor(
      private readonly ensureInitialized: EnsureInitialized,
      private readonly getEndpoint: () => SuggestionsEndpoint
    ) {}

    public async suggestions(
      params: SuggestionsEndpointTypes.SuggestionsEndpointParams
    ): Promise<SuggestionsEndpointTypes.SearchSuggestionsResponse> {
      this.ensureInitialized();
      return this.getEndpoint().suggestions(params);
    }
  }

  export class Hints {
    public constructor(
      private readonly ensureInitialized: EnsureInitialized,
      private readonly getEndpoint: () => HintsEndpoint
    ) {}

    public async hints(
      params: HintsEndpointTypes.HintsEndpointParams
    ): Promise<HintsEndpointTypes.HintsResponse> {
      this.ensureInitialized();
      return this.getEndpoint().hints(params);
    }
  }

  export class Albums {
    public constructor(
      private readonly ensureInitialized: EnsureInitialized,
      private readonly getEndpoint: () => AlbumsEndpoint
    ) {}

    public async get(
      params: AlbumsEndpointTypes.AlbumParams
    ): Promise<AlbumsEndpointTypes.AlbumsResponse> {
      this.ensureInitialized();
      return this.getEndpoint().get(params);
    }

    public async getView(
      params: AlbumsEndpointTypes.AlbumViewParams
    ): Promise<AlbumsEndpointTypes.AlbumsViewResponse> {
      this.ensureInitialized();
      return this.getEndpoint().getView(params);
    }

    public async getRelationship<
      T extends AlbumsEndpointTypes.AlbumRelationshipName = AlbumsEndpointTypes.AlbumRelationshipName
    >(
      params: AlbumsEndpointTypes.AlbumRelationshipParams
    ): Promise<AlbumsEndpointTypes.AlbumsRelationshipResponse<T>> {
      this.ensureInitialized();
      return this.getEndpoint().getRelationship<T>(params);
    }
  }

  export class Artists {
    public constructor(
      private readonly ensureInitialized: EnsureInitialized,
      private readonly getEndpoint: () => ArtistsEndpoint
    ) {}

    public async get(
      params: ArtistsEndpointTypes.ArtistParams
    ): Promise<ArtistsEndpointTypes.ArtistsResponse> {
      this.ensureInitialized();
      return this.getEndpoint().get(params);
    }

    public async getView(
      params: ArtistsEndpointTypes.ArtistViewParams
    ): Promise<ArtistsEndpointTypes.ArtistsViewResponse> {
      this.ensureInitialized();
      return this.getEndpoint().getView(params);
    }

    public async getRelationship<
      T extends ArtistsEndpointTypes.ArtistRelationshipName = ArtistsEndpointTypes.ArtistRelationshipName
    >(
      params: ArtistsEndpointTypes.ArtistRelationshipParams
    ): Promise<ArtistsEndpointTypes.ArtistsRelationshipResponse<T>> {
      this.ensureInitialized();
      return this.getEndpoint().getRelationship<T>(params);
    }
  }

  export class Songs {
    public constructor(
      private readonly ensureInitialized: EnsureInitialized,
      private readonly getEndpoint: () => SongsEndpoint
    ) {}

    public async get(
      params: SongsEndpointTypes.SongParams
    ): Promise<SongsEndpointTypes.SongsResponse> {
      this.ensureInitialized();
      return this.getEndpoint().get(params);
    }

    public async getRelationship<
      T extends SongsEndpointTypes.SongRelationshipName = SongsEndpointTypes.SongRelationshipName
    >(
      params: SongsEndpointTypes.SongsRelationshipParams
    ): Promise<SongsEndpointTypes.SongsRelationshipResponse<T>> {
      this.ensureInitialized();
      return this.getEndpoint().getRelationship<T>(params);
    }
  }

  export class MusicVideos {
    public constructor(
      private readonly ensureInitialized: EnsureInitialized,
      private readonly getEndpoint: () => MusicVideosEndpoint
    ) {}

    public async get(
      params: MusicVideosEndpointTypes.MusicVideoParams
    ): Promise<MusicVideosEndpointTypes.MusicVideosResponse> {
      this.ensureInitialized();
      return this.getEndpoint().get(params);
    }

    public async getView(
      params: MusicVideosEndpointTypes.MusicVideoViewParams
    ): Promise<MusicVideosEndpointTypes.MusicVideoViewResponse> {
      this.ensureInitialized();
      return this.getEndpoint().getView(params);
    }

    public async getRelationship<
      T extends MusicVideosEndpointTypes.MusicVideoRelationshipName = MusicVideosEndpointTypes.MusicVideoRelationshipName
    >(
      params: MusicVideosEndpointTypes.MusicVideoRelationshipParams
    ): Promise<MusicVideosEndpointTypes.MusicVideoRelationshipResponse<T>> {
      this.ensureInitialized();
      return this.getEndpoint().getRelationship<T>(params);
    }
  }

  export import SearchTypes = SearchEndpointTypes;
  export import SuggestionsTypes = SuggestionsEndpointTypes;
  export import HintsTypes = HintsEndpointTypes;
  export import AlbumsTypes = AlbumsEndpointTypes;
  export import ArtistsTypes = ArtistsEndpointTypes;
  export import MusicVideosTypes = MusicVideosEndpointTypes;
  export import SongsTypes = SongsEndpointTypes;
}

export { AppleMusicConfig } from "./utils/Config";
export type { AppleMusicConfigParams } from "./utils/Config";
export { AuthType } from "./utils/Config";
export { Region } from "./types/SharedSearchParams";
