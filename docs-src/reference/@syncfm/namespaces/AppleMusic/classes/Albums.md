[@syncfm/applemusic-api](../../../../globals.md) / [AppleMusic](../index.md) / Albums

# Class: Albums

Defined in: [AppleMusic.ts:236](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L236)

## Constructors

### Constructor

> **new Albums**(`ensureInitialized`, `getEndpoint`): `Albums`

Defined in: [AppleMusic.ts:237](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L237)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ensureInitialized` | `EnsureInitialized` |
| `getEndpoint` | () => `AlbumsEndpoint` |

#### Returns

`Albums`

## Methods

### get()

> **get**(`params`): `Promise`\<[`AlbumsResponse`](../namespaces/AlbumsTypes/interfaces/AlbumsResponse.md)\>

Defined in: [AppleMusic.ts:242](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L242)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`AlbumParams`](../namespaces/AlbumsTypes/interfaces/AlbumParams.md) |

#### Returns

`Promise`\<[`AlbumsResponse`](../namespaces/AlbumsTypes/interfaces/AlbumsResponse.md)\>

***

### getView()

> **getView**(`params`): `Promise`\<[`AlbumsViewResponse`](../namespaces/AlbumsTypes/interfaces/AlbumsViewResponse.md)\>

Defined in: [AppleMusic.ts:249](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L249)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`AlbumViewParams`](../namespaces/AlbumsTypes/interfaces/AlbumViewParams.md) |

#### Returns

`Promise`\<[`AlbumsViewResponse`](../namespaces/AlbumsTypes/interfaces/AlbumsViewResponse.md)\>

***

### getRelationship()

> **getRelationship**\<`T`\>(`params`): `Promise`\<[`AlbumsRelationshipResponse`](../namespaces/AlbumsTypes/interfaces/AlbumsRelationshipResponse.md)\<`T`\>\>

Defined in: [AppleMusic.ts:256](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L256)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* [`AlbumRelationshipName`](../namespaces/AlbumsTypes/type-aliases/AlbumRelationshipName.md) | [`AlbumRelationshipName`](../namespaces/AlbumsTypes/type-aliases/AlbumRelationshipName.md) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`AlbumRelationshipParams`](../namespaces/AlbumsTypes/interfaces/AlbumRelationshipParams.md) |

#### Returns

`Promise`\<[`AlbumsRelationshipResponse`](../namespaces/AlbumsTypes/interfaces/AlbumsRelationshipResponse.md)\<`T`\>\>
