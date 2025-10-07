[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [SearchTypes](../index.md) / SearchEndpointParams

# Interface: SearchEndpointParams

Defined in: [endpoints/Search/types.ts:97](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L97)

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="term"></a> `term?` | `string` | [endpoints/Search/types.ts:98](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L98) |
| <a id="types"></a> `types?` | `ResourceType`[] | [endpoints/Search/types.ts:99](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L99) |
| <a id="with"></a> `with?` | [`WithOption`](../enumerations/WithOption.md)[] | [endpoints/Search/types.ts:100](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L100) |
| <a id="platform"></a> `platform?` | `Platform` | [endpoints/Search/types.ts:101](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L101) |
| <a id="l"></a> `l?` | `Locale` | [endpoints/Search/types.ts:102](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L102) |
| <a id="limit"></a> `limit?` | `number` \| [`LimitParams`](LimitParams.md) | [endpoints/Search/types.ts:103](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L103) |
| <a id="art"></a> `art?` | [`ArtParams`](ArtParams.md) | [endpoints/Search/types.ts:105](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L105) |
| <a id="extend"></a> `extend?` | [`ArtistUrl`](../enumerations/ExtendOption.md#artisturl) \| [`ArtistUrl`](../enumerations/ExtendOption.md#artisturl)[] | [endpoints/Search/types.ts:106](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L106) |
| <a id="fields"></a> `fields?` | [`Fields`](Fields.md) | [endpoints/Search/types.ts:107](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L107) |
| <a id="format"></a> `format?` | `object` | [endpoints/Search/types.ts:108](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L108) |
| `format.resources?` | [`Map`](../enumerations/FormatResources.md#map) | [endpoints/Search/types.ts:109](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L109) |
| <a id="include"></a> `include?` | [`Include`](Include.md) | [endpoints/Search/types.ts:111](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L111) |
| <a id="omit"></a> `omit?` | `object` | [endpoints/Search/types.ts:112](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L112) |
| `omit.resource?` | [`Autos`](../enumerations/OmitResource.md#autos) | [endpoints/Search/types.ts:113](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L113) |
| <a id="relate"></a> `relate?` | [`Relate`](Relate.md) | [endpoints/Search/types.ts:115](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Search/types.ts#L115) |
