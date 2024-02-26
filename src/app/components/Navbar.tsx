import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

function Navbar() {
    return (
        <nav className="inset-x-0 top-0 flex h-20 items-center justify-between bg-blue-500 text-white shadow-sm">
            <div className="px-4 md:px-8">
                {/* TODO - 20: Add a logo */}

                <Link
                    href="/home"
                    className="text-base font-semibold hover:text-gray-300 md:text-xl"
                >
                    DocuDump
                </Link>
            </div>
            <div className="flex items-center justify-between gap-2 md:gap-8">
                <Link
                    href="#"
                    className="rounded bg-white px-2 py-1.5 font-bold text-blue-500 hover:bg-blue-700 hover:text-gray-200 md:px-4 md:py-2"
                >
                    Log in
                </Link>
                <Link href="#" className=" hover:text-gray-200 ">
                    <IoSettingsSharp size="36" />
                </Link>
                <Link
                    href="/dashboard"
                    className="pr-3 hover:text-gray-200 md:pr-6 "
                >
                    <MdAccountCircle size="36" />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
