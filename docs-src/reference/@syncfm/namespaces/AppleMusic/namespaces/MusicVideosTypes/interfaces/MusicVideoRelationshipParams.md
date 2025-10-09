[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../index.md) / [MusicVideosTypes](../index.md) / MusicVideoRelationshipParams

# Interface: MusicVideoRelationshipParams

Defined in: [endpoints/MusicVideos/types.ts:154](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/MusicVideos/types.ts#L154)

## Extends

- [`MusicVideoRelationshipOptions`](MusicVideoRelationshipOptions.md)

## Properties

| Property | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="platform"></a> `platform?` | `Platform` | [`MusicVideoRelationshipOptions`](MusicVideoRelationshipOptions.md).[`platform`](MusicVideoRelationshipOptions.md#platform) | [endpoints/MusicVideos/types.ts:142](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/MusicVideos/types.ts#L142) |
| <a id="l"></a> `l?` | `Locale` | [`MusicVideoRelationshipOptions`](MusicVideoRelationshipOptions.md).[`l`](MusicVideoRelationshipOptions.md#l) | [endpoints/MusicVideos/types.ts:143](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/MusicVideos/types.ts#L143) |
| <a id="include"></a> `include?` | [`IncludeOption`](../enumerations/IncludeOption.md)[] | [`MusicVideoRelationshipOptions`](MusicVideoRelationshipOptions.md).[`include`](MusicVideoRelationshipOptions.md#include) | [endpoints/MusicVideos/types.ts:144](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/MusicVideos/types.ts#L144) |
| <a id="extend"></a> `extend?` | [`ArtistUrl`](../enumerations/ExtendOption.md#artisturl)[] | [`MusicVideoRelationshipOptions`](MusicVideoRelationshipOptions.md).[`extend`](MusicVideoRelationshipOptions.md#extend) | [endpoints/MusicVideos/types.ts:145](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/MusicVideos/types.ts#L145) |
| <a id="limit"></a> `limit?` | `number` | [`MusicVideoRelationshipOptions`](MusicVideoRelationshipOptions.md).[`limit`](MusicVideoRelationshipOptions.md#limit) | [endpoints/MusicVideos/types.ts:146](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/MusicVideos/types.ts#L146) |
| <a id="id"></a> `id` | `string` | - | [endpoints/MusicVideos/types.ts:156](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/MusicVideos/types.ts#L156) |
| <a id="relationship"></a> `relationship` | keyof [`MusicVideoRelationshipResourceMap`](../type-aliases/MusicVideoRelationshipResourceMap.md) | - | [endpoints/MusicVideos/types.ts:157](https://github.com/sync-fm/applemusic-api/blob/9471caba6a6b5bc92263ffc6e5d9c04672ec1f7f/src/endpoints/MusicVideos/types.ts#L157) |
