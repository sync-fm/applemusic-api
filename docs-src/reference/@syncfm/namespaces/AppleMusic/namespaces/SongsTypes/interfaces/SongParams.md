[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [SongsTypes](../index.md) / SongParams

# Interface: SongParams

Defined in: [endpoints/Songs/types.ts:122](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L122)

Query params for fetching a single catalog song.
GET /v1/catalog/{storefront}/songs/{id}

## Extends

- [`SongRequestOptions`](SongRequestOptions.md)

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="platform"></a> `platform?` | `Platform` | [`SongRequestOptions`](SongRequestOptions.md).[`platform`](SongRequestOptions.md#platform) | [endpoints/Songs/types.ts:111](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L111) |
| <a id="l"></a> `l?` | `Locale` | [`SongRequestOptions`](SongRequestOptions.md).[`l`](SongRequestOptions.md#l) | [endpoints/Songs/types.ts:112](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L112) |
| <a id="include"></a> `include?` | [`IncludeOption`](../enumerations/IncludeOption.md)[] | [`SongRequestOptions`](SongRequestOptions.md).[`include`](SongRequestOptions.md#include) | [endpoints/Songs/types.ts:113](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L113) |
| <a id="extend"></a> `extend?` | [`ExtendOption`](../enumerations/ExtendOption.md)[] | [`SongRequestOptions`](SongRequestOptions.md).[`extend`](SongRequestOptions.md#extend) | [endpoints/Songs/types.ts:114](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L114) |
| <a id="views"></a> `views?` | (`Albums` \| `Artists` \| `Videos` \| `Composers` \| `Genres` \| `Library` \| `MusicVideos`)[] | [`SongRequestOptions`](SongRequestOptions.md).[`views`](SongRequestOptions.md#views) | [endpoints/Songs/types.ts:115](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L115) |
| <a id="id"></a> `id` | `string` | - | [endpoints/Songs/types.ts:123](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L123) |
