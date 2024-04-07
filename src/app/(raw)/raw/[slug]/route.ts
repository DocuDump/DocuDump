import { queryShortcode } from "@/db";
import { notFound, redirect } from "next/navigation";
import * as fs from "fs";
import * as config from "@/util/config";
import path from "path";
import { ReadableOptions } from "stream";

function streamFile(
    filePath: string,
    options?: ReadableOptions,
): ReadableStream<Uint8Array> {
    const downloadStream = fs.createReadStream(filePath, options);

    return new ReadableStream({
        start(controller) {
            downloadStream.on("data", (chunk: Buffer) =>
                controller.enqueue(new Uint8Array(chunk)),
            );
            downloadStream.on("end", () => controller.close());
            downloadStream.on("error", (error: NodeJS.ErrnoException) => {
                controller.error(error);
            });
        },
        cancel() {
            downloadStream.destroy();
        },
    });
}

export async function GET(
    request: Request,
    { params }: { params: { slug: string } },
): Promise<Response> {
    const result = queryShortcode(params.slug);

    if (result.redirect) {
        redirect(result.redirect.redirect_url);
    } else if (result.file) {
        const filePath = path.join(
            config.uploadDirectory,
            result.file.sha256.slice(0, 2),
            result.file.sha256,
        );

        // Ensure file exists and is readable
        try {
            fs.accessSync(filePath, fs.constants.F_OK | fs.constants.R_OK);
        } catch (e) {
            console.error(e);
            return new Response(null, { status: 500 });
        }

        const stream = streamFile(filePath);

        return new Response(stream, {
            headers: new Headers({
                "Content-Type": result.file.mime_type,
                "Content-Disposition": `inline; filename="${result.file.file_name}"`,
            }),
        });
    } else {
        notFound();
    }
}
