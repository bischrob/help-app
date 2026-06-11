# How-to: OpenRefine Reconciliation API

CatMapper exposes SocioMap and ArchaMap as OpenRefine reconciliation services. Use these registration URLs in OpenRefine:

- SocioMap: `https://api.catmapper.org/reconcile/SocioMap`
- ArchaMap: `https://api.catmapper.org/reconcile/ArchaMap`
- Dev SocioMap: `https://dev-api.catmapper.org/reconcile/SocioMap`
- Dev ArchaMap: `https://dev-api.catmapper.org/reconcile/ArchaMap`

The reconciliation service is public and read-only. You do not need a CatMapper login or API key to reconcile, preview, suggest, or extend values.

## Quick Start in OpenRefine

1. Open an OpenRefine project.
2. Use the menu on the column you want to match.
3. Choose **Reconcile** and then **Start reconciling**.
4. Choose **Add Standard Service** and paste one of the CatMapper registration URLs above.
5. Select a type if you want to narrow matching, then start reconciliation.
6. Review the suggested matches and accept the candidates that are correct.
7. To bring CatMapper fields back into your project, use **Add columns from reconciled values** on the reconciled column.

Use the production URLs for regular work. Use the `dev-api.catmapper.org` URLs only when testing changes against the development deployment.

## What Gets Reconciled

Each candidate returned by CatMapper maps a CatMapper node into OpenRefine's reconciliation fields:

| Field | Meaning |
| --- | --- |
| `id` | CatMapper CMID, such as `SM451818` or `AM123` |
| `name` | CatMapper `CMName` |
| `description` | Domain and country summary when available |
| `type` | CatMapper labels/domains as OpenRefine type objects |
| `score` | Match quality from `0` to `100` |
| `match` | `true` for exact name or exact CMID matches |
| `features` | Extra scoring details, currently name distance and exact-name flag |

A minimal live query looks like this:

```bash
curl -G 'https://api.catmapper.org/reconcile/SocioMap' \
  --data-urlencode 'queries={"q0":{"query":"Aymara","limit":1}}'
```

Typical response:

```json
{
  "q0": {
    "result": [
      {
        "id": "SM451818",
        "name": "Aymara",
        "type": [{"id": "RELIGION", "name": "Religion"}],
        "score": 100.0,
        "match": true
      }
    ]
  }
}
```

## Service Manifest

OpenRefine discovers the service from the root reconciliation URL:

```bash
curl 'https://api.catmapper.org/reconcile/SocioMap'
```

`GET /reconcile/<database>` with no parameters returns the OpenRefine reconciliation API `0.2` manifest. The manifest advertises the correct host in preview, suggest, and extension URLs. For example, the production manifest uses `api.catmapper.org`, and the dev manifest uses `dev-api.catmapper.org`.

Valid database names are `SocioMap` and `ArchaMap`. Matching is case-insensitive, but the canonical URLs use those exact names.

## Batch Reconciliation Requests

Submit reconciliation batches to the root endpoint with a `queries` JSON object. CatMapper accepts `GET` or `POST` requests.

```bash
curl -G 'https://api.catmapper.org/reconcile/SocioMap' \
  --data-urlencode 'queries={"row0":{"query":"Yoruba","type":"ETHNICITY","limit":3},"row1":{"query":"Aymara","limit":3}}'
```

The same request can be sent as JSON:

```bash
curl -X POST 'https://api.catmapper.org/reconcile/SocioMap' \
  -H 'Content-Type: application/json' \
  -d '{"queries":{"row0":{"query":"Yoruba","type":"ETHNICITY","limit":3}}}'
```

Limits:

- Batch size: up to `50` query objects per request.
- Candidate limit: defaults to `10` and is capped at `100` per query.
- A batch with more than `50` queries returns HTTP `413`.

## Narrowing Matches

A query can use `type`, `limit`, and `properties`.

```json
{
  "query": "Yoruba",
  "type": "ETHNICITY",
  "limit": 5,
  "properties": [
    {"pid": "country", "v": "SM123"},
    {"pid": "yearStart", "v": "1900"},
    {"pid": "yearEnd", "v": "2020"}
  ]
}
```

Supported property filters:

| Property | Use |
| --- | --- |
| `CMID` | Match a known CatMapper ID directly |
| `Name` | Use an explicit CatMapper name when `query` is blank |
| `Key` | Match a dataset encoding key on a `USES` relationship |
| `dataset` | Restrict to a dataset CMID |
| `context` | Restrict by context node CMID |
| `country` | Restrict by ADM0 country CMID |
| `yearStart` | Start year for temporal overlap filtering |
| `yearEnd` | End year for temporal overlap filtering |

