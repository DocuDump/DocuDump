"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Settings from "./settings";
import { LanguageKey } from "@/app/types";
import { languageOptions } from "@/app/constants";

function PasteTab() {
    const [currentText, setCurrentText] = useState(""); // Holds the current text
    const [language, setLanguage] = useState<LanguageKey>("plaintext");

    const handleLanguageChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const newLanguage = event.target.value as LanguageKey;
        setLanguage(newLanguage);
    };

    return (
        <div className="space-y-4">
            <div className="text-right">
                <select
                    value={language}
                    onChange={handleLanguageChange}
                    className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm outline-none"
                >
                    {Object.entries(languageOptions).map(([key, display]) => (
                        <option key={key} value={key}>
                            {display}
                        </option>
                    ))}
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

            <button className="h-10 w-full rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:w-auto">
                Upload
            </button>
        </div>
    );
}

export default PasteTab;
