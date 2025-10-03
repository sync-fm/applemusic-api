---
title: "Albums.Views.AlbumsAppearsOnView"
source: "https://developer.apple.com/documentation/applemusicapi/albums/views-data.dictionary/albumsappearsonview"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship view from this album to a selection of playlists tracks from this album appear on."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/albums/views-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Albums](https://developer.apple.com/documentation/applemusicapi/albums)
- [Albums.Views](https://developer.apple.com/documentation/applemusicapi/albums/views-data.dictionary)
- Albums.Views.AlbumsAppearsOnView

Object

A relationship view from this album to a selection of playlists tracks from this album appear on.

```
object Albums.Views.AlbumsAppearsOnView
```

## Properties

`href`

`string`

The relative location to fetch the view directly.

`next`

`string`

The relative location to request the next page of resources in the collection, if additional resources are available for fetching.

`attributes`

``[`Albums.Views.AlbumsAppearsOnView.Attributes`](https://developer.apple.com/documentation/applemusicapi/albums/views-data.dictionary/albumsappearsonview/attributes-data.dictionary)``

(Required)

The attributes for the view.

`data`

``[[`Playlists`](https://developer.apple.com/documentation/applemusicapi/playlists)]``

(Required)

A selection of playlists that tracks from this album appear on.

Current page is Albums.Views.AlbumsAppearsOnView