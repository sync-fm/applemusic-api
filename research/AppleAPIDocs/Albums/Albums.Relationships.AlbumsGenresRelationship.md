---
title: "Albums.Relationships.AlbumsGenresRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/albumsgenresrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the album to its genres."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Albums](https://developer.apple.com/documentation/applemusicapi/albums)
- [Albums.Relationships](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary)
- Albums.Relationships.AlbumsGenresRelationship

Object

A relationship from the album to its genres.

```
object Albums.Relationships.AlbumsGenresRelationship
```

## Properties

`href`

`string`

The relative location to fetch the relationship directly.

`next`

`string`

The relative location to request the next page of resources in the collection, if additional resources are available for fetching.

`data`

``[[`Genres`](https://developer.apple.com/documentation/applemusicapi/genres)]``

(Required)

The album’s associated genre.

Current page is Albums.Relationships.AlbumsGenresRelationship