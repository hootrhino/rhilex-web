#!/bin/bash

build() {
    if [ ! -d "./_release/" ]; then
        mkdir -p ./_release/
    else
        rm -rf ./_release/
        mkdir -p ./_release/
    fi
    npm install --global yarn
    yarn install
    if yarn run build; then
        zip -j "www.zip" ./dist/* || { echo "Error: Failed to zip files."; exit 1; }
        mv "./www.zip" ./_release || { echo "Error: Failed to move zip file to _release directory."; exit 1; }
        echo "Build successful. Zip file is available in _release directory."
    else
        echo "Error: Failed to build project."
        exit 1
    fi
}

build
