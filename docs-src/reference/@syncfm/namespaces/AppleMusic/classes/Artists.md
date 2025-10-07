[@syncfm/applemusic-api](../../../../globals.md) / [AppleMusic](../index.md) / Artists

# Class: Artists

Defined in: [AppleMusic.ts:260](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L260)

## Constructors

### Constructor

> **new Artists**(`ensureInitialized`, `getEndpoint`): `Artists`

Defined in: [AppleMusic.ts:261](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L261)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ensureInitialized` | `EnsureInitialized` |
| `getEndpoint` | () => `ArtistsEndpoint` |

#### Returns

`Artists`

## Methods

### get()

> **get**(`params`): `Promise`\<[`ArtistsResponse`](../namespaces/ArtistsTypes/interfaces/ArtistsResponse.md)\>

Defined in: [AppleMusic.ts:266](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L266)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`ArtistParams`](../namespaces/ArtistsTypes/interfaces/ArtistParams.md) |

#### Returns

`Promise`\<[`ArtistsResponse`](../namespaces/ArtistsTypes/interfaces/ArtistsResponse.md)\>

***

### getView()

> **getView**(`params`): `Promise`\<[`ArtistsViewResponse`](../namespaces/ArtistsTypes/interfaces/ArtistsViewResponse.md)\>

Defined in: [AppleMusic.ts:273](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L273)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`ArtistViewParams`](../namespaces/ArtistsTypes/interfaces/ArtistViewParams.md) |

#### Returns

`Promise`\<[`ArtistsViewResponse`](../namespaces/ArtistsTypes/interfaces/ArtistsViewResponse.md)\>

***

### getRelationship()

> **getRelationship**\<`T`\>(`params`): `Promise`\<[`ArtistsRelationshipResponse`](../namespaces/ArtistsTypes/interfaces/ArtistsRelationshipResponse.md)\<`T`\>\>

Defined in: [AppleMusic.ts:280](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L280)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* keyof [`ArtistRelationshipResourceMap`](../namespaces/ArtistsTypes/type-aliases/ArtistRelationshipResourceMap.md) | keyof [`ArtistRelationshipResourceMap`](../namespaces/ArtistsTypes/type-aliases/ArtistRelationshipResourceMap.md) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`ArtistRelationshipParams`](../namespaces/ArtistsTypes/interfaces/ArtistRelationshipParams.md) |

#### Returns

`Promise`\<[`ArtistsRelationshipResponse`](../namespaces/ArtistsTypes/interfaces/ArtistsRelationshipResponse.md)\<`T`\>\>
