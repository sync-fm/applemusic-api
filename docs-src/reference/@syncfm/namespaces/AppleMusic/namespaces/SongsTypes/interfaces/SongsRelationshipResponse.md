[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [SongsTypes](../index.md) / SongsRelationshipResponse

# Interface: SongsRelationshipResponse\<T\>

Defined in: [endpoints/Songs/types.ts:166](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L166)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* [`SongRelationshipName`](../type-aliases/SongRelationshipName.md) | [`SongRelationshipName`](../type-aliases/SongRelationshipName.md) |

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="data"></a> `data` | [`SongRelationshipResourceMap`](../type-aliases/SongRelationshipResourceMap.md)\[`T`\][] | [endpoints/Songs/types.ts:169](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L169) |
| <a id="href"></a> `href?` | `string` | [endpoints/Songs/types.ts:170](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L170) |
| <a id="next"></a> `next?` | `string` | [endpoints/Songs/types.ts:171](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L171) |
| <a id="meta"></a> `meta?` | `Record`\<`string`, `unknown`\> | [endpoints/Songs/types.ts:172](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/Songs/types.ts#L172) |
