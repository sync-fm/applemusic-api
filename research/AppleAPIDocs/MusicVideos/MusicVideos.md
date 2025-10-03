---
title: "MusicVideos"
source: "https://developer.apple.com/documentation/applemusicapi/musicvideos"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A resource object that represents a music video."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- MusicVideos

Object

A resource object that represents a music video.

```
object MusicVideos
```

## Properties

`id`

`string`

(Required)

The identifier for the music video.

`type`

`string`

(Required)

This value is always `music-videos`.

`href`

`string`

(Required)

The relative location for the music video resource.

`attributes`

``[`MusicVideos.Attributes`](https://developer.apple.com/documentation/applemusicapi/musicvideos/attributes-data.dictionary)``

The attributes for the music video.

`relationships`

``[`MusicVideos.Relationships`](https://developer.apple.com/documentation/applemusicapi/musicvideos/relationships-data.dictionary)``

The relationships for the music video.

`views`

``[`MusicVideos.Views`](https://developer.apple.com/documentation/applemusicapi/musicvideos/views-data.dictionary)``

The relationship views for the music video.

## See Also

### Handling the Response

[`object MusicVideosResponse`](https://developer.apple.com/documentation/applemusicapi/musicvideosresponse)

The response to a music videos request.

[`object LibraryMusicVideos`](https://developer.apple.com/documentation/applemusicapi/librarymusicvideos)

A resource object that represents a library music video.

[`object LibraryMusicVideosResponse`](https://developer.apple.com/documentation/applemusicapi/librarymusicvideosresponse)

The response to a library music videos request.

Current page is MusicVideos