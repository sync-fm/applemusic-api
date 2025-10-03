---
title: "MusicVideos.Views.MusicVideosMoreByArtistView"
source: "https://developer.apple.com/documentation/applemusicapi/musicvideos/views-data.dictionary/musicvideosmorebyartistview"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship view from this music video to more music videos of various types by the artist."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/musicvideos/views-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [MusicVideos](https://developer.apple.com/documentation/applemusicapi/musicvideos)
- [MusicVideos.Views](https://developer.apple.com/documentation/applemusicapi/musicvideos/views-data.dictionary)
- MusicVideos.Views.MusicVideosMoreByArtistView

Object

A relationship view from this music video to more music videos of various types by the artist.

```
object MusicVideos.Views.MusicVideosMoreByArtistView
```

## Properties

`href`

`string`

A relative location for the view.

`next`

`string`

A relative cursor to fetch the next paginated collection of resources in the view if more exist.

`attributes`

``[`MusicVideos.Views.MusicVideosMoreByArtistView.Attributes`](https://developer.apple.com/documentation/applemusicapi/musicvideos/views-data.dictionary/musicvideosmorebyartistview/attributes-data.dictionary)``

(Required)

The attributes for the view.

`data`

``[[`MusicVideos`](https://developer.apple.com/documentation/applemusicapi/musicvideos)]``

(Required)

Music videos of some type by the artist.

Current page is MusicVideos.Views.MusicVideosMoreByArtistView