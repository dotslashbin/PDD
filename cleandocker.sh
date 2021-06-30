#!/bin/sh
docker system prune -f && docker network prune -f && docker volume prune -f
