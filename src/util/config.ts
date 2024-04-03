import path from "path";

let uploadDir;
if (process.env.DOCUDUMP_DATA_DIR) {
    uploadDir = path.join(process.env.DOCUDUMP_DATA_DIR, "uploads");
} else {
    uploadDir = path.join(process.cwd(), "uploads");
}

export const uploadDirectory = uploadDir;
