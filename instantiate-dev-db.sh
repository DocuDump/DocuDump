#!/bin/bash

set -euo pipefail

npx dbmate --env-file "dbmate.env" up

sqlite3 db.sqlite3 < ./src/db/dev-db.sql
