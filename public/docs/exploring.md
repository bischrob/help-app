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

1.  Go to [https://www.catmapper.org/sociomap]()

2.  Click on the *Explore* button.![](media/image2.webp)

3.  Under *Select category domain*, choose which type of category (e.g., ethnicity, language, district, religion) you would like to search for*.*

    -   Here, we want to search within the "Ethnicity" category.

4.  In the box to the right type the category name you are searching for*.*

    -   Here, we are searching "Yoruba".

5.  If you would like to limit your search to a particular country, you can select the 'Advanced Search' option, choose that country in the *Country* box.

6.  Once you press the *Search* icon, a set of search results will appear below.

![](media/image3.webp)

7.  Click on the row for the search result you would like to explore, and a *Info page* will open.

![](media/image4.webp)

The page that opens will include contextual information about the category, including the relevant countries and languages, datasets containing the category with information on population estimates, sample size, geospatial location and name used by the dataset.

Under the header Category Info, information about the ethnicity is summarized. Below, the 'Samples' table gives additional information about the datasets that contain information about the category. The 'Maps' tab shows geographic information about the category. The 'Network Explorer' tab displays information about the relationships that the category has with other categories within SocioMap.

## Question: How can I identify which datasets include information on a specific ethnicity, language, district, or religion?

Now that we have accessed the contextual information about the category, we to know what datasets have information about the category of interest.

The Dataset tab of the *Info Page* page contains a row for each dataset that contains information on a specific category. In some cases, a dataset may contain information on that category from different places or times. In those cases, there may be multiple rows for the same ethnicity from the same dataset.

> ![](media/image5.webp)

In this case, there are many different datasets that contain information about Yoruba. Exploring the sample section shows that different datasets have information about Yoruba from Nigeria, Benin, and Ghana. In addition, some of the information from the dataset are from different times, and some are separated out between 'Men' and 'Women.'

When available, there is a link to the source of the dataset, as is the case for HRAF CCC, Wikipedia, and Wikidata.

Alternatively, the 'Network Explorer' tab can also visualize the information about which datasets contain information on the category. In the 'Network Explorer' tab, choose "USES" in the drop-down menu labeled "Relationships."

This will show links to all datasets with data relevant to the category.

![](media/image6.webp)

To explore metadata for a dataset of interest, hovering over the relevant node will display a summary of the dataset. Double-clicking a different node in the networkwill open the *Info page* page for that node. (*Note:* The *Network Explorer* only includes a maximum of 10 nodes. To view all available nodes, please look at the drop down list under *"Choose node to view relationship."*)

In this case, we want to know more about the eHRAF dataset. We can view it from the 'Network Explorer' tab for Yoruba. If you hover over the node, a summary of the dataset will be displayed.

![](media/image7.webp)

Clicking the node will lead to the *Info page* for the eHRAF dataset. Here you can see all the other categories that are also described within that dataset.

![](media/image8.webp)

## Question: How can I see how a dataset encodes a specific ethnicity, language, district, or religion?

1.  If you want to merge data on Yoruba across different datasets it's essential to find out how each dataset uniquely encodes the ethnic category. There are a number of ways to access the Keys a dataset uses to encode category. Here is one way.

2.  Return to the *Network explorer* for ethnic category of Yoruba (see section 2.1)

3.  In the *Network Explorer* box at the bottom of the *Info page*, choose USES in the drop down menu labeled "*Relationship"*

4.  This will show all USES ties from different datasets to the category of Yoruba

5.  Hover over the link to the relevant dataset. It will show the variable and variable value used to encode that category. Here we see that the 2015 Nigeria Demographic and Health Survey (DHS) encodes Yoruba with the Key V131: 298

> ![](media/image9.webp)

## Question: How can I identify and explore ethnicities, languages, districts and religions that are related to a specific category?

In this case, we want to know what language(s) the Yoruba speak, what other ethnicities are related to the Yoruba, where the Yoruba live, and what religion(s) the Yoruba practice. This information can be found through the *Network Explorer*.

In the *Network Explorer* tab in the *Info page*, the drop down menu labeled "*Choose Relationship to View"* gives you the choice of exploring CONTAINS ties, LANGUAGE_OF ties, DISTRICT_OF ties, and USES ties which describe how different datasets encode the category.

![](media/image10.webp)

Here, selecting CONTAINS in the *Relationship* dropdown, you can see that Yoruba contains several smaller ethnic categories(e.g. Ekiti, Ijebu, Ikale, Oyo, Ibarapa, Oworo, Igbeti, Egba, and Ede Ije are visible). You can also see that Yoruba is contained within the broader *Southeastern* category.

![](media/image11.webp)

Changing the *Relationship* dropdown to RELIGION_OF, you can see that the religion practiced by the Yoruba is Isese.

![](media/image12.webp)

Changing the *Relationship* to DISTRICT_OF, you can see that the Yoruba live in Ghana, Benin, Nigeria, and Togo. In some examples, you may be able to find more specific administrative level districts by changing the Administrative level in the *Domain* drop down.

To access additional information about a node seen within the *Network Explorer*, you can click the node of interest to access the *Info page*.

*Note:* The *Network Explorer* only includes a maximum of 10 nodes. To view all available nodes, please look at the drop-down list under *"Choose node to view relationship."*

## Question: How can I view the entire set of datasets with encodings stored in SocioMap?

In some cases, you may want to know what datasets have been cataloguedin SocioMap in general. To download the full current list of datasets, go to

[https://www.catmapper.org/sociomap]()

Scroll to the box "Dataset Progress" and click on the "Download Dataset List". This will download the metadata on all Datasets currently catalogued in SocioMap.

You may be interested in what datasets exist for a country of interest. This can give you a sense of what exists within SocioMap.

1.  Click on the *Explore* tab and choose *Search*.

2.  Choose DATASET under *Select category type.*

3.  Leave search term box blank*.*

4.  If you would like to limit your search to a particular country, choose that country under the *Country* dropdown menu (under Advanced Search).

5.  Once you press the *Search* icon, a set of search results will appear below.

![](media/image13.webp)

Here, you can see a list of all the datasets stored in SocioMap.

![](media/image14.webp) By checking the *Advanced search* box, you can then choose a country of interest from the *Country* dropdown menu. Here, we are looking at the datasets stored in SocioMap that are have information from Ghana.

## Question: How can I find all the ethnicities associated with a specific country?

1.  Click on the *Explore* tab and choose *Search*.

2.  Choose ETHNICITY under *Select category type.*

3.  Leave *search box* blank.

4.  To limit your search to a particular country, check the *Advanced search* box and choose that country under the *Country* dropdown menu.

5.  Once you press the *Search* button, a set of search results will appear below.

![](media/image15.webp)

In this case, we are looking for all the ethnicities associated with Ghana. You can see that there are a total of 166 associated ethnicities stored within SocioMap. Clicking the row will allow you get contextual information about that Ethnicity.
