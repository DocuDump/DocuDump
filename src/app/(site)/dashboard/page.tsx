"use client";
import React, { useState } from "react";
import TableHeadCell from "../components/Table/headCell";
import TableBodyCell from "../components/Table/bodyCell";

const Dashboard = () => {
    //hard-coded pastes
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
        //Todo #10: Create view page for specifc paste. User can navigate there through this click
        alert(`Clicked on ${pasteName}`);
    };

    return (
        <div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <TableHeadCell width="40%" align="left">
                            Name
                        </TableHeadCell>
                        <TableHeadCell width="20%" align="center">
                            Type
                        </TableHeadCell>
                        <TableHeadCell width="20%" align="center">
                            Publication Date
                        </TableHeadCell>
                        <TableHeadCell width="20%" align="center">
                            Expiration Date
                        </TableHeadCell>
                    </tr>
                </thead>
                <tbody>
                    {pastes.map((paste, index) => (
                        <tr key={index}>
                            <TableBodyCell width="40%" align="left">
                                <a
                                    href="#"
                                    onClick={() => handlePasteClick(paste.name)}
                                >
                                    {paste.name}
                                </a>
                            </TableBodyCell>
                            <TableBodyCell width="20%" align="center">
                                {paste.type}
                            </TableBodyCell>
                            <TableBodyCell width="20%" align="center">
                                {paste.pub_date}
                            </TableBodyCell>
                            <TableBodyCell width="20%" align="center">
                                {paste.exp_date}
                            </TableBodyCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
