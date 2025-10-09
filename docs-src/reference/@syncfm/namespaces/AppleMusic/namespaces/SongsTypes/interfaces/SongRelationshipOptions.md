[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [SongsTypes](../index.md) / SongRelationshipOptions

# Interface: SongRelationshipOptions

Defined in: [endpoints/Songs/types.ts:130](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L130)

Query params for fetching a song relationship directly.
GET /v1/catalog/{storefront}/songs/{id}/{relationship}

## Extended by

- [`SongsRelationshipParams`](SongsRelationshipParams.md)

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="platform"></a> `platform?` | `Platform` | [endpoints/Songs/types.ts:131](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L131) |
| <a id="l"></a> `l?` | `Locale` | [endpoints/Songs/types.ts:132](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L132) |
| <a id="include"></a> `include?` | [`IncludeOption`](../enumerations/IncludeOption.md)[] | [endpoints/Songs/types.ts:133](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L133) |
| <a id="extend"></a> `extend?` | [`ExtendOption`](../enumerations/ExtendOption.md)[] | [endpoints/Songs/types.ts:134](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L134) |
| <a id="limit"></a> `limit?` | `number` | [endpoints/Songs/types.ts:135](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L135) |
