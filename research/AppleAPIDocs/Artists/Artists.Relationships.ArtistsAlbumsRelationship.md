---
title: "Artists.Relationships.ArtistsAlbumsRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/artistsalbumsrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the artist to its albums."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Artists](https://developer.apple.com/documentation/applemusicapi/artists)
- [Artists.Relationships](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary)
- Artists.Relationships.ArtistsAlbumsRelationship

Object

A relationship from the artist to its albums.

```
object Artists.Relationships.ArtistsAlbumsRelationship
```

## Properties

`href`

`string`

A relative location for the relationship.

`next`

`string`

A relative cursor to fetch the next paginated collection of resources in the relationship if more exist.

`data`

``[[`Albums`](https://developer.apple.com/documentation/applemusicapi/albums)]``

(Required)

The albums for the artist.

Current page is Artists.Relationships.ArtistsAlbumsRelationship