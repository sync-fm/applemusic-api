[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [AlbumsTypes](../index.md) / AlbumParams

# Interface: AlbumParams

Defined in: [endpoints/Albums/types.ts:126](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L126)

Query params for fetching a single catalog album.
GET /v1/catalog/{storefront}/albums/{id}

## Extends

- [`AlbumRequestOptions`](AlbumRequestOptions.md)

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="platform"></a> `platform?` | `Platform` | [`AlbumRequestOptions`](AlbumRequestOptions.md).[`platform`](AlbumRequestOptions.md#platform) | [endpoints/Albums/types.ts:118](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L118) |
| <a id="l"></a> `l?` | `Locale` | [`AlbumRequestOptions`](AlbumRequestOptions.md).[`l`](AlbumRequestOptions.md#l) | [endpoints/Albums/types.ts:119](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L119) |
| <a id="include"></a> `include?` | [`IncludeOption`](../enumerations/IncludeOption.md)[] | [`AlbumRequestOptions`](AlbumRequestOptions.md).[`include`](AlbumRequestOptions.md#include) | [endpoints/Albums/types.ts:120](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L120) |
| <a id="views"></a> `views?` | (`AppearsOn` \| `OtherVersions` \| `RelatedAlbums` \| `RelatedVideos`)[] | [`AlbumRequestOptions`](AlbumRequestOptions.md).[`views`](AlbumRequestOptions.md#views) | [endpoints/Albums/types.ts:121](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L121) |
| <a id="extend"></a> `extend?` | [`ArtistUrl`](../enumerations/ExtendOption.md#artisturl)[] | [`AlbumRequestOptions`](AlbumRequestOptions.md).[`extend`](AlbumRequestOptions.md#extend) | [endpoints/Albums/types.ts:122](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L122) |
| <a id="with"></a> `with?` | [`Attributes`](../enumerations/WithOption.md#attributes)[] | [`AlbumRequestOptions`](AlbumRequestOptions.md).[`with`](AlbumRequestOptions.md#with) | [endpoints/Albums/types.ts:123](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L123) |
| <a id="id"></a> `id` | `string` | - | [endpoints/Albums/types.ts:127](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L127) |
