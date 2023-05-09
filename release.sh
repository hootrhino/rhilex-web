#! /bin/bash
build() {
    if [ ! -d "./_release/" ]; then
        mkdir -p ./_release/
    else
        rm -rf ./_release/
        mkdir -p ./_release/
    fi
    yarn run build
    zip -j $1.zip ./dist/*
    mv ./$1.zip ./_release
}
#--
npm install --global yarn
yarn
build www
