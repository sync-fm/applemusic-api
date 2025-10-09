[@syncfm/applemusic-api](../../../../globals.md) / [AppleMusic](../index.md) / Suggestions

# Class: Suggestions

Defined in: [AppleMusic.ts:208](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L208)

## Constructors

### Constructor

> **new Suggestions**(`ensureInitialized`, `getEndpoint`): `Suggestions`

Defined in: [AppleMusic.ts:209](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L209)

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

Defined in: [AppleMusic.ts:214](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/AppleMusic.ts#L214)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `params` | [`SuggestionsEndpointParams`](../namespaces/SuggestionsTypes/interfaces/SuggestionsEndpointParams.md) |

#### Returns

`Promise`\<[`SearchSuggestionsResponse`](../namespaces/SuggestionsTypes/interfaces/SearchSuggestionsResponse.md)\>
