---
title: "Albums.Views.AlbumsRelatedVideosView"
source: "https://developer.apple.com/documentation/applemusicapi/albums/views-data.dictionary/albumsrelatedvideosview"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship view from this album to music videos for the songs on the album."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/albums/views-data.dictionary/#app-main)

## Properties

`href`

`string`

The relative location to fetch the view directly.

`next`

`string`

The relative location to request the next page of resources in the collection, if additional resources are available for fetching.

`data`

``[[`MusicVideos`](https://developer.apple.com/documentation/applemusicapi/musicvideos)]``

(Required)

The music videos available for songs on the album.