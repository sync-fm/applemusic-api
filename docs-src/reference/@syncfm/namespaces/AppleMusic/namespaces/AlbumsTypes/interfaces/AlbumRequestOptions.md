[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [AlbumsTypes](../index.md) / AlbumRequestOptions

# Interface: AlbumRequestOptions

Defined in: [endpoints/Albums/types.ts:117](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L117)

Query params for fetching a single catalog album.
GET /v1/catalog/{storefront}/albums/{id}

## Extended by

- [`AlbumParams`](AlbumParams.md)

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="platform"></a> `platform?` | `Platform` | [endpoints/Albums/types.ts:118](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L118) |
| <a id="l"></a> `l?` | `Locale` | [endpoints/Albums/types.ts:119](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L119) |
| <a id="include"></a> `include?` | [`IncludeOption`](../enumerations/IncludeOption.md)[] | [endpoints/Albums/types.ts:120](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L120) |
| <a id="views"></a> `views?` | (`AppearsOn` \| `OtherVersions` \| `RelatedAlbums` \| `RelatedVideos`)[] | [endpoints/Albums/types.ts:121](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L121) |
| <a id="extend"></a> `extend?` | [`ArtistUrl`](../enumerations/ExtendOption.md#artisturl)[] | [endpoints/Albums/types.ts:122](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L122) |
| <a id="with"></a> `with?` | [`Attributes`](../enumerations/WithOption.md#attributes)[] | [endpoints/Albums/types.ts:123](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L123) |
