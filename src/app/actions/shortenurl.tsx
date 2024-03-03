"use server";

import { createShortcodeForURL } from "@/db/index";

export async function shortenURL(prevState: string | null, formData: FormData) {
    const originalURL = formData.get("original-url") as string;
    // TODO #33 - add custom URL support
    // const customURL = formData.get("custom-url");
    const result = createShortcodeForURL(originalURL);
    return result;
}
