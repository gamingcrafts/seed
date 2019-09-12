This project contains React UI and Node Backend connecting to elastic search 6.4.2

## UI

### `yarn install`
### `yarn start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Backend

### `yarn install`
### `NODE_ENV=dev node index.js`
Open [http://localhost:8000/documentation#/](http://localhost:8000/documentation#/) to view swagger in the browser.

## Elastic Search

### `docker pull docker.elastic.co/elasticsearch/elasticsearch:6.4.2`
### `docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.4.2`

Latest Branch release6