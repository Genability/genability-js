# Genability Javascript SDK

This SDK enables faster integration of the Genability APIs into your Node.js, React, Angular, Web Browser and other Javascript compatible applications.

![Node.js CI](https://github.com/Genability/genability-js/workflows/Node.js%20CI/badge.svg)

## Table of Contents

1. [Basic web front end use](#web-frontend-use)
2. [Basic npm usage](#npm-use)
3. [NodeJS backend proxy example](#backend-proxy)
4. [Maven Plugin for NodeJS](#maven-plugin)


## Integrations
### <a name="web-frontend-use"></a>Basic web front end use:

#### Include the library with a script tag:
~~~html
<script src="/@genability/api/dist/main.js"></script>
~~~

#### Instantiate Genability API Client
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
app.use('/genability-api', createProxyMiddleware({
    target: 'https://api.genability.com',
    changeOrigin: true,
    onProxyReq: function (proxyReq) {
        proxyReq.setHeader('Authorization', 'genabilityAuthString');
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
