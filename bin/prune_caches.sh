#!/bin/bash

# this is npm context, because this script
# must running from app root

if [[ -d "./.cache" ]]; then
    echo "⚠️ Detecting old caches"
    sleep 1
    echo -e "\nDeleting...\n"

    rm -rf ./.cache && sleep 1 &&

    echo -e "✅ Cache clear\n"
    sleep 1
fi
