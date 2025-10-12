/**
 * Type definitions supporting the Artists endpoint.
 *
 * @module EndpointTypes/Artists
 * @category Endpoint Types
 */
import type {
	AlbumAttributes,
	ArtistAttributes,
	GenericAttributes,
	MusicVideoAttributes,
	PlaylistAttributes,
	RelationshipRef,
	Resource,
	SongAttributes,
	StationAttributes,
} from "../../types/SharedResourceTypes";
import { Locale, Platform } from "../../types/SharedSearchParams";
import type {
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
	EditorialArtwork = "editorialArtwork",
	PlainEditorialNotes = "plainEditorialNotes",
}

export enum IncludeOption {
	Albums = "albums",
	Genres = "genres",
	MusicVideos = "music-videos",
	Playlists = "playlists",
	Station = "station",
}

export enum WithOption {
	Attributes = "attributes",
}

export enum ArtistViewName {
	AppearsOnAlbums = "appears-on-albums",
	CompilationAlbums = "compilation-albums",
	FeaturedAlbums = "featured-albums",
	FeaturedMusicVideos = "featured-music-videos",
	FeaturedPlaylists = "featured-playlists",
	FullAlbums = "full-albums",
	LatestRelease = "latest-release",
	LiveAlbums = "live-albums",
	SimilarArtists = "similar-artists",
	Singles = "singles",
	TopMusicVideos = "top-music-videos",
	TopSongs = "top-songs",
}

// ────────────────────────────────
// Relationship & View helper types
// ────────────────────────────────

export type ArtistAlbumResource = Resource<AlbumAttributes> & {
	type: "albums";
};
export type ArtistPlaylistResource = Resource<PlaylistAttributes> & {
	type: "playlists";
};
export type ArtistMusicVideoResource = Resource<MusicVideoAttributes> & {
	type: "music-videos";
};
export type ArtistSongResource = Resource<SongAttributes> & { type: "songs" };
export type ArtistSimilarArtistResource = Resource<ArtistAttributes> & {
	type: "artists";
};
export type ArtistStationResource = Resource<StationAttributes> & {
	type: "stations";
};

export type ArtistRelationshipResourceMap = {
	[IncludeOption.Albums]: ArtistAlbumResource;
	[IncludeOption.Genres]: Resource<GenericAttributes> & { type: "genres" };
	[IncludeOption.MusicVideos]: ArtistMusicVideoResource;
	[IncludeOption.Playlists]: ArtistPlaylistResource;
	[IncludeOption.Station]: ArtistStationResource;
};

export type ArtistRelationshipName = keyof ArtistRelationshipResourceMap;

export type ArtistViewResourceMap = {
	"appears-on-albums": ArtistAlbumResource;
	"compilation-albums": ArtistAlbumResource;
	"featured-albums": ArtistAlbumResource;
	"featured-music-videos": ArtistMusicVideoResource;
	"featured-playlists": ArtistPlaylistResource;
	"full-albums": ArtistAlbumResource;
	"latest-release": ArtistAlbumResource;
	"live-albums": ArtistAlbumResource;
	"similar-artists": ArtistSimilarArtistResource;
	singles: ArtistAlbumResource;
	"top-music-videos": ArtistMusicVideoResource;
	"top-songs": ArtistSongResource;
};

export interface ArtistRelationships {
	[IncludeOption.Albums]?: RelationshipWithRefs<
		RelationshipRef & { attributes?: AlbumAttributes }
	>;
	[IncludeOption.Genres]?: RelationshipWithRefs;
	[IncludeOption.MusicVideos]?: RelationshipWithRefs<
		RelationshipRef & { attributes?: MusicVideoAttributes }
	>;
	[IncludeOption.Playlists]?: RelationshipWithRefs<
		RelationshipRef & { attributes?: PlaylistAttributes }
	>;
	[IncludeOption.Station]?: RelationshipWithRefs<
		RelationshipRef & { attributes?: StationAttributes }
	>;
	[k: string]: RelationshipWithRefs | undefined;
}

