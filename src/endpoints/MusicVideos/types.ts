import {
  AlbumAttributes,
  ArtistAttributes,
  GenericAttributes,
  MusicVideoAttributes,
  RelationshipRef,
  Resource,
  SongAttributes,
} from "../../types/SharedResourceTypes";
import { Locale, Platform } from "../../types/SharedSearchParams";
import {
  RelationshipWithRefs,
  RelationshipWithResources,
} from "../../types/shared/Relationships";
export type {
  RelationshipWithRefs,
  RelationshipWithResources,
} from "../../types/shared/Relationships";

// ────────────────────────────────
// Enums & option sets
// ────────────────────────────────

export enum ExtendOption {
  ArtistUrl = "artistUrl",
}

export enum IncludeOption {
  Albums = "albums",
  Artists = "artists",
  Genres = "genres",
  Library = "library",
  Songs = "songs",
}

export enum WithOption {
  Attributes = "attributes",
}

export enum MusicVideoViewName {
  MoreByArtist = "more-by-artist",
  MoreInGenre = "more-in-genre",
}

// ────────────────────────────────
// Relationship & View helper types
// ────────────────────────────────

export type MusicVideoAlbumResource = Resource<AlbumAttributes> & {
  type: "albums";
};
export type MusicVideoArtistResource = Resource<ArtistAttributes> & {
  type: "artists";
};
export type MusicVideoGenreResource = Resource<GenericAttributes> & {
  type: "genres";
};
export type MusicVideoLibraryResource = Resource<GenericAttributes> & {
  type: "library-music-videos";
};
export type MusicVideoSongResource = Resource<SongAttributes> & {
  type: "songs";
};
export type MusicVideoResource = Resource<MusicVideoAttributes> & {
  type: "music-videos";
  relationships?: MusicVideoRelationships;
  views?: MusicVideoViews;
  meta?: Record<string, unknown>;
};

export type MusicVideoRelationshipResourceMap = {
  [IncludeOption.Albums]: MusicVideoAlbumResource;
  [IncludeOption.Artists]: MusicVideoArtistResource;
  [IncludeOption.Genres]: MusicVideoGenreResource;
  [IncludeOption.Library]: MusicVideoLibraryResource;
  [IncludeOption.Songs]: MusicVideoSongResource;
};

export type MusicVideoRelationshipName =
  keyof MusicVideoRelationshipResourceMap;

export type MusicVideoViewResourceMap = {
  "more-by-artist": MusicVideoResource;
  "more-in-genre": MusicVideoResource;
};

export interface MusicVideoRelationships {
  [IncludeOption.Albums]?: RelationshipWithRefs<
    RelationshipRef & { attributes?: AlbumAttributes }
  >;
  [IncludeOption.Artists]?: RelationshipWithRefs<
    RelationshipRef & { attributes?: ArtistAttributes }
  >;
  [IncludeOption.Genres]?: RelationshipWithRefs;
  [IncludeOption.Library]?: RelationshipWithRefs<
    RelationshipRef & { attributes?: GenericAttributes }
  >;
  [IncludeOption.Songs]?: RelationshipWithRefs<
    RelationshipRef & { attributes?: SongAttributes }
  >;
  [k: string]: RelationshipWithRefs | undefined;
}

export interface MusicVideoViews {
  "more-by-artist"?: RelationshipWithResources<
    MusicVideoViewResourceMap["more-by-artist"]
  >;
  "more-in-genre"?: RelationshipWithResources<
    MusicVideoViewResourceMap["more-in-genre"]
  >;
  [k: string]: RelationshipWithResources | undefined;
}

// ────────────────────────────────
// Query Parameters Interfaces
// ────────────────────────────────

export interface MusicVideoRequestOptions {
  platform?: Platform;
  l?: Locale;
  include?: IncludeOption[];
  views?: MusicVideoViewName[];
  extend?: ExtendOption[];
  with?: WithOption[];
}

export interface MusicVideoParams extends MusicVideoRequestOptions {
  id: string;
}

export interface MusicVideoViewOptions {
  platform?: Platform;
  l?: Locale;
  include?: IncludeOption[];
  extend?: ExtendOption[];
  with?: WithOption[];
  limit?: number;
}

export interface MusicVideoRelationshipOptions {
  platform?: Platform;
  l?: Locale;
  include?: IncludeOption[];
  extend?: ExtendOption[];
  limit?: number;
}

export interface MusicVideoViewParams extends MusicVideoViewOptions {
  id: string;
  view: MusicVideoViewName;
}

export interface MusicVideoRelationshipParams
  extends MusicVideoRelationshipOptions {
  id: string;
  relationship: MusicVideoRelationshipName;
}

export const MusicVideoParamsDefaults: MusicVideoRequestOptions = {
  platform: Platform.Web,
  l: Locale.EN_US,
};

export const MusicVideoViewParamsDefaults: MusicVideoViewOptions = {
  platform: Platform.Web,
  l: Locale.EN_US,
  limit: 15,
};

export const MusicVideoRelationshipParamsDefaults: MusicVideoRelationshipOptions =
  {
    platform: Platform.Web,
    l: Locale.EN_US,
    limit: 10,
  };

export interface MusicVideosResponse {
  data: MusicVideoResource[];
  meta: {
    metrics?: {
      dataSetId?: string;
    };
    [k: string]: unknown;
  };
  href?: string;
  next?: string;
}

export interface MusicVideoViewResponse {
  data: MusicVideoViewResourceMap[keyof MusicVideoViewResourceMap][];
  href?: string;
  next?: string;
  meta: {
    metrics?: {
      dataSetId?: string;
    };
    [k: string]: unknown;
  };
}

export interface MusicVideoRelationshipResponse<
  T extends MusicVideoRelationshipName = MusicVideoRelationshipName
> {
  data: MusicVideoRelationshipResourceMap[T][];
  href?: string;
  meta?: Record<string, unknown>;
  next?: string;
}
