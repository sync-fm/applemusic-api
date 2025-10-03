---
title: "Albums.Relationships.AlbumsArtistsRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/albumsartistsrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the album to its artists."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Albums](https://developer.apple.com/documentation/applemusicapi/albums)
- [Albums.Relationships](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary)
- Albums.Relationships.AlbumsArtistsRelationship

Object

A relationship from the album to its artists.

```
object Albums.Relationships.AlbumsArtistsRelationship
```

## Properties

`href`

`string`

The relative location to fetch the relationship directly.

`next`

`string`

The relative location to request the next page of resources in the collection, if additional resources are available for fetching.

`data`

``[[`Artists`](https://developer.apple.com/documentation/applemusicapi/artists)]``

(Required)

The artists for the album.

Current page is Albums.Relationships.AlbumsArtistsRelationship