[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [SongsTypes](../index.md) / SongRelationshipOptions

# Interface: SongRelationshipOptions

Defined in: [endpoints/Songs/types.ts:125](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L125)

Query params for fetching a song relationship directly.
GET /v1/catalog/{storefront}/songs/{id}/{relationship}

## Extended by

- [`SongsRelationshipParams`](SongsRelationshipParams.md)

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="platform"></a> `platform?` | `Platform` | [endpoints/Songs/types.ts:126](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L126) |
| <a id="l"></a> `l?` | `Locale` | [endpoints/Songs/types.ts:127](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L127) |
| <a id="include"></a> `include?` | [`IncludeOption`](../enumerations/IncludeOption.md)[] | [endpoints/Songs/types.ts:128](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L128) |
| <a id="extend"></a> `extend?` | [`ExtendOption`](../enumerations/ExtendOption.md)[] | [endpoints/Songs/types.ts:129](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L129) |
| <a id="limit"></a> `limit?` | `number` | [endpoints/Songs/types.ts:130](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/Songs/types.ts#L130) |
