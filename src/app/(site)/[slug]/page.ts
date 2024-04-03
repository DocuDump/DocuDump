import { notFound, redirect } from "next/navigation";
import { queryShortcode } from "@/db";

export default async function ShortcodeHandler({
    params,
}: {
    params: { slug: string };
}) {
    const result = queryShortcode(params.slug);

    if (result.redirect) {
        redirect(result.redirect.redirect_url);
    } else if (result.file) {
        // TODO: handle result.file
    } else {
        notFound();
    }
}
