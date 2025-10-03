---
title: "MusicVideos.Relationships.MusicVideosLibraryRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/musicvideoslibraryrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the music video to its library."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [MusicVideos](https://developer.apple.com/documentation/applemusicapi/musicvideos)
- [MusicVideos.Relationships](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary)
- MusicVideos.Relationships.MusicVideosLibraryRelationship

Object

A relationship from the music video to its library.

```
object MusicVideos.Relationships.MusicVideosLibraryRelationship
```

## Properties

`href`

`string`

A relative location for the relationship.

`next`

`string`

A relative cursor to fetch the next paginated collection of resources in the relationship if more exist.

`data`

``[[`LibraryMusicVideos`](https://developer.apple.com/documentation/applemusicapi/librarymusicvideos)]``

(Required)

The library associated with the music video, if any.

Current page is MusicVideos.Relationships.MusicVideosLibraryRelationship