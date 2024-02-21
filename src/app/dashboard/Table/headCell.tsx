// PasteTableHeadCell.jsx
import React, { CSSProperties, ReactNode } from "react";

interface PasteTableHeadCellProps {
    width: string;
    align: CSSProperties["textAlign"];
    children: ReactNode;
}

function PasteTableHeadCell({
    width,
    align,
    children,
}: PasteTableHeadCellProps) {
    return (
        <th
            style={{
                width,
                padding: "1.5rem",
                textAlign: align,
                borderBottom: "1px solid lightgray",
            }}
        >
            <div
                style={{
                    position: "relative",
                    textAlign: align,
                    color: "secondary",
                    opacity: 0.7,
                    fontSize: "xxs",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    cursor: "default",
                    userSelect: "auto",
                }}
            >
                {children}
            </div>
        </th>
    );
}

export default PasteTableHeadCell;
