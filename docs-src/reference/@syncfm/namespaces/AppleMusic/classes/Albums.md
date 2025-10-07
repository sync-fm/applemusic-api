[@syncfm/applemusic-api](../../../../globals.md) / [AppleMusic](../index.md) / Albums

# Class: Albums

Defined in: [AppleMusic.ts:230](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L230)

## Constructors

### Constructor

> **new Albums**(`ensureInitialized`, `getEndpoint`): `Albums`

Defined in: [AppleMusic.ts:231](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L231)

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

Defined in: [AppleMusic.ts:236](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L236)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`AlbumParams`](../namespaces/AlbumsTypes/interfaces/AlbumParams.md) |

#### Returns

`Promise`\<[`AlbumsResponse`](../namespaces/AlbumsTypes/interfaces/AlbumsResponse.md)\>

***

### getView()

> **getView**(`params`): `Promise`\<[`AlbumsViewResponse`](../namespaces/AlbumsTypes/interfaces/AlbumsViewResponse.md)\>

Defined in: [AppleMusic.ts:243](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L243)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`AlbumViewParams`](../namespaces/AlbumsTypes/interfaces/AlbumViewParams.md) |

#### Returns

`Promise`\<[`AlbumsViewResponse`](../namespaces/AlbumsTypes/interfaces/AlbumsViewResponse.md)\>

***

### getRelationship()

> **getRelationship**\<`T`\>(`params`): `Promise`\<[`AlbumsRelationshipResponse`](../namespaces/AlbumsTypes/interfaces/AlbumsRelationshipResponse.md)\<`T`\>\>

Defined in: [AppleMusic.ts:250](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L250)

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
