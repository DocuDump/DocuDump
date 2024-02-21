"use client";

import Settings from "./settings";
import { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";

function FileTab() {
    const [file, setFile] = useState<File | null>(null);

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

    return (
        <div>
            {/* Just here temporarily to make sure file upload works, will want to eventually replace with progress bar*/}
            <div className="mb-6 flex w-full justify-center">
                {file && (
                    <div
                        className={
                            "flex w-full max-w-md items-center justify-center gap-8"
                        }
                    >
                        <div className="flex items-center gap-4">
                            {file.size > 1000000000 ? (
                                <BsXCircle className="text-5xl text-red-500" />
                            ) : (
                                <BsCheckCircle className="text-5xl text-green-500" />
                            )}
                            <div>
                                <p className="w-56 truncate text-lg font-medium text-gray-900 dark:text-white">
                                    {file?.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {file
                                        ? `${(file.size / 1000000).toFixed(2)} MB`
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
                        <svg
                            aria-hidden="true"
                            className="mb-3 h-10 w-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                        </svg>
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
                        className="hidden"
                    />
                </label>
            </div>
            <Settings />
        </div>
    );
}

export default FileTab;
