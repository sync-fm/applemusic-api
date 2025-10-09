[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [SongsTypes](../index.md) / SongsRelationshipParams

# Interface: SongsRelationshipParams

Defined in: [endpoints/Songs/types.ts:138](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L138)

Query params for fetching a song relationship directly.
GET /v1/catalog/{storefront}/songs/{id}/{relationship}

## Extends

- [`SongRelationshipOptions`](SongRelationshipOptions.md)

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="platform"></a> `platform?` | `Platform` | [`SongRelationshipOptions`](SongRelationshipOptions.md).[`platform`](SongRelationshipOptions.md#platform) | [endpoints/Songs/types.ts:131](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L131) |
| <a id="l"></a> `l?` | `Locale` | [`SongRelationshipOptions`](SongRelationshipOptions.md).[`l`](SongRelationshipOptions.md#l) | [endpoints/Songs/types.ts:132](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L132) |
| <a id="include"></a> `include?` | [`IncludeOption`](../enumerations/IncludeOption.md)[] | [`SongRelationshipOptions`](SongRelationshipOptions.md).[`include`](SongRelationshipOptions.md#include) | [endpoints/Songs/types.ts:133](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L133) |
| <a id="extend"></a> `extend?` | [`ExtendOption`](../enumerations/ExtendOption.md)[] | [`SongRelationshipOptions`](SongRelationshipOptions.md).[`extend`](SongRelationshipOptions.md#extend) | [endpoints/Songs/types.ts:134](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L134) |
| <a id="limit"></a> `limit?` | `number` | [`SongRelationshipOptions`](SongRelationshipOptions.md).[`limit`](SongRelationshipOptions.md#limit) | [endpoints/Songs/types.ts:135](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L135) |
| <a id="id"></a> `id` | `string` | - | [endpoints/Songs/types.ts:139](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L139) |
| <a id="relationship"></a> `relationship` | keyof [`SongRelationshipResourceMap`](../type-aliases/SongRelationshipResourceMap.md) | - | [endpoints/Songs/types.ts:140](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L140) |
