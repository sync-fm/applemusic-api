[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [SongsTypes](../index.md) / SongParams

# Interface: SongParams

Defined in: [endpoints/Songs/types.ts:117](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L117)

Query params for fetching a single catalog song.
GET /v1/catalog/{storefront}/songs/{id}

## Extends

- [`SongRequestOptions`](SongRequestOptions.md)

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="platform"></a> `platform?` | `Platform` | [`SongRequestOptions`](SongRequestOptions.md).[`platform`](SongRequestOptions.md#platform) | [endpoints/Songs/types.ts:106](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L106) |
| <a id="l"></a> `l?` | `Locale` | [`SongRequestOptions`](SongRequestOptions.md).[`l`](SongRequestOptions.md#l) | [endpoints/Songs/types.ts:107](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L107) |
| <a id="include"></a> `include?` | [`IncludeOption`](../enumerations/IncludeOption.md)[] | [`SongRequestOptions`](SongRequestOptions.md).[`include`](SongRequestOptions.md#include) | [endpoints/Songs/types.ts:108](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L108) |
| <a id="extend"></a> `extend?` | [`ExtendOption`](../enumerations/ExtendOption.md)[] | [`SongRequestOptions`](SongRequestOptions.md).[`extend`](SongRequestOptions.md#extend) | [endpoints/Songs/types.ts:109](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L109) |
| <a id="views"></a> `views?` | (`Albums` \| `Artists` \| `Videos` \| `Composers` \| `Genres` \| `Library` \| `MusicVideos`)[] | [`SongRequestOptions`](SongRequestOptions.md).[`views`](SongRequestOptions.md#views) | [endpoints/Songs/types.ts:110](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L110) |
| <a id="id"></a> `id` | `string` | - | [endpoints/Songs/types.ts:118](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L118) |
