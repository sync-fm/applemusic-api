---
title: "Albums.Relationships.AlbumsRecordLabelsRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/albumsrecordlabelsrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the album to its associated record label."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Albums](https://developer.apple.com/documentation/applemusicapi/albums)
- [Albums.Relationships](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary)
- Albums.Relationships.AlbumsRecordLabelsRelationship

Object

A relationship from the album to its associated record label.

```
object Albums.Relationships.AlbumsRecordLabelsRelationship
```

## Properties

`href`

`string`

The relative location to fetch the relationship directly.

`next`

`string`

The relative location to request the next page of resources in the collection, if additional resources are available for fetching.

`data`

``[[`RecordLabels`](https://developer.apple.com/documentation/applemusicapi/recordlabels)]``

(Required)

The album’s associated record label.

Current page is Albums.Relationships.AlbumsRecordLabelsRelationship