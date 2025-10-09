[@syncfm/applemusic-api](../../../../globals.md) / [AppleMusic](../index.md) / Artists

# Class: Artists

Defined in: [AppleMusic.ts:267](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L267)

## Constructors

### Constructor

> **new Artists**(`ensureInitialized`, `getEndpoint`): `Artists`

Defined in: [AppleMusic.ts:268](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L268)

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

Defined in: [AppleMusic.ts:273](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L273)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`ArtistParams`](../namespaces/ArtistsTypes/interfaces/ArtistParams.md) |

#### Returns

`Promise`\<[`ArtistsResponse`](../namespaces/ArtistsTypes/interfaces/ArtistsResponse.md)\>

***

### getView()

> **getView**(`params`): `Promise`\<[`ArtistsViewResponse`](../namespaces/ArtistsTypes/interfaces/ArtistsViewResponse.md)\>

Defined in: [AppleMusic.ts:280](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L280)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`ArtistViewParams`](../namespaces/ArtistsTypes/interfaces/ArtistViewParams.md) |

#### Returns

`Promise`\<[`ArtistsViewResponse`](../namespaces/ArtistsTypes/interfaces/ArtistsViewResponse.md)\>

***

### getRelationship()

> **getRelationship**\<`T`\>(`params`): `Promise`\<[`ArtistsRelationshipResponse`](../namespaces/ArtistsTypes/interfaces/ArtistsRelationshipResponse.md)\<`T`\>\>

Defined in: [AppleMusic.ts:287](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L287)

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
