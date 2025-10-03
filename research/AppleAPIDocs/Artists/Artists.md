---
title: "Artists"
source: "https://developer.apple.com/documentation/applemusicapi/artists"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A resource object that represents the artist of an album where an artist can be one or more people."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- Artists

Object

A resource object that represents the artist of an album where an artist can be one or more people.

```
object Artists
```

## Properties

`id`

`string`

(Required)

The identifier for the artist.

`type`

`string`

(Required)

This value is always `artists`.

`href`

`string`

(Required)

The relative location for the artist resource.

`attributes`

``[`Artists.Attributes`](https://developer.apple.com/documentation/applemusicapi/artists/attributes-data.dictionary)``

The attributes for the artist.

`relationships`

``[`Artists.Relationships`](https://developer.apple.com/documentation/applemusicapi/artists/relationships-data.dictionary)``

The relationships for the artist.

`views`

``[`Artists.Views`](https://developer.apple.com/documentation/applemusicapi/artists/views-data.dictionary)``

The views for associations between artists and other resources.

## Mentioned in

[Handling Resource Representation and Relationships](https://developer.apple.com/documentation/applemusicapi/handling-resource-representation-and-relationships)

## See Also

### Handling the Response

[`object ArtistsResponse`](https://developer.apple.com/documentation/applemusicapi/artistsresponse)

The response to an artists request.

[`object LibraryArtists`](https://developer.apple.com/documentation/applemusicapi/libraryartists)

A resource object that represents an artist present in a user’s library.

[`object LibraryArtistsResponse`](https://developer.apple.com/documentation/applemusicapi/libraryartistsresponse)

The response to a library artists request.

Current page is Artists