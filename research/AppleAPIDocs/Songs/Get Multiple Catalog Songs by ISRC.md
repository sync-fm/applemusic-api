---
title: "Get Multiple Catalog Songs by ISRC"
source: "https://developer.apple.com/documentation/applemusicapi/get-multiple-catalog-songs-by-isrc"
author:
  - "[[UnauthorizedResponse]]"
published:
created: 2025-10-02
description: "Fetch one or more songs by using their International Standard Recording Code (ISRC) values."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/#app-main)

Fetch one or more songs by using their International Standard Recording Code (ISRC) values.

## URL

```
GET https://api.music.apple.com/v1/catalog/{storefront}/songs
```

## Path Parameters

`storefront`

(Required)

An iTunes Store territory, specified by an ISO 3166 alpha-2 country code. The possible values are the `id` attributes of `Storefront` objects.

## Query Parameters

`filter[isrc]`

(Required)

The International Standard Recording Code (ISRC) values for the songs. You can substitute `filter[isrc]` for `ids`, or use it in conjunction with `ids` for additional filtering. Note that one ISRC value may return more than one song. The maximum fetch limit is 25.

`l`

The localization to use, specified by a language tag. The possible values are in the `supportedLanguageTags` array belonging to the `Storefront` object specified by `storefront`. Otherwise, the default is `defaultLanguageTag` in `Storefront`.

`include`

Additional relationships to include in the fetch.

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

Current page is Get Multiple Catalog Songs by ISRC