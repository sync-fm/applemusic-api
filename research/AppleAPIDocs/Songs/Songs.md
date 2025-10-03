---
title: "Songs"
source: "https://developer.apple.com/documentation/applemusicapi/songs"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A resource object that represents a song."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- Songs

Object

A resource object that represents a song.

```
object Songs
```

## Properties

`id`

`string`

(Required)

The identifier for the song.

`type`

`string`

(Required)

This value is always `songs`.

`href`

`string`

(Required)

The relative location for the song resource.

`attributes`

``[`Songs.Attributes`](https://developer.apple.com/documentation/applemusicapi/songs/attributes-data.dictionary)``

The attributes for the song.

`relationships`

``[`Songs.Relationships`](https://developer.apple.com/documentation/applemusicapi/songs/relationships-data.dictionary)``

The relationships for the song.

## See Also

### Handling the Response

[`object SongsResponse`](https://developer.apple.com/documentation/applemusicapi/songsresponse)

The response to a songs request.

[`object LibrarySongs`](https://developer.apple.com/documentation/applemusicapi/librarysongs)

A resource object that represents a library song.

[`object LibrarySongsResponse`](https://developer.apple.com/documentation/applemusicapi/librarysongsresponse)

The response to a library songs request.

Current page is Songs