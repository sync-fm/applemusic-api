---
title: "Albums.Attributes"
source: "https://developer.apple.com/documentation/applemusicapi/albums/attributes-data.dictionary"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "The attributes for an album resource."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/albums/#app-main)

The attributes for an album resource.

```
object Albums.Attributes
```

## Properties

`artistName`

(Required)

The name of the primary artist associated with the album.

`artistUrl`

**(Extended)** The URL of the artist for this content.

`artwork`

(Required)

The artwork for the album.

`audioVariants`

**(Extended)** Indicates the specific audio variant for the album.

`contentRating`

The Recording Industry Association of America (RIAA) rating of the content. No value means no rating.

`editorialNotes`

The notes about the album that appear in the iTunes Store.

`genreNames`

(Required)

The names of the genres associated with the album.

`inFavorites`

`isCompilation`

(Required)

Indicates whether the album is marked as a compilation. If `true`, the album is a compilation; otherwise, it’s not.

`isComplete`

(Required)

Indicates whether the album is complete. If `true`, the album is complete; otherwise, it’s not. An album is complete if it contains all its tracks and songs.

`isMasteredForItunes`

(Required)

Indicates whether the response delivered the album as an [Apple Digital Master](https://www.apple.com/itunes/mastered-for-itunes/).

`isSingle`

(Required)

Indicates whether the album contains a single song.

`name`

(Required)

The localized name of the album.

`playParams`

When present, this attribute indicates that one or more tracks on the album are available to play with an Apple Music subscription. The value map may be used to initiate playback of available tracks on the album.

`recordLabel`

The name of the record label for the album.

`releaseDate`

The release date of the album, when known, in YYYY-MM-DD or YYYY format. Prerelease content may have an expected release date in the future.

`trackCount`

(Required)

The number of tracks for the album.

`upc`

The Universal Product Code for the album.

`url`

(Required)

The URL for sharing the album in Apple Music.

Current page is Albums.Attributes