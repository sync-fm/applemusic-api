---
title: "Songs.Relationships.SongsStationRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/songsstationrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the song to its station."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Songs](https://developer.apple.com/documentation/applemusicapi/songs)
- [Songs.Relationships](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary)
- Songs.Relationships.SongsStationRelationship

Object

A relationship from the song to its station.

```
object Songs.Relationships.SongsStationRelationship
```

## Properties

`href`

`string`

A relative location for the relationship.

`next`

`string`

A relative cursor to fetch the next paginated collection of resources in the relationship if more exist.

`data`

``[[`Stations`](https://developer.apple.com/documentation/applemusicapi/stations)]``

(Required)

The radio station associated with the song.

Current page is Songs.Relationships.SongsStationRelationship