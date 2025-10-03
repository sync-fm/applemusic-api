---
title: "MusicVideos.Views.MusicVideosMoreInGenreView"
source: "https://developer.apple.com/documentation/applemusicapi/musicvideos/views-data.dictionary/musicvideosmoreingenreview"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship view from this music video to more music videos in a specific music video genre."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/musicvideos/views-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [MusicVideos](https://developer.apple.com/documentation/applemusicapi/musicvideos)
- [MusicVideos.Views](https://developer.apple.com/documentation/applemusicapi/musicvideos/views-data.dictionary)
- MusicVideos.Views.MusicVideosMoreInGenreView

Object

A relationship view from this music video to more music videos in a specific music video genre.

```
object MusicVideos.Views.MusicVideosMoreInGenreView
```

## Properties

`href`

`string`

A relative location for the view.

`next`

`string`

A relative cursor to fetch the next paginated collection of resources in the view if more exist.

`attributes`

``[`MusicVideos.Views.MusicVideosMoreInGenreView.Attributes`](https://developer.apple.com/documentation/applemusicapi/musicvideos/views-data.dictionary/musicvideosmoreingenreview/attributes-data.dictionary)``

(Required)

The attributes for the view.

`data`

``[[`MusicVideos`](https://developer.apple.com/documentation/applemusicapi/musicvideos)]``

(Required)

Music videos in the given music video genre.

Current page is MusicVideos.Views.MusicVideosMoreInGenreView