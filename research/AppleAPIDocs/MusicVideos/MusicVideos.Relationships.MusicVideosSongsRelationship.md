---
title: "MusicVideos.Relationships.MusicVideosSongsRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/musicvideossongsrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the music video to its songs."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [MusicVideos](https://developer.apple.com/documentation/applemusicapi/musicvideos)
- [MusicVideos.Relationships](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary)
- MusicVideos.Relationships.MusicVideosSongsRelationship

Object

A relationship from the music video to its songs.

```
object MusicVideos.Relationships.MusicVideosSongsRelationship
```

## Properties

`href`

`string`

A relative location for the relationship.

`next`

`string`

A relative cursor to fetch the next paginated collection of resources in the relationship if more exist.

`data`

``[[`Songs`](https://developer.apple.com/documentation/applemusicapi/songs)]``

(Required)

The songs associated with the music video.

Current page is MusicVideos.Relationships.MusicVideosSongsRelationship