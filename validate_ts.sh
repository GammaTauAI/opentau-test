#!/bin/bash

# create a new array to hold the list of files that are not valid
INVALID_FILES=()

# for each files in the given directory
for file in $1/*
do
    # run tsc --allowJs --checkJs --noEmit -t es2022 on the file
    OUTCODE=$(tsc --allowJs --checkJs --noEmit -t es2022 $file 2>&1 >/dev/null)

    # if the exit code is not 0, then the file is not valid
    if [ $? -ne 0 ]; then
        # add the file to the list of invalid files
        INVALID_FILES+=($file)
    fi
done

# print out the list of invalid files
for file in ${INVALID_FILES[@]}
do
    echo $file
done
