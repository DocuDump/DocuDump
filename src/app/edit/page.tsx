"use client";
import React, { useState, useEffect } from "react";

interface PasteData {
    [key: string]: string;
}

const Edit = () => {
    const [pasteData, setPasteData] = useState<PasteData>({});

    //change labels when we decide on all editable atttributes of paste
    const labels = {
        title: "Title",
        type: "Type",
        pub_date: "Publication Date",
        exp_date: "Experation Date",
    };

    //here will be the logic to get the specific paste to view/edit, for now it is hard coded data
    const paste = {
        title: "Example Paste",
        type: "PDF",
        pub_date: "02/17/2025",
        exp_date: "02/22/2025",
    };

    useEffect(() => {
        setPasteData(paste);
    }, []);

    const handleInputChange = (label: string, value: string) => {
        setPasteData({
            ...pasteData,
            [label]: value,
        });
    };

    return (
        <form className="mx-auto" style={{ width: "80%" }}>
            <div className="mt-5 grid grid-cols-2 gap-4">
                {Object.entries(labels).map(([key, labelText]) => (
                    <div className="mb-5" key={key}>
                        <label
                            htmlFor={key}
                            className="mb-1 ml-2 flex gap-2 text-sm font-medium text-gray-700"
                        >
                            {labelText}
                        </label>
                        <input
                            type="text"
                            id={key}
                            value={pasteData[key] || ""}
                            onChange={(e) =>
                                handleInputChange(key, e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            placeholder={`Enter ${labelText}`}
                            required
                        />
                    </div>
                ))}
            </div>
            <div className="mt-5 flex justify-center">
                <button className="mx-auto h-10 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default Edit;
