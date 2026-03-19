# How-to: API

This user guide documents the available endpoints for CatMapper's API. The api base URL is <https://api.catmapper.org>.

Examples can be run within a browser or through various API clients by affixing the examples to the base URL (e.g., <https://api.catmapper.org/CMID?database=SocioMap&cmid=SM1>).

Questions and feedback can be directed to [support\@catmapper.org](mailto:support@catmapper.org).

## **API User Guide: Search Endpoint**

### **Endpoint Description**

The **`/search`** endpoint is tailored for conducting database searches on a single or empty search term on the explore page. This endpoint accommodates searches in specific databases and can filter results based on various parameters such as domain, year range, country, and context.

### **HTTP Request Method**

-   **GET**

### **Resource URL**

`/search`

### **Query Parameters**

-   **database**: The name of the CatMapper database where the search will be conducted. Only 'SocioMap' and 'ArchaMap' are valid values.

-   **term** (optional): The search term. If not provided, the search will return all results.

-   **property** (optional): Specifies the property to search by, with options including 'Name', 'CMID', or 'Key'.

-   **domain** (optional): Specifies the domain category within which the search is conducted. Default is 'CATEGORY'.

-   **yearStart** (optional): The earliest year of data collection or existence of the category. Results will return if category year range intersects with this range.

-   **yearEnd** (optional): The latest year of data collection or existence of the category.

-   **country** (optional): CMID of the ADM0 node with a 'DISTRICT_OF' tie.

-   **context** (optional): CMID of the parent node in the network.

-   **limit** (optional): Limits the number of results returned; defaults to 10000 if not specified.

-   **query** (optional): If set to 'true', returns the cypher query instead of executing it.

### **Request Examples**

`GET /search?database=SocioMap&term=Yoruba&domain=ETHNICITY&property=Name`

`GET /search?database=ArchaMap&term=Grasshopper&domain=SITE&property=Name`

### **Responses**

#### Successful Response

-   **Status Code**: 200 OK

-   **Content**:

    -   If **`query`** is set to **`false`**, returns a JSON array of search results with fields such as **`CMID`**, **`CMName`**, **`country`**, **`domain`**, **`matching`**, and **`matchingDistance`**.

    -   If **`query`** is set to **`true`**, returns a JSON object containing the cypher query and relevant parameters.

#### Error Response

-   **Status Code**: 500 Internal Server Error

-   **Content**: A JSON object detailing the error encountered during the search operation.

## **API User Guide: Retrieve CMID Details**

### **Endpoint Description**

This API endpoint (**`/CMID`**) is designed to retrieve comprehensive details about a specific CatMapperID (CMID) from different databases. It fetches both node properties and their relationships associated with the specified CMID. The endpoint supports the GET method and requires the specification of both the database and the CMID.

### **HTTP Request Method**

-   **GET**

### **Resource URL**

`/CMID`

### **Query Parameters**

-   **database**: A string specifying which database to search in. Valid options are:

    -   **SocioMap**: Targets the SocioMap database.

    -   **ArchaMap**: Targets the ArchaMap database.

-   **cmid**: The CatMapperID for which details are to be retrieved. This should be a valid identifier that exists within the specified database.

### **Request Examples**

`GET /CMID?database=SocioMap&cmid=SM1`

`GET /CMID?database=ArchaMap&cmid=AM1`

### **Responses**

#### Successful Response

-   **Status Code**: 200 OK

-   **Content**: A JSON object containing detailed information about the node and its relationships. The response structure is as follows:

    -   **node**: An array of objects, each representing a node property:

        -   **nodeID**: The identifier of the node.

        -   **nodeProperties**: The property name of the node.

        -   **nodeValues**: The value associated with the node property.

    -   **relations**: An object mapping relationship IDs to their properties:

        -   Each relationship ID will have associated properties and values.

#### Error Response

-   **Status Code**: 500 Internal Server Error

-   **Content**: A string message detailing the nature of the error, usually related to incorrect or missing parameters.

## **API User Guide: Retrieve Dataset Details**

### **Endpoint Description**

This API endpoint (**`/dataset`**) is designed to retrieve detailed information about a dataset based on a given CMID (CatMapperID) from the specified database, filtering additionally by domain categories. This endpoint allows for querying dataset relations and properties within specified domains. It uses a GET method and requires specifying the database, CMID, and optionally the domain.

### **HTTP Request Method**

-   **GET**

### **Resource URL**

`/dataset`

### **Query Parameters**

-   **database**: A string identifier specifying the database from which to fetch the dataset. Accepted values are:

    -   **SocioMap**: Targets the SocioMap database.

    -   **ArchaMap**: Targets the ArchaMap database.

-   **cmid**: The CatMapperID of the dataset for which information is to be retrieved.

-   **domain** (optional): A category to filter dataset relationships. Defaults to "CATEGORY" if not specified.

### **Request Examples**

`GET /dataset?database=SocioMap&cmid=SD1&domain=CATEGORY`

`GET /dataset?database=ArchaMap&cmid=AD1`

### **Responses**

#### Successful Response

-   **Status Code**: 200 OK

-   **Content**: A JSON array of objects, each representing details of relationships and properties of datasets related to the specified CMID. Typical properties included are:

    -   **datasetName**: The name of the dataset.

    -   **datasetID**: The CMID of the dataset.

    -   **CMID**: The CatMapperID of related entities.

    -   **CMName**: The name of related entities.

    -   **type**: The type of relationship.

    -   **Key**: Key information of the relationship.

    -   Other dynamic properties based on the dataset's schema and the specified domain.

#### Error Response

-   **Status Code**: 500 Internal Server Error

-   **Content**: A string message indicating the nature of the error, typically related to incorrect database or CMID parameters or issues with database connections.

## **API User Guide: Retrieve All Datasets**

### **Endpoint Description**

This API endpoint (**`/allDatasets`**) provides a method to retrieve detailed information about datasets from different databases. The endpoint supports a GET method that requires specifying a particular database from which to fetch datasets.

### **HTTP Request Method**

-   **GET**

### **Resource URL**

`/allDatasets`

### **Query Parameters**

-   **database**: A string identifier specifying the database from which to retrieve datasets. Accepted values are:

    -   **SocioMap**: Retrieves datasets from the SocioMap database.

    -   **ArchaMap**: Retrieves datasets from the ArchaMap database.

### **Request Examples**

`GET /allDatasets?database=SocioMap`

`GET /allDatasets?database=ArchaMap`

### **Responses**

#### Successful Response

-   **Status Code**: 200 OK

-   **Content**: An array of objects, where each object represents a dataset with the following fields:

    -   **nodeID**: Identifier of the dataset node.

    -   **CMName**: CatMapper name associated with the dataset.

    -   **CMID**: CatMapper ID for the dataset.

    -   **shortName**: A shorter, more concise name for the dataset.

    -   **project**: The project under which the dataset was created or is maintained.

    -   **Unit**: The unit the dataset applies to.

    -   **parent**: The parent dataset, if any.

    -   **ApplicableYears**: The years to which the dataset is applicable.

    -   **DatasetCitation**: Citation information for the dataset.

    -   **District**: The district covered by the dataset.

    -   **DatasetLocation**: URL or other location of the dataset.

    -   **SubNational**: Indicates if the dataset is sub-national.

    -   **DatasetVersion**: Version information of the dataset.

    -   **DatasetScope**: The scope of the dataset.

    -   **Subdistrict**: The subdistrict covered by the dataset.

    -   **Note**: Additional notes or comments about the dataset.

#### Error Response

-   **Status Code**: 500 Internal Server Error

-   **Content**: A string message describing the error, typically related to an invalid database specification or connection issues.
