---
title: "Get a Catalog Song's Relationship Directly by Name"
source: "https://developer.apple.com/documentation/applemusicapi/fetch-a-relationship-on-this-resource-by-name-56rq7"
author:
  - "[[UnauthorizedResponse]]"
published:
created: 2025-10-02
description: "Fetch a song’s relationship by using its identifier."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/#app-main)

Fetch a song’s relationship by using its identifier.

## URL

```
GET https://api.music.apple.com/v1/catalog/{storefront}/songs/{id}/{relationship}
```

## Path Parameters

`id`

(Required)

A unique identifier for the song.

`relationship`

(Required)

The name of the relationship you want to fetch for this resource.

`storefront`

(Required)

An iTunes Store territory, specified by an ISO 3166 alpha-2 country code. The possible values are the `id` attributes of `Storefront` objects.

## Query Parameters

`l`

The localization to use, specified by a language tag. The possible values are in the `supportedLanguageTags` array belonging to the `Storefront` object specified by `storefront`. Otherwise, the default is `defaultLanguageTag` in `Storefront`.

`limit`

The number of objects or number of objects in the specified relationship returned.

`include`

Additional relationships to include in the fetch.

`extend`

A list of attribute extensions to apply to resources in the response.

## Response Codes

` 200 OK`

The request was successful.

Content-Type: application/json

` 403 Forbidden`

A response indicating invalid or insufficient authentication.

Content-Type: application/json

` 500 Internal Server Error`

A response indicating an error occurred on the server.

Content-Type: application/json

If successful, the HTTP status code is 200 (OK) and the `data` array contains the requested resource object. If unsuccessful, the HTTP status code indicates the error and the details are in the `errors` array. For more information, see [Handling Requests and Responses](https://developer.apple.com/documentation/applemusicapi/handling-requests-and-responses).

### Example

Current page is Get a Catalog Song's Relationship Directly by Name