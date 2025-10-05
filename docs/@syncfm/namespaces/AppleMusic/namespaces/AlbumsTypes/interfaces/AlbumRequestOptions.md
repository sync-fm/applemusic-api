[**@syncfm/applemusic-api**](../../../../../../README.md)

***

[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../README.md) / [AlbumsTypes](../README.md) / AlbumRequestOptions

# Interface: AlbumRequestOptions

Defined in: [endpoints/Albums/types.ts:105](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L105)

Query params for fetching a single catalog album.
GET /v1/catalog/{storefront}/albums/{id}

## Extended by

- [`AlbumParams`](AlbumParams.md)
- [`AlbumViewOptions`](AlbumViewOptions.md)

## Properties

### extend?

> `optional` **extend**: [`ArtistUrl`](../enumerations/ExtendOption.md#artisturl)[]

Defined in: [endpoints/Albums/types.ts:110](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L110)

***

### include?

> `optional` **include**: [`IncludeOption`](../enumerations/IncludeOption.md)[]

Defined in: [endpoints/Albums/types.ts:108](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L108)

***

### l?

> `optional` **l**: `Locale`

Defined in: [endpoints/Albums/types.ts:107](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L107)

***

### platform?

> `optional` **platform**: `Platform`

Defined in: [endpoints/Albums/types.ts:106](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L106)

***

### views?

> `optional` **views**: (`AppearsOn` \| `OtherVersions` \| `RelatedAlbums` \| `RelatedVideos`)[]

Defined in: [endpoints/Albums/types.ts:109](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L109)

***

### with?

> `optional` **with**: [`Attributes`](../enumerations/WithOption.md#attributes)[]

Defined in: [endpoints/Albums/types.ts:111](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Albums/types.ts#L111)
