[@syncfm/applemusic-api](../../../../globals.md) / [AppleMusic](../index.md) / Search

# Class: Search

Defined in: [AppleMusic.ts:194](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L194)

## Constructors

### Constructor

> **new Search**(`ensureInitialized`, `getEndpoint`): `Search`

Defined in: [AppleMusic.ts:195](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L195)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ensureInitialized` | `EnsureInitialized` |
| `getEndpoint` | () => `SearchEndpoint` |

#### Returns

`Search`

## Methods

### search()

> **search**(`params`): `Promise`\<[`SearchEndpointResponse`](../namespaces/SearchTypes/interfaces/SearchEndpointResponse.md)\>

Defined in: [AppleMusic.ts:200](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L200)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`SearchEndpointParams`](../namespaces/SearchTypes/interfaces/SearchEndpointParams.md) |

#### Returns

`Promise`\<[`SearchEndpointResponse`](../namespaces/SearchTypes/interfaces/SearchEndpointResponse.md)\>
