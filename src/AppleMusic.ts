import { AxiosInstance } from "axios";
import { Region } from "./types/SharedSearchParams";
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

const createInitGuard =
  <TArgs extends unknown[], TResult>(endpoint: string) =>
  async (..._args: TArgs): Promise<TResult> => {
    throw new Error(
      `${endpoint} endpoint not initialized. Call init() before using this client.`
    );
  };

export const BaseURLs: Record<AuthType, string> = {
  [AuthType.Scraped]: "https://amp-api-edge.music.apple.com",
  [AuthType.DeveloperToken]: "https://api.music.apple.com",
  [AuthType.UserTokenViaDevToken]: "https://api.music.apple.com",
  [AuthType.UserTokenUnofficial]: "https://amp-api-edge.music.apple.com",
};

export class AppleMusic {
  private client: AxiosInstance;
  public log: Logger = new Logger({
    destinations: [DestinationName.Console],
    level: LogLevel.Log,
  });

  public config: AppleMusicConfig = {
    region: Region.US,
    authType: AuthType.Scraped,
  };

  public Search = {
    Get: createInitGuard<
      [SearchEndpointTypes.SearchEndpointParams],
      SearchEndpointTypes.SearchEndpointResponse
    >("Search"),
  };
  public Suggestions = {
    Get: createInitGuard<
      [SuggestionsEndpointTypes.SuggestionsEndpointParams],
      SuggestionsEndpointTypes.SearchSuggestionsResponse
    >("Suggestions"),
  };
  public Hints = {
    Get: createInitGuard<
      [HintsEndpointTypes.HintsEndpointParams],
      HintsEndpointTypes.HintsResponse
    >("Hints"),
  };
  public Albums = {
    Get: createInitGuard<
      [AlbumsEndpointTypes.AlbumParams],
      AlbumsEndpointTypes.AlbumsResponse
    >("Albums"),
    GetView: createInitGuard<
      [AlbumsEndpointTypes.AlbumViewParams],
      AlbumsEndpointTypes.AlbumsViewResponse
    >("Albums"),
  };
  public Artists = {
    Get: createInitGuard<
      [ArtistsEndpointTypes.ArtistParams],
      ArtistsEndpointTypes.ArtistsResponse
    >("Artists"),
    GetView: createInitGuard<
      [ArtistsEndpointTypes.ArtistViewParams],
      ArtistsEndpointTypes.ArtistsViewResponse
    >("Artists"),
  };
  public MusicVideos = {
    Get: createInitGuard<
      [MusicVideosEndpointTypes.MusicVideoParams],
      MusicVideosEndpointTypes.MusicVideosResponse
    >("Music Videos"),
    GetView: createInitGuard<
      [MusicVideosEndpointTypes.MusicVideoViewParams],
      MusicVideosEndpointTypes.MusicVideoViewResponse
    >("Music Videos"),
  };
  public Songs = {
    Get: createInitGuard<
      [SongsEndpointTypes.SongParams],
      SongsEndpointTypes.SongsResponse
    >("Songs"),
    GetRelationship: createInitGuard<
      [SongsEndpointTypes.SongsRelationshipParams],
      SongsEndpointTypes.SongsRelationshipResponse
    >("Songs"),
  };

  public constructor(config?: AppleMusicConfig) {
    this.config = { ...this.config, ...config };
  }

  public async init() {
    this.client = await getAuthenticatedAxios();
    this.log.debug("Base Apple Music client ready");

    const searchEndpoint = new SearchEndpoint(Region.US);
    await searchEndpoint.init();
    this.Search.Get = searchEndpoint.search.bind(searchEndpoint);
    this.log.debug("Search endpoint ready");

    const suggestionsEndpoint = new SuggestionsEndpoint(Region.US);
    await suggestionsEndpoint.init();
    this.Suggestions.Get =
      suggestionsEndpoint.suggestions.bind(suggestionsEndpoint);
    this.log.debug("Suggestions endpoint ready");

    const hintsEndpoint = new HintsEndpoint(Region.US);
    await hintsEndpoint.init();
    this.Hints.Get = hintsEndpoint.hints.bind(hintsEndpoint);
    this.log.debug("Hints endpoint ready");

    const albumsEndpoint = new AlbumsEndpoint(Region.US);
    await albumsEndpoint.init();
    this.Albums.Get = albumsEndpoint.get.bind(albumsEndpoint);
    this.Albums.GetView = albumsEndpoint.getView.bind(albumsEndpoint);
    this.log.debug("Albums endpoint ready");

    const songsEndpoint = new SongsEndpoint(Region.US);
    await songsEndpoint.init();
    this.Songs.Get = songsEndpoint.get.bind(songsEndpoint);
    this.Songs.GetRelationship =
      songsEndpoint.getRelationship.bind(songsEndpoint);
    this.log.debug("Songs endpoint ready");

    const artistsEndpoint = new ArtistsEndpoint(Region.US);
    await artistsEndpoint.init();
    this.Artists.Get = artistsEndpoint.get.bind(artistsEndpoint);
    this.Artists.GetView = artistsEndpoint.getView.bind(artistsEndpoint);
    this.log.debug("Artists endpoint ready");

    const musicVideosEndpoint = new MusicVideosEndpoint(Region.US);
    await musicVideosEndpoint.init();
    this.MusicVideos.Get = musicVideosEndpoint.get.bind(musicVideosEndpoint);
    this.MusicVideos.GetView =
      musicVideosEndpoint.getView.bind(musicVideosEndpoint);
    this.log.debug("Music Videos endpoint ready");

    this.log.debug("Apple Music API initialized :333");
  }

  public async verifyTokenValidity(): Promise<boolean> {
    try {
      const res = await this.client.get(
        "https://amp-api-edge.music.apple.com/v1/test"
      );
      if (res.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

export namespace AppleMusic {
  export import SearchTypes = SearchEndpointTypes;
  export import SuggestionsTypes = SuggestionsEndpointTypes;
  export import HintsTypes = HintsEndpointTypes;
  export import AlbumsTypes = AlbumsEndpointTypes;
  export import ArtistsTypes = ArtistsEndpointTypes;
  export import MusicVideosTypes = MusicVideosEndpointTypes;
  export import SongsTypes = SongsEndpointTypes;
}
