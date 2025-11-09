#!/bin/bash

# --- Set Defaults ---
SERVER_TAG="latest"
# Note: when we add more flags that end up as build env variables, 
#  add their defaults here

# parse flags
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -t)
            # Check if the next argument ($2) is empty or missing
            if [[ -z "$2" ]]; then
                echo "Error: Option -t requires an argument." >&2
                exit 1
            fi
            SERVER_TAG="$2"
            shift # consumes '-t'
            shift # consumes the tag value
            ;;

        # more flags here
        # e.g., a flag to build a different service
        # -s|--service)
        #    BUILD_TARGET="$2"
        #    shift 2
        #    ;;

        *)
            echo "Unknown parameter passed: $1"
            exit 1
            ;;
    esac
done

# --- Run Build ---
export SERVER_TAG
echo "Building server with tag: $SERVER_TAG"

cd ./docker && docker compose --file ./compose.build.yml build --no-cache