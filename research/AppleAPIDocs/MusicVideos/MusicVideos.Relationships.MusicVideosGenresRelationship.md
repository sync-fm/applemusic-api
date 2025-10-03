---
title: "MusicVideos.Relationships.MusicVideosGenresRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/musicvideosgenresrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the music video to its genres."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [MusicVideos](https://developer.apple.com/documentation/applemusicapi/musicvideos)
- [MusicVideos.Relationships](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary)
- MusicVideos.Relationships.MusicVideosGenresRelationship

Object

A relationship from the music video to its genres.

```
object MusicVideos.Relationships.MusicVideosGenresRelationship
```

## Properties

`href`

`string`

A relative location for the relationship.

`next`

`string`

A relative cursor to fetch the next paginated collection of resources in the relationship if more exist.

`data`

``[[`Genres`](https://developer.apple.com/documentation/applemusicapi/genres)]``

(Required)

The genres associated with the music video.

Current page is MusicVideos.Relationships.MusicVideosGenresRelationship