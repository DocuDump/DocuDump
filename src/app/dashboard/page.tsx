import React from "react";
import PasteTableHeadCell from "./Table/headCell";
import PasteTableBodyCell from "./Table/bodyCell";
import "./Dashboard.css";

const Dashboard = () => {
    const pastes = [
        { name: "First Paste", pub_date: "02/17/2025", exp_date: "02/22/2025" },
        {
            name: "Second Paste",
            pub_date: "02/18/2025",
            exp_date: "02/23/2025",
        },
        { name: "Third Paste", pub_date: "02/19/2025", exp_date: "02/24/2025" },
        {
            name: "Fourth Paste",
            pub_date: "02/20/2025",
            exp_date: "02/25/2025",
        },
    ];

    return (
        <div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <PasteTableHeadCell width="30%" align="left">
                            Name
                        </PasteTableHeadCell>
                        <PasteTableHeadCell width="30%" align="center">
                            Publication Date
                        </PasteTableHeadCell>
                        <PasteTableHeadCell width="30%" align="right">
                            Expiry Date
                        </PasteTableHeadCell>
                    </tr>
                </thead>
                <tbody>
                    {pastes.map((paste, index) => (
                        <tr key={index}>
                            <PasteTableBodyCell width="30%" align="left">
                                {paste.name}
                            </PasteTableBodyCell>
                            <PasteTableBodyCell width="30%" align="center">
                                {paste.pub_date}
                            </PasteTableBodyCell>
                            <PasteTableBodyCell width="30%" align="right">
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
