[@syncfm/applemusic-api](../../../../globals.md) / [AppleMusic](../index.md) / Songs

# Class: Songs

Defined in: [AppleMusic.ts:290](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L290)

## Constructors

### Constructor

> **new Songs**(`ensureInitialized`, `getEndpoint`): `Songs`

Defined in: [AppleMusic.ts:291](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L291)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ensureInitialized` | `EnsureInitialized` |
| `getEndpoint` | () => `SongsEndpoint` |

#### Returns

`Songs`

## Methods

### get()

> **get**(`params`): `Promise`\<[`SongsResponse`](../namespaces/SongsTypes/interfaces/SongsResponse.md)\>

Defined in: [AppleMusic.ts:296](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L296)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`SongParams`](../namespaces/SongsTypes/interfaces/SongParams.md) |

#### Returns

`Promise`\<[`SongsResponse`](../namespaces/SongsTypes/interfaces/SongsResponse.md)\>

***

### getRelationship()

> **getRelationship**\<`T`\>(`params`): `Promise`\<[`SongsRelationshipResponse`](../namespaces/SongsTypes/interfaces/SongsRelationshipResponse.md)\<`T`\>\>

Defined in: [AppleMusic.ts:303](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L303)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* keyof [`SongRelationshipResourceMap`](../namespaces/SongsTypes/type-aliases/SongRelationshipResourceMap.md) | keyof [`SongRelationshipResourceMap`](../namespaces/SongsTypes/type-aliases/SongRelationshipResourceMap.md) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`SongsRelationshipParams`](../namespaces/SongsTypes/interfaces/SongsRelationshipParams.md) |

#### Returns

`Promise`\<[`SongsRelationshipResponse`](../namespaces/SongsTypes/interfaces/SongsRelationshipResponse.md)\<`T`\>\>
