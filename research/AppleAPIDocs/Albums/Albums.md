---
title: "Albums"
source: "https://developer.apple.com/documentation/applemusicapi/albums"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A resource object that represents an album."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- Albums

Object

A resource object that represents an album.

```
object Albums
```

## Properties

`id`

`string`

(Required)

The identifier for the album.

`type`

`string`

(Required)

This value is always `albums`.

`href`

`string`

(Required)

The relative location for the album resource.

`attributes`

``[`Albums.Attributes`](https://developer.apple.com/documentation/applemusicapi/albums/attributes-data.dictionary)``

The attributes for the album.

`relationships`

``[`Albums.Relationships`](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary)``

The relationships for the album.

`views`

``[`Albums.Views`](https://developer.apple.com/documentation/applemusicapi/albums/views-data.dictionary)``

The relationship views for the album.

## Mentioned in

[Handling Resource Representation and Relationships](https://developer.apple.com/documentation/applemusicapi/handling-resource-representation-and-relationships)

## See Also

### Handling the Response

[`object AlbumsResponse`](https://developer.apple.com/documentation/applemusicapi/albumsresponse)

The response to an albums request.

[`object LibraryAlbums`](https://developer.apple.com/documentation/applemusicapi/libraryalbums)

A resource object that represents a library album.

[`object LibraryAlbumsResponse`](https://developer.apple.com/documentation/applemusicapi/libraryalbumsresponse)

The response to a library albums request.

Current page is Albums