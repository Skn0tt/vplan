build: src
	cd ../.. && \
	docker build \
		-t registry.gitlab.com/skn0tt/vplan/vplan-ui \
		-f packages/ui/Dockerfile \
		.

run: build
	docker run -p 80:80 registry.gitlab.com/skn0tt/vplan/vplan-ui
