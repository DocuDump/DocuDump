#!/bin/bash

set -uo pipefail

EXIT_CODE=0

error() {
    EXIT_CODE=1
}

cleanup() {
    if [ $EXIT_CODE -ne 0 ]; then
        echo
        echo "Exiting with errors."
    fi

    exit $EXIT_CODE
}

trap "error" ERR
trap "cleanup" EXIT

npm run compile

npm run lint

npm run prettier
