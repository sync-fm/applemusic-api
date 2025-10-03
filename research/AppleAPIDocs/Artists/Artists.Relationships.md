---
title: "Artists.Relationships"
source: "https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "The relationships for an artist resource."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/artists/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Artists](https://developer.apple.com/documentation/applemusicapi/artists)
- Artists.Relationships

Object

The relationships for an artist resource.

```
object Artists.Relationships
```

## Properties

`albums`

``[`Artists.Relationships.ArtistsAlbumsRelationship`](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/artistsalbumsrelationship)``

The albums associated with the artist. By default, `albums` includes identifiers only.

Fetch limits: 25 default, 100 maximum

`genres`

``[`Artists.Relationships.ArtistsGenresRelationship`](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/artistsgenresrelationship)``

The genres associated with the artist. By default, `genres` not included.

Fetch limits: None

`music-videos`

``[`Artists.Relationships.ArtistsMusicVideosRelationship`](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/artistsmusicvideosrelationship)``

The music videos associated with the artist. By default, `musicVideos` not included.

Fetch limits: 25 default, 100 maximum

`playlists`

``[`Artists.Relationships.ArtistsPlaylistsRelationship`](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/artistsplaylistsrelationship)``

The playlists associated with the artist. By default, `playlists` not included.

Fetch limits: 10 default, 10 maximum

`station`

``[`Artists.Relationships.ArtistsStationRelationship`](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary/artistsstationrelationship)``

The station associated with the artist. By default, station not included.

Fetch limits: None (one station).

Current page is Artists.Relationships