# How-to: Merging

## 1. Introduction
CatMapper helps users merge data across datasets by complex categories, like ethnicities, languages, districts, and religions.  It also helps users store and share decisions they make for specific merges.

The Merge page currently has three workflows:

1. **Propose merge** for generating exact, extended, or cross-domain category matches
2. **Join Datasets** for combining two uploaded files by CatMapper IDs
3. **Download merge template** for reviewing a saved merge template, downloading link files, and generating merge syntax bundles

For example, a user may want to bring together:

1) cultural data in the Ethnographic Atlas on more than 1000 ethnicities worldwide with 
2) attitude data for over 500 ethnicities from Afrobarometer attitude surveys

This requires identifying the best way to match up the ethnic categories in the Ethnographic Atlas and the Afrobarometer surveys.  Manually identifying matches is challenging for a number of reasons, including differences in heirarchies, encoding, and naming across datasets.

### Differences in Hierarchy

In many cases, there are direct matches, such as Tiv in Afrobarometer 9 and Tiv in the Ethnographic Atlas.  However, in other cases one dataset may contain subgroups of the groups from another dataset.  For example, Afrobarometer 9 uses the macro-category of Yoruba, while the Ethnographic Atlas provides information on three Yoruba sub-groups (Oyo, Ife, Ekiti, Egba).  Meanwhile, Afrobarometer 9 has five finer-grained categories (Mofokeng, Mokubung, Motaung, Motloung, Motsoeneng) for the Sotho group stored in the Ethnographic Atlas.  

### Differences in Encoding and Naming

Even when there are direct matches between categories in different datasets, they frequently also differ in how the same categories are encoded and named.  For example, Afrobarometer 9 encodes the Tiv ethnic category as Q84A = 629 and Ethnographic Atlas encodes it as society_id = Ah3.   As a more complicated example, Afrobarometer 9 encodes the same Yao ethnic category with four names (Ajaua, Ciyao, Myao, and Yao) and four distinct keys (Q84A = 549, 556, 761, and 464).

### CatMapper's Solution

CatMapper provides a number of tools to assist users in overcoming these challenges.  In this case, CatMapper already stores all the names and encodings of categories from Afrobarometer 9 and the Ethnographic Atlas.  It also stores how categories are related, such as the Yoruba ethnic category containing subgroups Oyo, Ife, Ekiti and Egba.  Using this information, CatMapper provides several functions to assist users in: (1) proposing the best way to assign categories across datasets, (2) storing thee final decisions to assign categories, and (3) sharing these decisions so users can inspect and re-use those decisions.

**What if my dataset isn't already linked to CatMapper?** When a user has a new dataset whose categories haven't yet been translated and linked to CatMapper's categories, [Translating](/translating) tools can assist in proposing and storing those new translations.

## 2. Proposing Merges
CatMapper provides several ways of proposing matches for categories from different datasets.  This includes: (1) identifying only exact matches where both datasets refer to the same category (e.g. Tiv in both Afrobarometer 9 and the Ethnographic Atlas), and (2) when exact matches don't exist, looking to closely related subgroups and supergroups for matches (e.g. matching Yoruba in Afrobarometer 9 to Oyo, Ife, Ekiti and Egba in the Ethnographic Atlas).  This section walks through the key steps for proposing both exact and extended merges.

Before proposing a merge, you will need to find the CatMapper IDs for each of the datasets you would like to use.  Visit the [Exploring](/exploring) page for help on how to find the CatMapper IDs for specific datasets.  The IDs for Afrobarometer 9 and Ethnographic Atlas are SD467981 and SD14, respectively.

*Figure 1. Propose Merge interface with dataset validation and merge options.*

![Merge tab with Propose Merge selected and dataset inputs](media/Merging/ProposeMerge1.webp)

