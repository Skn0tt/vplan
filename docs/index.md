# vPlan

_vPlan_ serves as a viewing tool for _Untis_.  
It comes with a webinterface and an app.

## Getting Started

`vPlan` consists of two Docker images:

* [registry.gitlab.com/skn0tt/vplan/ui](https://gitlab.com/Skn0tt/vplan/container_registry)
* [registry.gitlab.com/skn0tt/vplan/api](https://gitlab.com/Skn0tt/vplan/container_registry)

You need to deploy them both so that they are available from the internet.

```sh
curl https://gitlab.com/Skn0tt/vplan/raw/master/docker-compose.yml > docker-compose.yml
docker-compose up
```

## Developing

1.  `yarn install && lerna bootstrap` to setup the dependencies
2.  `make dev` to start the containers
