[@syncfm/applemusic-api](../../../../globals.md) / [AppleMusic](../index.md) / Suggestions

# Class: Suggestions

Defined in: [AppleMusic.ts:202](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L202)

## Constructors

### Constructor

> **new Suggestions**(`ensureInitialized`, `getEndpoint`): `Suggestions`

Defined in: [AppleMusic.ts:203](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L203)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ensureInitialized` | `EnsureInitialized` |
| `getEndpoint` | () => `SuggestionsEndpoint` |

#### Returns

`Suggestions`

## Methods

### suggestions()

> **suggestions**(`params`): `Promise`\<[`SearchSuggestionsResponse`](../namespaces/SuggestionsTypes/interfaces/SearchSuggestionsResponse.md)\>

Defined in: [AppleMusic.ts:208](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L208)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`SuggestionsEndpointParams`](../namespaces/SuggestionsTypes/interfaces/SuggestionsEndpointParams.md) |

#### Returns

`Promise`\<[`SearchSuggestionsResponse`](../namespaces/SuggestionsTypes/interfaces/SearchSuggestionsResponse.md)\>
