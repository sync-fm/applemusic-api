/**
 * Fundamental resource attribute shapes shared across Apple Music endpoints.
 *
 * @module SharedTypes/Resources
 * @category Shared Types
 */
export type JSONObject = { [k: string]: any };

export interface Artwork {
	bgColor?: string;
	hasP3?: boolean;
	height?: number;
	width?: number;
	textColor1?: string;
	textColor2?: string;
	textColor3?: string;
	textColor4?: string;
	textGradient?: string[];
	url?: string;
}

export interface PlayParams {
	id: string;
	kind: string;
	// extra optional fields observed in the raw data (radio/station variants)
	format?: string;
	hasDrm?: boolean;
	mediaType?: number;
	stationHash?: string;
	versionHash?: string;
	// allow extension for unknown fields
	[k: string]: any;
}

export interface Preview {
	url: string;
	hlsUrl?: string;
	artwork?: Artwork;
}

/* editorial blocks (albums / playlists often include these) */
export interface EditorialNotes {
	name?: string;
	short?: string;
	standard?: string;
	tagline?: string;
}
export type EditorialArtwork = Record<string, Artwork>;

/* relationships helper */
export interface RelationshipRef {
	id: string;
	type: string;
	href?: string;
	attributes?: Record<string, any>;
}
export interface Relationship {
	href?: string;
	data?: RelationshipRef[];
}

/* --------------------------
   Resource wrapper (generic)
   -------------------------- */
export interface Resource<TAttr = any> {
	id: string;
	type: string; // e.g. "albums", "songs", "artists", ...
	href?: string;
	attributes: TAttr;
	relationships?: Record<string, Relationship>;
	meta?: Record<string, any>;
}

/* --------------------------
   Deep attribute types
   -------------------------- */

/* Albums */
export interface AlbumAttributes {
	artistName?: string;
	artistUrl?: string;
	artwork?: Artwork;
	contentRating?: string;
	editorialArtwork?: EditorialArtwork; // e.g. staticDetailSquare, subscriptionHero ...
	editorialNotes?: EditorialNotes;
	name?: string;
	playParams?: PlayParams;
	releaseDate?: string; // YYYY-MM-DD
	trackCount?: number;
	url?: string;
	// optional catch-all
	[k: string]: any;
}

/* Songs */
export type SongAudioVariant =
	| "dolby-atmos"
	| "dolby-audio"
	| "hi-res-lossless"
	| "lossless"
	| "lossy-stereo";

export type SongContentRating = "clean" | "explicit";

export interface SongAttributes {
	albumName?: string;
	artistName?: string;
	artistUrl?: string;
	artwork?: Artwork;
	attribution?: string;
	audioLocale?: string;
	audioTraits?: string[]; // e.g. ["lossless", "lossy-stereo", "atmos"]
	audioVariants?: SongAudioVariant[];
	composerName?: string;
	contentRating?: SongContentRating;
	discNumber?: number;
	/* Kinda tricky, most of them use durationInMillis - but some use durationInMilliseconds - why? fuck you.*/
	durationInMillis?: number;
	durationInMilliseconds?: number;
	editorialNotes?: EditorialNotes;
	genreNames?: string[];
	hasLyrics?: boolean;
	hasTimeSyncedLyrics?: boolean;
	inFavorites?: boolean;
	isAppleDigitalMaster?: boolean;
	isMasteredForItunes?: boolean;
	isVocalAttenuationAllowed?: boolean;
	isrc?: string;
	movementCount?: number;
	movementName?: string;
	movementNumber?: number;
	name?: string;
	playParams?: PlayParams;
	previews?: Preview[];
	releaseDate?: string;
	trackNumber?: number;
	trackCount?: number;
	url?: string;
	workName?: string;
	[k: string]: any;
}

/* Playlists */
export interface PlaylistAttributes {
	artwork?: Artwork;
	audioTraits?: string[];
	curatorName?: string;
	description?: { short?: string; standard?: string };
	editorialNotes?: EditorialNotes;
	editorialPlaylistKind?: string;
	editorialPlaylistSubKind?: string;
	hasCollaboration?: boolean;
	isChart?: boolean;
	lastModifiedDate?: string; // ISO
	name?: string;
	playParams?: PlayParams;
	playlistType?: string; // e.g. "editorial"
	supportsSing?: boolean;
	url?: string;
	playlistTypeName?: string;
	[k: string]: any;
}

/* Curators */
export interface CuratorAttributes {
	artwork?: Artwork;
	editorialNotes?: EditorialNotes;
	name?: string;
	url?: string;
	[k: string]: any;
}

/* Music videos */
export interface MusicVideoAttributes {
	albumName?: string;
	artistName?: string;
	artistUrl?: string;
	artwork?: Artwork;
	contentRating?: string;
	durationInMillis?: number;
	genreNames?: string[];
	has4K?: boolean;
	hasHDR?: boolean;
	isrc?: string;
	name?: string;
	playParams?: PlayParams;
	previews?: Preview[];
	releaseDate?: string;
	url?: string;
	videoTraits?: string[];
	[k: string]: any;
}

/** Artists */
export interface ArtistAttributes {
	genreNames: string[];
	name: string;
	url: string;
	artwork?: Artwork;
	editorialNotes?: EditorialNotes;
}

/* Uploaded / video-extra attributes */
export interface UploadedVideoAttributes {
	artistName?: string;
	artwork?: Artwork;
	assetTokens?: Record<string, string>; // e.g. { "1080pHdVideo": "https://..." }
	contentRatingsBySystem?: Record<string, any>;
	durationInMilliseconds?: number;
	name?: string;
	playParams?: PlayParams;
	postUrl?: string;
	uploadDate?: string;
	uploadingArtistName?: string;
	[k: string]: any;
}

/* Stations / radio */
export interface StationAttributes {
	appBundleId?: string;
	artwork?: Artwork;
	band?: string;
	frequency?: string;
	isLive?: boolean;
	kind?: string;
	mediaKind?: string;
	name?: string;
	playParams?: PlayParams; // often includes stationHash, format, hasDrm, etc.
	radioUrl?: string;
	requiresSubscription?: boolean;
	url?: string;
	editorialNotes?: EditorialNotes;
	[k: string]: any;
}

/* Generic catch-all attributes for resource types we didn't fully enumerate */
export interface GenericAttributes {
	[k: string]: any;
}
