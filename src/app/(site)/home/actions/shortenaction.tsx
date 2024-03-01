"use server";

import { createShortcodeForURL } from "@/db/index";

export async function handleFormSubmit(prevState: any, formData: any) {
    const originalURL = formData.get("original-url");
    const customURL = formData.get("custom-url");
    const result = await createShortcodeForURL(originalURL);
    return { message: result };
}
