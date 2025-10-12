/**
 * Type definitions supporting the Songs endpoint.
 *
 * @module EndpointTypes/Songs
 * @category Endpoint Types
 */
import type {
	AlbumAttributes,
	ArtistAttributes,
	GenericAttributes,
	MusicVideoAttributes,
	RelationshipRef,
	Resource,
	SongAttributes,
	StationAttributes,
} from "../../types/SharedResourceTypes";
import {
	type AllowedViews,
	Locale,
	Platform,
} from "../../types/SharedSearchParams";
import type { RelationshipWithRefs } from "../../types/shared/Relationships";

export type { RelationshipWithRefs } from "../../types/shared/Relationships";

// ────────────────────────────────
// Enums
// ────────────────────────────────

export enum ExtendOption {
	ArtistUrl = "artistUrl", // documented Apple extension
	AudioVariants = "audioVariants",
}

export enum IncludeOption {
	Albums = "albums",
	Artists = "artists",
	Composers = "composers",
	Genres = "genres",
	Library = "library",
	MusicVideos = "music-videos",
	Station = "station",
}

// ────────────────────────────────
// Resource Shapes
// ────────────────────────────────

export type SongAlbumResource = Resource<AlbumAttributes> & { type: "albums" };
export type SongArtistResource = Resource<ArtistAttributes> & {
	type: "artists";
};
export type SongComposerResource = Resource<ArtistAttributes> & {
	type: "artists";
};
export type SongGenreResource = Resource<GenericAttributes> & {
	type: "genres";
};
export type SongLibraryResource = Resource<GenericAttributes> & {
	type: "library-songs";
};
export type SongMusicVideoResource = Resource<MusicVideoAttributes> & {
	type: "music-videos";
};
export type SongStationResource = Resource<StationAttributes> & {
	type: "stations";
};

export type SongRelationshipResourceMap = {
	[IncludeOption.Albums]: SongAlbumResource;
	[IncludeOption.Artists]: SongArtistResource;
	[IncludeOption.Composers]: SongComposerResource;
	[IncludeOption.Genres]: SongGenreResource;
	[IncludeOption.Library]: SongLibraryResource;
	[IncludeOption.MusicVideos]: SongMusicVideoResource;
	[IncludeOption.Station]: SongStationResource;
};

export type SongRelationshipName = keyof SongRelationshipResourceMap;

export interface SongRelationships {
	[IncludeOption.Albums]?: RelationshipWithRefs<
		RelationshipRef & { attributes?: AlbumAttributes }
	>;
	[IncludeOption.Artists]?: RelationshipWithRefs<
		RelationshipRef & { attributes?: ArtistAttributes }
	>;
	[IncludeOption.Composers]?: RelationshipWithRefs<
		RelationshipRef & { attributes?: ArtistAttributes }
	>;
	[IncludeOption.Genres]?: RelationshipWithRefs<
		RelationshipRef & { attributes?: GenericAttributes }
	>;
	[IncludeOption.Library]?: RelationshipWithRefs<
		RelationshipRef & { attributes?: GenericAttributes }
	>;
	[IncludeOption.MusicVideos]?: RelationshipWithRefs<
		RelationshipRef & { attributes?: MusicVideoAttributes }
	>;
	[IncludeOption.Station]?: RelationshipWithRefs<
		RelationshipRef & { attributes?: StationAttributes }
	>;
	[k: string]: RelationshipWithRefs | undefined;
}

export interface SongResource extends Resource<SongAttributes> {
	type: "songs";
	relationships?: SongRelationships;
	meta?: Record<string, unknown>;
}

// ────────────────────────────────
// Query Parameters Interfaces
// ────────────────────────────────

export interface SongRequestOptions {
	platform?: Platform;
	l?: Locale;
	include?: IncludeOption[];
	extend?: ExtendOption[];
	views?: AllowedViews<"songs">[];
}

/**
 * Query params for fetching a single catalog song.
 * `GET /v1/catalog/{storefront}/songs/{id}`
 */
/**
 * @expand
 * Identifier and query options accepted by {@link SongsEndpoint#get}.
 */
export interface SongParams extends SongRequestOptions {
	id: string;
}

/**
 * Query params for fetching a song relationship directly.
 * `GET /v1/catalog/{storefront}/songs/{id}/{relationship}`
 */
export interface SongRelationshipOptions {
	platform?: Platform;
	l?: Locale;
	include?: IncludeOption[];
	extend?: ExtendOption[];
	limit?: number;
}

/**
 * @expand
 * Parameters accepted by {@link SongsEndpoint#getRelationship}.
 */
export interface SongsRelationshipParams extends SongRelationshipOptions {
	id: string;
	relationship: SongRelationshipName;
}

export const SongParamsDefaults: SongRequestOptions = {
	platform: Platform.Web,
	l: Locale.EN_US,
};

export const SongsRelationshipParamsDefaults: SongRelationshipOptions = {
	platform: Platform.Web,
	l: Locale.EN_US,
	limit: 5,
};

export interface SongsResponse {
	data: SongResource[];
	href?: string;
	next?: string;
	meta: {
		metrics?: {
			dataSetId?: string;
		};
		[k: string]: unknown;
	};
}

export interface SongsRelationshipResponse<
	T extends SongRelationshipName = SongRelationshipName,
> {
	data: SongRelationshipResourceMap[T][];
	href?: string;
	next?: string;
	meta?: Record<string, unknown>;
}
