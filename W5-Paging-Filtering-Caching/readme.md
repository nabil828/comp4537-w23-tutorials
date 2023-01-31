# API versioning
## Motivation
It is an unavoidable truth that all application APIs change over time. However, the evolution of public APIs, such as RESTful services, which have an unknown number of consumers, is a delicate issue. Due to the fact that consumers may not be able to properly handle the modified data and there is no way to notify all of them, it is important to maintain backward compatibility in our APIs as much as possible. One solution to this is to use different URIs for different versions of our application. 

When the time is appropriate to release a new version, for instance, Version 2, it is necessary to keep the previous version accessible through another URI for backward compatibility purposes. One option is to use /v1/unicorns or unicorns?version=1 for the previous version and map /unicorns to the latest version. In this case, a request to /unicorns would result in a redirect to /v2/unicorns or unicorns?version=2, using HTTP 3xx status codes to indicate the redirection to the latest version.

An alternative approach to versioning would be to keep the URI of the API stable and depend on custom HTTP headers to specify the version. However, this is not a preferred method for backward compatibility as it is more straightforward to modify the URL of a request in an application rather than modifying the headers sent within the request.

## How-o
https://expressjs.com/en/guide/routing.html#express-router

# API Paging
## Motivation
When deployed online, services become accessible to a vast number of users who not only retrieve data but also insert new information. This eventually results in a huge volume of data in the database. To ensure the service remains user-friendly and response times are reasonable, it's necessary to manage the large data by providing it in manageable amounts
## How-to
To implement paging in an Express.js server, you can follow these steps:

Determine the number of items to display per page.
Retrieve the page number from the query string or URL parameter.
Use the skip and limit methods of a MongoDB or SQL query to retrieve only the items for the specified page.
Return the selected items along with the total number of pages and the current page number.
Here's an example using MongoDB and Mongoose:

```js
app.get('/api/v1/pokemons', async (req, res) => {
  console.log("GET /api/v1/pokemons");
  if (!req.query["count"])
    req.query["count"] = 10
  if (!req.query["after"])
    req.query["after"] = 0
  try {
    const docs = await pokeModel.find({})
      .sort({ "id": 1 })
      .skip(req.query["after"])
      .limit(req.query["count"])
    res.json(docs)
  } catch (err) { res.json(handleErr(err)) }
})
```


In-Class Exercise: 
-  short circuit the initialization.
-  repeat using Arrays.

# API Filtering
## Motivation
Filtering is necessary in order to allow users to find the specific information they are looking for in a large dataset. Without filtering, users would have to manually search through all of the data to find what they need, which can be time-consuming and difficult. Filtering provides a way to narrow down the results to only show the most relevant information, based on certain criteria such as `name`, `weight`, `dob`, etc. This helps users find what they need quickly and easily, improving the overall user experience and making the application more usable.

```js

app.get('/pokemonsAdvancedFiltering', async (req, res) => {
  // default values 
  // let page = 1
  // let hitsPerPage = 5

  const { id,
    'name.english': nameEnglish,
    'name.chinese': nameChinese,
    'name.japanese': nameJapanese,
    'name.french': nameFrench,
    'base.HP': baseHP,
    'base.Attack': baseAttack,
    'base.Speed Attack': baseSpeedAttack,
    'base.Speed Defense': baseSpeedDefense,
    'base.Speed': baseSpeed,
    type, sort, filteredProperty } = req.query
  var { page, hitsPerPage } = req.query
  // console.log(page, hitsPerPage);
  // console.log(req.query)
  const query = {}
  if (id) query.id = id

  if (nameEnglish) query['name.english'] = nameEnglish
  if (nameChinese) query['name.chinese'] = nameChinese
  if (nameJapanese) query['name.japanese'] = nameJapanese
  if (nameFrench) query['name.french'] = nameFrench
  if (baseHP) query['base.HP'] = baseHP
  if (baseAttack) query['base.Attack'] = baseAttack
  if (baseSpeedAttack) query["base.Speed Attack"] = Number(baseSpeedAttack)
  if (baseSpeedDefense) query["base.Speed Defense"] = baseSpeedDefense
  if (baseSpeed) query['base.Speed'] = baseSpeed


  if (type) {
    const types = type.split(',').map(item => item.trim())
    // console.log(types);
    query.type = { $in: types }
    // console.log(query);
  }

  let results = pokeModel.find(query)
  let pokemons = []
  page = page || 1
  hitsPerPage = hitsPerPage || 5
  // console.log(page, hitsPerPage);
  beforePagination = await pokeModel.find(query)
  if (page) {
    pokemons = results.skip((page - 1) * hitsPerPage).limit(hitsPerPage);
  }
  if (sort) {
    pokemons = results.sort(sort.split(',').join(' '))
  }
  if (filteredProperty) {
    pokemons = results.select(filteredProperty.split(',').join(' ') + ' -_id')
  }
  pokemons = await results

  res.send({
    hits: pokemons,
    page: page,
    nbHits: pokemons.length,
    nbPages: Math.ceil(beforePagination.length / hitsPerPage),
    hitsPerPage: hitsPerPage,
    query: query,
    params: req.url.substring(req.url.indexOf('?') + 1)
  });
})
```


# API Caching
## Motivation
From a statistical standpoint, data posted on the web has a higher probability of being viewed rather than altered or removed.

Therefore, it's reasonable to assume that a resource accessible through a public URI will receive a high volume of requests. To reduce the load on the server, it's possible to cache part of the data. HTTP protocol enables caching of responses for a specified duration. For instance, when multiple requests are made in quick succession, such as querying for Pokémon of a particular group like `/pokemons?name=Eevee`, our service can use special HTTP headers to instruct the HTTP server to cache the response for a set amount of time. This helps prevent repetitive queries to the underlying database server.

## How-to
To implement caching in an Express.js server, you can use a middleware such as `express-cache-controller` or `express-cache-response-directive`.