1. Navigate to the Merge tab (shown above) and choose Propose Merge on the right.  
2. In the "Select Datasets for Merging", type the CatMapper IDs for the relevant datasets (separated by commas).  
3. Click the "Validate" button and make sure it says "Validation successful".  If not, it means one of the IDs is not correct.
4. Under "Select Category Domain", choose ETHNICITY for this example.  If you are proposing merges for other domains then choose the appropriate domain.  For example, if you are matching districts across datasets, choose AREA.  
5. Choosing equivalence criteria determines how matches are made across datasets.  
	- The first Exact (formerly Standard) option will only propose matches between categories across datasets when they are referring to the same thing.  For example, it will identify that Tiv in Afrobarometer 9 matches to Tiv in the Ethnographic Atlas.
	- The second Extended option first uses the Standard option.  However, if that does not identify a possible match, it then searches for other groups that are connected by contains ties in the CatMapper database.  "Choose Merge Level for Extended Merge" specifies how many ties it will look through to identify a match.  A merge level 1 will only look to categories that are connected by a contains tie.  A merge level 2 will look for any matches up to 2 places removed in the network of contains ties.
	- The Cross-domain option supports matching across two domains (for example LANGUAGE to ETHNICITY).  This mode uses CONTAINS ties on both sides plus one discovered `*_OF` relationship between the selected domains (for example `LANGUAGE_OF`), and it can optionally return results in another selected domain. If no `*_OF` relationship exists between the selected domains, CatMapper will stop and return an error.
6. In "Return only categories matched across all datasets"
	- Checking the box will return a spreadsheet that only contains matched categories
	- Unchecking the box will return a spreadsheet that includes rows for all categories across all datasets (regardless of whether they are matched or not)
7. Click the "Submit" button
8. When it says "Merge proposal complete", press "Download Results", which will download an excel spreadsheet with the proposed matches

### The merge proposal spreadsheet

The downloaded merged proposal spreadsheet provides details on how categories from different datasets are associated with each other.  Each row represents a proposed match between categories from different datasets.  If "Return only categories matched across dataset" was unchecked, the spreadsheet will also have many rows for categories from each dataset for which no match was found.

For an **exact merge proposal**, the spreadsheet includes the following columns:

1) CMID:  The unique CatMapper ID for the category that the datasets will match on for that row

2) CMName: The CatMapper name for that category 

3) Key_datasetID: For each dataset, there will be a column for the Key the datasets uses to encode that category.  If there are three datasets, there will be three columns each with Key_ followed by the unique ID for that dataset.

For an **extended merge proposal**, the spreadsheet includes the following columns:

1) CMID_datasetID: For each dataset, there will be column indicating the unique CatMapper ID for the category from that dataset matched with categories from the other datasets.

2) CMName_datasetID: For each dataset, there will be a column with the CatMapper Name for the category from that dataset matched with categories from the other datasets.

3) Key_datasetID: For each dataset, there will be a column for the Key the datasets uses to encode that category. 

4) LCA_CMID: This is the unique CatMapper ID for the least common ancestor through which a match was made. If there is an exact match, The LCA_CMID and all CMID_datasetID columns will all have the same value.

5) LCA_CMName: This is the unique CatMapper Name for the least common ancestor

6) Name_datasetID: For each dataset, there will be a column indicating the Name provided by this dataset for the category.

7) nTie: This is the number of ties the search had to go through to find the match.  A value of 0 indicates that it is an exact match.  A value of 1 indicates that the matched categories are only 1 tie away from each other.  A value of 2 indicates the amtched categories are 2 ties away from each other.

### Using the merge proposal spreadsheet

The merge proposal spreadsheet provides suggestions for how categories can be matched across datasets. In most cases, exact matches do not require any further deliberation.  However, for extended matches a user must often make decisions about which matches they will ultimately use for a given analysis.  For example, when using the extended merge for Afrobarometer 9 and Ethnographic Atlas, it finds an exact match between Kgatla in both datasets.  However, it also finds a match between Kgatla in the Ethnographic atlas and several other related categories in Afrobarometer 9 (See figure below).  These include subgroups of Kgatla (Moseia, and Lekholokoe), a parent category of Kgatla (Tswana) and a child of that parent category (Thlaro).  In this case, a user who cares about only using the most closely matched categories may limit the matches to just Kgatla from Ethnographic Atlas to Kgatla and its child categories (Moseia and Lekholokoe) in AFrobarometer 9.  By contrast, a user who wants to bring in more data from a larger number of categories, may match Kgatla in Ethnographic Atlas to Kgatla, Moseia, Lekholokoe, Tswana and Tlharo in Afrobaromter 9.  In short, there are a number of considerations, including precision of matching and quantity of available data that may guide how users make decisions about matches based on those proposed in the merge proposal spreadsheet.

*Figure 2. Merge proposal output showing exact and extended candidate matches.*

