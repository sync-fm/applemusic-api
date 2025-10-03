---
title: "Songs.Relationships.SongsGenresRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/songsgenresrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the song to its genres."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Songs](https://developer.apple.com/documentation/applemusicapi/songs)
- [Songs.Relationships](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary)
- Songs.Relationships.SongsGenresRelationship

Object

A relationship from the song to its genres.

```
object Songs.Relationships.SongsGenresRelationship
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

The genres associated with the song.

Current page is Songs.Relationships.SongsGenresRelationship