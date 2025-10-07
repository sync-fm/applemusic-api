[@syncfm/applemusic-api](../globals.md) / AppleMusicConfig

# Class: AppleMusicConfig

Defined in: [utils/Config.ts:38](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/utils/Config.ts#L38)

Mutable configuration shared across endpoints for an [AppleMusic](AppleMusic.md) client.

## Constructors

### Constructor

> **new AppleMusicConfig**(`config?`): `AppleMusicConfig`

Defined in: [utils/Config.ts:42](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/utils/Config.ts#L42)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `config?` | `Partial`\<[`AppleMusicConfigParams`](../type-aliases/AppleMusicConfigParams.md)\> |

#### Returns

`AppleMusicConfig`

## Properties

| Property | Modifier | Type | Default value | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="region"></a> `region` | `public` | [`Region`](../enumerations/Region.md) | `Region.US` | [utils/Config.ts:39](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/utils/Config.ts#L39) |
| <a id="authtype"></a> `authType` | `public` | [`AuthType`](../enumerations/AuthType.md) | `AuthType.Scraped` | [utils/Config.ts:40](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/utils/Config.ts#L40) |

## Methods

### setRegion()

> **setRegion**(`region`): `void`

Defined in: [utils/Config.ts:48](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/utils/Config.ts#L48)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `region` | [`Region`](../enumerations/Region.md) |

#### Returns

`void`

***

### setAuthType()

> **setAuthType**(`authType`): `void`

Defined in: [utils/Config.ts:52](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/utils/Config.ts#L52)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `authType` | [`AuthType`](../enumerations/AuthType.md) |

#### Returns

`void`

***

### getBaseURL()

> **getBaseURL**(): `string`

Defined in: [utils/Config.ts:56](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/utils/Config.ts#L56)

#### Returns

`string`

***

### getBaseURLForAuthType()

> **getBaseURLForAuthType**(`authType`): `string`

Defined in: [utils/Config.ts:60](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/utils/Config.ts#L60)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `authType` | [`AuthType`](../enumerations/AuthType.md) |

#### Returns

`string`
