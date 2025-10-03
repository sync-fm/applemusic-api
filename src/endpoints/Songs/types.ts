import { Relationship, RelationshipRef, Resource, SongAttributes } from "../../types/SharedResourceTypes";
import { Platform, Locale, AllowedViews } from "../../types/SharedSearchParams";

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

export interface SongRelationships {
    albums?: Relationship;
    artists?: Relationship;
    composers?: Relationship;
    genres?: Relationship;
    library?: Relationship;
    "music-videos"?: Relationship;
    station?: Relationship;
    [k: string]: Relationship | undefined;
}

export interface SongResource extends Resource<SongAttributes> {
    type: "songs";
    relationships?: SongRelationships;
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
    limit?: number;
}

/**
 * Query params for fetching a single catalog song.
 * GET /v1/catalog/{storefront}/songs/{id}
 */
export interface SongParams extends SongRequestOptions {
    id: string;
}

/**
 * Query params for fetching a song's relationship view directly.
 * GET /v1/catalog/{storefront}/songs/{id}/view/{view}
 */
export interface SongsRelationshipParams extends SongRequestOptions {
    id: string;
    view: AllowedViews<"songs">;
}

export const SongParamsDefaults: SongRequestOptions = {
    platform: Platform.Web,
    l: Locale.EN_US,
};

export const SongsRelationshipParamsDefaults: SongRequestOptions = {
    ...SongParamsDefaults,
    limit: 5,
};

export interface SongsRelationshipResponse {
    data: RelationshipRef[];
}

export interface SongsResponse {
    data: SongResource[];
    meta: {
        metrics?: {
            dataSetId?: string;
        }
    }
}