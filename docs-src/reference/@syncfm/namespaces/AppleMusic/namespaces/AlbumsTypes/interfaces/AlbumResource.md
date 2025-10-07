[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [AlbumsTypes](../index.md) / AlbumResource

# Interface: AlbumResource

Defined in: [endpoints/Albums/types.ts:174](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L174)

## Extends

- [`AlbumSummaryResource`](../type-aliases/AlbumSummaryResource.md)

## Properties

| Property | Type | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="relationships"></a> `relationships?` | [`AlbumRelationships`](AlbumRelationships.md) | `AlbumSummaryResource.relationships` | - | [endpoints/Albums/types.ts:175](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L175) |
| <a id="views"></a> `views?` | [`AlbumViews`](AlbumViews.md) | - | - | [endpoints/Albums/types.ts:176](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L176) |
| <a id="meta"></a> `meta?` | `Record`\<`string`, `unknown`\> | `AlbumSummaryResource.meta` | - | [endpoints/Albums/types.ts:177](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L177) |
| <a id="id"></a> `id` | `string` | - | `AlbumSummaryResource.id` | [types/SharedResourceTypes.ts:60](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/types/SharedResourceTypes.ts#L60) |
| <a id="type"></a> `type` | `"albums"` | - | `AlbumSummaryResource.type` | [types/SharedResourceTypes.ts:61](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/types/SharedResourceTypes.ts#L61) |
| <a id="href"></a> `href?` | `string` | - | `AlbumSummaryResource.href` | [types/SharedResourceTypes.ts:62](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/types/SharedResourceTypes.ts#L62) |
| <a id="attributes"></a> `attributes` | [`AlbumAttributes`](AlbumAttributes.md) | - | `AlbumSummaryResource.attributes` | [types/SharedResourceTypes.ts:63](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/types/SharedResourceTypes.ts#L63) |
