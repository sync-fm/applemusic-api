---
title: "MusicVideos.Relationships.MusicVideosAlbumsRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/musicvideosalbumsrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the music video to its albums."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [MusicVideos](https://developer.apple.com/documentation/applemusicapi/musicvideos)
- [MusicVideos.Relationships](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary)
- MusicVideos.Relationships.MusicVideosAlbumsRelationship

Object

A relationship from the music video to its albums.

```
object MusicVideos.Relationships.MusicVideosAlbumsRelationship
```

## Properties

`href`

`string`

A relative location for the relationship.

`next`

`string`

A relative cursor to fetch the next paginated collection of resources in the relationship if more exist.

`data`

``[[`Albums`](https://developer.apple.com/documentation/applemusicapi/albums)]``

(Required)

The albums associated with the music video, if any.

Current page is MusicVideos.Relationships.MusicVideosAlbumsRelationship