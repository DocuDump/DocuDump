"use client";

import Settings from "./settings";
import { useState, useEffect } from "react";
import FileUploadLogo from "./logos/fileupload";
import { uploadFile } from "@/app/actions/uploadfile";
import { useFormState } from "react-dom";
import CopyToClipboard from "@/app/(site)/home/logos/copytoclipboard";
import QRCode from "qrcode";

function FileTab() {
    const currentDomain =
        typeof window !== "undefined" ? window.location.origin : "";
    const [isCopied, setIsCopied] = useState(false);
    const [src, setSrc] = useState<string>("");
    const [shortcode, formAction] = useFormState(uploadFile, null);

    const [file, setFile] = useState<File | null>(null);

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    function formatFileSizeInMiB(bytes: number) {
        const bytesPerMiB = 1000 * 1000;
        return (bytes / bytesPerMiB).toFixed(2);
    }

    return (
        <form action={formAction}>
            <div className="mb-6 flex w-full justify-center">
                {file && (
                    <div
                        className={
                            "flex w-full max-w-md items-center justify-center gap-8"
                        }
                    >
                        <div className="flex items-center gap-4">
                            <div>
                                <p className="w-96 truncate text-lg font-medium text-gray-900 dark:text-white">
                                    {file?.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {file
                                        ? `${formatFileSizeInMiB(file.size)} MB`
                                        : null}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="mb-8"
            >
                <label
                    htmlFor="dropzone-file"
                    className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
                >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <FileUploadLogo />
                        <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                    </div>
                    <input
                        onChange={handleFileChange}
                        id="dropzone-file"
                        type="file"
                        name="file"
                        className="hidden"
                    />
                </label>
            </div>
            {file && (
                <button className="h-10 w-full rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:w-auto">
                    Upload
                </button>
            )}
            <Settings />
            {shortcode && (
                <div>
                    <p
                        className={`mt-6 text-3xl ${shortcode.success ? "" : "text-red-500"}`}
                    >
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
                    </p>
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

export default FileTab;