export interface ArtistViews {
	"appears-on-albums"?: RelationshipWithResources<
		ArtistViewResourceMap["appears-on-albums"]
	>;
	"compilation-albums"?: RelationshipWithResources<
		ArtistViewResourceMap["compilation-albums"]
	>;
	"featured-albums"?: RelationshipWithResources<
		ArtistViewResourceMap["featured-albums"]
	>;
	"featured-music-videos"?: RelationshipWithResources<
		ArtistViewResourceMap["featured-music-videos"]
	>;
	"featured-playlists"?: RelationshipWithResources<
		ArtistViewResourceMap["featured-playlists"]
	>;
	"full-albums"?: RelationshipWithResources<
		ArtistViewResourceMap["full-albums"]
	>;
	"latest-release"?: RelationshipWithResources<
		ArtistViewResourceMap["latest-release"]
	>;
	"live-albums"?: RelationshipWithResources<
		ArtistViewResourceMap["live-albums"]
	>;
	"similar-artists"?: RelationshipWithResources<
		ArtistViewResourceMap["similar-artists"]
	>;
	singles?: RelationshipWithResources<ArtistViewResourceMap["singles"]>;
	"top-music-videos"?: RelationshipWithResources<
		ArtistViewResourceMap["top-music-videos"]
	>;
	"top-songs"?: RelationshipWithResources<ArtistViewResourceMap["top-songs"]>;
	[k: string]: RelationshipWithResources | undefined;
}

export type ArtistResource = Resource<ArtistAttributes> & {
	type: "artists";
	relationships?: ArtistRelationships;
	views?: ArtistViews;
	meta?: Record<string, unknown>;
};

// ────────────────────────────────
// Query Parameters Interfaces
// ────────────────────────────────

export interface ArtistRequestOptions {
	platform?: Platform;
	l?: Locale;
	include?: IncludeOption[];
	views?: ArtistViewName[];
	extend?: ExtendOption[];
	with?: WithOption[];
}

/**
 * @expand
 * Identifier and query options accepted by {@link ArtistsEndpoint#get}.
 */
export interface ArtistParams extends ArtistRequestOptions {
	id: string;
}

export interface ArtistViewOptions {
	platform?: Platform;
	l?: Locale;
	include?: IncludeOption[];
	extend?: ExtendOption[];
	with?: WithOption[];
	limit?: number;
}

/**
 * @expand
 * Parameters accepted by {@link ArtistsEndpoint#getView}.
 */
export interface ArtistViewParams extends ArtistViewOptions {
	id: string;
	view: ArtistViewName;
}

export interface ArtistRelationshipOptions {
	platform?: Platform;
	l?: Locale;
	include?: IncludeOption[];
	extend?: ExtendOption[];
	limit?: number;
}

/**
 * @expand
 * Parameters accepted by {@link ArtistsEndpoint#getRelationship}.
 */
export interface ArtistRelationshipParams extends ArtistRelationshipOptions {
	id: string;
	relationship: ArtistRelationshipName;
}

export const ArtistParamsDefaults: ArtistRequestOptions = {
	platform: Platform.Web,
	l: Locale.EN_US,
};

export const ArtistViewParamsDefaults: ArtistViewOptions = {
	platform: Platform.Web,
	l: Locale.EN_US,
	limit: 25,
};

export const ArtistRelationshipParamsDefaults: ArtistRelationshipOptions = {
	platform: Platform.Web,
	l: Locale.EN_US,
	limit: 25,
};

export interface ArtistsResponse {
	data: ArtistResource[];
	meta: {
		metrics?: {
			dataSetId?: string;
		};
		[k: string]: unknown;
	};
	href?: string;
	next?: string;
}

export interface ArtistsViewResponse {
	data: ArtistViewResourceMap[keyof ArtistViewResourceMap][];
	href?: string;
	next?: string;
	meta: {
		metrics?: {
			dataSetId?: string;
		};
		[k: string]: unknown;
	};
}

export interface ArtistsRelationshipResponse<
	T extends ArtistRelationshipName = ArtistRelationshipName,
> {
	data: ArtistRelationshipResourceMap[T][];
	href?: string;
	meta?: Record<string, unknown>;
	next?: string;
}
