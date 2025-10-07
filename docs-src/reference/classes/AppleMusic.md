[@syncfm/applemusic-api](../globals.md) / AppleMusic

# Class: AppleMusic

Defined in: [AppleMusic.ts:19](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L19)

## Constructors

### Constructor

> **new AppleMusic**(`config?`): `AppleMusic`

Defined in: [AppleMusic.ts:54](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L54)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config?` | [`AppleMusicConfigParams`](../type-aliases/AppleMusicConfigParams.md) |

#### Returns

`AppleMusic`

## Properties

### Configuration

#### config

> **config**: [`AppleMusicConfig`](AppleMusicConfig.md)

Defined in: [AppleMusic.ts:52](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L52)

Mutable configuration backing this client instance.

### Other

#### Search

> `readonly` **Search**: [`Search`](../@syncfm/namespaces/AppleMusic/classes/Search.md)

Defined in: [AppleMusic.ts:32](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L32)

***

#### Suggestions

> `readonly` **Suggestions**: [`Suggestions`](../@syncfm/namespaces/AppleMusic/classes/Suggestions.md)

Defined in: [AppleMusic.ts:33](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L33)

***

#### Hints

> `readonly` **Hints**: [`Hints`](../@syncfm/namespaces/AppleMusic/classes/Hints.md)

Defined in: [AppleMusic.ts:34](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L34)

***

#### Albums

> `readonly` **Albums**: [`Albums`](../@syncfm/namespaces/AppleMusic/classes/Albums.md)

Defined in: [AppleMusic.ts:35](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L35)

***

#### Songs

> `readonly` **Songs**: [`Songs`](../@syncfm/namespaces/AppleMusic/classes/Songs.md)

Defined in: [AppleMusic.ts:36](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L36)

***

#### Artists

> `readonly` **Artists**: [`Artists`](../@syncfm/namespaces/AppleMusic/classes/Artists.md)

Defined in: [AppleMusic.ts:37](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L37)

***

#### MusicVideos

> `readonly` **MusicVideos**: [`MusicVideos`](../@syncfm/namespaces/AppleMusic/classes/MusicVideos.md)

Defined in: [AppleMusic.ts:38](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L38)

***

#### log

> **log**: `Logger`

Defined in: [AppleMusic.ts:43](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L43)

Structured logger used across the Apple Music client.

## Methods

### Lifecycle

#### init()

> **init**(): `Promise`\<`void`\>

Defined in: [AppleMusic.ts:131](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L131)

Initialize the client by acquiring an authenticated Axios instance and preparing endpoints.

##### Returns

`Promise`\<`void`\>

***

#### verifyTokenValidity()

> **verifyTokenValidity**(): `Promise`\<`boolean`\>

Defined in: [AppleMusic.ts:171](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/AppleMusic.ts#L171)

Perform a lightweight request to validate the configured developer token.

##### Returns

`Promise`\<`boolean`\>
