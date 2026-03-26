# How-to: Exploring

Here we will give a quick vignette of using one of the CatMapper apps. The goal is to give you a sense of what you can do within the Explore functions of CatMapper and what the workflow is.

In this section, we will:

1.  Find contextual information about an ethnicity-Yoruba. However, it's possible to use the same approach to find information languages, districts, or religions in SocioMap and archaeological categories in ArchaMap.

2.  See how a certain dataset encodes an ethnicity

3.  Find other ethnicities, languages, districts, and religions related to a specific category.

4.  View the entire set of datasets with encodings stored in SocioMap

5.  Find all variables that are available for a specific ethnicity, language, district, religion.

6.  Find all the ethnicities associated with a specific country.

In this example, we want to know about the ethnic group Yoruba. We go through the process of getting the contextual information, finding the datasets that include information about Yoruba, how certain datasets encode the ethnic category of Yoruba, and find other information about Yoruba within SocioMap.

## Question: How can I find contextual information on ethnicities, languages, districts, religions, and datasets?

In this case, we want contextual information about the ethnic group Yoruba.

1.  Go to [catmapper.org/sociomap](https://catmapper.org/sociomap)

2.  Type the category name you are searching for.

3.  Click on the `Explore` button.

4.  Press the `Advanced Search` option.

5.  Under `Category Domain`, choose the domain you want to search, then choose the matching option under `Category Subdomain`.

    -   Here, we choose `Category Domain = ETHNICITY` and `Category Subdomain = ETHNICITY`.

6.  If you would like to limit your search to a particular country, choose that country in the *Country* box.

7.  Once you press the `Search` button, a set of search results will appear below.

*Figure 1. Explore results for the query Yoruba in the ETHNICITY domain.*

![Explore results for Yoruba in the Ethnicity domain](screenshots/explore-search-yoruba-results-cropped.webp)

8.  Click the row for the result you want, then click the `View` button.

9.  The `Info` page opens with `NETWORK EXPLORER` as the default tab.

*Figure 2. Default `NETWORK EXPLORER` view with `CONTAINS` context for Yoruba.*

![Network Explorer showing CONTAINS relationship context for Yoruba](screenshots/explore-network-contains-cropped.webp)

The `Info` page includes a consistent tab order:

1.  `NETWORK EXPLORER`: shows category relationships (for example `CONTAINS`, `RELIGION_OF`, `DISTRICT_OF`, and `USES`).

2.  `MAP`: shows map-based geography associated with the category.

*Figure 3. `MAP` tab showing geography claims for Yoruba from linked datasets.*

![Map tab for Yoruba showing mapped geography claims](screenshots/explore-yoruba-map-tab-cropped.webp)

3.  `TIMESPAN`: shows the temporal span of observations.

*Figure 4. `TIMESPAN` tab showing temporal coverage of observations for Yoruba.*

![Timespan tab for Yoruba showing observation coverage over time](screenshots/explore-yoruba-timespan-tab-cropped.webp)

4.  `DATASETS`: shows dataset-specific rows (location, years, sample, and source details).

*Figure 5. `DATASETS` tab listing dataset-level records linked to Yoruba.*

![DATASETS tab for Yoruba listing dataset-specific records](screenshots/explore-yoruba-datasets-tab-cropped.webp)

5.  `VIEW LOGS`: shows processing and write-log history for the selected item.

*Figure 6. `VIEW LOGS` panel with process and status history for the selected item.*

![View Logs panel showing process and status history](screenshots/yoruba_logs.png)

## Question: How can I identify which datasets include information on a specific ethnicity, language, district, or religion?

Now that we have accessed the contextual information about the category, we to know what datasets have information about the category of interest.

The `DATASETS` tab of the *Info Page* page contains a row for each dataset that contains information on a specific category. In some cases, a dataset may contain information on that category from different places or times. In those cases, there may be multiple rows for the same ethnicity from the same dataset.

*Figure 7. `DATASETS` tab showing multiple dataset rows associated with Yoruba.*

![Yoruba datasets listed in the Info page Samples table](screenshots/explore-yoruba-datasets-tab-cropped.webp)

In this case, there are many different datasets that contain information about Yoruba. Exploring the sample section shows that different datasets have information about Yoruba from Nigeria, Benin, and Ghana. In addition, some of the information from the dataset are from different times, and some are separated out between 'Men' and 'Women.'

When available, there is a link to the source of the dataset, as is the case for HRAF CCC, Wikipedia, and Wikidata.

Alternatively, the 'Network Explorer' tab can also visualize the information about which datasets contain information on the category. In the 'Network Explorer' tab, choose "USES" in the drop-down menu labeled "Relationships."

This will show links to all datasets with data relevant to the category.

*Figure 8. `NETWORK EXPLORER` with relationship filter set to `USES`.*

![Network Explorer USES view showing dataset-to-category links](screenshots/explore-network-uses-full.webp)

To explore metadata for a dataset of interest, hover over the relevant node to view the information box summary. To open that node's full *Info page*, click the node, review the information box, and then press the `View` button. (*Note:* The *Network Explorer* only includes a maximum of 10 nodes. To view all available nodes, please look at the drop down list under *"Choose node to view relationship."*)

In this case, we want to know more about the Human Relations Area Files (eHRAF) dataset. We can view it from the 'Network Explorer' tab for Yoruba. If you hover over the node, a summary of the dataset will be displayed.

*Figure 9. Dataset-node hover popup in `NETWORK EXPLORER` showing summary metadata.*

![Dataset-node hover popup for eHRAF in the Network Explorer](screenshots/yoruba_ehraf.webp)

After selecting the node and pressing `View`, the *Info page* opens for the eHRAF dataset. Here you can see all the other categories that are also described within that dataset.

*Figure 10. Dataset-centered network view showing categories connected through `USES`.*

![Dataset-centered network view of related categories](screenshots/SD13_network_uses_cropped.webp)

## Question: How can I see how a dataset encodes a specific ethnicity, language, district, or religion?

1.  If you want to merge data on Yoruba across different datasets it's essential to find out how each dataset uniquely encodes the ethnic category. There are a number of ways to access the Keys a dataset uses to encode category. Here is one way.

2.  Return to the *Network explorer* for ethnic category of Yoruba (see section 2.1)

3.  In the *Network Explorer* box at the bottom of the *Info page*, choose USES in the drop down menu labeled "*Relationship"*

4.  This will show all USES ties from different datasets to the category of Yoruba

5.  Hover over the link to the relevant dataset. It will show the variable and variable value used to encode that category. Here we see that the Human Relations Area Files encodes Yoruba with `Key: HRAFCCC_ID == 2351`.

*Figure 11. `USES` relationship popup showing `Key` and other tie-level properties.*

![USES relationship popup showing Key and other tie-level properties for Yoruba](screenshots/ehraf_uses_yoruba.webp)

## Question: How can I identify and explore ethnicities, languages, districts and religions that are related to a specific category?

In this case, we want to know what language(s) the Yoruba speak, what other ethnicities are related to the Yoruba, where the Yoruba live, and what religion(s) the Yoruba practice. This information can be found through the *Network Explorer*.

In the *Network Explorer* tab in the *Info page*, the drop down menu labeled "*Choose Relationship to View"* gives you the choice of exploring CONTAINS ties, LANGUAGE_OF ties, DISTRICT_OF ties, and USES ties which describe how different datasets encode the category.

*Figure 12. `NETWORK EXPLORER` view with `CONTAINS` selected.*

![Network Explorer showing CONTAINS relationship context](screenshots/explore-network-contains-cropped.webp)

Here, selecting CONTAINS in the *Relationship* dropdown, you can see that Yoruba contains several smaller ethnic categories(e.g. Ekiti, Ijebu, Ikale, Oyo, Ibarapa, Oworo, Igbeti, Egba, and Ede Ije are visible). You can also see that Yoruba is contained within the broader *Southeastern* category.

*Figure 13. `NETWORK EXPLORER` view with `RELIGION_OF` selected.*

![Network Explorer showing RELIGION_OF relationship](screenshots/explore-network-religion-of-full.webp)

Changing the *Relationship* dropdown to RELIGION_OF, you can see that the religion practiced by the Yoruba is Isese.

*Figure 14. `NETWORK EXPLORER` view with `DISTRICT_OF` selected.*

![Network Explorer showing DISTRICT_OF relationship](screenshots/explore-network-district-of-full.webp)

Changing the *Relationship* to DISTRICT_OF, you can see that the Yoruba live in Ghana, Benin, Nigeria, and Togo. In some examples, you may be able to find more specific administrative level districts by changing the Administrative level in the *Domain* drop down.

To access additional information about a node seen within the *Network Explorer*, click the node, review the information box, and then press `View` to open its *Info page*.

*Note:* The *Network Explorer* only includes a maximum of 10 nodes. To view all available nodes, please look at the drop-down list under *"Choose node to view relationship."*

## Question: How can I view the entire set of datasets with encodings stored in SocioMap?

In some cases, you may want to know what datasets have been cataloguedin SocioMap in general. To download the full current list of datasets, go to

[catmapper.org/sociomap](https://catmapper.org/sociomap)

Scroll to the box "Dataset Progress" and click on the "Download Dataset List". This will download the metadata on all Datasets currently catalogued in SocioMap.

You may be interested in what datasets exist for a country of interest. This can give you a sense of what exists within SocioMap.

1.  Click on the *Explore* tab and choose *Search*.

2.  Press the `Advanced Search` option.

3.  Choose `Category Domain = DATASET` and `Category Subdomain = DATASET`.

4.  Leave search term box blank*.*

5.  If you would like to limit your search to a particular country, choose that country under the *Country* dropdown menu.

6.  Once you press the *Search* icon, a set of search results will appear below.

*Figure 15. Explore results for `Category Domain = DATASET` and `Category Subdomain = DATASET` across SocioMap.*

![All datasets listed in Explore search results](media/current/explore-datasets-all-results.webp)

Here, you can see a list of all the datasets stored in SocioMap.

*Figure 16. DATASET search using `Advanced Search` with country filtering.*

![Dataset search filtered with Advanced Search country criteria](media/current/explore-datasets-ghana-results.webp)

After enabling `Advanced Search`, you can choose a country of interest from the *Country* dropdown menu. Here, we are looking at the datasets stored in SocioMap that have information from Ghana.

## Question: How can I find all the ethnicities associated with a specific country?

1.  Click on the *Explore* tab and choose *Search*.

2.  Press the `Advanced Search` option.

3.  Choose `Category Domain = ETHNICITY` and `Category Subdomain = ETHNICITY`.

4.  Leave *search box* blank.

5.  To limit your search to a particular country, choose that country under the *Country* dropdown menu.

6.  Once you press the *Search* button, a set of search results will appear below.

*Figure 17. Explore results for `Category Domain = ETHNICITY` and `Category Subdomain = ETHNICITY` filtered to Ghana.*

![Explore results listing ethnicities associated with Ghana](media/current/explore-ethnicities-ghana-results.webp)

In this case, we are looking for all the ethnicities associated with Ghana. You can see that there are a total of 166 associated ethnicities stored within SocioMap. Clicking the row will allow you get contextual information about that Ethnicity.

## Question: What does the log page show?

To open logs for the selected item, click the `VIEW LOGS` button on the right side of the page header, above the tab row. The log view shows timestamped workflow records (for example upload/edit tasks), including status progression, task/job identifiers, operation type, and affected graph fields such as `CMID`, `datasetID`, `Key`, `Name`, and `label`. Use it to audit what changed and diagnose failures or unexpected results.

*Figure 18. `VIEW LOGS` page with timestamped workflow history and affected fields.*

![Log page view showing process and status logging in CatMapper](screenshots/yoruba_logs.png)
