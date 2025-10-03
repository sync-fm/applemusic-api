---
title: "Get a Catalog Album’s Relationship View Directly by Name"
source: "https://developer.apple.com/documentation/applemusicapi/fetch-a-view-on-this-resource-by-name-2we6l"
author:
  - "[[UnauthorizedResponse]]"
published:
created: 2025-10-02
description: "Fetch related resources for a single album’s relationship view."
tags:
  - "clippings"
---
[Skip Navigation](https://developer.apple.com/documentation/applemusicapi/#app-main)

## URL

```
GET https://api.music.apple.com/v1/catalog/{storefront}/albums/{id}/view/{view}
```

## Path Parameters

`id`

`string`

(Required)

The identifier of the resource to fetch.

`storefront`

`string`

(Required)

An iTunes Store territory, specified by an ISO 3166 alpha-2 country code. The possible values are the `id` attributes of `Storefront` objects.

## Query Parameters

`extend`

`[string]`

A list of attribute extensions to apply to resources in the response.

`include`

`[string]`

A list of relationship names to include for resources in the response.

`l`

`string`

The localization to use, specified by a language tag. The possible values are in the `supportedLanguageTags` array belonging to the `Storefront` object specified by `storefront`. Otherwise, the default is `defaultLanguageTag` in `Storefront`.

`limit`

`integer`

The number of objects or number of objects in the specified relationship returned.

`with`

`[string]`

A list of modifications to apply to the request.

## Response Codes

` 200 OK`

``[`RelationshipViewResponse`](https://developer.apple.com/documentation/applemusicapi/relationshipviewresponse)``

The request was successful.

Content-Type: application/json

` 500 Internal Server Error`

``[`ErrorsResponse`](https://developer.apple.com/documentation/applemusicapi/errorsresponse)``

A response indicating an error occurred on the server.

Content-Type: application/json

## Discussion

If successful, the HTTP status code is 200 (OK) and the `data` array contains the requested resource object. If unsuccessful, the HTTP status code indicates the error and the details are in the `errors` array. For more information, see [Handling Requests and Responses](https://developer.apple.com/documentation/applemusicapi/handling-requests-and-responses).

### Example

Current page is Get a Catalog Album’s Relationship View Directly by Name