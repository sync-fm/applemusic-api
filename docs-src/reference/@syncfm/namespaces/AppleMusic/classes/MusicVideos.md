[@syncfm/applemusic-api](../../../../globals.md) / [AppleMusic](../index.md) / MusicVideos

# Class: MusicVideos

Defined in: [AppleMusic.ts:313](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L313)

## Constructors

### Constructor

> **new MusicVideos**(`ensureInitialized`, `getEndpoint`): `MusicVideos`

Defined in: [AppleMusic.ts:314](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L314)

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

Defined in: [AppleMusic.ts:319](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L319)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`MusicVideoParams`](../namespaces/MusicVideosTypes/interfaces/MusicVideoParams.md) |

#### Returns

`Promise`\<[`MusicVideosResponse`](../namespaces/MusicVideosTypes/interfaces/MusicVideosResponse.md)\>

***

### getView()

> **getView**(`params`): `Promise`\<[`MusicVideoViewResponse`](../namespaces/MusicVideosTypes/interfaces/MusicVideoViewResponse.md)\>

Defined in: [AppleMusic.ts:326](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L326)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`MusicVideoViewParams`](../namespaces/MusicVideosTypes/interfaces/MusicVideoViewParams.md) |

#### Returns

`Promise`\<[`MusicVideoViewResponse`](../namespaces/MusicVideosTypes/interfaces/MusicVideoViewResponse.md)\>

***

### getRelationship()

> **getRelationship**\<`T`\>(`params`): `Promise`\<[`MusicVideoRelationshipResponse`](../namespaces/MusicVideosTypes/interfaces/MusicVideoRelationshipResponse.md)\<`T`\>\>

Defined in: [AppleMusic.ts:333](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L333)

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
