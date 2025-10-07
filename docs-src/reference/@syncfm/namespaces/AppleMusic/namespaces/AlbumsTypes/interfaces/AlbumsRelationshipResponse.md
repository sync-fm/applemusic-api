[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [AlbumsTypes](../index.md) / AlbumsRelationshipResponse

# Interface: AlbumsRelationshipResponse\<T\>

Defined in: [endpoints/Albums/types.ts:229](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L229)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* [`AlbumRelationshipName`](../type-aliases/AlbumRelationshipName.md) | [`AlbumRelationshipName`](../type-aliases/AlbumRelationshipName.md) |

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="data"></a> `data` | [`AlbumRelationshipResourceMap`](../type-aliases/AlbumRelationshipResourceMap.md)\[`T`\][] | [endpoints/Albums/types.ts:232](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L232) |
| <a id="href"></a> `href?` | `string` | [endpoints/Albums/types.ts:233](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L233) |
| <a id="next"></a> `next?` | `string` | [endpoints/Albums/types.ts:234](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L234) |
| <a id="meta"></a> `meta?` | `Record`\<`string`, `unknown`\> | [endpoints/Albums/types.ts:235](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Albums/types.ts#L235) |
