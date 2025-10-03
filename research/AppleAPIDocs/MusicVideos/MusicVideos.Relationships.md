---
title: "MusicVideos.Relationships"
source: "https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "The relationships for a music video resource."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/musicvideos/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [MusicVideos](https://developer.apple.com/documentation/applemusicapi/musicvideos)
- MusicVideos.Relationships

Object

The relationships for a music video resource.

```
object MusicVideos.Relationships
```

## Properties

`albums`

``[`MusicVideos.Relationships.MusicVideosAlbumsRelationship`](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/musicvideosalbumsrelationship)``

The albums associated with the music video. By default, `albums` includes identifiers only.

Fetch limits: 10 default, 10 maximum.

`artists`

``[`MusicVideos.Relationships.MusicVideosArtistsRelationship`](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/musicvideosartistsrelationship)``

The artists associated with the music video. By default, `artists` includes identifiers only.

Fetch limits: 10 default, 10 maximum.

`genres`

``[`MusicVideos.Relationships.MusicVideosGenresRelationship`](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/musicvideosgenresrelationship)``

The genres associated with the music video. By default, `genres` not included.

Fetch limits: None.

`library`

``[`MusicVideos.Relationships.MusicVideosLibraryRelationship`](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/musicvideoslibraryrelationship)``

The library of a music video if added to library.

Fetch limits: None.

`songs`

``[`MusicVideos.Relationships.MusicVideosSongsRelationship`](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary/musicvideossongsrelationship)``

The songs associated with the music video.

Fetch limits: 10 default, 10 maximum.

Current page is MusicVideos.Relationships