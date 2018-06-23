IMAGE_TAG ?= registry.gitlab.com/skn0tt/vplan/ui:master

build: src
	cd ../.. && \
	docker build \
		-t $(IMAGE_TAG) \
		-f packages/vplan-ui/Dockerfile \
		.

run: build
	docker run -p 80:80 registry.gitlab.com/skn0tt/vplan/ui
