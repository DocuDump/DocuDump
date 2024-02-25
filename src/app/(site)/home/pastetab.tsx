"use client";

import React, { useState } from "react";
import Settings from "./settings";

function PasteTab() {
    const [pasteText, setPasteText] = useState("");
    const [syntaxHighlight, setSyntaxHighlight] = useState("None");

    // TODO: #14 - Add syntax highlighting and line numbers in textarea

    return (
        <div className="space-y-4">
            <div className="text-right">
                <select
                    value={syntaxHighlight}
                    onChange={(e) => setSyntaxHighlight(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm outline-none"
                >
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                </select>
            </div>

            <div>
                <textarea
                    id="message"
                    placeholder="Paste your content here..."
                    rows={12}
                    maxLength={1000}
                    onChange={(e) => {
                        setPasteText(e.target.value);
                    }}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 bg-transparent p-2.5 pl-2 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                ></textarea>
            </div>
            <Settings />

            <button className="h-10 w-full rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:w-auto">
                Upload
            </button>
        </div>
    );
}

export default PasteTab;
