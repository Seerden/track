#!/bin/bash
cd ./docker && docker compose --file ./compose.prod.yml --env-file ../docker/.env up --force-recreate --no-build --remove-orphans