build: src
	yarn build
	cker build \
		-t registry.gitlab.com/skn0tt/vplan/vplan-ui \
		.

run: build
	docker run -p 80:80 registry.gitlab.com/skn0tt/vplan/vplan-ui
