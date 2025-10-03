---
title: "Artists.Relationships.ArtistsMusicVideosRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/artistsmusicvideosrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the artist to its music videos."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Artists](https://developer.apple.com/documentation/applemusicapi/artists)
- [Artists.Relationships](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary)
- Artists.Relationships.ArtistsMusicVideosRelationship

Object

A relationship from the artist to its music videos.

```
object Artists.Relationships.ArtistsMusicVideosRelationship
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

The music videos for the artist.

Current page is Artists.Relationships.ArtistsMusicVideosRelationship