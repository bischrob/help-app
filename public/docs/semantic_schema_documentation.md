# Semantic Schema Documentation

Semantic schema documentation is necessary because it makes dataset structure, variable meaning, and relationship logic explicit and reusable across projects. It directly supports FAIR data principles by making records more findable and interoperable, and it strengthens open data practice by preserving machine-readable metadata, provenance context, and consistent identifiers. In practical terms, this documentation reduces ambiguity during uploads, prevents duplicate modeling decisions, and improves long-term reproducibility for both human users and automated workflows.

This guide describes the in-app workflow for publishing semantic schema structures into CatMapper using DATASET, VARIABLE, and ATTRIBUTE nodes plus USES ties.

## Terms

<table style="border-collapse: collapse; border: 1px solid #999; width: 100%;">
  <tbody>
    <tr><td style="padding: 6px; border: none;"><strong>CMID:</strong></td><td style="padding: 6px; border: none;">Unique CatMapper identifier for a node.</td></tr>
    <tr><td style="padding: 6px; border: none;"><strong>CMName:</strong></td><td style="padding: 6px; border: none;">Display name of a node in CatMapper.</td></tr>
    <tr><td style="padding: 6px; border: none;"><strong>DATASET:</strong></td><td style="padding: 6px; border: none;">Domain used for source-level and table-level dataset records.</td></tr>
    <tr><td style="padding: 6px; border: none;"><strong>VARIABLE:</strong></td><td style="padding: 6px; border: none;">Domain used for reusable schema variables.</td></tr>
    <tr><td style="padding: 6px; border: none;"><strong>ATTRIBUTE:</strong></td><td style="padding: 6px; border: none;">Domain used for controlled vocabulary values attached to variables.</td></tr>
    <tr><td style="padding: 6px; border: none;"><strong>USES tie:</strong></td><td style="padding: 6px; border: none;">Relationship connecting a DATASET node to a VARIABLE node.</td></tr>
    <tr><td style="padding: 6px; border: none;"><strong>VARIABLE_OF tie:</strong></td><td style="padding: 6px; border: none;">Relationship connecting an ATTRIBUTE node to its VARIABLE node.</td></tr>
    <tr><td style="padding: 6px; border: none;"><strong>datasetID:</strong></td><td style="padding: 6px; border: none;">CMID of the dataset context used in upload rows.</td></tr>
    <tr><td style="padding: 6px; border: none;"><strong>Key:</strong></td><td style="padding: 6px; border: none;">Mapping expression used to identify the source field/value, for example <code>Field == SOURCE_DATE</code> or <code>variable == v501</code>.</td></tr>
    <tr><td style="padding: 6px; border: none;"><strong>label:</strong></td><td style="padding: 6px; border: none;">Domain label in upload rows, for example <code>DATASET</code>, <code>VARIABLE</code>, or <code>ATTRIBUTE</code>.</td></tr>
    <tr><td style="padding: 6px; border: none;"><strong>parent:</strong></td><td style="padding: 6px; border: none;">Hierarchy field used to attach a table-level DATASET to a parent DATASET.</td></tr>
    <tr><td style="padding: 6px; border: none;"><strong>variable:</strong></td><td style="padding: 6px; border: none;">Routing field used to attach an ATTRIBUTE to a VARIABLE by CMID.</td></tr>
  </tbody>
</table>

## Scope

- Create a parent DATASET node for the source schema.
- Create table-level DATASET nodes.
- Create shared VARIABLE nodes.
- Backfill returned VARIABLE CMIDs and create USES ties.
- Create ATTRIBUTE nodes and link them to VARIABLE nodes.

## Required Edit Upload Actions

- `Adding new node for every row`
- `Adding new uses ties (with old or new nodes)`

## 1. Create The Parent DATASET Node

Purpose:
- Represent the overall schema source as one DATASET node.

Action:
- Use `Adding new node for every row`.

Required columns with examples:

| CMName | shortName | DatasetCitation | label |
|---|---|---|---|
| cyberSW | cyberSW | cybersw.org | DATASET |
| Hurst 1988 | 42SA20420SiteForm | Hurst, Winston (1988) Bluff Bench Great Kiva... | DATASET |

