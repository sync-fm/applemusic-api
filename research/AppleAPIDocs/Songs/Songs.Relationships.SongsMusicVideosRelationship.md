---
title: "Songs.Relationships.SongsMusicVideosRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/songsmusicvideosrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the song to its music videos."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Songs](https://developer.apple.com/documentation/applemusicapi/songs)
- [Songs.Relationships](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary)
- Songs.Relationships.SongsMusicVideosRelationship

Object

A relationship from the song to its music videos.

```
object Songs.Relationships.SongsMusicVideosRelationship
```

## Properties

`href`

`string`

A relative location for the relationship.

`next`

`string`

A relative cursor to fetch the next paginated collection of resources in the relationship if more exist.

`data`

``[[`MusicVideos`](https://developer.apple.com/documentation/applemusicapi/musicvideos)]``

(Required)

The music videos associated with the song.

Current page is Songs.Relationships.SongsMusicVideosRelationship