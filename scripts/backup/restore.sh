#!/bin/bash

# Source the .env file for environment variables
source ./docker/.env 

# Get the filename from the first argument
filename=$1

# Check if a filename was provided
if [ -z "$filename" ]; then
  echo "Usage: $0 <backup_filename>"
  exit 1
fi

# uses docker volume mount point
CONTAINER_BACKUP_PATH="psql-backups/$filename" # Adjust this based on your volume mount point
# uses local path
LOCAL_BACKUP_PATH="./docker/database-backup/$filename"

# Execute psql inside the Docker container to restore the database
# Note: The -f option for psql reads from a file.
echo "Restoring $filename to $PG_DB using psql..."

# note: since we're running this inside the container, use localhost, not the PG_HOST
docker exec \
   track-database \
   bash -c "pg_restore -h localhost -p $PG_PORT -U $PG_USER -d $PG_DB -F t --clean < $CONTAINER_BACKUP_PATH"

#   -f "$CONTAINER_BACKUP_PATH" \
if [ $? -eq 0 ]; then
  echo "Database restoration completed successfully."
else
  echo "Error: Database restoration failed."
  exit 1
fi