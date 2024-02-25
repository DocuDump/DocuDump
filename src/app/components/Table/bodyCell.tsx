import React, { CSSProperties, ReactNode } from "react";

interface TableBodyCellProps {
    width: string;
    align: CSSProperties["textAlign"];
    children: ReactNode;
}

function TableBodyCell({ width, align, children }: TableBodyCellProps) {
    return (
        <td
            style={{
                textAlign: align,
                padding: "1.5rem",
                borderBottom: "1px solid lightgray",
            }}
        >
            <div
                style={{
                    display: "inline-block",
                    width: width,
                }}
            >
                {children}
            </div>
        </td>
    );
}

export default TableBodyCell;
