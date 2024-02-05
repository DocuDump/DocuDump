#!/usr/bin/env sh

migrations() {
    echo "Applying database migrations..."

    /app/node_modules/@dbmate/linux-x64/bin/dbmate up
}

ensure_permissions() {
    echo "Applying correct permissions..."

    chown -R nextjs:nodejs /data
}

echo "DocuDump docker container starting..."

migrations

ensure_permissions

su-exec nextjs node /app/server.js
