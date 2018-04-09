IMAGE_TAG ?= registry.gitlab.com/skn0tt/vplan/api:master

build: src
	cd ../.. && \
	docker build \
		-t $(IMAGE_TAG) \
		-f packages/api/Dockerfile \
		.
