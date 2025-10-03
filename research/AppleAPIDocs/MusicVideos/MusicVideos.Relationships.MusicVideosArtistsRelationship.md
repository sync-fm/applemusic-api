---
title: "MusicVideos.Relationships.MusicVideosArtistsRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/musicvideosartistsrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the music video to its artists."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [MusicVideos](https://developer.apple.com/documentation/applemusicapi/musicvideos)
- [MusicVideos.Relationships](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary)
- MusicVideos.Relationships.MusicVideosArtistsRelationship

Object

A relationship from the music video to its artists.

```
object MusicVideos.Relationships.MusicVideosArtistsRelationship
```

## Properties

`href`

`string`

A relative location for the relationship.

`next`

`string`

A relative cursor to fetch the next paginated collection of resources in the relationship if more exist.

`data`

``[[`Artists`](https://developer.apple.com/documentation/applemusicapi/artists)]``

(Required)

The artists associated with the music video.

Current page is MusicVideos.Relationships.MusicVideosArtistsRelationship