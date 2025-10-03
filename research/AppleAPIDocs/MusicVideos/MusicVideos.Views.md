---
title: "MusicVideos.Views"
source: "https://developer.apple.com/documentation/applemusicapi/musicvideos/views-data.dictionary"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "The views for a music video resource."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/musicvideos/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [MusicVideos](https://developer.apple.com/documentation/applemusicapi/musicvideos)
- MusicVideos.Views

Object

The views for a music video resource.

```
object MusicVideos.Views
```

## Properties

`more-by-artist`

``[`MusicVideos.Views.MusicVideosMoreByArtistView`](https://developer.apple.com/documentation/applemusicapi/musicvideos/views-data.dictionary/musicvideosmorebyartistview)``

More music videos of some type by the artist.

Fetch limits: 15 default, 100 maximum.

`more-in-genre`

``[`MusicVideos.Views.MusicVideosMoreInGenreView`](https://developer.apple.com/documentation/applemusicapi/musicvideos/views-data.dictionary/musicvideosmoreingenreview)``

More music videos in the given music video genre.

Fetch limits: 15 default, 100 maximum.

Current page is MusicVideos.Views