![Merge proposal sheet excerpt illustrating exact and extended match options](media/Merging/ProposeMerge2.webp)
Once a user has made their decisions about how to merge data by categories across datasets, the spreadsheet provides the necessary information to build a merge between datasets. Specifically, it includes the keys that each datasets uses to refer to corresponding categories.  For example, for Tiv, the spreadsheet shows that observations in Afrobarometer 9 where the variable Q84A has value 629 would count as Tiv.   Meanwhile, in the Ethnographic Atlas any rows where the variable society_id has a value Ah3 would count as Tiv.  Using the spreadsheet, a user can automatically generate code that assigns a new linking variable to both the Ethnographic Atlas and Afrobarometer 9 for joining data across the two datasets by these categories.  The figure below illustrates the additional link variable that would be added to permit joining the two datasets.  A future tutorial will illustrate different approaches, using either native excel functions or r code, to build the code necessary to derive link variables in all relevant datasets to permit merging datasets.

*Figure 3. Example of derived link-variable columns used for downstream joining.*

![Example of derived link variable columns used to join datasets](media/Merging/ProposeMerge3.webp)


## 3. Joining Datasets

### Introduction

The Join Datasets tool enables users to merge two datasets that have already been translated and uploaded to the CatMapper system. Merging is based on shared CatMapper IDs (CMIDs), which link related categories across datasets. This tool will automatically identify the appropriate CMID from the Sociomap or Archamap database based on the associated Key column uploaded with the dataset. This function is useful for combining datasets that describe the same units (e.g., ethnicities, religions, or areas) but contain different types of data.

First, we will demonstrate an example of how to use the Join Datasets tool, and then we will provide a step-by-step guide for merging datasets.

### Example usage

For example, you may have two datasets: GADM ([download example 1](data/example-data1.xlsx)) and Geonames ([download example 2](data/example-data2.xlsx)). They both contain information about administrative districts. Just as an example, let's say you have a variable in GADM that measures the percentage of a population that speaks a certain language (pseudoVar1), and in Geonames, you have a variable that measures the population density of those districts (pseudoVar2). You want to merge these datasets to analyze the relationship between language prevalence and population density.

*Table 1. Example source table for Dataset 1 (GADM) with `GID` key values and `pseudoVar1`.*

| datasetID | Name                          | GID        | pseudoVar1 |
|-----------|-------------------------------|------------|------------|
| SD1       | Saint Catherine               | JAM.8_1    | 0.87       |
| SD1       | Ardahan                       | TUR.9_1    | 0.28       |
| SD1       | Tapoa                         | BFA.8.5_1  | 0.02       |
| SD1       | Causeway Coast and Glens      | GBR.2.4_1  | 0.33       |
| SD1       | Portland                      | JAM.5_1    | 1.74       |
| SD1       | Mtskheta-Mtianeti            | GEO.7_1    | 1.01       |
| SD1       | West Coast                    | NZL.19_1   | 1.15       |

*Table 2. Example source table for Dataset 2 (Geonames) with `geonameid` key values and `pseudoVar2`.*

| datasetID | Name                          | geonameid | pseudoVar2 |
|-----------|-------------------------------|-----------|------------|
| SD2       | Portland                      | 3488997   | 1.8        |
| SD2       | Causeway Coast and Glens      | 11353070  | 0.85       |
| SD2       | Saint Catherine               | 3488711   | 0.49       |
| SD2       | Ardahan                       | 862470    | 1.46       |
| SD2       | Mtskheta-Mtianeti             | 865541    | 0.41       |
| SD2       | Tapoa                         | 2354771   | 0.7        |
| SD2       | West Coast                    | 6612113   | 0.42       |


In this case, you would upload both datasets to the Join Datasets tool. The system will automatically match rows from each dataset that share the same CMID. The resulting merged file will retain all original columns from both datasets and join them by matching CMID values.

The result will look like this (table output abbreviated for space):

*Table 3. Example merged output joined by shared CatMapper IDs (`CMID`).*

| CMID     | datasetID_left | datasetID_right | pseudoVar1 | pseudoVar2 |
|----------|----------------|-----------------|------------|------------|
| SM474    | SD1            | SD2             | 0.28       | 1.46       |
| SM274707 | SD1            | SD2             | 0.33       | 0.85       |
| SM2321   | SD1            | SD2             | 1.01       | 0.41       |
| SM2775   | SD1            | SD2             | 1.74       | 1.80       |
| SM2970   | SD1            | SD2             | 0.87       | 0.49       |
| SM262220 | SD1            | SD2             | 0.02       | 0.70       |
| SM3739   | SD1            | SD2             | 1.15       | 0.42       |


### Step-by-Step Guide

1. **Choose how each uploaded file will identify its dataset**

> The Join Datasets panel accepts two uploaded files at a time.

> For each side, you can either:

