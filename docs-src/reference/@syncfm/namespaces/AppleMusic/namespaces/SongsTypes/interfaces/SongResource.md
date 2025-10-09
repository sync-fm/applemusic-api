[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [SongsTypes](../index.md) / SongResource

# Interface: SongResource

Defined in: [endpoints/Songs/types.ts:100](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L100)

## Extends

- `Resource`\<`SongAttributes`\>

## Properties

| Property | Type | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="type"></a> `type` | `"songs"` | `Resource.type` | - | [endpoints/Songs/types.ts:101](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L101) |
| <a id="relationships"></a> `relationships?` | [`SongRelationships`](SongRelationships.md) | `Resource.relationships` | - | [endpoints/Songs/types.ts:102](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L102) |
| <a id="meta"></a> `meta?` | `Record`\<`string`, `unknown`\> | `Resource.meta` | - | [endpoints/Songs/types.ts:103](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L103) |
| <a id="id"></a> `id` | `string` | - | `Resource.id` | [types/SharedResourceTypes.ts:60](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/types/SharedResourceTypes.ts#L60) |
| <a id="href"></a> `href?` | `string` | - | `Resource.href` | [types/SharedResourceTypes.ts:62](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/types/SharedResourceTypes.ts#L62) |
| <a id="attributes"></a> `attributes` | `SongAttributes` | - | `Resource.attributes` | [types/SharedResourceTypes.ts:63](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/types/SharedResourceTypes.ts#L63) |
