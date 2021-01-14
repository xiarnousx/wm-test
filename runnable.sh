#!/bin/bash

# Basic Checks on Host prerqusites.

if [[ ! -x "$(command -v docker)" ]] 
then
    echo "Install Docker Client and Docker Engine. See readme.md prerequsites section."
    exit 0
fi

if [[ ! -x "$(command -v docker-compose)" ]] 
then
    echo "Install Docker Compose. See readme.md prerequsites section."
    exit 0
fi




# Fire Up the infrastructure as a deamon.
docker-compose up -d


