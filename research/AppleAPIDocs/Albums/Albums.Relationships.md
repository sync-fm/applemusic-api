---
title: "Albums.Relationships"
source: "https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "The relationships for an album resource."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/albums/#app-main)

- [Apple Music API](https://developer.apple.com/documentation/applemusicapi)
- [Albums](https://developer.apple.com/documentation/applemusicapi/albums)
- Albums.Relationships

Object

The relationships for an album resource.

```
object Albums.Relationships
```

## Properties

`artists`

``[`Albums.Relationships.AlbumsArtistsRelationship`](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/albumsartistsrelationship)``

The artists associated with the album. By default, `artists` includes identifiers only.

Fetch limits: 10 default, 10 maximum

`genres`

``[`Albums.Relationships.AlbumsGenresRelationship`](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/albumsgenresrelationship)``

The genres for the album. By default, `genres` not included.

Fetch limits: None

`tracks`

``[`Albums.Relationships.AlbumsTracksRelationship`](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/albumstracksrelationship)``

The songs and music videos on the album. By default, `tracks` includes objects.

Fetch limits: 300 default, 300 maximum

`library`

``[`Albums.Relationships.AlbumsLibraryRelationship`](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/albumslibraryrelationship)``

The album in the user’s library for the catalog album, if any.

Fetch limits: None

`record-labels`

``[`Albums.Relationships.AlbumsRecordLabelsRelationship`](https://developer.apple.com/documentation/applemusicapi/albums/relationships-data.dictionary/albumsrecordlabelsrelationship)``

The record labels for the album

Fetch limits: 10 default, 10 maximum.

Current page is Albums.Relationships