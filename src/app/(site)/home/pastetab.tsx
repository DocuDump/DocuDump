"use client";

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Settings from "@/app/(site)/home/settings";
import { LanguageKey } from "@/app/types";
import { languageOptions } from "@/app/constants";
import { uploadFile } from "@/app/actions/uploadfile";
import QRCode from "qrcode";
import CopyToClipboard from "@/app/(site)/home/logos/copytoclipboard";

function PasteTab() {
    const [shortcode, setShortcode] = useState<{
        success?: boolean;
        message?: string;
    }>({});
    const currentDomain =
        typeof window !== "undefined" ? window.location.origin : "";
    const [isCopied, setIsCopied] = useState(false);
    const [src, setSrc] = useState<string>("");
    const [currentText, setCurrentText] = useState("");
    const [language, setLanguage] = useState<LanguageKey>("plaintext");

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

    const languageFileExtensions: Record<LanguageKey, string> = {
        plaintext: "txt",
        python: "py",
        java: "java",
        javascript: "js",
        typescript: "ts",
        csharp: "cs",
        c: "c",
    };

    const languageTypes: Record<LanguageKey, string> = {
        plaintext: "text/plain",
        python: "text/x-python",
        java: "text/x-java",
        javascript: "text/javascript",
        typescript: "text/typescript",
        csharp: "text/x-csharp",
        c: "text/x-c",
    };

    const handleLanguageChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const newLanguage = event.target.value as LanguageKey;
        setLanguage(newLanguage);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        const fileContent = new Blob([currentText], {
            type: languageTypes[language],
        });

        formData.append(
            "file",
            fileContent,
            `paste.${languageFileExtensions[language]}`,
        );

        try {
            const response = await uploadFile(null, formData);
            setShortcode(response);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div className="text-right">
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm outline-none"
                    >
                        {Object.entries(languageOptions).map(
                            ([key, display]) => (
                                <option key={key} value={key}>
                                    {display}
                                </option>
                            ),
                        )}
                    </select>
                </div>

                <div>
                    <Editor
                        height="50vh"
                        defaultLanguage="plaintext"
                        language={language}
                        value={currentText} // Use the current text
                        onChange={(value) => {
                            // Check if the incoming value is not undefined before updating the state
                            if (value !== undefined) {
                                setCurrentText(value);
                            }
                        }}
                        theme="vs-light"
                        options={{
                            lineNumbers: "on",
                            scrollBeyondLastLine: false,
                            readOnly: false,
                            minimap: {
                                enabled: false,
                            },
                        }}
                        className="w-full rounded-sm border bg-gray-50 transition-colors duration-200"
                    />
                </div>
                <Settings />

                {currentText && (
                    <button className="h-10 w-full rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:w-auto">
                        Upload
                    </button>
                )}
            </div>
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

export default PasteTab;