`pid` and `id` are both accepted for property identifiers. Values can be plain strings or OpenRefine-style objects with `id` or `name` fields.

Examples:

```json
{"q0":{"properties":[{"pid":"CMID","v":"SM451818"}],"limit":1}}
```

```json
{"q0":{"type":"CATEGORY","properties":[{"pid":"Key","v":"1"},{"pid":"dataset","v":"SD13"}],"limit":10}}
```

Use `CATEGORY` for broad category/entity matching. Use a specific CatMapper domain, such as `ETHNICITY`, `RELIGION`, `SITE`, or `DATASET`, when you want a narrower search.

## Suggest Endpoints

OpenRefine calls suggest endpoints automatically from the manifest. They can also be useful for debugging service behavior.

| Endpoint | Example |
| --- | --- |
| `GET /reconcile/<database>/suggest/entity` | `/reconcile/SocioMap/suggest/entity?prefix=ay&limit=5` |
| `GET /reconcile/<database>/suggest/type` | `/reconcile/SocioMap/suggest/type?prefix=eth` |
| `GET /reconcile/<database>/suggest/property` | `/reconcile/SocioMap/suggest/property?prefix=country` |

Each suggest response has a `result` array. Entity suggestions include `id`, `name`, `description`, and `notable`. Type and property suggestions include `id` and `name`, with descriptions where available.

## Preview

OpenRefine can show a small CatMapper preview for a matched entity:

```text
https://api.catmapper.org/reconcile/SocioMap/preview/SM451818
```

The preview is HTML and includes the entity name, CMID, domain, country, alternative names when available, and a link to open the entity in CatMapper.

## Add Columns from Reconciled Values

CatMapper supports OpenRefine data extension. First, OpenRefine asks for proposed properties:

```bash
curl 'https://api.catmapper.org/reconcile/SocioMap/properties?type=CATEGORY&limit=20'
```

Then OpenRefine sends selected IDs and properties to the extension endpoint. The v0.2 form uses `extend` on the root endpoint:

```bash
curl -X POST 'https://api.catmapper.org/reconcile/SocioMap' \
  -H 'Content-Type: application/json' \
  -d '{"extend":{"ids":["SM451818"],"properties":[{"id":"Name"},{"id":"domain"},{"id":"country"},{"id":"dataset"}]}}'
```

CatMapper also supports the compatibility alias `/extend`:

```bash
curl -X POST 'https://api.catmapper.org/reconcile/SocioMap/extend' \
  -H 'Content-Type: application/json' \
  -d '{"ids":["SM451818"],"properties":[{"id":"Name"},{"id":"domain"}]}'
```

Extension responses use OpenRefine typed value arrays:

```json
{
  "meta": [
    {"id": "Name", "name": "Name"},
    {"id": "domain", "name": "Domain"}
  ],
  "rows": {
    "SM451818": {
      "Name": [{"str": "Aymara"}],
      "domain": [{"str": "RELIGION"}]
    }
  }
}
```

Built-in extension properties include `Name`, `CMID`, `domain`, `Key`, `dataset`, `context`, `country`, `yearStart`, and `yearEnd`. Additional node properties are proposed from CatMapper metadata when available.

## REST Aliases

The canonical registration route is:

```text
/reconcile/<database>
```

For consistency with other CatMapper API routes, these aliases are also available:

```text
/api/reconcile/<database>
/api/databases/<database>/reconcile
```

Subservice suffixes are available on all three route families. For example, these are equivalent:

```text
/reconcile/SocioMap/suggest/type
/api/reconcile/SocioMap/suggest/type
/api/databases/SocioMap/reconcile/suggest/type
```

The manifest always advertises the canonical `/reconcile/<database>` URLs, even when you request it through an alias.

## Cross-Origin Access

The reconciliation endpoints allow browser cross-origin requests. This is required for OpenRefine-style clients, the OpenRefine reconciliation testbench, and other browser-based tools that call the service directly.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| OpenRefine cannot add the service | Use the exact root URL, such as `https://api.catmapper.org/reconcile/SocioMap`, with no query string. |
| HTTP `400` invalid database | Use `SocioMap` or `ArchaMap`. |
| HTTP `400` expected no parameters, queries, or extend | The root endpoint only accepts an empty manifest request, `queries`, or `extend`. |
| HTTP `413` batch exceeds maximum size | Send at most `50` query objects per request. |
| Too many unrelated candidates | Add a `type`, `dataset`, `country`, `context`, or year range filter. |
| Too few candidates | Try a broader type such as `CATEGORY`, remove filters, or increase `limit` up to `100`. |

For general CatMapper API examples, see the [API guide](/API). For service registration, use the URLs at the top of this page rather than the Swagger docs URL.
