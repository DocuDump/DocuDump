import React, { CSSProperties, ReactNode } from "react";

interface TableHeadCellProps {
    width: string;
    align: CSSProperties["textAlign"];
    children: ReactNode;
}

function TableHeadCell({ width, align, children }: TableHeadCellProps) {
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

export default TableHeadCell;
