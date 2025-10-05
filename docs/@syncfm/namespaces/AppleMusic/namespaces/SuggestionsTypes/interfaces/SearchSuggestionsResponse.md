[**@syncfm/applemusic-api**](../../../../../../README.md)

***

[@syncfm/applemusic-api](../../../../../../globals.md) / [AppleMusic](../../../README.md) / [SuggestionsTypes](../README.md) / SearchSuggestionsResponse

# Interface: SearchSuggestionsResponse

Defined in: [endpoints/Suggestions/types.ts:154](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Suggestions/types.ts#L154)

## Properties

### meta

> **meta**: `object`

Defined in: [endpoints/Suggestions/types.ts:158](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Suggestions/types.ts#L158)

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `metrics?` | `object` | [endpoints/Suggestions/types.ts:159](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Suggestions/types.ts#L159) |
| `metrics.dataSetId?` | `string` | [endpoints/Suggestions/types.ts:160](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Suggestions/types.ts#L160) |

***

### results

> **results**: `object`

Defined in: [endpoints/Suggestions/types.ts:155](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Suggestions/types.ts#L155)

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `suggestions` | [`SearchSuggestion`](SearchSuggestion.md)[] | [endpoints/Suggestions/types.ts:156](https://github.com/sync-fm/applemusic-api/blob/9ff258d5e3837a0cb0f9914911c5614d92f344ed/src/endpoints/Suggestions/types.ts#L156) |
