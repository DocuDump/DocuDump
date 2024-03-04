import Link from "next/link";
import { IoLogoGithub } from "react-icons/io";
import { FaDiscord } from "react-icons/fa";

function Footer() {
    return (
        <div>
            <hr className="h-px border-0 bg-gray-200"></hr>
            <div className="inset-x-0 bottom-0 flex h-20 items-center justify-between bg-white text-base text-gray-400 shadow-sm">
                <div className="pl-8 pr-4">
                    <p>DocuDump</p>
                </div>
                <div className="flex items-center">
                    <Link
                        href="https://docudump.github.io/"
                        className="hover:underline"
                    >
                        Docs
                    </Link>
                    <Link
                        href="https://github.com/DocuDump/DocuDump"
                        className="pl-4 hover:text-gray-300 md:pl-8"
                    >
                        <IoLogoGithub size="24" />
                    </Link>
                    <Link
                        href="https://discord.gg/Q8RquBKm2F"
                        className="px-4 hover:text-gray-300 md:px-10"
                    >
                        <FaDiscord size="24" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;
