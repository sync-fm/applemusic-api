[@syncfm/applemusic-api](../../../../globals.md) / [AppleMusic](../index.md) / MusicVideos

# Class: MusicVideos

Defined in: [AppleMusic.ts:322](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L322)

## Constructors

### Constructor

> **new MusicVideos**(`ensureInitialized`, `getEndpoint`): `MusicVideos`

Defined in: [AppleMusic.ts:323](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L323)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ensureInitialized` | `EnsureInitialized` |
| `getEndpoint` | () => `MusicVideosEndpoint` |

#### Returns

`MusicVideos`

## Methods

### get()

> **get**(`params`): `Promise`\<[`MusicVideosResponse`](../namespaces/MusicVideosTypes/interfaces/MusicVideosResponse.md)\>

Defined in: [AppleMusic.ts:328](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L328)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`MusicVideoParams`](../namespaces/MusicVideosTypes/interfaces/MusicVideoParams.md) |

#### Returns

`Promise`\<[`MusicVideosResponse`](../namespaces/MusicVideosTypes/interfaces/MusicVideosResponse.md)\>

***

### getView()

> **getView**(`params`): `Promise`\<[`MusicVideoViewResponse`](../namespaces/MusicVideosTypes/interfaces/MusicVideoViewResponse.md)\>

Defined in: [AppleMusic.ts:335](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L335)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`MusicVideoViewParams`](../namespaces/MusicVideosTypes/interfaces/MusicVideoViewParams.md) |

#### Returns

`Promise`\<[`MusicVideoViewResponse`](../namespaces/MusicVideosTypes/interfaces/MusicVideoViewResponse.md)\>

***

### getRelationship()

> **getRelationship**\<`T`\>(`params`): `Promise`\<[`MusicVideoRelationshipResponse`](../namespaces/MusicVideosTypes/interfaces/MusicVideoRelationshipResponse.md)\<`T`\>\>

Defined in: [AppleMusic.ts:342](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L342)

#### Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` *extends* keyof [`MusicVideoRelationshipResourceMap`](../namespaces/MusicVideosTypes/type-aliases/MusicVideoRelationshipResourceMap.md) | keyof [`MusicVideoRelationshipResourceMap`](../namespaces/MusicVideosTypes/type-aliases/MusicVideoRelationshipResourceMap.md) |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`MusicVideoRelationshipParams`](../namespaces/MusicVideosTypes/interfaces/MusicVideoRelationshipParams.md) |

#### Returns

`Promise`\<[`MusicVideoRelationshipResponse`](../namespaces/MusicVideosTypes/interfaces/MusicVideoRelationshipResponse.md)\<`T`\>\>
