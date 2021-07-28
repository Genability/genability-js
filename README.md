# Genability Javascript SDK

This SDK enables faster integration of the Genability APIs into your Node.js, React, Angular, Web Browser and other Javascript compatible applications.

![Node.js CI](https://github.com/Genability/genability-js/workflows/Node.js%20CI/badge.svg)

## Table of Contents

1. [Basic web front end use](#web-frontend-use)
2. [Basic npm usage](#npm-use)
3. [NodeJS backend proxy example](#backend-proxy)
4. [Maven Plugin for NodeJS](#maven-plugin)
5. [API usage](#api-use)


## Integrations
### <a name="web-frontend-use"></a>Basic web front end use:

#### Include the library with a script tag:
~~~html
<script src="/@genability/api/dist/main.js"></script>
~~~

#### <a name="frontend-client"></a>Instantiate Genability API Client

For frontend use, the API client will send requests to the url specified in the `proxy` option. Your [backend proxy](#backend-proxy) must provide Genability API credentials and forward the request to `https://api.genability.com`. Do not include your Genability API credentials in user-facing frontend code.

~~~javascript
const GenAPIClient = Genability.Client.configure({ proxy: '/genability-api' });
~~~

#### Instantiate a request object
~~~javascript
const territoriesRequest = new Genability.restApis.GetTerritoriesRequest();
territoriesRequest.masterTariffId = '522';
~~~

#### Call the API method
~~~javascript
GenAPIClient.territories.getTerritories(territoriesRequest);
~~~

### <a name="npm-use"></a>Basic npm usage
Prerequisites: [Node.js](https://nodejs.org/) (`^10.12.0`, or `>=12.0.0`) built with SSL support. (If you are using an official Node.js distribution, SSL is always built in.)

You can install genability sdk using npm:

```
$ npm install @genability/api --save
```

#### Import Genability API client
~~~javascript
import { Genability } from '@genability/api';
~~~

#### Instantiate Genability API Client

For frontend use, [you must specify a `proxy` url and provide credentials on the backend.](#frontend-client).

For backend use in node or other environments, you can provide credentials to the API client in several ways. The client will search for credentials in the following order:

1. Credentials explicitly provided to the API client
2. Credentials stored as environment variables GEN_APP_ID and GEN_APP_KEY
3. Credentials stored in a `credentials.json` file in the `.genability` folder in the user's home directory, in this format:
~~~JSON
{
  "profileName" : {
    "appId":"", // Your Genability appId,
    "appKey":"" // Your Genability appKey
  }
}
~~~

If the API client doesn't find credentials in any of these places, the request will be sent without any credentials.

Instantiate a client, and optionally provide credentials, like this:

~~~javascript
const GenAPIClient = Genability.Client.configure({
  profileName: '',// Optionally specify a profile name to use from your 
                  // ~/.genability/credentials.js file
  credentials: {  // Optionally provide credentials explicitly
    appId: '',    // Your Genability App ID
    appKey: '',   // Your Genability App Key
    jwtToken: '', // A JWT token — this can be used to authenticate  requests to a serverless proxy function
    proxyReq: '', // A function used to create an Axios request interceptor for all requests created by 
                  // the API, should requests to a proxy function need to be modified
  }
});
~~~

The `credentials` option also accepts a function which returns an object with the above properties.

#### Instantiate a request object
~~~javascript
import { restApis } from '@genability/api';
const territoriesRequest = new restApis.GetTerritoriesRequest();
territoriesRequest.masterTariffId = '522';
~~~

#### Call the API method
~~~javascript
Genability.territories.getTerritories(territoriesRequest);
~~~

### <a name="backend-proxy"></a>NodeJS backend proxy example
Include [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) in package.json

#### Instantiate proxy middleware
~~~javascript
const createProxyMiddleware = require('http-proxy-middleware').createProxyMiddleware;
~~~

#### Create ExpressJS Route
~~~javascript
const genabilityAuthString = Buffer.from(`yourGenabilityAppId:yourGenabilityAppKey}`).toString('base64');

app.use('/genability-api', createProxyMiddleware({
    target: 'https://api.genability.com',
    changeOrigin: true,
    onProxyReq: function (proxyReq) {
        proxyReq.setHeader('Authorization', 'Basic ' + genabilityAuthString);
    },
    pathRewrite: {
        '^/genability-api': '/',
    },
}));
~~~

### <a name="maven-plugin"></a>Maven Plugin for NodeJS
A useful way to use the Genability Javascript SDK in a project with a Java backend is to include
the [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin). This plugin will install NodeJS and NPM
and enable running `npm install` on every build of the Java project. 

#### Include [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) in pom.xml
~~~xml
<plugin>
    <groupId>com.github.eirslett</groupId>
    <artifactId>frontend-maven-plugin</artifactId>
    <version>1.10.0</version>
    
    <configuration>
      <workingDirectory>src/main/webapp</workingDirectory>
    </configuration>
    
    <executions>
      <execution>
        <id>install node and npm</id>
        <goals>
          <goal>install-node-and-npm</goal>
        </goals>
        <configuration>
          <!-- See https://nodejs.org/en/download/ for latest node and npm (lts) versions -->
          <nodeVersion>v12.18.0</nodeVersion>
          <npmVersion>6.14.4</npmVersion>
        </configuration>
      </execution>
    
      <execution>
        <id>npm install</id>
        <goals>
          <goal>npm</goal>
        </goals>
        <!-- Optional configuration which provides for running any npm command -->
        <configuration>
          <arguments>install</arguments>
        </configuration>
      </execution>
    </executions>
</plugin>
~~~

#### Include package.json
Given the example above you would create your package.json in `src/main/webapp`.

#### Map node_modules to static route
The node_modules then need to be mapped to a static file path in your web server.
Here is an example mapping using the Spring framework:
~~~xml
<mvc:resources mapping="/static/**" location="/node_modules/" />
~~~
The packages in your node_modules will then be available to you in your front end Javascript in the `/static` path.

### <a name="api-use"></a>API usage

| API Endpoint               | Request Params type                              | List of params and sample response                                                                        |
|----------------------------|-------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| **properties**             |                                                 |                                                                                                            |
| getPropertyKeys            | new api.GetPropertyKeysRequest()                | https://developer.genability.com/api-reference/shared-api/property-key/#get-a-list-of-property-keys        |
| getPropertyKey             | string                                          | https://developer.genability.com/api-reference/shared-api/property-key/#get-one-property-key               |
| **lses**                   |                                                 |                                                                                                            |
| getLoadServingEntities     | new api.GetLoadServingEntitiesRequest()         | https://developer.genability.com/api-reference/tariff-api/load-serving-entity/                             |
| getLoadServingEntity       | number                                          | https://developer.genability.com/api-reference/tariff-api/load-serving-entity/                             |
| **tariffs**                |                                                 |                                                                                                            |
| getTariffs                 | new api.GetTariffsRequest()                     | https://developer.genability.com/api-reference/tariff-api/tariff/#get-a-list-of-tariffs                    |
| getTariff                  | number, new api.GetTariffsRequest()(optional)   | https://developer.genability.com/api-reference/tariff-api/tariff/#get-one-tariff                           |
| getTariffHistory           | number                                          | https://developer.genability.com/api-reference/tariff-api/tariff-history/                                  |
| **calculation**            |                                                 |                                                                                                            |
| runCalculation             | new api.GetCalculatedCostRequest()              | https://developer.genability.com/api-reference/calculation-api/cost-calculation/#run-a-calculation         |
| **territories**            |                                                 |                                                                                                            |
| getTerritories             | new api.GetTerritoriesRequest()                 | https://developer.genability.com/api-reference/tariff-api/territory/#get-a-list-of-territories             |
| getTerritory               | number                                          | https://developer.genability.com/api-reference/tariff-api/territory/#get-one-territory                     |
| **seasons**                |                                                 |                                                                                                            |
| getSeasonGroups            | new api.GetSeasonGroupsRequest()                | https://developer.genability.com/api-reference/tariff-api/season/#get-a-list-of-season-groups-for-an-lse   |
| **timeofuses**             |                                                 |                                                                                                            |
| getTimeOfUse               | number                                          | https://developer.genability.com/api-reference/tariff-api/time-of-use/#get-a-single-time-of-use-definition |
| getTimeOfUseGroup          | number,number                                   | https://developer.genability.com/api-reference/tariff-api/time-of-use/#get-a-time-of-use-group             |
| getTimeOfUseGroupIntervals | number,number                                   | https://developer.genability.com/api-reference/tariff-api/time-of-use/#get-a-groups-intervals              |
| getTimeOfUseGroups         | number                                          | https://developer.genability.com/api-reference/tariff-api/time-of-use/#get-a-tous-intervals                |
| **lookups**                |                                                 |                                                                                                            |
| getLookupValues            | new api.GetLookupsRequest() (optional)          | https://developer.genability.com/api-reference/tariff-api/lookup/#get-lookup-values                        |
| getPropertyLookupValues    | string , new api.GetLookupsRequest() (optional) | https://developer.genability.com/api-reference/tariff-api/lookup/#get-property-lookup-values               |
| getPropertyLookupStats     | string                                          | https://developer.genability.com/api-reference/tariff-api/lookup/#get-property-lookup-stats                |
| **typicals**               |                                                 |                                                                                                            |
| getBaselinesBest           | new api.GetBaselinesBestRequest()               | https://developer.genability.com/api-reference/shared-api/typical-baseline/#get-best-baseline              |