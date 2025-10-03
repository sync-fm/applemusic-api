---
title: "Songs.Relationships.SongsLibraryRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/songslibraryrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the song to its library."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Songs](https://developer.apple.com/documentation/applemusicapi/songs)
- [Songs.Relationships](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary)
- Songs.Relationships.SongsLibraryRelationship

Object

A relationship from the song to its library.

```
object Songs.Relationships.SongsLibraryRelationship
```

## Properties

`href`

`string`

A relative location for the relationship.

`next`

`string`

A relative cursor to fetch the next paginated collection of resources in the relationship if more exist.

`data`

``[[`LibrarySongs`](https://developer.apple.com/documentation/applemusicapi/librarysongs)]``

(Required)

The library associated with the song.

Current page is Songs.Relationships.SongsLibraryRelationship