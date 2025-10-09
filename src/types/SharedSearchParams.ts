export enum Region {
	US = "us",
	GB = "gb",
	FR = "fr",
	DE = "de",
	ES = "es",
	IT = "it",
	JP = "jp",
	KR = "kr",
	CN = "cn",
	TW = "tw",
	BR = "br",
	RU = "ru",
	NL = "nl",
	SE = "se",
	DK = "dk",
	FI = "fi",
	NO = "no",
	PL = "pl",
	TR = "tr",
	SA = "sa",
	IN = "in",
	TH = "th",
	VN = "vn",
	ID = "id",
	MY = "my",
	CZ = "cz",
	HU = "hu",
	RO = "ro",
	SK = "sk",
	UA = "ua",
	GR = "gr",
	IL = "il",
	BG = "bg",
	HR = "hr",
	SI = "si",
	LT = "lt",
	LV = "lv",
	EE = "ee",
}

export enum ResourceType {
	Activities = "activities",
	Albums = "albums",
	AppleCurators = "apple-curators",
	Artists = "artists",
	Curators = "curators",
	EditorialItems = "editorial-items",
	MusicMovies = "music-movies",
	MusicVideos = "music-videos",
	Playlists = "playlists",
	RecordLabels = "record-labels",
	Songs = "songs",
	Stations = "stations",
	TVEpisodes = "tv-episodes",
	UploadedVideos = "uploaded-videos",
}

export enum Locale {
	EN_US = "en-US",
	EN_GB = "en-GB",
	FR_FR = "fr-FR",
	DE_DE = "de-DE",
	ES_ES = "es-ES",
	IT_IT = "it-IT",
	JA_JP = "ja-JP",
	KO_KR = "ko-KR",
	ZH_CN = "zh-CN",
	ZH_TW = "zh-TW",
	PT_BR = "pt-BR",
	RU_RU = "ru-RU",
	NL_NL = "nl-NL",
	SV_SE = "sv-SE",
	DA_DK = "da-DK",
	FI_FI = "fi-FI",
	NO_NO = "no-NO",
	PL_PL = "pl-PL",
	TR_TR = "tr-TR",
	AR_SA = "ar-SA",
	HI_IN = "hi-IN",
	TH_TH = "th-TH",
	VI_VN = "vi-VN",
	ID_ID = "id-ID",
	MS_MY = "ms-MY",
	CS_CZ = "cs-CZ",
	HU_HU = "hu-HU",
	RO_RO = "ro-RO",
	SK_SK = "sk-SK",
	UK_UA = "uk-UA",
	EL_GR = "el-GR",
	HE_IL = "he-IL",
	BG_BG = "bg-BG",
	HR_HR = "hr-HR",
	SL_SI = "sl-SI",
	LT_LT = "lt-LT",
	LV_LV = "lv-LV",
	ET_EE = "et-EE",
}
export enum View {
	AppearsOn = "appears-on",
	OtherVersions = "other-versions",
	RelatedAlbums = "related-albums",
	RelatedVideos = "related-videos",
	MoreByArtist = "more-by-artist",
	MoreInGenre = "more-in-genre",
	Albums = "albums",
	Artists = "artists",
	Songs = "songs",
	Videos = "videos",
	Composers = "composers",
	Genres = "genres",
	Library = "library",
	MusicVideos = "music-videos",
	Station = "station",
}
export type EntityType = "albums" | "artists" | "songs" | "videos";
export type AllowedViews<T extends EntityType> = ViewMap[T];
type ViewMap = {
	albums:
		| View.AppearsOn
		| View.OtherVersions
		| View.RelatedAlbums
		| View.RelatedVideos;
	artists: View.AppearsOn;
	songs:
		| View.Genres
		| View.Composers
		| View.Albums
		| View.Artists
		| View.Videos
		| View.Library
		| View.MusicVideos;
	videos: View.RelatedVideos;
};

export enum Platform {
	Web = "web",
	IOS = "ios",
	Android = "android",
}
