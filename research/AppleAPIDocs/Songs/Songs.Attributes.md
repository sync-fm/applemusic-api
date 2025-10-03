---
title: "Songs.Attributes"
source: "https://developer.apple.com/documentation/applemusicapi/songs/attributes-data.dictionary"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "The attributes for a song resource."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/songs/#app-main)

The attributes for a song resource.

```
object Songs.Attributes
```

## Properties

`albumName`

(Required)

The name of the album the song appears on.

`artistName`

(Required)

The artist’s name.

`artistUrl`

**(Extended)** The URL of the artist for the content.

`artwork`

(Required)

The album artwork.

`attribution`

(Classical music only) The name of the artist or composer to attribute the song with.

`audioVariants`

**(Extended)** Indicates the specific audio variant for a song.

`composerName`

The song’s composer.

`contentRating`

The Recording Industry Association of America (RIAA) rating of the content. No value means no rating.

`discNumber`

The disc number of the album the song appears on.

`durationInMillis`

(Required)

The duration of the song in milliseconds.

`editorialNotes`

The notes about the song that appear in the Apple Music catalog.

`genreNames`

(Required)

The genre names the song is associated with.

`hasLyrics`

(Required)

Indicates whether the song has lyrics available in the Apple Music catalog. If `true`, the song has lyrics available; otherwise, it doesn’t.

`inFavorites`

Whether the catalog resource ID is in the person’s favorites.

`isAppleDigitalMaster`

(Required)

Indicates whether the response delivered the song as an [Apple Digital Master](https://www.apple.com/apple-music/apple-digital-masters/).

`isrc`

The International Standard Recording Code (ISRC) for the song.

`movementCount`

(Classical music only) The movement count of the song.

`movementName`

(Classical music only) The movement name of the song.

`movementNumber`

(Classical music only) The movement number of the song.

`name`

(Required)

The localized name of the song.

`playParams`

When present, this attribute indicates that the song is available to play with an Apple Music subscription. The value map may be used to initiate playback. Previews of the song audio may be available with or without an Apple Music subscription.

`previews`

(Required)

The preview assets for the song.

`releaseDate`

The release date of the song, when known, in YYYY-MM-DD or YYYY format. Prerelease songs may have an expected release date in the future.

`trackNumber`

The number of the song in the album’s track list.

`url`

(Required)

The URL for sharing the song in Apple Music.

`workName`

(Classical music only) The name of the associated work.

Current page is Songs.Attributes