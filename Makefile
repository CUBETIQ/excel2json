DOCKER_IMAGE=cubetiq/excel2json

build:
	@echo "Building docker image..."
	docker build . -t ${DOCKER_IMAGE}
	docker push ${DOCKER_IMAGE}

run:
	@echo "Running container..."
	docker run --rm -t ${DOCKER_IMAGE}

.PHONY: build
