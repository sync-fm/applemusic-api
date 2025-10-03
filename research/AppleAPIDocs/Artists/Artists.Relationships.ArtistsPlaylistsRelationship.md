---
title: "Artists.Relationships.ArtistsPlaylistsRelationship"
source: "https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/artistsplaylistsrelationship"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship from the artist to its playlists."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Artists](https://developer.apple.com/documentation/applemusicapi/artists)
- [Artists.Relationships](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary)
- Artists.Relationships.ArtistsPlaylistsRelationship

Object

A relationship from the artist to its playlists.

```
object Artists.Relationships.ArtistsPlaylistsRelationship
```

## Properties

`href`

`string`

A relative location for the relationship.

`next`

`string`

A relative cursor to fetch the next paginated collection of resources in the relationship if more exist.

`data`

``[[`Playlists`](https://developer.apple.com/documentation/applemusicapi/playlists)]``

(Required)

The playlists for the artist.

Current page is Artists.Relationships.ArtistsPlaylistsRelationship