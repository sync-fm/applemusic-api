[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [SongsTypes](../index.md) / SongsRelationshipResponse

# Interface: SongsRelationshipResponse\<T\>

Defined in: [endpoints/Songs/types.ts:161](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L161)

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* [`SongRelationshipName`](../type-aliases/SongRelationshipName.md) | [`SongRelationshipName`](../type-aliases/SongRelationshipName.md) |

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="data"></a> `data` | [`SongRelationshipResourceMap`](../type-aliases/SongRelationshipResourceMap.md)\[`T`\][] | [endpoints/Songs/types.ts:164](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L164) |
| <a id="href"></a> `href?` | `string` | [endpoints/Songs/types.ts:165](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L165) |
| <a id="next"></a> `next?` | `string` | [endpoints/Songs/types.ts:166](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L166) |
| <a id="meta"></a> `meta?` | `Record`\<`string`, `unknown`\> | [endpoints/Songs/types.ts:167](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L167) |
