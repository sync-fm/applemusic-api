/**
 * Type definitions supporting the Hints endpoint.
 *
 * @module EndpointTypes/Hints
 * @category Endpoint Types
 */
import { Locale, Platform } from "../../types/SharedSearchParams";

// Enums

export enum WithOption {
	LyricHighlights = "lyricHighlights",
	Lyrics = "lyrics",
	NaturalLanguage = "naturalLanguage",
	ServerBubbles = "serverBubbles",
	Subtitles = "subtitles",
}

export enum Kind {
	Terms = "terms",
	TopResults = "topResults",
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

/**
 * @expand
 * Parameters accepted by {@link HintsEndpoint#get}.
 */
export interface HintsEndpointParams {
	/**
	 * Search term to fetch hints for.
	 */
	term: string;
	platform?: Platform;
	l?: Locale;
	limit?: number;
}

export const HintsEndpointParamsDefaults: Partial<HintsEndpointParams> = {
	platform: Platform.Web,
	l: Locale.EN_US,
	limit: 5,
} as const;

export interface HintsResponse {
	results: {
		terms: string[];
	};
	meta: {
		metrics?: {
			dataSetId?: string;
		};
	};
}
