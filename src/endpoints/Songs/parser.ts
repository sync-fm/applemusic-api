import {
	type AllowedViews,
	Locale,
	Platform,
	View,
} from "../../types/SharedSearchParams";
import {
	buildQueryString,
	parseDelimitedEnum,
	parseNumber,
	parseQuery,
} from "../shared/query";
import {
	ExtendOption,
	IncludeOption,
	type SongParams,
	SongParamsDefaults,
	type SongRelationshipOptions,
	type SongRequestOptions,
	type SongsRelationshipParams,
} from "./types";

const localeOptions = new Set<Locale>(Object.values(Locale));
const platformOptions = new Set<Platform>(Object.values(Platform));
const includeOptions = new Set<IncludeOption>(Object.values(IncludeOption));
const extendOptions = new Set<ExtendOption>(Object.values(ExtendOption));
const songViewList: AllowedViews<"songs">[] = [
	View.Genres,
	View.Composers,
	View.Albums,
	View.Artists,
	View.Videos,
	View.Library,
	View.MusicVideos,
];
const viewOptions = new Set<AllowedViews<"songs">>(songViewList);

type SongQueryParams = SongRequestOptions & SongRelationshipOptions;

const parseSong = parseQuery<
	Partial<SongParams> & Partial<SongsRelationshipParams>
>({
	factory: () => ({}) as Partial<SongParams> & Partial<SongsRelationshipParams>,
	handlers: {
		id: (value, result) => {
			result.id = value;
		},
		limit: (value, result) => {
			const parsed = parseNumber(value);
			if (parsed !== undefined) {
				(result as SongsRelationshipParams).limit = parsed;
			}
		},
		l: (value, result) => {
			if (localeOptions.has(value as Locale)) {
				result.l = value as Locale;
			}
		},
		platform: (value, result) => {
			if (platformOptions.has(value as Platform)) {
				result.platform = value as Platform;
			}
		},
		views: (value, result) => {
			const filtered = parseDelimitedEnum(value, viewOptions);
			if (filtered.length > 0) {
				result.views = filtered;
			}
		},
		include: (value, result) => {
			const filtered = parseDelimitedEnum(value, includeOptions);
			if (filtered.length > 0) {
				result.include = filtered;
			}
		},
		extend: (value, result) => {
			const filtered = parseDelimitedEnum(value, extendOptions);
			if (filtered.length > 0) {
				result.extend = filtered;
			}
		},
	},
});

/**
 * Parse a query string (?l=en-US&views=genres,albums) into SongParams.
 */
export const parseSongParams = (query: string): SongParams =>
	parseSong(query) as SongParams;

/**
 * Build a query string from SongParams or relationship options.
 */
export const buildSongQuery = (
	params: Partial<SongQueryParams> = {},
	encode: boolean = true,
	includeDefaults: boolean = true,
	defaults: Partial<SongQueryParams> = SongParamsDefaults,
): string => {
	return buildQueryString<SongQueryParams>(params, {
		defaults,
		includeDefaults,
		encode,
	});
};
