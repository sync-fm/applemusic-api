---
title: "Artists.Attributes"
source: "https://developer.apple.com/documentation/applemusicapi/artists/attributes-data.dictionary"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "The attributes for an artist resource."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/artists/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Artists](https://developer.apple.com/documentation/applemusicapi/artists)
- Artists.Attributes

Object

The attributes for an artist resource.

```
object Artists.Attributes
```

## Properties

`artwork`

``[`Artwork`](https://developer.apple.com/documentation/applemusicapi/artwork)``

The artwork for the artist image.

`editorialNotes`

``[`EditorialNotes`](https://developer.apple.com/documentation/applemusicapi/editorialnotes)``

The notes about the artist that appear in the Apple Music catalog.

`genreNames`

`[string]`

(Required)

The names of the genres associated with this artist.

`inFavorites`

`boolean`

Whether the catalog resource ID is in the person’s favorites.

`name`

`string`

(Required)

The localized name of the artist.

`url`

`string`

(Required)

The URL for sharing the artist in Apple Music.

Current page is Artists.Attributes