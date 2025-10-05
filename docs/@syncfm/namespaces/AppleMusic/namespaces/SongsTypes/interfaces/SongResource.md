[**@syncfm/applemusic-api**](../../../../../../README.md)

***

[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../README.md) / [SongsTypes](../README.md) / SongResource

# Interface: SongResource

Defined in: [endpoints/Songs/types.ts:38](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Songs/types.ts#L38)

## Extends

- `Resource`\<`SongAttributes`\>

## Properties

### attributes

> **attributes**: `SongAttributes`

Defined in: [types/SharedResourceTypes.ts:63](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/types/SharedResourceTypes.ts#L63)

#### Inherited from

`Resource.attributes`

***

### href?

> `optional` **href**: `string`

Defined in: [types/SharedResourceTypes.ts:62](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/types/SharedResourceTypes.ts#L62)

#### Inherited from

`Resource.href`

***

### id

> **id**: `string`

Defined in: [types/SharedResourceTypes.ts:60](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/types/SharedResourceTypes.ts#L60)

#### Inherited from

`Resource.id`

***

### meta?

> `optional` **meta**: `Record`\<`string`, `any`\>

Defined in: [types/SharedResourceTypes.ts:65](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/types/SharedResourceTypes.ts#L65)

#### Inherited from

`Resource.meta`

***

### relationships?

> `optional` **relationships**: [`SongRelationships`](SongRelationships.md)

Defined in: [endpoints/Songs/types.ts:40](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Songs/types.ts#L40)

#### Overrides

`Resource.relationships`

***

### type

> **type**: `"songs"`

Defined in: [endpoints/Songs/types.ts:39](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Songs/types.ts#L39)

#### Overrides

`Resource.type`
