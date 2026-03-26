# How-to: Uploading

Under development. Please contact support\@catmapper.org for assistance.
## 1. Introduction
CatMapper is designed to be an ever-growing corpus of categories and their translations.  Registered users can add to that corpus

## 2. Registering
It’s not necessary to register to explore the database.  However, it is necessary to register to add categories or connections.  To register for SocioMap or ArchaMap:

1. Go to [catmapper.org/sociomap](https://catmapper.org/sociomap) or [catmapper.org/archamap](https://catmapper.org/archamap)
2. Click the “login” button in the top right corner
3. Choose “register” and follow the prompts.  Please provide several sentences about your goals to assist us in approving registration requests.
## 3. Uploading a translation
Adding categories and translations for a new dataset requires a few steps.  First, they must upload a dataset node which contains key metadata for the dataset to be linked (including its Name and a reference to it).  Second, if there were any categories from the new dataset that didn't have matches in CatMapper, they must add those categories.  Third, they will upload "USES ties" for each category.  These USES ties store the metadata that the dataset includes about each category (e.g. the name it gives the category, the key it uses for the category).

**Logging in.** Before a user can add categories or connections, they must login with their user id and password in the upper righthand corner of the screen.

**Navigating to the Edit upload page.** The Edit page provides the tools needed to add dataset nodes, add new category nodes, and create or update USES ties from datasets to categories. To navigate to it, open the **Edit** menu in the top navigation bar and select **Edit**.

*Figure 1. Edit upload landing page with template links and file import controls.*

![Edit upload page reached from the Edit menu](media/current/edit-upload-page.webp)
### Adding a dataset node
If a user wants to add categories from a new dataset, they first need to add a node for that dataset.  

1. Under "Find Upload templates here", choose "New dataset nodes"
2. At a minimum the user must include values for the columns highlighted red
	- **CMName**.  A name for the dataset
	- **shortName**.  A brief name for the dataset with no spaces
	- **DatasetCitation**.  A citation for the dataset
	- **label**.  This will always be DATASET when inputting a new dataset node.
3. The user can also input values for the following.  Although it is not required, ideally, they will include a url under "DatasetLocation" so future users can find the data.
	- **DatasetLocation.** a url that points to the location of the data for a dataset.
	- **DatasetVersion.** This can clarify which version of a dataset this refers to (e.g. version 3.6), or whether this is a subset of a collection of datasets (e.g., Women for the dataset in a collection that contains data for women).
	- **DatasetScope.** This can describe the region or country a dataset pertains to.
	- **ApplicableYears.**  This can include a time range for when the dataset applies to.
	- **project**.  If the dataset belongs to a larger project, this can be indicated here.  For example, when uploading a node for DHS Benin 2012 Women, this would be "DHS".
	- **parent.** If the dataset has a direct parent dataset, this can be indicated here.  For example, the DHS Benin 2012 Women dataset belongs to a collection of datasets from the DHS Benin 2012 survey which has CMID = SD90.  SD90 is included her for DHS Benin 2012 Women.
	- **District.** If the dataset pertains to a specific country or world region, the CMID for that country or world region can be included here.
	- **Subnational.** If the dataset pertains only to a specific subnational region, this would be Y.
	- **foci.** This includes unique CMID for specific topics a dataset might focus on.
	- **Unit.**  This can describe the units that it contains information on (e.g. individuals, ethnicities, religions, districts)
4. Once the spreadsheet is filled out and saved, browse for the dataset under "Choose file to import"
5. Click "Advanced"
6. under "Select option" choose "Adding new node for every row"
7. under "Choose column to enter as properties", select only those optional columns that have values in the spreadsheet you are uploading. 
8. Press "Upload"
9. After the message indicating the upload is complete, press the "Download" button to download a spreadsheet with details of the upload.  This also includes the new unique CatMapper CMID assigned to that dataset.

*Figure 2. Edit upload options panel with operation family and mode selection.*

![Edit upload options panel with operation and mode selections](media/current/edit-upload-options-panel.webp)

*Figure 3. Edit upload options panel showing required columns and optional property selection.*

![Edit upload options panel showing required columns and property selection](media/current/edit-upload-options-panel.webp)

### Adding new category nodes
When the new dataset has categories with no matches to existing CatMapper categories, it is necessary to create new category nodes.

1. Under "Find Upload templates here", choose "New category nodes"
2. At a minimum the user must include values for the columns highlighted red
	- **datasetID**. this is the unique CatMapper ID that was created in the previous section on adding new dataset nodes. If you didn't keep it from the earlier step, you can find it using the [Exploring](/exploring) functions.
	- **CMName**.  A name for the category
	- **Name.**  The name for the category used by the dataset.  This may be the same as CMName, but it may also be different.  If the dataset assigns multiple names to the category, they should be included with semil-colons between them (Dan; Gio)
	- **Key**.  The key indicating how the dataset encodes this category.  Most keys are of the form "Variable: Value".  For example in Afrobarometer 9, the variable Q84A stores information on ethicity, and  a value of 622 in that variable indicates the "Yoruba" ethnicity.  Thus the key for Yoruba in the Afrobarometer 9 dataset would be Q84 == 622.
	- **label**.  This is the domain that will be assigned to the row.  For example, if the category is an ethnicity, the label is ETHNICITY.  If it is a district, it would be AREA.

3. The user can also input values for the following properties if the dataset they are imputting makes claims about these properties.  
	- **country.** the CatMapper ID for the country this dataset says is assocaited with this category.  If the dataset assigns multiple countries to the category, the CMID should be separated by semi-colons (e.g., SM4; SM14)
	- **url**. if the dataset provides a unique public facing url for this category, it can be included here.
	- **parent**. If the dataset claims that the category is contained by a broader category, this should include the CatMapper ID for the broader category.
	- **eventType.**  This specifies the relationship between the current category and it's parent.  HIERARCHY indicates a simple contains relationship, SPLIT means a temporal split, MERGE indicates the category was merged into the parent category at some point.
	- **eventDate.**  If there is an eventType of SPLIT or MERGE, eventDate is a year that the dataset says the event occurred.
	- **latitude, longitude**.  The latitude and longitude claimed by the dataset as a location for the category.
	- **yearStart**.  If the dataset claims the category began at a certain point in time, this would be the year for that start.
	- **yearEnd.** If the dataset claims the category ended at a certain point in time, this would be the year for that end.
	- **recordStart.**  If that dataset specifies when its observation of the category began, this would be the year for that start.
	- **recordEnd.** If that dataset specifies when its observation of the category ended, this would be the year for that end.
	- **descriptor**. This can include what kind of unit the dataset says this category is (e.g., province, state...)
4. Once the spreadsheet is filled out and saved, browse for the spreadsheet under "Choose file to import"
5. Click "Advanced"
6. under "Select option" choose "Adding new node for every row"
7. under "Choose column to enter as properties", select only those optional columns that have values in the spreadsheet you are uploading. 
8. Press "Upload"
9. After the message indicating the upload is complete, press the "Download" button to download a spreadsheet with details of the upload.  This also includes new unique CatMapper CMIDs assigned to each category.
### Adding uses ties

For categories in the new dataset that do have matches to existing CatMapper categories, it is not necessary to create a new node.  However, it is important to create USES ties from the new dataset to each category.  USES ties store all the claims that a dataset makes about a specific category (e.g. geospatial location, parent categories, associated countries and langauges)

1. Under "Find Upload templates here", choose "New uses ties"
2. At a minimum the user must include values for the columns highlighted red
	- **datasetID**. this is the unique CatMapper ID that was created in the previous section on adding new dataset nodes. If you didn't keep it from the earlier step, you can find it using the [Exploring](/exploring) functions.
	- **CMID**. the unique CatMapper ID for the category
	- **Name.**  The name for the category used by the dataset.  This may be the same as CMName, but it may also be different.  If the dataset assigns multiple names to the category, they should be included with semil-colons between them (Dan; Gio)
	- **Key**.  The key indicating how the dataset encodes this category.  Most keys are of the form "Variable: Value".  For example in Afrobarometer 9, the variable Q84A stores information on ethicity, and  a value of 622 in that variable indicates the "Yoruba" ethnicity.  Thus the key for Yoruba in the Afrobarometer 9 dataset would be Q84 == 622.
	- **label**.  This is the domain that will be assigned to the row.  For example, if the category is an ethnicity, the label is ETHNICITY.  If it is a district, it would be AREA.

3. The user can also input values for the additional properties outlined in the "Adding category nodes" section above.
4. Once the spreadsheet is filled out and saved, browse for the spreadsheet under "Choose file to import"
5. Click "Advanced"
6. under "Select option" choose "Adding new uses ties (with old or new nodes)"
7. under "Choose column to enter as properties", select only those optional columns that have values in the spreadsheet you are uploading. 
8. Press "Upload"
9. After the message indicating the upload is complete, press the "Download" button to download a spreadsheet with details of the upload.  
