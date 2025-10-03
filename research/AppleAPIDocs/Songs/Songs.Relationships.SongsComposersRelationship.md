---
title: "Songs.Relationships.SongsComposersRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/songscomposersrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the song to its composers."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Songs](https://developer.apple.com/documentation/applemusicapi/songs)
- [Songs.Relationships](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary)
- Songs.Relationships.SongsComposersRelationship

Object

A relationship from the song to its composers.

```
object Songs.Relationships.SongsComposersRelationship
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

The composers associated with the song.

Current page is Songs.Relationships.SongsComposersRelationship