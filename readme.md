This project contains React UI and Node Backend connecting to elastic search 6.4.2

## Docker Elastic

### Prerequisites:
docker desktop

```sh
cd docker-compose-elasticsearch-kibana
docker-compose up -d
```

gets you elasticsearch running on localhost:9200 and kibana on localhost: 5601

## UI FOLDER

### `yarn install`
### `yarn start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Backend FOLDER

### `yarn install`
### `NODE_ENV=dev node index.js`
Open [http://localhost:8000/documentation#/](http://localhost:8000/documentation#/) to view swagger in the browser.



