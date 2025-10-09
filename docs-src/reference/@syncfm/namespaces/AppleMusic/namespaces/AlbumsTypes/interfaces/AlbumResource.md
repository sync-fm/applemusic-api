[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [AlbumsTypes](../index.md) / AlbumResource

# Interface: AlbumResource

Defined in: [endpoints/Albums/types.ts:179](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Albums/types.ts#L179)

## Extends

- [`AlbumSummaryResource`](../type-aliases/AlbumSummaryResource.md)

## Properties

| Property | Type | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="relationships"></a> `relationships?` | [`AlbumRelationships`](AlbumRelationships.md) | `AlbumSummaryResource.relationships` | - | [endpoints/Albums/types.ts:180](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Albums/types.ts#L180) |
| <a id="views"></a> `views?` | [`AlbumViews`](AlbumViews.md) | - | - | [endpoints/Albums/types.ts:181](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Albums/types.ts#L181) |
| <a id="meta"></a> `meta?` | `Record`\<`string`, `unknown`\> | `AlbumSummaryResource.meta` | - | [endpoints/Albums/types.ts:182](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Albums/types.ts#L182) |
| <a id="id"></a> `id` | `string` | - | `AlbumSummaryResource.id` | [types/SharedResourceTypes.ts:60](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/types/SharedResourceTypes.ts#L60) |
| <a id="type"></a> `type` | `"albums"` | - | `AlbumSummaryResource.type` | [types/SharedResourceTypes.ts:61](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/types/SharedResourceTypes.ts#L61) |
| <a id="href"></a> `href?` | `string` | - | `AlbumSummaryResource.href` | [types/SharedResourceTypes.ts:62](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/types/SharedResourceTypes.ts#L62) |
| <a id="attributes"></a> `attributes` | [`AlbumAttributes`](AlbumAttributes.md) | - | `AlbumSummaryResource.attributes` | [types/SharedResourceTypes.ts:63](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/types/SharedResourceTypes.ts#L63) |
