"use client";
import React, { useState } from "react";

const Dashboard = () => {
    //hard-coded pastes
    const pastes = [
        {
            title: "First Paste",
            type: "PDF",
            pub_date: "02/17/2025",
            exp_date: "02/22/2025",
        },
        {
            title: "Second Paste",
            type: "Text",
            pub_date: "02/18/2025",
            exp_date: "02/23/2025",
        },
        {
            title: "Third Paste",
            type: "Link",
            pub_date: "02/19/2025",
            exp_date: "02/24/2025",
        },
        {
            title: "Fourth Paste",
            type: "IMG",
            pub_date: "02/20/2025",
            exp_date: "02/25/2025",
        },
    ];

    const handlePasteClick = (pasteName: string) => {
        //Todo #10: Create view page for specifc paste. User can navigate there through this click
        alert(`Clicked on ${pasteName}`);
    };

    return (
        <div>
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3"
                            style={{ width: "40%" }}
                        >
                            Title
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3"
                            style={{ width: "10%" }}
                        >
                            Type
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3"
                            style={{ width: "25%" }}
                        >
                            Publication Date
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3"
                            style={{ width: "25%" }}
                        >
                            Expiration Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pastes.map((paste, index) => (
                        <tr
                            key={index}
                            className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                        >
                            <td
                                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                style={{ width: "40%" }}
                            >
                                <a
                                    href="#"
                                    onClick={() =>
                                        handlePasteClick(paste.title)
                                    }
                                    className="hover:underline"
                                >
                                    {paste.title}
                                </a>
                            </td>
                            <td className="px-6 py-4" style={{ width: "10%" }}>
                                {paste.type}
                            </td>
                            <td className="px-6 py-4" style={{ width: "25%" }}>
                                {paste.pub_date}
                            </td>
                            <td className="px-6 py-4" style={{ width: "25%" }}>
                                {paste.exp_date}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
