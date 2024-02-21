"use client"

import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

function Settings() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPasswordHidden, setPasswordHidden] = useState(true);

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

                {/* General inputs for custom settings, big picture/placeholder inputs for now*/}
                <div className="grid grid-cols-2 gap-8">

                    <div>
                        <label htmlFor="title" className="mb-1 ml-2 flex gap-2 text-sm font-medium text-gray-700">
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
                        <label htmlFor="paste-expiration" className="mb-1 ml-1.5 flex gap-2 text-sm font-medium text-gray-700">
                            Paste Expiration
                        </label>
                        <select
                            id="paste-expiration"
                            className="w-full bg-white rounded-lg border border-gray-300 p-2.5 text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        >
                            <option>Never</option>
                            <option>One Hour</option>
                            <option>One Day</option>
                            {/* Add options as needed */}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="paste-status" className="mb-1 ml-2 flex gap-2 text-sm font-medium text-gray-700">
                            Paste Status
                        </label>
                        <select
                            id="paste-status"
                            className="w-full rounded-lg border bg-white border-gray-300 p-2.5 text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        >
                            <option>Public</option>
                            <option>Private</option>
                            {/* Add options as needed */}
                        </select>
                    </div>

                    <div className="mb-12">
                        <label className="mb-1 ml-2 flex gap-2 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <button className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                                onClick={() => setPasswordHidden(!isPasswordHidden)}
                            >
                                {
                                    isPasswordHidden ? (
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>

                                    )
                                }
                            </button>
                            <input
                                type={isPasswordHidden ? "password" : "text"}
                                placeholder="Enter your password"
                                className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            />
                        </div>
                    </div >

                </div>
            </div>
        </div>
    )
}

export default Settings;
