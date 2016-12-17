#!/usr/bin/env bash
echo "[ ] Compiling Static ..."

PUBLIC_PATH="/${PROJECT_NAME}" npm run build:prod

echo "[ ] Static is compiled ..."
