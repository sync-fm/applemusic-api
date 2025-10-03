// art[music-videos:url]=c&art[url]=f&extend=artistUrl&fields[albums]=artistName,artistUrl,artwork,contentRating,editorialArtwork,editorialNotes,name,playParams,releaseDate,url,trackCount&fields[artists]=url,name,artwork&format[resources]=map&include[albums]=artists&include[music-videos]=artists&include[songs]=artists&include[stations]=radio-show&l=en-US&limit=21&omit[resource]=autos&platform=web&relate[albums]=artists&relate[songs]=albums&term=okaynico&types=activities,albums,apple-curators,artists,curators,editorial-items,music-movies,music-videos,playlists,record-labels,songs,stations,tv-episodes,uploaded-videos&with=lyricHighlights,lyrics,naturalLanguage,serverBubbles,subtitles

import { Platform, ResourceType, Locale } from "../../types/SharedSearchParams";

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
    albums?: ("artists")[];
    "music-videos"?: ("artists")[];
    songs?: ("artists")[];
    stations?: ("radio-show")[];
}

export interface Relate {
    albums?: ("artists")[];
    songs?: ("albums")[];
}

export interface LimitParams {
    "results:terms"?: number;
    "results:topResults"?: number;
}

export interface SuggestionsEndpointParams {
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
    kinds?: Kind[];
}

export const SuggestionsEndpointParamsDefaults: SuggestionsEndpointParams = {
    types: [
        ResourceType.Activities, ResourceType.Albums, ResourceType.Artists, ResourceType.EditorialItems, ResourceType.MusicMovies, ResourceType.MusicVideos, ResourceType.Playlists, ResourceType.RecordLabels, ResourceType.Songs, ResourceType.Stations, ResourceType.TVEpisodes
    ],
    with: [
        WithOption.NaturalLanguage
    ],
    platform: Platform.Web,
    l: Locale.EN_US,
    limit: {
        "results:terms": 5,
        "results:topResults": 10
    },
    art: {
        url: "f"
    },
    fields: {
        albums: [
            FieldsAlbums.ArtistName, FieldsAlbums.Artwork, FieldsAlbums.ContentRating, FieldsAlbums.Name, FieldsAlbums.PlayParams, FieldsAlbums.URL
        ],
        artists: [
            FieldsArtists.URL, FieldsArtists.Name, FieldsArtists.Artwork
        ]
    },
    format: {
        resources: FormatResources.Map
    },
    omit: {
        resource: OmitResource.Autos
    },
    kinds: [
        Kind.Terms, Kind.TopResults
    ]
} as const;

export interface SearchSuggestion {
    kind: "terms";
    searchTerm: string;
    displayTerm: string;
    source: string; // Might always be a number of some kind, unsure, as AM official api doesnt expose it.
}

export interface SearchSuggestionsResponse {
    results: {
        suggestions: SearchSuggestion[];
    },
    meta: {
        metrics?: {
            dataSetId?: string;
        }
    }
}