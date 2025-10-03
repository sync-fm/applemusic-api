---
title: "Songs.Relationships"
source: "https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "The relationships for a song resource."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/songs/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Songs](https://developer.apple.com/documentation/applemusicapi/songs)
- Songs.Relationships

Object

The relationships for a song resource.

```
object Songs.Relationships
```

## Properties

`albums`

``[`Songs.Relationships.SongsAlbumsRelationship`](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/songsalbumsrelationship)``

The albums associated with the song. By default, `albums` includes identifiers only.

Fetch limits: 10 default, 10 maximum

`artists`

``[`Songs.Relationships.SongsArtistsRelationship`](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/songsartistsrelationship)``

The artists associated with the song. By default, `artists` includes identifiers only.

Fetch limits: 10 default, 10 maximum

`composers`

``[`Songs.Relationships.SongsComposersRelationship`](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/songscomposersrelationship)``

The composers for a catalog song.

`genres`

``[`Songs.Relationships.SongsGenresRelationship`](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/songsgenresrelationship)``

The genres associated with the song. By default, `genres` is not included.

Fetch limits: None

`library`

``[`Songs.Relationships.SongsLibraryRelationship`](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/songslibraryrelationship)``

Library song for a catalog song if added to library.

`music-videos`

``[`Songs.Relationships.SongsMusicVideosRelationship`](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/songsmusicvideosrelationship)``

Music videos for a catalog song.

`station`

``[`Songs.Relationships.SongsStationRelationship`](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary/songsstationrelationship)``

The station associated with the song. By default, `station` is not included.

Fetch limits: None

Current page is Songs.Relationships