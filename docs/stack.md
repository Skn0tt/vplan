## API

API manages all data to serve to the clients.
It uses:

* Node.js
* Typescript
* Express

Data is stored in a [Redis](https://redis.io/) instance.

## UI

UI is the website that shows the data in the browser.
It is a [Progressive Web App](https://developers.google.com/web/progressive-web-apps/), so it can also be seen when offline.
It uses:

* React
* Redux
* Material-UI
* Workbox

## App

The App makes the data available on smartphones.
It is cross-platform.
It uses:

* React-Native
* Redux (shared with UI)
* React-Navigation
