"use client";
import React, { useState } from "react";
import PasteTableHeadCell from "../components/Table/headCell";
import PasteTableBodyCell from "../components/Table/bodyCell";

const Dashboard = () => {
    const pastes = [
        {
            name: "First Paste",
            type: "PDF",
            pub_date: "02/17/2025",
            exp_date: "02/22/2025",
        },
        {
            name: "Second Paste",
            type: "Text",
            pub_date: "02/18/2025",
            exp_date: "02/23/2025",
        },
        {
            name: "Third Paste",
            type: "Link",
            pub_date: "02/19/2025",
            exp_date: "02/24/2025",
        },
        {
            name: "Fourth Paste",
            type: "IMG",
            pub_date: "02/20/2025",
            exp_date: "02/25/2025",
        },
    ];

    const handlePasteClick = (pasteName: String) => {
        alert(`Clicked on ${pasteName}`);
    };

    return (
        <div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <PasteTableHeadCell width="40%" align="left">
                            Name
                        </PasteTableHeadCell>
                        <PasteTableHeadCell width="20%" align="center">
                            Type
                        </PasteTableHeadCell>
                        <PasteTableHeadCell width="20%" align="center">
                            Publication Date
                        </PasteTableHeadCell>
                        <PasteTableHeadCell width="20%" align="center">
                            Expiration Date
                        </PasteTableHeadCell>
                    </tr>
                </thead>
                <tbody>
                    {pastes.map((paste, index) => (
                        <tr key={index}>
                            <PasteTableBodyCell width="40%" align="left">
                                <a
                                    href="#"
                                    onClick={() => handlePasteClick(paste.name)}
                                >
                                    {paste.name}
                                </a>
                            </PasteTableBodyCell>
                            <PasteTableBodyCell width="20%" align="center">
                                {paste.type}
                            </PasteTableBodyCell>
                            <PasteTableBodyCell width="20%" align="center">
                                {paste.pub_date}
                            </PasteTableBodyCell>
                            <PasteTableBodyCell width="20%" align="center">
                                {paste.exp_date}
                            </PasteTableBodyCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
