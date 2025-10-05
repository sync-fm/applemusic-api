[**@syncfm/applemusic-api**](../../../../../../README.md)

***

[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../README.md) / [AlbumsTypes](../README.md) / AlbumRelationshipParams

# Interface: AlbumRelationshipParams

Defined in: [endpoints/Albums/types.ts:135](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L135)

Query params for fetching an album relationship directly.
GET /v1/catalog/{storefront}/albums/{id}/{relationship}

## Extends

- [`AlbumViewOptions`](AlbumViewOptions.md)

## Properties

### extend?

> `optional` **extend**: [`ArtistUrl`](../enumerations/ExtendOption.md#artisturl)[]

Defined in: [endpoints/Albums/types.ts:110](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L110)

#### Inherited from

[`AlbumViewOptions`](AlbumViewOptions.md).[`extend`](AlbumViewOptions.md#extend)

***

### id

> **id**: `string`

Defined in: [endpoints/Albums/types.ts:136](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L136)

***

### include?

> `optional` **include**: [`IncludeOption`](../enumerations/IncludeOption.md)[]

Defined in: [endpoints/Albums/types.ts:108](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L108)

#### Inherited from

[`AlbumViewOptions`](AlbumViewOptions.md).[`include`](AlbumViewOptions.md#include)

***

### l?

> `optional` **l**: `Locale`

Defined in: [endpoints/Albums/types.ts:107](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L107)

#### Inherited from

[`AlbumViewOptions`](AlbumViewOptions.md).[`l`](AlbumViewOptions.md#l)

***

### limit?

> `optional` **limit**: `number`

Defined in: [endpoints/Albums/types.ts:123](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L123)

#### Inherited from

[`AlbumViewOptions`](AlbumViewOptions.md).[`limit`](AlbumViewOptions.md#limit)

***

### platform?

> `optional` **platform**: `Platform`

Defined in: [endpoints/Albums/types.ts:106](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L106)

#### Inherited from

[`AlbumViewOptions`](AlbumViewOptions.md).[`platform`](AlbumViewOptions.md#platform)

***

### relationship

> **relationship**: [`AlbumRelationshipName`](../type-aliases/AlbumRelationshipName.md)

Defined in: [endpoints/Albums/types.ts:137](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L137)

***

### views?

> `optional` **views**: (`AppearsOn` \| `OtherVersions` \| `RelatedAlbums` \| `RelatedVideos`)[]

Defined in: [endpoints/Albums/types.ts:109](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L109)

#### Inherited from

[`AlbumViewOptions`](AlbumViewOptions.md).[`views`](AlbumViewOptions.md#views)

***

### with?

> `optional` **with**: [`Attributes`](../enumerations/WithOption.md#attributes)[]

Defined in: [endpoints/Albums/types.ts:111](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L111)

#### Inherited from

[`AlbumViewOptions`](AlbumViewOptions.md).[`with`](AlbumViewOptions.md#with)
