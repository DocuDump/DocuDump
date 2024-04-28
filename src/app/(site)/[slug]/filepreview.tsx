"use client";

import { useParams } from "next/navigation";
import { FileEntry } from "@/db";
import Link from "next/link";

const FilePreview: React.FC<{ file: FileEntry }> = ({ file }) => {
    const { slug } = useParams();
    const isZip = file.mime_type === "application/zip";
    const isWord = file.mime_type === "application/msword";
    const isExcel = file.mime_type === "application/vnd.ms-excel" || file.mime_type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const isPowerPoint = file.mime_type === "application/vnd.ms-powerpoint" || file.mime_type === "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    const isRAR = file.mime_type === "application/x-rar-compressed";
    const isTar = file.mime_type === "application/x-tar";
    const is7z = file.mime_type === "application/x-7z-compressed";
    const isExecutable = file.mime_type === "application/octet-stream" || file.mime_type === "application/x-msdownload" || file.mime_type === "application/x-executable" || file.mime_type === "application/x-msdos-program";

    return (
        <>
            <div className="mx-auto flex max-w-[90%] flex-col items-center justify-center">
                <h2 className="my-4 text-2xl font-bold">Slug: {slug}</h2>
                {file.mime_type.startsWith("text") ||
                file.mime_type.startsWith("application") ? (
                    isZip || isWord || isExcel || isPowerPoint || isRAR || isTar || is7z || isExecutable ? (
                        <p>Unable to preview this file type.</p>
                    ) : (
                        <iframe
                            src={`/raw/${slug}`}
                            className="w-full max-w-[800px] border-2"
                            height="500"
                            title={file.file_name}
                        />
                    )
                    
                ) : file.mime_type.startsWith("image") ? (
                    <img
                        src={`/raw/${slug}`}
                        alt={file.file_name}
                        className="w-full max-w-[800px]"
                    />
                ) : file.mime_type.startsWith("video") ? (
                    <video controls className="w-full max-w-[800px]">
                        <source src={`/raw/${slug}`} type={file.mime_type} />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <p>Unable to preview this file type.</p>
                )}
            </div>
            <div className="mx-auto flex max-w-[90%] flex-col items-center justify-center pt-14">
                <Link
                    href={`/raw/${slug}`}
                    className="rounded bg-blue-500 px-1.5 py-4 text-sm font-bold text-white hover:bg-blue-700 hover:text-gray-200 md:px-4 md:py-2 md:text-lg"
                >
                    Download {file.file_name}
                </Link>
            </div>
        </>
    );
};

export default FilePreview;