## 2. Create Table-Level DATASET Nodes

Purpose:
- Create one DATASET node per source table and attach each to the parent dataset.

Action:
- Use `Adding new node for every row`.

Example table-level DATASET rows (with parent CMID):

| CMName | shortName | DatasetCitation | parent | label |
|---|---|---|---|---|
| PGM Features Table | PGM_Features | PGM schema feature table | AD941 | DATASET |
| PGM Chronology Table | PGM_Chronology | PGM schema chronology table | AD941 | DATASET |
| PGM Survey Table | PGM_Surveys | PGM schema survey table | AD941 | DATASET |

## 3. Create Shared VARIABLE Nodes

Purpose:
- Create one VARIABLE node per logical variable definition.

Two-step design note:
- First create shared VARIABLE categories in the inherent ArchaMap dataset (`AD941`).
- This returns CMIDs for each shared variable.
- Those CMIDs are then reused when linking to multiple table datasets so duplicate VARIABLE nodes are not created.

Action:
- Use `Adding new node for every row`.

Typical required columns with several examples:

| datasetID | CMName | Name | Key | label |
|---|---|---|---|---|
| AD941 | Documentation Date | Documentation Date | SOURCE_DATE | VARIABLE |
| AD941 | Data Source | Data Source | SOURCE_DATA | VARIABLE |
| AD941 | Last Updated | Last Updated | DATA_DATE | VARIABLE |
| AD941 | Feature Type | Feature Type | FEATURE_TYPE | VARIABLE |

## 4-5. Backfill VARIABLE CMIDs And Create VARIABLE USES Ties

Purpose:
- Backfill returned CMIDs into linkage rows, then create USES ties from table datasets to shared variables.

Action:
- Use `Adding new uses ties (with old or new nodes)`.

Linkage table format (same as step 3 plus `CMID`):

| datasetID | CMID | CMName | Name | Key | label |
|---|---|---|---|---|---|
| AD313 | AM10 | Documentation Date | Documentation Date | Field == SOURCE_DATE | VARIABLE |
| AD313 | AM11 | Data Source | Data Source | Field == SOURCE_DATA | VARIABLE |
| AD313 | AM12 | Last Updated | Last Updated | Field == DATA_DATE | VARIABLE |
| AD354274 | AM354290 | Hearth Shape | Hearth Shape | Field == hearth_shape | VARIABLE |

Table D. `categoryType` examples (one row for each current option):

| datasetID | CMID | Key | categoryType | source |
|---|---|---|---|---|
| AD354274 | AM354290 | Field == hearth_shape | attribute | ArchaMap |
| AD313 | AM11 | Field == SOURCE_DATA | categorical | ArchaMap |
| AD354275 | AM353822 | Field == Name | continuous | ArchaMap |
| AD353957 | AM354033 | Field == COUNT | numeric | ArchaMap |
| AD313 | AM10 | Field == SOURCE_DATE | text | ArchaMap |

## 7. Create ATTRIBUTE Nodes For Controlled Vocabulary Values

Purpose:
- Represent categorical allowed values as ATTRIBUTE nodes and link each to a VARIABLE CMID.

Action:
- Use `Adding new node for every row`.

Typical required columns (including VARIABLE CMID routing):

| datasetID | CMName | Name | Key | label | variable |
|---|---|---|---|---|---|
| AD313 | Tank | Tank | FEATURE_TYPE_57 | ATTRIBUTE | AM3 |
| AD313 | Trash Pile | Trash Pile | FEATURE_TYPE_1 | ATTRIBUTE | AM3 |
| AD313 | Wall Foundation | Wall Foundation | FEATURE_TYPE_2 | ATTRIBUTE | AM3 |

## 9. Recommended Sequence

1. Create parent DATASET node.
2. Create table-level DATASET nodes with `parent` set to the parent CMID (for example `AD941`).
3. Create shared VARIABLE nodes in `AD941`.
4. Backfill returned VARIABLE CMIDs into linkage rows.
5. Create VARIABLE USES ties from table datasets to shared VARIABLE CMIDs.
6. Create ATTRIBUTE nodes and link each to a VARIABLE CMID through `variable`.
