"use server";

import { createShortcodeForURL, createCustomURL } from "@/db/index";

export async function shortenURL(
    prevState: { success?: boolean; message?: string } | null,
    formData: FormData,
): Promise<{ success?: boolean; message?: string }> {
    const originalURL = formData.get("original-url") as string;
    const customURL = formData.get("custom-url") as string;
    if (customURL) {
        return createCustomURL(originalURL, customURL);
    } else {
        return createShortcodeForURL(originalURL);
    }
}
