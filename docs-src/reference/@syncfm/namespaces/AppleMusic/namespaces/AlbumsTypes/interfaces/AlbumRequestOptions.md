[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [AlbumsTypes](../index.md) / AlbumRequestOptions

# Interface: AlbumRequestOptions

Defined in: [endpoints/Albums/types.ts:122](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Albums/types.ts#L122)

Query params for fetching a single catalog album.
GET /v1/catalog/{storefront}/albums/{id}

## Extended by

- [`AlbumParams`](AlbumParams.md)

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="platform"></a> `platform?` | `Platform` | [endpoints/Albums/types.ts:123](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Albums/types.ts#L123) |
| <a id="l"></a> `l?` | `Locale` | [endpoints/Albums/types.ts:124](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Albums/types.ts#L124) |
| <a id="include"></a> `include?` | [`IncludeOption`](../enumerations/IncludeOption.md)[] | [endpoints/Albums/types.ts:125](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Albums/types.ts#L125) |
| <a id="views"></a> `views?` | (`AppearsOn` \| `OtherVersions` \| `RelatedAlbums` \| `RelatedVideos`)[] | [endpoints/Albums/types.ts:126](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Albums/types.ts#L126) |
| <a id="extend"></a> `extend?` | [`ArtistUrl`](../enumerations/ExtendOption.md#artisturl)[] | [endpoints/Albums/types.ts:127](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Albums/types.ts#L127) |
| <a id="with"></a> `with?` | [`Attributes`](../enumerations/WithOption.md#attributes)[] | [endpoints/Albums/types.ts:128](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Albums/types.ts#L128) |
