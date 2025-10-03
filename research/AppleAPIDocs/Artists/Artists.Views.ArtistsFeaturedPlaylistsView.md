---
title: "Artists.Views.ArtistsFeaturedPlaylistsView"
source: "https://developer.apple.com/documentation/applemusicapi/artists/views-data.dictionary/artistsfeaturedplaylistsview"
author:
  - "[[Apple Developer Documentation]]"
published:
created: 2025-10-02
description: "A relationship view from this artist to relevant playlists associated with the artist."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/artists/views-data.dictionary/#app-main)

A relationship view from this artist to relevant playlists associated with the artist.

```
object Artists.Views.ArtistsFeaturedPlaylistsView
```

## Properties

`href`

A relative location for the view.

`next`

A relative cursor to fetch the next paginated collection of resources in the view if more exist.

`attributes`

(Required)

The attributes for the view.

`data`

(Required)

Relevant playlists associated with the artist.

## See Also

[`object Artists.Views.ArtistsAppearsOnAlbumsView`](https://developer.apple.com/documentation/applemusicapi/artists/views-data.dictionary/artistsappearsonalbumsview)

A relationship view from this artist to a selection of albums from other artists on which this artist also appears.

[`object Artists.Views.ArtistsCompilationAlbumsView`](https://developer.apple.com/documentation/applemusicapi/artists/views-data.dictionary/artistscompilationalbumsview)

A relationship view from this artist to albums associated with the artist categorized as compilations.

[`object Artists.Views.ArtistsFeaturedAlbumsView`](https://developer.apple.com/documentation/applemusicapi/artists/views-data.dictionary/artistsfeaturedalbumsview)

A relationship view from this artist to a collection of albums selected as featured for the artist.

[`object Artists.Views.ArtistsFeaturedMusicVideosView`](https://developer.apple.com/documentation/applemusicapi/artists/views-data.dictionary/artistsfeaturedmusicvideosview)

A relationship view from this artist to a collection of music videos selected as featured for the artist.

[`object Artists.Views.ArtistsFullAlbumsView`](https://developer.apple.com/documentation/applemusicapi/artists/views-data.dictionary/artistsfullalbumsview)

A relationship view from this artist to full-release albums associated with the artist.

[`object Artists.Views.ArtistsLatestReleaseView`](https://developer.apple.com/documentation/applemusicapi/artists/views-data.dictionary/artistslatestreleaseview)

A relationship view from this artist to the latest release for the artist determined to still be recent by the Apple Music Catalog.

[`object Artists.Views.ArtistsLiveAlbumsView`](https://developer.apple.com/documentation/applemusicapi/artists/views-data.dictionary/artistslivealbumsview)

A relationship view from this artist to albums associated with the artist categorized as live performances.

[`object Artists.Views.ArtistsSimilarArtistsView`](https://developer.apple.com/documentation/applemusicapi/artists/views-data.dictionary/artistssimilarartistsview)

A relationship view from this artist to other artists similar to this artist.

[`object Artists.Views.ArtistsSinglesView`](https://developer.apple.com/documentation/applemusicapi/artists/views-data.dictionary/artistssinglesview)

A relationship view from this artist to albums associated with the artist categorized as singles.

[`object Artists.Views.ArtistsTopMusicVideosView`](https://developer.apple.com/documentation/applemusicapi/artists/views-data.dictionary/artiststopmusicvideosview)

A relationship view from this artist to relevant music videos associated with the artist.

Current page is Artists.Views.ArtistsFeaturedPlaylistsView