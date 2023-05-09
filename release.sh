#! /bin/bash
build() {
    if [ ! -d "./_release/" ]; then
        mkdir -p ./_release/
    else
        rm -rf ./_release/
        mkdir -p ./_release/
    fi
    npm run build
    zip -j $1.zip ./dist/*
    mv ./$1.zip ./_release

}

build www
