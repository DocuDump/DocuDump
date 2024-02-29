# DocuDump

DocuDump is a self hosted pastebin and URL shortener focused on simplicity and extensibility while also supporting multi-user environments.

## Getting Started - Local Development

First, ensure you have Node.js v18+ and sqlite3 installed.

Then, install dependencies, initialize a dev db, and start the app:

```bash
npm install
./instantiate-dev-db.sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Docker

A Docker image built on the main branch is available at `ghcr.io/docudump/docudump:main`. The container will have persistent storage if a volume is mounted at `/data` within the container.
