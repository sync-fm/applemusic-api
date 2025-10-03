---
title: "Albums.Views.AlbumsOtherVersionsView"
source: "https://developer.apple.com/documentation/applemusicapi/albums/views-data.dictionary/albumsotherversionsview"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship view for other versions of this album."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/albums/views-data.dictionary/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Albums](https://developer.apple.com/documentation/applemusicapi/albums)
- [Albums.Views](https://developer.apple.com/documentation/applemusicapi/albums/views-data.dictionary)
- Albums.Views.AlbumsOtherVersionsView

Object

A relationship view for other versions of this album.

```
object Albums.Views.AlbumsOtherVersionsView
```

## Properties

`href`

`string`

The relative location to fetch the view directly.

`next`

`string`

The relative location to request the next page of resources in the collection, if additional resources are available for fetching.

`attributes`

``[`Albums.Views.AlbumsOtherVersionsView.Attributes`](https://developer.apple.com/documentation/applemusicapi/albums/views-data.dictionary/albumsotherversionsview/attributes-data.dictionary)``

(Required)

The attributes for the view.

`data`

``[[`Albums`](https://developer.apple.com/documentation/applemusicapi/albums)]``

(Required)

Other versions of the album.

Current page is Albums.Views.AlbumsOtherVersionsView