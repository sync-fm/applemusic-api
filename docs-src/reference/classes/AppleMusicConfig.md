[@syncfm/applemusic-api](../globals.md) / AppleMusicConfig

# Class: AppleMusicConfig

Defined in: [utils/Config.ts:41](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/utils/Config.ts#L41)

Mutable configuration shared across endpoints for an [AppleMusic](AppleMusic.md) client.

## Constructors

### Constructor

> **new AppleMusicConfig**(`config?`): `AppleMusicConfig`

Defined in: [utils/Config.ts:47](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/utils/Config.ts#L47)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config?` | [`AppleMusicConfigParams`](../type-aliases/AppleMusicConfigParams.md) |

#### Returns

`AppleMusicConfig`

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="region"></a> `region` | `public` | [`Region`](../enumerations/Region.md) | `Region.US` | [utils/Config.ts:42](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/utils/Config.ts#L42) |
| <a id="authtype"></a> `authType` | `public` | [`AuthType`](../enumerations/AuthType.md) | `AuthType.Scraped` | [utils/Config.ts:43](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/utils/Config.ts#L43) |
| <a id="logger"></a> `logger` | `public` | `Logger` | `undefined` | [utils/Config.ts:44](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/utils/Config.ts#L44) |
| <a id="loggeroptions"></a> `loggerOptions?` | `public` | `LoggerOptions` | `undefined` | [utils/Config.ts:45](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/utils/Config.ts#L45) |

## Methods

### setRegion()

> **setRegion**(`region`): `void`

Defined in: [utils/Config.ts:57](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/utils/Config.ts#L57)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `region` | [`Region`](../enumerations/Region.md) |

#### Returns

`void`

***

### setAuthType()

> **setAuthType**(`authType`): `void`

Defined in: [utils/Config.ts:61](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/utils/Config.ts#L61)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `authType` | [`AuthType`](../enumerations/AuthType.md) |

#### Returns

`void`

***

### setLoggerOptions()

> **setLoggerOptions**(`options`): `void`

Defined in: [utils/Config.ts:65](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/utils/Config.ts#L65)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | `LoggerOptions` |

#### Returns

`void`

***

### setLogger()

> **setLogger**(`logger`): `void`

Defined in: [utils/Config.ts:70](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/utils/Config.ts#L70)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `logger` | `Logger` |

#### Returns

`void`

***

### getBaseURL()

> **getBaseURL**(): `string`

Defined in: [utils/Config.ts:74](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/utils/Config.ts#L74)

#### Returns

`string`

***

### getBaseURLForAuthType()

> **getBaseURLForAuthType**(`authType`): `string`

Defined in: [utils/Config.ts:78](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/utils/Config.ts#L78)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `authType` | [`AuthType`](../enumerations/AuthType.md) |

#### Returns

`string`
