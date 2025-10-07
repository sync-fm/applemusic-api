// art[music-videos:url]=c&art[url]=f&extend=artistUrl&fields[albums]=artistName,artistUrl,artwork,contentRating,editorialArtwork,editorialNotes,name,playParams,releaseDate,url,trackCount&fields[artists]=url,name,artwork&format[resources]=map&include[albums]=artists&include[music-videos]=artists&include[songs]=artists&include[stations]=radio-show&l=en-US&limit=21&omit[resource]=autos&platform=web&relate[albums]=artists&relate[songs]=albums&term=okaynico&types=activities,albums,apple-curators,artists,curators,editorial-items,music-movies,music-videos,playlists,record-labels,songs,stations,tv-episodes,uploaded-videos&with=lyricHighlights,lyrics,naturalLanguage,serverBubbles,subtitles

import {
  Resource,
  AlbumAttributes,
  GenericAttributes,
  SongAttributes,
  PlaylistAttributes,
  CuratorAttributes,
  MusicVideoAttributes,
  UploadedVideoAttributes,
  StationAttributes,
  ArtistAttributes,
} from "../../types/SharedResourceTypes";
import { Platform, ResourceType, Locale } from "../../types/SharedSearchParams";

// Enums

export enum WithOption {
  LyricHighlights = "lyricHighlights",
  Lyrics = "lyrics",
  NaturalLanguage = "naturalLanguage",
  ServerBubbles = "serverBubbles",
  Subtitles = "subtitles",
}

export enum MusicVideoArtKey {
  URL = "url",
}

export enum ArtistArtKey {
  URL = "url",
}

export enum ExtendOption {
  ArtistUrl = "artistUrl",
}

export enum FormatResources {
  Map = "map",
}

export enum OmitResource {
  Autos = "autos",
}

export enum FieldsAlbums {
  ArtistName = "artistName",
  ArtistUrl = "artistUrl",
  Artwork = "artwork",
  ContentRating = "contentRating",
  EditorialArtwork = "editorialArtwork",
  EditorialNotes = "editorialNotes",
  Name = "name",
  PlayParams = "playParams",
  ReleaseDate = "releaseDate",
  URL = "url",
  TrackCount = "trackCount",
}

export enum FieldsArtists {
  Name = "name",
  URL = "url",
  Artwork = "artwork",
}

// Interfaces

export interface ArtParams {
  "music-videos"?: Partial<Record<MusicVideoArtKey, string>>;
  url?: string; // Fallback / generic key
}

export interface Fields {
  albums?: FieldsAlbums[];
  artists?: FieldsArtists[];
  // TODO: There's probably more
}

export interface Include {
  albums?: "artists"[];
  "music-videos"?: "artists"[];
  songs?: "artists"[];
  stations?: "radio-show"[];
}

export interface Relate {
  albums?: "artists"[];
  songs?: "albums"[];
}

export interface LimitParams {
  "results:terms"?: number;
  "results:topResults"?: number;
}

export interface SearchEndpointParams {
  term?: string;
  types?: ResourceType[];
  with?: WithOption[];
  platform?: Platform;
  l?: Locale;
  limit?: LimitParams | number;

  art?: ArtParams;
  extend?: ExtendOption | ExtendOption[];
  fields?: Fields;
  format?: {
    resources?: FormatResources;
  };
  include?: Include;
  omit?: {
    resource?: OmitResource;
  };
  relate?: Relate;
}

/** Default search params */
export const SearchEndpointParamsDefaults: SearchEndpointParams = {
  types: [
    ResourceType.Activities,
    ResourceType.Albums,
    ResourceType.AppleCurators,
    ResourceType.Artists,
    ResourceType.Curators,
    ResourceType.EditorialItems,
    ResourceType.MusicMovies,
    ResourceType.MusicVideos,
    ResourceType.Playlists,
    ResourceType.RecordLabels,
    ResourceType.Songs,
    ResourceType.Stations,
    ResourceType.TVEpisodes,
    ResourceType.UploadedVideos,
  ],
  with: [
    WithOption.LyricHighlights,
    WithOption.Lyrics,
    WithOption.NaturalLanguage,
    WithOption.ServerBubbles,
    WithOption.Subtitles,
  ],
  platform: Platform.Web,
  l: Locale.EN_US,
  limit: 21,
  art: {
    "music-videos": { url: "c" },
    url: "f",
  },
  extend: ExtendOption.ArtistUrl,
  fields: {
    albums: [
      FieldsAlbums.ArtistName,
      FieldsAlbums.ArtistUrl,
      FieldsAlbums.Artwork,
      FieldsAlbums.ContentRating,
      FieldsAlbums.EditorialArtwork,
      FieldsAlbums.EditorialNotes,
      FieldsAlbums.Name,
      FieldsAlbums.PlayParams,
      FieldsAlbums.ReleaseDate,
      FieldsAlbums.URL,
      FieldsAlbums.TrackCount,
    ],
    artists: [FieldsArtists.URL, FieldsArtists.Name, FieldsArtists.Artwork],
  },
  format: {
    resources: FormatResources.Map,
  },
  include: {
    albums: ["artists"],
    "music-videos": ["artists"],
    songs: ["artists"],
    stations: ["radio-show"],
  },
  omit: {
    resource: OmitResource.Autos,
  },
  relate: {
    albums: ["artists"],
    songs: ["albums"],
  },
} as const;

export type SearchGroup<TResource extends Resource = Resource> = {
  href?: string;
  next?: string;
  name?: string;
  groupId?: string;
  data: TResource[];
};

export interface SearchResults {
  albums?: SearchGroup<Resource<AlbumAttributes>>;
  artists?: SearchGroup<Resource<ArtistAttributes>>;
  songs?: SearchGroup<Resource<SongAttributes>>;
  playlists?: SearchGroup<Resource<PlaylistAttributes>>;
  curators?: SearchGroup<Resource<CuratorAttributes>>;
  "music-videos"?: SearchGroup<Resource<MusicVideoAttributes>>;
  "video-extras"?: SearchGroup<Resource<UploadedVideoAttributes>>;
  stations?: SearchGroup<Resource<StationAttributes>>;
  top?: SearchGroup<Resource<GenericAttributes>>;

  // allow unknown additional groups
  // [key: string]: SearchGroup<any> | undefined;
}

/* union of typed items for convenience */
export type SearchItem =
  | Resource<AlbumAttributes>
  | Resource<ArtistAttributes>
  | Resource<SongAttributes>
  | Resource<PlaylistAttributes>
  | Resource<MusicVideoAttributes>
  | Resource<UploadedVideoAttributes>
  | Resource<StationAttributes>
  | Resource<CuratorAttributes>
  | Resource<GenericAttributes>;

/* final response shape */
export interface SearchEndpointResponse {
  results: SearchResults;
  resources?: Record<string, Record<string, Resource<GenericAttributes>>>;
  meta?: Record<string, string | number | boolean | null>;
  _sourceUrl?: string;
}
