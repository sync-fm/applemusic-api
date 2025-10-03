---
title: "Albums.Relationships.AlbumsTracksRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/albumstracksrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the album to its tracks."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Albums](https://developer.apple.com/documentation/applemusicapi/albums)
- [Albums.Relationships](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary)
- Albums.Relationships.AlbumsTracksRelationship

Object

A relationship from the album to its tracks.

```
object Albums.Relationships.AlbumsTracksRelationship
```

## Properties

`data`

`[*]`

(Required)

The ordered songs and music videos in the tracklist of the album.

`href`

`string`

A relative location for the relationship.

`next`

`string`

A relative cursor to fetch the next paginated collection of resources in the relationship if more exist.

Current page is Albums.Relationships.AlbumsTracksRelationship