> - enter the dataset CMID in the `datasetID` textbox, or
> - leave the textbox blank and include a `datasetID` column in every row of the uploaded file.

> If you leave the textbox blank, every row in that file must already contain a valid `datasetID` value such as `SD123` or `AD456`.

> Each uploaded file must also still contain the original translated Key columns used to connect rows to CatMapper categories.

> If your dataset has not yet been translated, please visit the [Translating](/translating) page before continuing.

2. **Uploading Datasets**

> Navigate to the Join Datasets tab.

> In the left box labeled Upload first Dataset, click Choose File and select your first translated dataset (in CSV or Excel format).

> Repeat the same step on the right side in Upload second Dataset.

> Choose the relevant category domain before merging. For example, use `ETHNICITY` for ethnic groups or `AREA` for district-level datasets.

3. **Joining Datasets**

> Once both datasets have been uploaded: click the MERGE DATASETS button.

> The system resolves the uploaded keys to CatMapper IDs within the selected domain, then matches rows from each file that share the same CMID.

> The resulting merged file will retain all original columns from both datasets and join them by matching CMID values.

> Only rows with matching CMIDs in both datasets will appear in the merged output.

4. **Downloading Results**

> After the merge is complete: click the DOWNLOAD RESULTS button to save the merged dataset to your local machine as an *XSLX* file.

5. **Notes and Troubleshooting**

> If either dataset is missing a datasetID column, the merge will not be possible. Please ensure you’ve used the translation tool beforehand.

> The tool merges two uploaded files at a time, but each file may contain one or more datasetIDs if those values are supplied row-by-row.

> Merging does not currently support fuzzy or hierarchical matching--only exact CMID matches will be used.

> Need help preparing your data for merging? Visit [Translating](/translating) or contact [support@catmapper.org](mailto:support@catmapper.org).

## 4. Merge Templates, Link Files, and Merge Syntax

Merge templates are the reusable CatMapper structures that store a merge design after you decide how datasets, variables, and category equivalences should line up.

In the current app, merge templates appear in two places:

1. on the **Merge** page under **Download merge template**
2. on the **Explore** page for `MERGING` and `STACK` nodes under the **Merging Template** tab

### Template network structure

The new merge-template network has two layers:

1. a template layer that groups datasets and variables into stacks
2. a category merging layer that records how dataset-specific keys map to categories within each stack

The merge-template graph is centered on:

- a `MERGING` node (the overall template),
- one or more `STACK` nodes (groupings of datasets),
- links to `DATASET` and `VARIABLE`,
- and category `MERGING` ties from `DATASET` to `CATEGORY` that capture category-level alignment decisions.

*Figure 4. Merge-template graph structure linking `MERGING`, `STACK`, `DATASET`, `VARIABLE`, and category mappings.*

![Merge-template graph structure showing MERGING, STACK, DATASET, VARIABLE, and category mappings](media/Merging/FullMergingTemplateNetwork.drawio.svg)

### Core structure

*Figure 5. Merge-template flow from `MERGING` through `STACK` and dataset/category linkages.*

![Merge-template flow diagram from MERGING to STACK, DATASET, USES, CATEGORY, and VARIABLE](media/Merging/merge-template-flow-smartart.svg)

In the current CatMapperAPI and CatMapperJS implementation, those pieces are used as follows:

- `MERGING` node: stores the overall merge template and its metadata
- `MERGING` tie from `MERGING` to `STACK`: assigns one or more stacks to the template
- `MERGING` tie from `STACK` to `DATASET`: places datasets into the stack that will be harmonized together
- `USES` tie from `DATASET` to `CATEGORY`: records the dataset-specific key already stored in CatMapper
- `MERGING` tie from `STACK` to `VARIABLE`: stores stack-level variable behavior such as `varName`, `stackTransform`, `variableFilter`, `summaryStatistic`, `summaryFilter`, and `summaryWeight`
- `MERGING` tie from `DATASET` to `VARIABLE`: stores dataset-specific variable information scoped by `stack` and `Key`, including `datasetTransform`
- `MERGING` tie from `DATASET` to `CATEGORY`: stores stack-scoped category mappings used to build link files and merge syntax. The relationship stores `Key` and `stack`; the start dataset node supplies the dataset CMID.

Category merging ties connect a dataset key directly to the category used by the stack.

### Upload table structures

The merge-template workflow supports four practical table shapes:

*Figure 6. Upload table structures used across merge-template creation and updates.*

