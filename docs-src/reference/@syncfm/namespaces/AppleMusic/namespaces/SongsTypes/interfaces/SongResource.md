[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [SongsTypes](../index.md) / SongResource

# Interface: SongResource

Defined in: [endpoints/Songs/types.ts:95](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L95)

## Extends

- `Resource`\<`SongAttributes`\>

## Properties

| Property | Type | Overrides | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="type"></a> `type` | `"songs"` | `Resource.type` | - | [endpoints/Songs/types.ts:96](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L96) |
| <a id="relationships"></a> `relationships?` | [`SongRelationships`](SongRelationships.md) | `Resource.relationships` | - | [endpoints/Songs/types.ts:97](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L97) |
| <a id="meta"></a> `meta?` | `Record`\<`string`, `unknown`\> | `Resource.meta` | - | [endpoints/Songs/types.ts:98](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L98) |
| <a id="id"></a> `id` | `string` | - | `Resource.id` | [types/SharedResourceTypes.ts:60](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/types/SharedResourceTypes.ts#L60) |
| <a id="href"></a> `href?` | `string` | - | `Resource.href` | [types/SharedResourceTypes.ts:62](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/types/SharedResourceTypes.ts#L62) |
| <a id="attributes"></a> `attributes` | `SongAttributes` | - | `Resource.attributes` | [types/SharedResourceTypes.ts:63](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/types/SharedResourceTypes.ts#L63) |
