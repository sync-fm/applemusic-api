[@syncfm/applemusic-api](../../../../globals.md) / [AppleMusic](../index.md) / Search

# Class: Search

Defined in: [AppleMusic.ts:188](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L188)

## Constructors

### Constructor

> **new Search**(`ensureInitialized`, `getEndpoint`): `Search`

Defined in: [AppleMusic.ts:189](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L189)

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

Defined in: [AppleMusic.ts:194](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L194)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`SearchEndpointParams`](../namespaces/SearchTypes/interfaces/SearchEndpointParams.md) |

#### Returns

`Promise`\<[`SearchEndpointResponse`](../namespaces/SearchTypes/interfaces/SearchEndpointResponse.md)\>