![Upload table structure figure for merge-template workflows](media/Merging/FullMergingTemplateTables.drawio.svg)

1. Create `MERGING` / `STACK` nodes (if needed).
2. Create merge ties between merge template, stack, and dataset.
3. Create merge ties from stack/dataset to variable.
4. Create category merging ties from datasets to categories.

### Reviewing template summaries in Explore

Recent CatMapperAPI and CatMapperJS updates expose merge-template summaries directly on `MERGING` and `STACK` pages in Explore.

For a `MERGING` node, the **Merging Template** tab now shows:

- each connected stack
- the number of datasets in each stack
- the number of category merging ties
- the number of key reassignments, counted when a category merging tie's `Key` does not match any `USES` tie between the same dataset and category
- the number of mapped variables

For a `STACK` node, the same tab shows:

- how many merge templates use that stack
- the datasets attached to that stack
- category-merging-tie, key-reassignment, and variable counts for each dataset

Both views also provide downloadable spreadsheets for:

- **Download Merging Ties**
- **Download Category Merging Ties**

These exports are useful for auditing a merge template before generating code.

### Using the Download merge template tab

The **Download merge template** tab on the Merge page is the main workflow for turning a saved `MERGING` node into review files or a merge-code bundle.

1. Enter the `MERGING` CMID and click **Find Merging Template**.
2. CatMapper checks the merge-template summary first and confirms whether the CMID is a valid `MERGING` node.
3. If the template is valid, the page loads template metadata such as the template CMID, name, short name, and citation.
4. If the template has variable mappings, click **Download list of Datasets** to export the current template rows. This spreadsheet includes the template, stack, and dataset IDs plus a `filePath` column that you fill in before generating syntax.
5. If the template has category merging ties, click **DOWNLOAD LINK FILE** to export the current category mappings.
6. If the template has variable mappings, upload the completed template sheet and click **Generate Merge Files**.

### What the downloads mean

**Download list of Datasets** gives you the scaffold needed for syntax generation. In practice:

- `mergingID` identifies the overall template
- `stackID` identifies the stack, when already known
- `datasetID` identifies the source dataset
- `filePath` tells the generated syntax where to find your local source data files

The uploaded template must include at least:

- `mergingID`
- `datasetID`
- `filePath`

`stackID` is helpful and may already be present in the downloaded sheet. If it is omitted, the API will try to recover it from the existing merge-template ties in the database.

The first non-empty `filePath` is used as the runtime working directory for generated syntax, so the completed template should include both:

- a working directory path
- file paths for the dataset rows that should be loaded into the merge

**DOWNLOAD LINK FILE** is especially helpful when a template has category merging ties but no variable mappings yet. The current UI exports two sheets:

- `LinkFileWide`: one row per canonical category within a stack, with dataset IDs and parsed key parts grouped together
- `LinkFileLong`: one row per category merging tie, preserving the dataset CMID, category CMID, category name, and raw `Key` expression

### Generating merge files

When a template has variable mappings, CatMapper can now build a full merge bundle directly from the template.

The generated ZIP currently includes:

- `syntax.R`
- `data.xlsx`
- `categories.xlsx`

These files reflect the saved template structure, including:

- stack-level transforms
- dataset-level transforms
- variable filters
- summary statistics
- stack-scoped equivalence mappings

If a template has no variable mappings, **Generate Merge Files** stays disabled and the page will direct you to use **DOWNLOAD LINK FILE** instead.

## 5. Recommended Workflow and Safety Rules

To avoid key-format errors and rerun issues:

1. Use `standard` upload mode when creating or editing merge-template ties.
2. Keys should use explicit equality syntax such as `Name == Yoruba`.
3. Compound keys are supported; join separate conditions with `&&`, for example `Site == Red Rock && Region == Southwest`.
4. Build category alignments first with **Propose merge**, then save or edit the merge-template ties, then generate merge files.
5. Validate required columns before upload:
   - dataset ties: `mergingID`, `datasetID`
   - variable ties: `mergingID`, `datasetID`, `variableID`, `Key`, `varName`
   - category merging ties: `datasetID`, `categoryID`, `Key`, `stackID`; `mergingID` can be supplied instead of `stackID` when the stack can be inferred
6. Merge-file generation only works when the saved template already includes variable mappings.
7. Join Datasets still performs exact CMID joins only; hierarchical and cross-domain logic belongs in the proposal/template stage, not in the final two-file join.

If you need help preparing template spreadsheets for your project, contact [support@catmapper.org](mailto:support@catmapper.org).
