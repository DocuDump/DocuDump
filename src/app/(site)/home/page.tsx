"use client";

import React, { useState } from "react";
import FileTab from "./filetab";
import PasteTab from "./pastetab";
import URLTab from "./urltab";

function Home() {
    const [activeTab, setActiveTab] = useState("File");

    const changeTab = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div className="mx-auto w-4/6 max-w-screen-lg">
                <div className=" text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    <ul className="mb-12 flex flex-wrap gap-10">
                        {["File", "Paste", "URL"].map((tab) => (
                            <li key={tab} className="me-2">
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent the link from navigating
                                        changeTab(tab);
                                    }}
                                    className={`inline-block rounded-t-lg border-b-2 p-4 text-xl ${activeTab === tab ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500" : "border-transparent text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-100"}`}
                                >
                                    {tab}
                                </a>
                            </li>
                        ))}
                    </ul>
                    {activeTab === "File" && <FileTab />}
                    {activeTab === "Paste" && <PasteTab />}
                    {activeTab === "URL" && <URLTab />}
                </div>
            </div>
        </div>
    );
}

export default Home;
