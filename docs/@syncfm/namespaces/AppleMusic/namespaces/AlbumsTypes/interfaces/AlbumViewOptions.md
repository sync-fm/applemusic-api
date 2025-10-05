[**@syncfm/applemusic-api**](../../../../../../README.md)

***

[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../README.md) / [AlbumsTypes](../README.md) / AlbumViewOptions

# Interface: AlbumViewOptions

Defined in: [endpoints/Albums/types.ts:122](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L122)

Query params for fetching an album's relationship view directly.
GET /v1/catalog/{storefront}/albums/{id}/view/{view}

## Extends

- [`AlbumRequestOptions`](AlbumRequestOptions.md)

## Extended by

- [`AlbumViewParams`](AlbumViewParams.md)
- [`AlbumRelationshipParams`](AlbumRelationshipParams.md)

## Properties

### extend?

> `optional` **extend**: [`ArtistUrl`](../enumerations/ExtendOption.md#artisturl)[]

Defined in: [endpoints/Albums/types.ts:110](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L110)

#### Inherited from

[`AlbumRequestOptions`](AlbumRequestOptions.md).[`extend`](AlbumRequestOptions.md#extend)

***

### include?

> `optional` **include**: [`IncludeOption`](../enumerations/IncludeOption.md)[]

Defined in: [endpoints/Albums/types.ts:108](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L108)

#### Inherited from

[`AlbumRequestOptions`](AlbumRequestOptions.md).[`include`](AlbumRequestOptions.md#include)

***

### l?

> `optional` **l**: `Locale`

Defined in: [endpoints/Albums/types.ts:107](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L107)

#### Inherited from

[`AlbumRequestOptions`](AlbumRequestOptions.md).[`l`](AlbumRequestOptions.md#l)

***

### limit?

> `optional` **limit**: `number`

Defined in: [endpoints/Albums/types.ts:123](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L123)

***

### platform?

> `optional` **platform**: `Platform`

Defined in: [endpoints/Albums/types.ts:106](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L106)

#### Inherited from

[`AlbumRequestOptions`](AlbumRequestOptions.md).[`platform`](AlbumRequestOptions.md#platform)

***

### views?

> `optional` **views**: (`AppearsOn` \| `OtherVersions` \| `RelatedAlbums` \| `RelatedVideos`)[]

Defined in: [endpoints/Albums/types.ts:109](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L109)

#### Inherited from

[`AlbumRequestOptions`](AlbumRequestOptions.md).[`views`](AlbumRequestOptions.md#views)

***

### with?

> `optional` **with**: [`Attributes`](../enumerations/WithOption.md#attributes)[]

Defined in: [endpoints/Albums/types.ts:111](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L111)

#### Inherited from

[`AlbumRequestOptions`](AlbumRequestOptions.md).[`with`](AlbumRequestOptions.md#with)
