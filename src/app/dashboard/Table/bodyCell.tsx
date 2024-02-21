// PasteTableBodyCell.jsx
import React, { CSSProperties, ReactNode } from "react";

interface PasteTableBodyCellProps {
    width: string;
    align: CSSProperties["textAlign"];
    children: ReactNode;
}

function PasteTableBodyCell({
    width,
    align,
    children,
}: PasteTableBodyCellProps) {
    return (
        <td
            style={{
                textAlign: align,
                padding: "1.5rem",
                fontSize: "1rem",
                borderBottom: "1px solid lightgray",
            }}
        >
            <div
                style={{
                    display: "inline-block",
                    width: width,
                    color: "text",
                    verticalAlign: "middle",
                }}
            >
                {children}
            </div>
        </td>
    );
}

export default PasteTableBodyCell;
