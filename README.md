# vplan

> Etymology: _**V**ertretungs**plan**_, _German for "substitution table"_

* [Get Started](README.md#Get-Started)
* [Documentation](https://skn0tt.gitlab.io/vplan/)
* [Whitepaper (German)](paper/Paper.md)

_vplan_ is a viewing tool for [Untis](https://untis.at), a time-table-management-tool for schools.

It provides students and teachers with up-to-date information about their upcoming courses.

## Get Started

```sh
$ cat .env
HOST=localhost
LETSENCRYPT_EMAIL=your@email.com
SECRET=root

$ docker-compose up
```

Upload your Untis files at <http://localhost/admin>.
You'll now see your entries at one of these views:

* [/ ](http://localhost) (mobile)
* [/display](http://localhost/display) (big screen)
* [/teacher](http://localhost/teacher) (teachers' view)
* Mobile App (see below)

## Mobile App

There is a mobile app.
For Android, you can compile it yourself:

```sh
# Go to app dir
$ cd /packages/vplan-app

# Set Build Variables
$ export API_BASEURL=https://vplan.ema-vplan.de/api
$ export IMPRINT_URL=https://www.ema-bonn.de/index.php/service/neuigkeiten/350-impressum

# Start Compilation
$ yarn release:android
```

## Stack

The whole project is written in Typescript.
Backend: Express, Redis
Frontend: React, Redux
App: React Native
