dev: build-docker
	docker-compose \
		-f docker-compose.yml \
		-f docker-compose.dev.yml \
		up

prod: build-docker
	docker-compose \
		-f docker-compose.yml \
		-f docker-compose.prod.yml \
		up

up: build-docker
	docker-compose \
		-f docker-compose.yml \
		-f docker-compose.dev.yml \
		up

build: vplan-api vplan-ui vplan-app

build-docker: vplan-api vplan-ui

vplan-api:
	$(MAKE) -C packages/api build

vplan-ui:
	$(MAKE) -C packages/ui build

vplan-app:
	$(MAKE) -C packages/app build
