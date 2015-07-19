Developed a front-end for querying topical index on ElasticSearch using Angular JS, HTML5 and CSS
Working of the project:
1. Created two Rest API in Java using Jersey providing following functionalitites:
- Takes input as the URL and returns clean text using JSoup
- Takes input as th query and returns top scoring documents from ElasticSearch index

2. Using angular js modeled the query and table for to and fro flow of data from http get requests to elastic search and rest api.

3. Allows manual assessment of documents for all documents retrieved from ES, providing the functionality of checking how many done so far with check box indicator to the ones which are done.
