#!/bin/bash
mkdir -p frontend/kucukdevapi
cat openapi.json | jq '. + {servers: [{url: "http://localhost:8000"}]}'  |  jq '. + {info:{title: "kucukdevapi", version: "1.0.0"}}'> frontend/kucukdevapi/openapi.json
docker run -u $(id -u):$(id -g) --rm -v $(pwd)/frontend/kucukdevapi:/local/ openapitools/openapi-generator-cli generate -i /local/openapi.json -g javascript -o /local/
cd frontend/kucukdevapi && npm install && npm pack