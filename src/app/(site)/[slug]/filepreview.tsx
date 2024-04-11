"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FileEntry } from "@/db";

interface FilePreviewProps {
    file: FileEntry;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
    const { slug } = useParams();

    console.log(file.mime_type);
    switch (file.mime_type.split("/")[0]) {
        case "text":
        case "application":
            return (
                <div>
                    <h2>{file.file_name}</h2>
                    <iframe
                        src={`/raw/${slug}`}
                        width="75%"
                        height="500"
                        frameBorder="0"
                        title={file.file_name}
                    />
                </div>
            );
        case "image":
            return (
                <div>
                    <h2>{file.file_name}</h2>
                    <img
                        src={`/raw/${slug}`}
                        alt={file.file_name}
                        width="75%"
                    />
                </div>
            );
        case "video":
            return (
                <div>
                    <h2>{file.file_name}</h2>
                    <video controls width="100%">
                        <source src={`/raw/${slug}`} type={file.mime_type} />
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        default:
            return (
                <div>
                    <h2>{file.file_name}</h2>
                    <p>Unable to preview this file type.</p>
                </div>
            );
    }
};

export default FilePreview;
