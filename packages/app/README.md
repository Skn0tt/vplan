# vplanApp

[![Build status](https://build.appcenter.ms/v0.1/apps/45ab4ad0-2092-45bb-9835-9106294d3b59/branches/master/badge)](https://appcenter.ms)

Eine Vertretungsplan-App für das Ernst-Moritz-Arndt-Gymnasium Bonn.

Umgesetzt mit

* React Native
* Redux
* Microsoft App Center

# Algorithmus Items

URL: [http://vplanapp.ema-bonn.de/api?advanced_substitutes=true&type=json](http://vplanapp.ema-bonn.de/api?advanced_substitutes=true&type=json)

```js
const items = Immutable.fromJS(data)
  .delete("refresh_dateline")
  .toList();

console.log(items.toJS());
```
