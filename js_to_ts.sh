#!/bin/bash

# for each file in the given directory, change the extension from ".js" to ".ts"
for file in $1/*.js; do
    mv "$file" "${file%.js}.ts"
done
