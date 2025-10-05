[**@syncfm/applemusic-api**](../../../../../../README.md)

***

[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../README.md) / [SongsTypes](../README.md) / SongsRelationshipParams

# Interface: SongsRelationshipParams

Defined in: [endpoints/Songs/types.ts:68](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Songs/types.ts#L68)

Query params for fetching a song's relationship view directly.
GET /v1/catalog/{storefront}/songs/{id}/view/{view}

## Extends

- [`SongRequestOptions`](SongRequestOptions.md)

## Properties

### extend?

> `optional` **extend**: [`ExtendOption`](../enumerations/ExtendOption.md)[]

Defined in: [endpoints/Songs/types.ts:51](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Songs/types.ts#L51)

#### Inherited from

[`SongRequestOptions`](SongRequestOptions.md).[`extend`](SongRequestOptions.md#extend)

***

### id

> **id**: `string`

Defined in: [endpoints/Songs/types.ts:69](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Songs/types.ts#L69)

***

### include?

> `optional` **include**: [`IncludeOption`](../enumerations/IncludeOption.md)[]

Defined in: [endpoints/Songs/types.ts:50](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Songs/types.ts#L50)

#### Inherited from

[`SongRequestOptions`](SongRequestOptions.md).[`include`](SongRequestOptions.md#include)

***

### l?

> `optional` **l**: `Locale`

Defined in: [endpoints/Songs/types.ts:49](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Songs/types.ts#L49)

#### Inherited from

[`SongRequestOptions`](SongRequestOptions.md).[`l`](SongRequestOptions.md#l)

***

### limit?

> `optional` **limit**: `number`

Defined in: [endpoints/Songs/types.ts:53](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Songs/types.ts#L53)

#### Inherited from

[`SongRequestOptions`](SongRequestOptions.md).[`limit`](SongRequestOptions.md#limit)

***

### platform?

> `optional` **platform**: `Platform`

Defined in: [endpoints/Songs/types.ts:48](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Songs/types.ts#L48)

#### Inherited from

[`SongRequestOptions`](SongRequestOptions.md).[`platform`](SongRequestOptions.md#platform)

***

### view

> **view**: `Albums` \| `Artists` \| `Videos` \| `Composers` \| `Genres` \| `Library` \| `MusicVideos`

Defined in: [endpoints/Songs/types.ts:70](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Songs/types.ts#L70)

***

### views?

> `optional` **views**: (`Albums` \| `Artists` \| `Videos` \| `Composers` \| `Genres` \| `Library` \| `MusicVideos`)[]

Defined in: [endpoints/Songs/types.ts:52](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Songs/types.ts#L52)

#### Inherited from

[`SongRequestOptions`](SongRequestOptions.md).[`views`](SongRequestOptions.md#views)
