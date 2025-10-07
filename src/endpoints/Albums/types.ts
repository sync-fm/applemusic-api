import {
  Artwork,
  EditorialArtwork,
  EditorialNotes,
  MusicVideoAttributes,
  PlayParams,
  PlaylistAttributes,
  Relationship,
  RelationshipRef,
  Resource,
  SongAttributes,
  GenericAttributes,
  ArtistAttributes,
} from "../../types/SharedResourceTypes";
import { Platform, Locale, AllowedViews } from "../../types/SharedSearchParams";

// ────────────────────────────────
// Enums
// ────────────────────────────────

export enum ExtendOption {
  ArtistUrl = "artistUrl", // documented Apple extension
}

export enum IncludeOption {
  Artists = "artists",
  Genres = "genres",
  Library = "library",
  RecordLabels = "record-labels",
  Tracks = "tracks",
}

export enum WithOption {
  Attributes = "attributes", // only valid value per Apple docs
}

// ────────────────────────────────
// Relationship & View helper types
// ────────────────────────────────

export type AlbumRelationshipName =
  | IncludeOption.Artists
  | IncludeOption.Genres
  | IncludeOption.Library
  | IncludeOption.RecordLabels
  | IncludeOption.Tracks;

export type AlbumViewName = AllowedViews<"albums">;

export interface RelationshipWithResources<T extends Resource = Resource> {
  href?: string;
  data?: T[];
  meta?: Record<string, unknown>;
  next?: string;
}

export type AlbumTrackResource = Resource<
  SongAttributes | MusicVideoAttributes
> & { type: "songs" | "music-videos" };

export type AlbumSummaryResource = Resource<AlbumAttributes> & {
  type: "albums";
};

export type AlbumRelationshipResourceMap = {
  [IncludeOption.Artists]: Resource<ArtistAttributes> & { type: "artists" };
  [IncludeOption.Genres]: Resource<GenericAttributes> & { type: "genres" };
  [IncludeOption.Library]: Resource<GenericAttributes> & {
    type: "library-albums";
  };
  [IncludeOption.RecordLabels]: Resource<GenericAttributes> & {
    type: "record-labels";
  };
  [IncludeOption.Tracks]: AlbumTrackResource;
};

export type AlbumViewResourceMap = {
  "appears-on": Resource<PlaylistAttributes> & { type: "playlists" };
  "other-versions": AlbumSummaryResource;
  "related-albums": AlbumSummaryResource;
  "related-videos": Resource<MusicVideoAttributes> & { type: "music-videos" };
};

export interface RelationshipWithRefs<
  T extends RelationshipRef = RelationshipRef
> extends Relationship {
  data?: T[];
}

export interface AlbumRelationships {
  [IncludeOption.Artists]?: RelationshipWithRefs;
  [IncludeOption.Genres]?: RelationshipWithRefs;
  [IncludeOption.Library]?: RelationshipWithRefs;
  [IncludeOption.RecordLabels]?: RelationshipWithRefs;
  [IncludeOption.Tracks]?: RelationshipWithRefs<
    RelationshipRef & { attributes?: SongAttributes | MusicVideoAttributes }
  >;
  [k: string]: RelationshipWithRefs | undefined;
}

export interface AlbumViews {
  "appears-on"?: RelationshipWithResources<AlbumViewResourceMap["appears-on"]>;
  "other-versions"?: RelationshipWithResources<
    AlbumViewResourceMap["other-versions"]
  >;
  "related-albums"?: RelationshipWithResources<
    AlbumViewResourceMap["related-albums"]
  >;
  "related-videos"?: RelationshipWithResources<
    AlbumViewResourceMap["related-videos"]
  >;
  [k: string]: RelationshipWithResources | undefined;
}

// ────────────────────────────────
// Query Parameters Interfaces
// ────────────────────────────────

/**
 * Query params for fetching a single catalog album.
 * GET /v1/catalog/{storefront}/albums/{id}
 */
export interface AlbumRequestOptions {
  platform?: Platform;
  l?: Locale;
  include?: IncludeOption[];
  views?: AlbumViewName[];
  extend?: ExtendOption[];
  with?: WithOption[]; // e.g. ["attributes"]
}

export interface AlbumParams extends AlbumRequestOptions {
  id: string;
}

export interface AlbumViewOptions {
  platform?: Platform;
  l?: Locale;
  include?: IncludeOption[];
  extend?: ExtendOption[];
  with?: WithOption[];
  limit?: number;
}

export interface AlbumViewParams extends AlbumViewOptions {
  id: string;
  view: AlbumViewName;
}

export interface AlbumRelationshipOptions {
  platform?: Platform;
  l?: Locale;
  include?: IncludeOption[];
  extend?: ExtendOption[];
  limit?: number;
}

export interface AlbumRelationshipParams extends AlbumRelationshipOptions {
  id: string;
  relationship: AlbumRelationshipName;
}

export const AlbumParamsDefaults: AlbumRequestOptions = {
  platform: Platform.Web,
  l: Locale.EN_US,
};

export const AlbumViewParamsDefaults: AlbumViewOptions = {
  platform: Platform.Web,
  l: Locale.EN_US,
  limit: 5,
};

export const AlbumRelationshipParamsDefaults: AlbumRelationshipOptions = {
  platform: Platform.Web,
  l: Locale.EN_US,
  limit: 10,
};

export interface AlbumResource extends AlbumSummaryResource {
  relationships?: AlbumRelationships;
  views?: AlbumViews;
  meta?: Record<string, unknown>;
}

export interface AlbumAttributes {
  artistName?: string;
  artistUrl?: string;
  artwork?: Artwork;
  audioTraits?: string[]; // e.g. ["atmos", "lossless"]
  contentRating?: string;
  copyright?: string;
  editorialArtwork?: EditorialArtwork; // e.g. staticDetailSquare, subscriptionHero ...
  editorialNotes?: EditorialNotes;
  genreNames?: string[];
  isCompilation?: boolean;
  isComplete?: boolean;
  isMasteredForItunes?: boolean;
  isPrerelease?: boolean;
  isSingle?: boolean;
  name?: string;
  playParams?: PlayParams;
  recordLabel?: string;
  releaseDate?: string; // YYYY-MM-DD
  trackCount?: number;
  upc?: string;
  url?: string;
  [k: string]: unknown; // catch-all for extra fields
}

export interface AlbumsViewResponse {
  data: AlbumViewResourceMap[keyof AlbumViewResourceMap][];
  href?: string;
  next?: string;
  meta: {
    metrics?: {
      dataSetId?: string;
    };
    [k: string]: unknown;
  };
}

export interface AlbumsResponse {
  data: AlbumResource[];
  meta: {
    metrics?: {
      dataSetId?: string;
    };
    [k: string]: unknown;
  };
  href?: string;
  next?: string;
}

export interface AlbumsRelationshipResponse<
  T extends AlbumRelationshipName = AlbumRelationshipName
> {
  data: AlbumRelationshipResourceMap[T][];
  href?: string;
  next?: string;
  meta?: Record<string, unknown>;
}
