"use client";

import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import ClosedEyeLogo from "./logos/closedeye";
import OpenEye from "./logos/openeye";

function Settings() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPasswordHidden, setPasswordHidden] = useState(true);
    const [pasteStatus, setPasteStatus] = useState("public");

    // TODO: #15 - Add the initial custom setting features we want to include.
    return (
        <div className="w-full">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="mb-4 flex w-full cursor-pointer items-center justify-start py-2 text-left text-lg font-medium text-gray-700 hover:text-gray-900"
            >
                Custom Settings
                <span className="ml-3">
                    {isOpen ? (
                        <FaChevronUp className="h-5 w-5" />
                    ) : (
                        <FaChevronDown className="h-5 w-5" />
                    )}
                </span>
            </div>

            <div
                className={`transition-max-height duration-500 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"} overflow-hidden`}
            >
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <label
                            htmlFor="title"
                            className="mb-1 ml-2 flex gap-2 text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Paste Title"
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="paste-expiration"
                            className="mb-1 ml-1.5 flex gap-2 text-sm font-medium text-gray-700"
                        >
                            Paste Expiration
                        </label>
                        <select
                            id="paste-expiration"
                            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            style={{ fontFamily: "Montserrat, sans-serif" }}
                        >
                            <option>Never</option>
                            <option>One Hour</option>
                            <option>One Day</option>
                        </select>
                    </div>

                    <div>
                        <div className="mb-1 ml-2 flex gap-2 text-sm font-medium text-gray-700">
                            Paste Status
                        </div>
                        <div className="mb-1 ml-2 flex">
                            <label>
                                <input
                                    type="radio"
                                    name="pasteStatus"
                                    value="public"
                                    checked={pasteStatus === "public"}
                                    onChange={() => setPasteStatus("public")}
                                    className="mr-1"
                                />
                                Public
                            </label>
                        </div>
                        <div className="mb-1 ml-2 flex">
                            <label>
                                <input
                                    type="radio"
                                    name="pasteStatus"
                                    value="private"
                                    checked={pasteStatus === "private"}
                                    onChange={() => setPasteStatus("private")}
                                    className="mr-1"
                                />
                                Private
                            </label>
                        </div>
                    </div>

                    {pasteStatus === "private" && (
                        <div>
                            <label className="mb-1 ml-2 flex gap-2 text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 my-auto text-gray-400 active:text-gray-600"
                                    onClick={() =>
                                        setPasswordHidden(!isPasswordHidden)
                                    }
                                >
                                    {isPasswordHidden ? (
                                        <OpenEye />
                                    ) : (
                                        <ClosedEyeLogo />
                                    )}
                                </button>
                                <input
                                    type={
                                        isPasswordHidden ? "password" : "text"
                                    }
                                    placeholder="Enter your password"
                                    className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                    disabled={pasteStatus !== "private"} // Disable input for public paste
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;
