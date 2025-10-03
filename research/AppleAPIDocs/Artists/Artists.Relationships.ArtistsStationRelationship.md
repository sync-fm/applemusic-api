---
title: "Artists.Relationships.ArtistsStationRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/artistsstationrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the artist to its station."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Artists](https://developer.apple.com/documentation/applemusicapi/artists)
- [Artists.Relationships](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary)
- Artists.Relationships.ArtistsStationRelationship

Object

A relationship from the artist to its station.

```
object Artists.Relationships.ArtistsStationRelationship
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

The station for the artist.

Current page is Artists.Relationships.ArtistsStationRelationship