"use server";

import { createFileUpload } from "@/db/index";
import { validateUploadFileFormData } from "@/util/formvalidation";
import { ZodError } from "zod";
import * as fs from "fs";
import * as crypto from "crypto";
import * as mime from "mime-types";
import path from "path";

export async function uploadFile(
    prevState: { success?: boolean; message?: string } | null,
    formData: FormData,
): Promise<{ success?: boolean; message?: string }> {
    let file;
    try {
        ({ file } = validateUploadFileFormData(formData));
    } catch (err) {
        if (err instanceof ZodError) {
            return {
                success: false,
                message: "ZodError: Form validation failed",
            };
        } else {
            throw err;
        }
    }

    const hash = crypto.createHash("sha256");
    const buffer = Buffer.from(await file.arrayBuffer());

    hash.update(buffer);
    const sha256 = hash.digest("hex");

    const dir = path.join(process.cwd(), "uploads", sha256.slice(0, 2));
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const mimeType = mime.contentType(file.name) || "application/octet-stream";

    await fs.promises.writeFile(path.join(dir, sha256), buffer);

    return createFileUpload(file.name, sha256, mimeType);
}
