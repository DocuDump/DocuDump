import { notFound, redirect } from "next/navigation";
import { queryShortcode } from "@/db";
import FilePreview from "@/app/(site)/[slug]/filepreview";

export default async function ShortcodeHandler({
    params,
}: {
    params: { slug: string };
}) {
    const result = queryShortcode(params.slug);

    if (result.redirect) {
        redirect(result.redirect.redirect_url);
    } else if (result.file) {
        return <FilePreview file={result.file} />;
    } else {
        return notFound();
    }
}
