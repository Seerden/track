#!/bin/bash
source ./docker/.env 
timestamp=$(date +%Y%m%d_%H%M%S)
# use -F c -b for custom format (then we need to use pg_restore)
docker exec -e PGPASSWORD=$PG_PASS track-database pg_dump -F t -b -p $PG_PORT -U $PG_USER -d $PG_DB > ./docker/database-backup/dump_$timestamp.tar