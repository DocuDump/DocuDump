"use client"

import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

function Settings() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="mt-8 w-full">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full cursor-pointer items-center justify-start py-2 text-left text-lg font-medium text-gray-700 hover:text-gray-900"
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
                <form className="rounded-md bg-white p-4 shadow">
                    <div className="mb-2">
                        <label
                            htmlFor="textInput"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Text Input
                        </label>
                        <input
                            type="text"
                            id="textInput"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                        />
                    </div>
                    <fieldset className="mb-4">
                        <legend className="text-sm font-medium text-gray-700">
                            Radio Buttons
                        </legend>
                        <div className="mb-2 flex items-center">
                            <input
                                id="option1"
                                name="options"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                                htmlFor="option1"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Option 1
                            </label>
                        </div>
                        <div className="mb-2 flex items-center">
                            <input
                                id="option2"
                                name="options"
                                type="radio"
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                                htmlFor="option2"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Option 2
                            </label>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default Settings;
