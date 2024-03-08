"use server";

import { validateUploadFileFormData } from "@/util/formvalidation";
import { ZodError } from "zod";
import * as fs from "fs";
import path from "path";

export async function uploadFile(
    prevState: {} | null,
    formData: FormData,
): Promise<{}> {
    console.dir(formData);
    let file;
    try {
        ({ file } = validateUploadFileFormData(formData));
    } catch (err) {
        if (err instanceof ZodError) {
            // TODO make this handle state with an error
            return {};
        } else {
            throw err;
        }
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const dir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    await fs.promises.writeFile(path.join(dir, file.name), buffer);
    console.log(process.cwd());

    return {};
}
