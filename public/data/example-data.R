library(tidyverse)
con = CMConnect("sociomap")

match = "match (c:ADM1)<-[r:USES]-(d:DATASET {CMID: 'SD1'}) with c,d, r order by rand() limit 20  return c.CMID as CMID, head(r.Name) as Name, r.Key as Key, d.CMID as datasetID" %>%
  CMCypherQuery(con = con)

match2 = "unwind $rows as row match (c:ADM1 {CMID: row.CMID})<-[r:USES]-(d:DATASET {CMID: 'SD2'}) with c,d, r order by rand() limit 20  return head(r.Name) as Name, r.Key as Key, d.CMID as datasetID" %>%
  CMCypherQuery(con = con, parameters = list(rows = match))

example2 = match2 %>%
  select(datasetID, Name, Key) %>%
  CMextractKey() %>%
  select(-Key) %>%
  mutate(pseudoVar2 = unlist(lapply(n(),function(x){abs(round(rnorm(x),2))})))


example1 = match %>%
  select(datasetID, Name, Key) %>%
  CMextractKey() %>%
  select(-Key) %>%
  mutate(pseudoVar1 = unlist(lapply(n(),function(x){abs(round(rnorm(x),2))}))) %>%
  inner_join(example2 %>% select(Name))

example2 = example2 %>%
  inner_join(example1 %>% select(Name))

rio::export(example1,"example-data1.xlsx")

rio::export(example2,"example-data2.xlsx")
