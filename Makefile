up: build-docker
	docker-compose up

build: vplan-api vplan-ui vplan-app

build-docker: vplan-api vplan-ui

vplan-api:
	$(MAKE) -C packages/api build

vplan-ui:
	$(MAKE) -C packages/ui build

vplan-app:
	$(MAKE) -C packages/app build
