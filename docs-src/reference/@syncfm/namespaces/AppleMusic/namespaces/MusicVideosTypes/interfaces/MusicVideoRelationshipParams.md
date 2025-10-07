[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [MusicVideosTypes](../index.md) / MusicVideoRelationshipParams

# Interface: MusicVideoRelationshipParams

Defined in: [endpoints/MusicVideos/types.ts:153](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/MusicVideos/types.ts#L153)

## Extends

- [`MusicVideoRelationshipOptions`](MusicVideoRelationshipOptions.md)

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="platform"></a> `platform?` | `Platform` | [`MusicVideoRelationshipOptions`](MusicVideoRelationshipOptions.md).[`platform`](MusicVideoRelationshipOptions.md#platform) | [endpoints/MusicVideos/types.ts:141](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/MusicVideos/types.ts#L141) |
| <a id="l"></a> `l?` | `Locale` | [`MusicVideoRelationshipOptions`](MusicVideoRelationshipOptions.md).[`l`](MusicVideoRelationshipOptions.md#l) | [endpoints/MusicVideos/types.ts:142](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/MusicVideos/types.ts#L142) |
| <a id="include"></a> `include?` | [`IncludeOption`](../enumerations/IncludeOption.md)[] | [`MusicVideoRelationshipOptions`](MusicVideoRelationshipOptions.md).[`include`](MusicVideoRelationshipOptions.md#include) | [endpoints/MusicVideos/types.ts:143](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/MusicVideos/types.ts#L143) |
| <a id="extend"></a> `extend?` | [`ArtistUrl`](../enumerations/ExtendOption.md#artisturl)[] | [`MusicVideoRelationshipOptions`](MusicVideoRelationshipOptions.md).[`extend`](MusicVideoRelationshipOptions.md#extend) | [endpoints/MusicVideos/types.ts:144](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/MusicVideos/types.ts#L144) |
| <a id="limit"></a> `limit?` | `number` | [`MusicVideoRelationshipOptions`](MusicVideoRelationshipOptions.md).[`limit`](MusicVideoRelationshipOptions.md#limit) | [endpoints/MusicVideos/types.ts:145](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/MusicVideos/types.ts#L145) |
| <a id="id"></a> `id` | `string` | - | [endpoints/MusicVideos/types.ts:155](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/MusicVideos/types.ts#L155) |
| <a id="relationship"></a> `relationship` | keyof [`MusicVideoRelationshipResourceMap`](../type-aliases/MusicVideoRelationshipResourceMap.md) | - | [endpoints/MusicVideos/types.ts:156](https://github.com/sync-fm/applemusic-api/blob/a6a8471d4d51a41f6bd8af9d95c8abf0126e10f4/src/endpoints/MusicVideos/types.ts#L156) |
