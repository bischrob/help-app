# How-to: API

The primary CatMapper API documentation is the Swagger site at [api.catmapper.org/docs](https://api.catmapper.org/docs). Use that page as the authoritative reference for endpoint details, parameter schemas, and response models.

This Help Center page is a vignette-style walkthrough of common API patterns so you can get started quickly.

- API base URL: [api.catmapper.org](https://api.catmapper.org)
- Example full request: [api.catmapper.org/CMID?database=SocioMap&cmid=SM1](https://api.catmapper.org/CMID?database=SocioMap&cmid=SM1)
- Questions: [support@catmapper.org](mailto:support@catmapper.org)

## API Key Access

Write endpoints (for example upload/edit workflows) require a CatMapper API key tied to a registered account.

### How to get an API key

1. Register for the relevant app at [catmapper.org/sociomap](https://catmapper.org/sociomap) or [catmapper.org/archamap](https://catmapper.org/archamap) using **Login** -> **Register**.
2. Wait for account approval.
3. Email [support@catmapper.org](mailto:support@catmapper.org) from your registered address with your CatMapper username and intended write use case.
4. Store the key as an environment variable (recommended):

`CATMAPR_API_KEY=cmk_your_api_key`

Do not commit API keys to source control or share keys in public scripts/notebooks.

## API Vignette: Search Endpoint

Use `GET /search` to find categories or datasets in SocioMap/ArchaMap, including filtered searches by property, domain, time range, country, and context.

- Endpoint: `GET /search`
- Good first use case: find Yoruba in ETHNICITY or return all rows for a domain when `term` is empty.
- Example requests:

`GET /search?database=SocioMap&term=Yoruba&domain=ETHNICITY&property=Name`

`GET /search?database=ArchaMap&term=Grasshopper&domain=SITE&property=Name`

Typical result:
- If `query=false` (default), returns matching rows (for example `CMID`, `CMName`, `country`, `domain`, `matching`, `matchingDistance`).
- If `query=true`, returns the generated Cypher and parameters.

For complete parameter/response schema, use [api.catmapper.org/docs](https://api.catmapper.org/docs).

## API Vignette: Retrieve CMID Details

Use `GET /CMID` when you already know a CatMapper ID and want its node properties plus relationship properties.

- Endpoint: `GET /CMID`
- Required params: `database` (`SocioMap` or `ArchaMap`), `cmid`
- Example requests:

`GET /CMID?database=SocioMap&cmid=SM1`

`GET /CMID?database=ArchaMap&cmid=AM1`

Typical result:
- `node`: node-level properties
- `relations`: relationship IDs and their properties

For full schema details and edge cases, use [api.catmapper.org/docs](https://api.catmapper.org/docs).

## API Vignette: Retrieve Dataset Details

Use `GET /dataset` to inspect how a specific dataset node links to categories (including relationship properties like `Key`).

- Endpoint: `GET /dataset`
- Required params: `database`, `cmid`
- Optional param: `domain` (defaults to `CATEGORY`)
- Example requests:

`GET /dataset?database=SocioMap&cmid=SD1&domain=CATEGORY`

`GET /dataset?database=ArchaMap&cmid=AD1`

Typical result:
- Relationship-oriented rows with fields such as `datasetName`, `datasetID`, `CMID`, `CMName`, `type`, `Key`, and related dynamic properties.

For full request/response contract, use [api.catmapper.org/docs](https://api.catmapper.org/docs).

## API Vignette: Retrieve All Datasets

Use `GET /allDatasets` to get the current dataset catalog for one CatMapper database.

- Endpoint: `GET /allDatasets`
- Required param: `database`
- Example requests:

`GET /allDatasets?database=SocioMap`

`GET /allDatasets?database=ArchaMap`

Typical result:
- Dataset catalog rows (for example `CMID`, `CMName`, `shortName`, `project`, `ApplicableYears`, `DatasetCitation`, `DatasetLocation`, `DatasetVersion`, `DatasetScope`, and related metadata).

For exhaustive field definitions, use [api.catmapper.org/docs](https://api.catmapper.org/docs).
