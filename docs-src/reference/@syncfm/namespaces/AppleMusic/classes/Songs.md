[@syncfm/applemusic-api](../../../../globals.md) / [AppleMusic](../index.md) / Songs

# Class: Songs

Defined in: [AppleMusic.ts:298](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L298)

## Constructors

### Constructor

> **new Songs**(`ensureInitialized`, `getEndpoint`): `Songs`

Defined in: [AppleMusic.ts:299](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L299)

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

Defined in: [AppleMusic.ts:304](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L304)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`SongParams`](../namespaces/SongsTypes/interfaces/SongParams.md) |

#### Returns

`Promise`\<[`SongsResponse`](../namespaces/SongsTypes/interfaces/SongsResponse.md)\>

***

### getRelationship()

> **getRelationship**\<`T`\>(`params`): `Promise`\<[`SongsRelationshipResponse`](../namespaces/SongsTypes/interfaces/SongsRelationshipResponse.md)\<`T`\>\>

Defined in: [AppleMusic.ts:311](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L311)

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
