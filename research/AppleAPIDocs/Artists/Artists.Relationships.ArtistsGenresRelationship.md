---
title: "Artists.Relationships.ArtistsGenresRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/artistsgenresrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the artist to its genres."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Artists](https://developer.apple.com/documentation/applemusicapi/artists)
- [Artists.Relationships](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary)
- Artists.Relationships.ArtistsGenresRelationship

Object

A relationship from the artist to its genres.

```
object Artists.Relationships.ArtistsGenresRelationship
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

The artist’s associated genres.

Current page is Artists.Relationships.ArtistsGenresRelationship