DOCKER_IMAGE=cubetiq/node-excel2json

build:
	@echo "Building docker image..."
	docker build . -t ${DOCKER_IMAGE}

run:
	@echo "Running container..."
	docker run --rm -t ${DOCKER_IMAGE}

.PHONY: build
