---
title: "MusicVideos.Attributes"
source: "https://developer.apple.com/documentation/applemusicapi/musicvideos/attributes-data.dictionary"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "The attributes for a music video resource."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/musicvideos/#app-main)

The attributes for a music video resource.

```
object MusicVideos.Attributes
```

## Properties

`albumName`

The name of the album the music video appears on.

`artistName`

(Required)

The artist’s name.

`artistUrl`

**(Extended)** The URL of the artist for this content.

`artwork`

(Required)

The artwork for the music video’s associated album.

`contentRating`

The Recording Industry Association of America (RIAA) rating of the content. No value means no rating.

`durationInMillis`

(Required)

The duration of the music video in milliseconds.

`editorialNotes`

The editorial notes for the music video.

`genreNames`

(Required)

The music video’s associated genres.

`has4K`

(Required)

Whether the music video has 4K content.

`hasHDR`

(Required)

Whether the music video has HDR10-encoded content.

`inFavorites`

Whether the catalog resource ID is in the person’s favorites.

`isrc`

The International Standard Recording Code (ISRC) for the music video.

`name`

(Required)

The localized name of the music video.

`playParams`

When present, indicates that the music video is available to play with an Apple Music subscription. The value map may be used to initiate playback. Previews of the music video may be available with or without an Apple Music subscription.

`previews`

(Required)

The preview assets for the music video.

`releaseDate`

The release date of the music video, when known, in YYYY-MM-DD or YYYY format. Prerelease music videos may have an expected release date in the future.

`trackNumber`

The number of the music video in the album’s track list, when associated with an album.

`url`

(Required)

The URL for sharing the music video in Apple Music.

`videoSubType`

The video subtype associated with the content.

`workId`

(Classical music only) A unique identifier for the associated work.

`workName`

(Classical music only) The name of the associated work.

Current page is MusicVideos.Attributes