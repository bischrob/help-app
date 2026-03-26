# Welcome to CatMapper

CatMapper organizes dynamic and complex category systems commonly used by
social scientists and policymakers, including ethnicities, languages,
religions, and political districts. Each of these domains includes
thousands of categories encoded in diverse, dynamic and incompatible
ways across a growing corpus of thousands of datasets. This creates a
bottleneck for social scientists trying to merge diverse datasets to
conduct novel analyses. CatMapper aids in overcoming this bottleneck by
assisting users in several key activities.

## What does CatMapper do?

<u><strong>CatMapper assists users in:</strong></u>

1.  **Exploring** where data is available for complex, evolving
    categories commonly used in the social sciences (e.g., ethnic,
    religious, language, geospatial, and archaeological categories). For
    example, where can I find data on speakers of Yoruba or people who
    identify as Yoruba or followers of Isese, the Yoruba religion.

2.  **Translating** categories from new datasets to categories already
    stored in CatMapper.

3.  **Merging** data across diverse, external datasets by these complex
    categories.

4.  **Documenting** and **Sharing** their translations and merges so
    that other users can check and re-use their work.

<u><strong>Apps.</strong></u> CatMapper currently includes two apps aimed at
organizing two kinds of categories. SocioMap organizes sociopolitical
categories, such as ethnicities, religions, languages, and
administrative districts. ArchaMap organizes categories of material
objects used in archaeology, including sites, ceramic types, lithic and
projectile point types, and faunal types. Our hope in the future is to
extend CatMapper's capabilities to other classes of complex, dynamic
categories.

## Key concepts in CatMapper

CatMapper stores information on **categories** (**Table 1**)**,** how
they are related to each other, and how they are encoded by diverse
**datasets**.

**Table 1. Examples of CatMapper Category Domains and Subdomains**

| App | Primary Domain | Subdomains |
| --- | --- | --- |
| SocioMap | ETHNICITY |  |
| SocioMap | LANGUOID | LANGUAGE, DIALECT, FAMILY |
| SocioMap | RELIGION |  |
| ArchaMap | CERAMIC | CERAMIC_TYPE, CERAMIC_WARE |
| ArchaMap | PROJECTILE_POINT | PROJECTILE_POINT_CLUSTER, PROJECTILE_POINT_TYPE |
| ArchaMap | PERIOD |  |
| All | AREA | ADM0-ADM4, ADME, ADMD, ADMX, PPL, SITE, REGION |
| All | GENERIC |  |

CatMapper stores contextual information about categories through a range
of ties (e.g., contains, district_of, language_of, religion_of) (**Table
2**).

**Table 2. Ties that store contextual information about categories**

| Tie | Description |
| --- | --- |
| X CONTAINS Y | Y is a sub-category of X |
| X DISTRICT_OF Y | X is a geospatial locale for Y |
| X LANGUAGE_OF Y | X is a language associated with Y |
| X RELIGION_OF Y | X is a religion associated with Y |
| X USES Y | Dataset X uses the category Y |

CatMapper catalogues how thousands of external datasets store data on
specific categories from the domains (e.g. ethnicity, language,
districts, religion, and archaeological categories) described above. For
example, Geonames.org, Statoids, GADM, and MARC are four geographical
database that store information on thousands of administrative
subdivisions worldwide. While they store information about many of the
same categories, they usually encode the same categories in very
different ways and store different information about them. For example,
Table 3 illustrates the different Keys each dataset uses to uniquely
encode Greenland, the different names they use and the different parents
they assign to Greenland.

**Table 3. How different datasets encode information about Greenland**

| Dataset | KEY | NAME | PARENT |
| --- | --- | --- | --- |
| GADM | GID: GRL | Greenland |  |
| GEONAMES | geonameid: 3425505 | Kalaallit Nunaat, Grønland, ... | Kingdom of Denmark |
| STATOIDS | HASC: GL | Greenland |  |
| MARC | ID: gl | Greenland | North America |

CatMapper uses a network to represent the different claims (e.g., about
names, about parents) each dataset makes about Greenland. Specifically,
CatMapper represents Greenland and each of the datasets as unique nodes
with **USE ties** emanating from each of the dataset nodes to the
Greenland node. Figure 1 illustrates the **USES tie** from the Geonames
dataset node to the Greenland node, with a box including information
from the **USES tie**, including the Key, names, parent, country, and
latitude and longitude (in geoCoords) that Geonames specifically assigns
to Greenland.

**Figure 1. Contents of the USES tie from Geonames to Greenland.**

![Geonames to Greenland USES tie popup showing Key, Name, and contextual properties](media/current/introduction-geonames-to-greenland-uses-tie.webp)

Indeed, whenever CatMapper catalogues how a dataset uses a specific
category, it stores this in such a **USES tie** from the dataset to the
category. This USES tie records: (1) how the dataset encodes that
category (i.e., name, key), (2) claims that the dataset makes about the
category (e.g., geospatial location, population estimate, associated
languages and religions, other categories it contains or is contained
by). A **key** specifies how a specific dataset uniquely encodes a
specific category. A simple key involves a single variable and value
(e.g., V131 == 3). More complex keys can involve combinations of
variables and values (e.g., V131 == 3 && V024 == 1).

Table 4 illustrates key metadata and contextual properties that USES ties can store.

**Table 4.  Metadata and contextual properties that can be stored in USE ties**

| Property | Description |
| --- | --- |
| Name         | List of names the dataset uses for category                                                                                                                                                                                         |
| Key          | Unique identifier dataset uses to encode a specific category. A simple key involves a single variable and value (e.g., V131 == 3). More complex keys can involve combinations of variables and values (e.g., V131 == 3 && V024 == 1). |
| country      | CatMapper id for country or countries that the datasets claims are associated with the category                                                                                                                                     |
| district     | CatMapper id for non-country regions that the datasets claims are associated with the category                                                                                                                                      |
| geoCoords    | Latitude and longitude that the dataset claims are associated with the category                                                                                                                                                     |
| language     | Language associated with the category                                                                                                                                                                                               |
| religion     | Religion associated with the category                                                                                                                                                                                               |
| recordStart  | First year of time span over which the dataset has records for this category                                                                                                                                                        |
| recordEnd    | Last year of time span over which the dataset has records for this category                                                                                                                                                         |
| yearStart    | First year the category existed according to the dataset                                                                                                                                                                            |
| yearEnd      | Last year the category existed according to the dataset                                                                                                                                                                             |
| period       | CatMapper id for the time span of the category                                                                                                                                                                                      |

A **category set** is the set of categories in a specific domain encoded
by a specific dataset (e.g., ethnicities coded in DHS Guatemala 1995
survey, language spoken coded in WVS Cote D'Ivoire).
