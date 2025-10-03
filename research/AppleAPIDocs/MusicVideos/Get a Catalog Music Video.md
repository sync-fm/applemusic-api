---
title: "Get a Catalog Music Video"
source: "https://developer.apple.com/documentation/applemusicapi/get-a-catalog-music-video"
author:
  - "[[UnauthorizedResponse]]"
published:
created: 2025-10-02
description: "Fetch a music video by using its identifier."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/#app-main)

Fetch a music video by using its identifier.

## URL

```
GET https://api.music.apple.com/v1/catalog/{storefront}/music-videos/{id}
```

## Path Parameters

`id`

(Required)

The unique identifier for the music video.

`storefront`

(Required)

An iTunes Store territory, specified by an ISO 3166 alpha-2 country code. The possible values are the `id` attributes of `Storefront` objects.

## Query Parameters

`l`

The localization to use, specified by a language tag. The possible values are in the `supportedLanguageTags` array belonging to the `Storefront` object specified by `storefront`. Otherwise, the default is `defaultLanguageTag` in `Storefront`.

`include`

Additional relationships to include in the fetch.

`views`

The views to activate for the resource.

`extend`

A list of attribute extensions to apply to resources in the response.

## Response Codes

` 200 OK`

The request was successful.

Content-Type: application/json

` 500 Internal Server Error`

A response indicating an error occurred on the server.

Content-Type: application/json

If successful, the HTTP status code is 200 (OK) and the `data` array contains the requested resource object. If unsuccessful, the HTTP status code indicates the error and the details are in the `errors` array. For more information, see [Handling Requests and Responses](https://developer.apple.com/documentation/applemusicapi/handling-requests-and-responses).

### Example

## See Also

[`object MusicVideos`](https://developer.apple.com/documentation/applemusicapi/musicvideos)

A resource object that represents a music video.

[`object MusicVideosResponse`](https://developer.apple.com/documentation/applemusicapi/musicvideosresponse)

The response to a music videos request.

### Requesting a Catalog Music Video

[`Get a Catalog Music Video's Relationship Directly by Name`](https://developer.apple.com/documentation/applemusicapi/fetch-a-relationship-on-this-resource-by-name-4z79l)

Fetch a music video’s relationship by using its identifier.

[`Get Multiple Catalog Music Videos by ID`](https://developer.apple.com/documentation/applemusicapi/get-multiple-catalog-music-videos-by-id)

Fetch one or more music videos by using their identifiers.

[`Get Multiple Catalog Music Videos by ISRC`](https://developer.apple.com/documentation/applemusicapi/get-multiple-catalog-music-videos-by-isrc)

Fetch one or more music videos by using their International Standard Recording Code (ISRC) values.

[`Get Equivalent Catalog Music Videos by ID`](https://developer.apple.com/documentation/applemusicapi/get-equivalent-ids-for-the-albums-8tp4l)

Fetch the equivalent, available content in the storefront for the provided music videos’ identifiers.

Current page is Get a Catalog Music Video