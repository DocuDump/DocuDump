import Settings from "@/app/(site)/home/settings";
import { shortenURL } from "@/app/actions/shortenurl";
import { useState, useEffect } from "react";
import CopyToClipboard from "@/app/(site)/home/logos/copytoclipboard";
import QRCode from "qrcode";

import { useFormState } from "react-dom";

export default function URLTab() {
    const currentDomain =
        typeof window !== "undefined" ? window.location.origin : "";
    const [shortcode, formAction] = useFormState(shortenURL, null);
    const [isCopied, setIsCopied] = useState(false);
    const [src, setSrc] = useState<string>("");

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000); // Reset copy status after 3 seconds so it disappears
    };

    const generate = () => {
        const url = String(currentDomain + "/" + shortcode?.message);
        QRCode.toDataURL(url).then(setSrc);
    };

    useEffect(() => {
        if (shortcode?.success) {
            generate();
        }
    }, [shortcode]);

    return (
        <form action={formAction}>
            <div className="mb-10">
                <label
                    htmlFor="original-url"
                    className="mb-1 ml-1.5 flex gap-2 text-sm font-medium text-gray-700"
                >
                    Original URL
                </label>
                <input
                    placeholder="https://your.very.long.url/..."
                    maxLength={256}
                    type="text"
                    name="original-url"
                    id="original-url"
                    className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
            </div>
            <div className="mb-8">
                <label
                    htmlFor="custom-url"
                    className="mb-1 ml-1.5 flex gap-2 text-sm font-medium text-gray-700"
                >
                    Custom URL
                    <span className="block text-sm font-medium text-gray-400">
                        Optional
                    </span>
                </label>

                <label
                    htmlFor="custom-url"
                    className="y-2.5 block rounded-l-md px-1 pb-1 pt-2 text-left text-gray-400 sm:hidden"
                >
                    docudump.url/
                </label>

                <div className="flex items-center rounded-md border">
                    <div className="hidden rounded-l-md border bg-gray-50 px-3 py-2.5 text-gray-400 sm:block">
                        docudump.url/
                    </div>
                    <input
                        maxLength={256}
                        type="text"
                        name="custom-url"
                        id="custom-url"
                        className="w-full rounded-r-lg border border-gray-300 bg-gray-50 bg-transparent p-2.5 pl-2 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    />
                </div>
            </div>
            <Settings />
            <button
                type="submit"
                className="mt-8 h-10 w-full rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:w-auto"
            >
                Shorten
            </button>
            {shortcode && (
                <div>
                    <>
                        {shortcode.success ? (
                            <div>
                                <button
                                    onClick={() =>
                                        copyToClipboard(
                                            `${currentDomain}/${shortcode.message}`,
                                        )
                                    }
                                    className="mt-5 h-10 rounded-lg border border-blue-500 bg-transparent px-5 py-2.5 text-sm font-medium text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white focus:outline-none"
                                >
                                    <CopyToClipboard />
                                    <span>{`${currentDomain}/${shortcode.message}`}</span>
                                </button>
                            </div>
                        ) : (
                            <p className="mt-6 text-3xl text-red-500">
                                {shortcode.message}
                            </p>
                        )}
                    </>
                    {isCopied && (
                        <span className="text-green-500">Copied!</span>
                    )}
                    {src && (
                        <div className="flex justify-center">
                            <img src={src} className="mt-4" />
                        </div>
                    )}
                </div>
            )}
        </form>
    );
}
