# How-to: Translating

Under development. Please contact [support@catmapper.org](mailto:support@catmapper.org) for assistance.

## 1. Introduction

CatMapper already stores and links categories (e.g. ethnicity, language, religion, districts) from over 2500 datasets, including demographic and health surveys, UNICEF multiple indicator cluster surveys, cultural datasets (e.g., the Ethnographic Atlas, Human Relations and Area Files, and the Global Jukebox).  When a user wants to identify how to merge data across these datasets by a specific category (e.g., ethnicity), [Merging](/merging) tools provide automated proposals for how categories already linked to CatMapper match across datasets.

However, when a dataset's categories haven't been linked to CatMapper, CatMapper provides tools: (1) to propose translations with existing CatMapper categories, (2) create new categories when necessary, and (3) to store how the new dataset's categories link to CatMapper categories.  In this section, we focus on the first set of tools for proposing translations.  For information on how registered users can upload and store those translations, please visit [Uploading](/uploading).

## 2. Proposing a translation

Suppose one wants to conduct an analysis that links data on ethnicities from a new dataset (e.g. a new wave of Afrobarometer attitude surveys) to data from other datasets that already have their categories linked to CatMapper.  These might be: (1) earlier waves of Afrobarometer surveys to examine change over time or datasets, (2) other cultural datasets, such as the Ethnographic Atlas, or (3) other datasets with health or demographic data, such as the Demographic and Health Surveys.  

The first step in making that new dataset available for linkage is to identify the best matches of each the categories in that new dataset with categories that already exist in CatMapper.  The propose translate function identifies possible matches for categories from new datasets by using a combination of fuzzy text search, with the option of limiting searches by country, context, and dataset.   Here are instructions on how to use the propose translate function.

![](media/Translating/Translating1.webp)

1) Navigate to the "Translate" tab and choose "Propose Translate"

2) Under "Choose file to import", browse to a file with category names you would like to identify matches for.  The file must at a minimum be a spreadsheet (.xlsx or .csv) with one column including names of the categories from the new dataset. In the figure below, the spreadsheet includes a column called "Name".  It also includes other columns ("Country" and the Key used by the dataset for that Category "Q84").  We will use those later.

3) Under "Choose column to match", choose the column containing the names of the category.  In this case it is "Name".

4) Under "Select category domain", choose ETHNICITY.  If the user is matching other kinds of categories, they would choose other domains (e.g. AREA for districts, RELIGION for religions...)

5) Under "Property to search". choose "Name".  This is the property in CatMapper categories we'll be searching for matches.  In other situations, users may want to match by other properties, such as they Key for a category or the unique CatMapper ID (CMID) for each category.

6) Press the "Search button"

![](media/Translating/Translating2.webp)

7) Depending on the number items to match, the proposal algorithm may take seconds or minutes.  When it is done, it will show the spreadsheet on the right with proposed matches, with color coding for non-exact matches, including fuzzy matches based on lexical similarity (light orange), one-to-many matches where multiple CatMapper categories matched to the name in the spreadsheet (light red), many-to-one matches where the multiple names in the spreadsheet mapped to the same CatMapper category (purple), and no match (yellow).

8) A summary of the number of matches of different types is also available in the lower left hand corner.

9) Clicking "Download Data" will download the spreadsheet of proposed matches, which includes details of the proposed matches.  

## 3. Proposed Matches Spreadsheet

This spreadsheet of proposed matches includes important information to assist users in choosing the category in CatMapper that best matches the category in the spreadsheet.  Each row corresponds to one proposed match.  It also includes the following columns

1) **CMID_Name**.  This provides the unique CatMapper ID (CMID) for the proposed matching category from CatMapper.  If the user used the column Name to match, it will be called this.  If they used a different name (e.g., ethnicity), it will include the name of that original column (e.g., CMID_ethnicity).

2) **CMName_Name**.  This provides the CatMapper name for the proposed matching category from CatMapper.

3) **CMUniqueRowID**.  This provides the order of the row in the inputted spreadsheet.

4) **Columns from original spreadsheet**.  Any columns in the original spreadsheet will be included here.

5) **country_Name**.  This provides the names of countries which CatMapper associates with the current category

6) **label_Name**.  This provides the domain for the category in CatMapper

