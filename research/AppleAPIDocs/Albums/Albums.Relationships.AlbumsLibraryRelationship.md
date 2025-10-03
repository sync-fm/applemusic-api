---
title: "Albums.Relationships.AlbumsLibraryRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/albumslibraryrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the album to an associated library album."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Albums](https://developer.apple.com/documentation/applemusicapi/albums)
- [Albums.Relationships](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary)
- Albums.Relationships.AlbumsLibraryRelationship

Object

A relationship from the album to an associated library album.

```
object Albums.Relationships.AlbumsLibraryRelationship
```

## Properties

`href`

`string`

The relative location to fetch the relationship directly.

`next`

`string`

The relative location to request the next page of resources in the collection, if additional resources are available for fetching.

`data`

``[[`LibraryAlbums`](https://developer.apple.com/documentation/applemusicapi/libraryalbums)]``

(Required)

The library content this album is associated with if added to the user’s library.

Current page is Albums.Relationships.AlbumsLibraryRelationship