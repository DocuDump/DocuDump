"use client";

import Settings from "./settings";
import React, { useState } from "react";

function URLTab() {
    const [originalURL, setOriginalURL] = useState("");
    const [customURL, setCustomURL] = useState("");

    return (
        <div>
            <div className="mb-10">
                <label
                    htmlFor="context"
                    className="mb-1 ml-2 flex gap-2 text-sm font-medium text-gray-900"
                >
                    Original URL
                </label>
                <input
                    onChange={(e) => setOriginalURL(e.target.value)}
                    placeholder="https://your.very.long.url/..."
                    maxLength={256}
                    type="text"
                    id="context"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <div>
                <label
                    htmlFor="context"
                    className="mb-1 ml-2 flex gap-2 text-sm font-medium text-gray-900"
                >
                    Custom URL
                    <span className="mb-2 block text-sm font-medium text-gray-400">
                        Optional
                    </span>
                </label>
                <input
                    onChange={(e) => setCustomURL(e.target.value)}
                    placeholder="docudump.url/"
                    maxLength={256}
                    type="text"
                    id="context"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
            <Settings />

            <button className="h-10 w-full rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:w-auto">
                Shorten
            </button>
        </div>
    );
}

export default URLTab;