7) **matchType_Name**.  This provides the kind of match

	1) *Exact match* means there is an exact match between the name in the spreadsheet and one of the names stored for the CatMapper category.  It also means this is the only  proposed match.

	2) *Fuzzy match* means there is a fuzzy match between the name in the spreadsheet and one of the names stored for the CatMapper category.  It also means this is the only proposed match.

	3) *One-to-many* matches means that CatMapper has proposed more than one potential match.  In such cases, the user needs to decide which of the matches is most appropriate

	4) *Many-to-one* matches means that CatMapper has proposed that the same CatMapper category was matched to several categories in the inputted spreadsheet.
	5) *No match* means that CatMapper identified no possible matches.

8) **matchingDistance_Name**. This provides the lexical distance between the inputted category name and the matching name from CatMapper.  For exact matches, this should be 0, since the inputted Name and the matching Name are exactly the same (i.e., distance = 0)

9) **matching_Name**.  This provides the name for the category in CatMapper that provides the best match to the inputted Name.

CatMapper proposes matches, but ideally, the user will quickly inspect all matches to ensure they make sense.  They should also give special attention to fuzzy matches, one-to-many, many-to-one, and no matches.  For one-to-many matches, the user must decide which of the many proposed matches (if any) are most appropriate.  This usually relies on investigating additional contextual information, such as language, geospatial location, and relationships with other categories, to determine the best match (using external information and the [Exploring](/exploring) functions). When there is no match, the user may find additional contextual information that helps them find a match in CatMapper using the [Exploring](/exploring) functions.  When a user cannot find a matching CatMapper category either automatically or manually, then they may choose to upload a new category with [Uploading](/uploading) functions.

## 5. Limiting by country, context, and dataset

Names are a useful way to find matching categories, but they often return too many false positive results.  Limiting searches by contextual factors are a power tool for improving the accuracy of matches.  CatMapper provides several ways to limit searches

1. *Limiting by country*. If the spreadsheet has a column with the unique CatMapper ID for the country associated with a category, the user can choose to limit all searches to CatMapper categories that are only associated with that country.

2. *Limiting by context*.  Country is one type of context that users can use to limit searches, but there are several others, including subnational districts associated with a category (e.g. only ethnicities from Maharashtra), categories that contain that category (e.g. only counties belonging to the state of Ohio), and languages that are associated with that category (e.g., only ethnicities associated with a specific language).

3. *Limiting by dataset*.  A user may only want to match to categories that are used by a specific dataset.  If the spreadsheet includes a column with the unique CatMapper ID for the dataset, they can choose to limit searches by that dataset.

	1. If you chooses to limit by dataset, the user also has the option of returning the Keys used by that dataset for that specific category.

One can use the CatMapper's [Exploring](/exploring) functions to find the CatMapper ID for the country, context, or dataset one would like to use to limit the search.  

## 6. Finding country CMIDs for limiting searches

To find the relevant CatMapper IDs for countries, one can also use the translate tool.  The user would choose the same spreadsheet that also includes the names of associated countries (in the "Country" column).  

1) Under "Select column to match", choose "Country", since we will be trying to find country categories that match with the name stored in the "Country" column

2) Under "Select category domain", choose ADM0, which means 0th-level administrative level and is the subdomain for countries.

3) Under "Property to search", we will choose "Name", since we are searching for countries by names.

4) Press "Search"

5) Once searching is done, press "Download Data", which will download a spreadsheet with the CMID for the country associated with each row.  

6) Trim proposed matches.  The user may need to clean matches since, some country names will return multiple results.  For example, the name Ethiopia will return matches to both Ethiopia (1946-1993)  before the *de jure* independence of Eritrea (SM6741) and Ethiopia (1993-) (SM7).  In those cases, the user will need to choose which matches they want to keep and which ones they want to erase.  Erasing a match, involves deleting the row corresponding with the match to be erased.  One way to confirm that the matches are appropriately trimmed is to ensure that there are no duplicate values in the CMuniqueRowID column.

7) Once the dataset is trimmed, it should include a column for "Name" and "CMID_Country" (the name for CMID_Country will vary based on the column name used to match countries).  One can then return to the instructions above for matching the ethnicities (matching on "Name"), but now choose "Limit by Country" and choose "CMID_Country".

![](media/Translating/Translating3.webp)
