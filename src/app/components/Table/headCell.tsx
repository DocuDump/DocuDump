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
                    textAlign: align,
                    opacity: 0.8,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                }}
            >
                {children}
            </div>
        </th>
    );
}

export default PasteTableHeadCell;
