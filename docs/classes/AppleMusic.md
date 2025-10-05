[**@syncfm/applemusic-api**](../README.md)

***

[@syncfm/applemusic-api](../globals.md) / AppleMusic

# Class: AppleMusic

Defined in: [AppleMusic.ts:36](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L36)

## Constructors

### Constructor

> **new AppleMusic**(`config?`): `AppleMusic`

Defined in: [AppleMusic.ts:70](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L70)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config?` | [`AppleMusicConfig`](../interfaces/AppleMusicConfig.md) |

#### Returns

`AppleMusic`

## Properties

### Albums

> **Albums**: `object`

Defined in: [AppleMusic.ts:53](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L53)

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `Get()` | (...`_args`) => `Promise`\<[`AlbumsResponse`](../@syncfm/namespaces/AppleMusic/namespaces/AlbumsTypes/interfaces/AlbumsResponse.md)\> | [AppleMusic.ts:54](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L54) |
| `GetView()` | (...`_args`) => `Promise`\<[`AlbumsViewResponse`](../@syncfm/namespaces/AppleMusic/namespaces/AlbumsTypes/interfaces/AlbumsViewResponse.md)\> | [AppleMusic.ts:55](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L55) |

***

### Artists

> **Artists**: `object`

Defined in: [AppleMusic.ts:57](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L57)

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `Get()` | (...`_args`) => `Promise`\<[`ArtistsResponse`](../@syncfm/namespaces/AppleMusic/namespaces/ArtistsTypes/interfaces/ArtistsResponse.md)\> | [AppleMusic.ts:58](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L58) |
| `GetView()` | (...`_args`) => `Promise`\<[`ArtistsViewResponse`](../@syncfm/namespaces/AppleMusic/namespaces/ArtistsTypes/interfaces/ArtistsViewResponse.md)\> | [AppleMusic.ts:59](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L59) |

***

### config

> **config**: [`AppleMusicConfig`](../interfaces/AppleMusicConfig.md)

Defined in: [AppleMusic.ts:38](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L38)

***

### Hints

> **Hints**: `object`

Defined in: [AppleMusic.ts:50](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L50)

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `Get()` | (...`_args`) => `Promise`\<[`HintsResponse`](../@syncfm/namespaces/AppleMusic/namespaces/HintsTypes/interfaces/HintsResponse.md)\> | [AppleMusic.ts:51](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L51) |

***

### MusicVideos

> **MusicVideos**: `object`

Defined in: [AppleMusic.ts:61](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L61)

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `Get()` | (...`_args`) => `Promise`\<[`MusicVideosResponse`](../@syncfm/namespaces/AppleMusic/namespaces/MusicVideosTypes/interfaces/MusicVideosResponse.md)\> | [AppleMusic.ts:62](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L62) |
| `GetView()` | (...`_args`) => `Promise`\<[`MusicVideoViewResponse`](../@syncfm/namespaces/AppleMusic/namespaces/MusicVideosTypes/interfaces/MusicVideoViewResponse.md)\> | [AppleMusic.ts:63](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L63) |

***

### Search

> **Search**: `object`

Defined in: [AppleMusic.ts:44](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L44)

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `Get()` | (...`_args`) => `Promise`\<[`SearchEndpointResponse`](../@syncfm/namespaces/AppleMusic/namespaces/SearchTypes/interfaces/SearchEndpointResponse.md)\> | [AppleMusic.ts:45](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L45) |

***

### Songs

> **Songs**: `object`

Defined in: [AppleMusic.ts:65](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L65)

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `Get()` | (...`_args`) => `Promise`\<[`SongsResponse`](../@syncfm/namespaces/AppleMusic/namespaces/SongsTypes/interfaces/SongsResponse.md)\> | [AppleMusic.ts:66](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L66) |
| `GetRelationship()` | (...`_args`) => `Promise`\<[`SongsRelationshipResponse`](../@syncfm/namespaces/AppleMusic/namespaces/SongsTypes/interfaces/SongsRelationshipResponse.md)\> | [AppleMusic.ts:67](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L67) |

***

### Suggestions

> **Suggestions**: `object`

Defined in: [AppleMusic.ts:47](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L47)

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `Get()` | (...`_args`) => `Promise`\<[`SearchSuggestionsResponse`](../@syncfm/namespaces/AppleMusic/namespaces/SuggestionsTypes/interfaces/SearchSuggestionsResponse.md)\> | [AppleMusic.ts:48](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L48) |

## Methods

### init()

> **init**(): `Promise`\<`void`\>

Defined in: [AppleMusic.ts:74](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L74)

#### Returns

`Promise`\<`void`\>

***

### verifyTokenValidity()

> **verifyTokenValidity**(): `Promise`\<`boolean`\>

Defined in: [AppleMusic.ts:122](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/AppleMusic.ts#L122)

#### Returns

`Promise`\<`boolean`\>
