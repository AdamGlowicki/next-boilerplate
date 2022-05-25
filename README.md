# Merix Next.js boilerplate

## Usage
Clone this repo and copy all files and directories except .git folder to new project folder


## Coding guidelines
Detailed Merixstudio coding guidelines can be found [here](https://merixstudio.atlassian.net/wiki/spaces/DEV/pages/37847427/JavaScript)

## Tools and technologies used in this project:

- [Next.js](https://nextjs.org/)
- [styled-components](https://styled-components.com/)
- [Yarn](https://yarnpkg.com/lang/en/)

## Getting started

### Installing Node.js

Node.js can be downloaded [here](https://nodejs.org/).

Please be sure you have Node.js and npm (node package manager that comes along with Node) in your OS enviroment path so it can be run from command line interface.

#### Installing Yarn

To manage dependencies please use Yarn that can be downloaded [here](https://yarnpkg.com/lang/en/).


#### Dependencies

To install all required local dependencies mentioned above run this command in the project root (where `package.json` file is located):

```
yarn install
```

This will install all the required modules in the `node_modules` folder. This folder is not versioned and has to be installed manually by everyone working on the project.

### Running

To start development server simply run:

```
yarn dev
```

## Building

To build the application for production usage run:

```
yarn build
```

Then to start the Next.js production server using that build run:

```
yarn start
```


## Folder structure

```
├── .chart/              * this is a a package to be used with Helm to configure Kubernetes
├── .next/               * contains the built project
├── app/
|   ├──common            * contains common components used accross different pages
|   ├──routes            * contains folders grouping containers and components by pages
|   ├──store             * contains the Redux store - configuration, actions, reducers and selectors
|   ├──themes            * contains the styled-components style themes
|   ├──utils             * contains utility functions - helpers, JWT and request configuration
├── docker/              * contains configuration files for Docker
├── pages/               * contains Next.js pages which are React Components associated with a route based on their file name
```

## Docker

### Development usage
To build docker image use command
```
docker-compose -f dev.yml build
```
After docker build finishes successfully, run image by command
```
docker-compose -f dev.yml up
```
To open your app use [http://localhost:3000](http://localhost:3000) (also works on your local ip)
