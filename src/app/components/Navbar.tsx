import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

function Navbar() {
    return (
        <nav className="inset-x-0 top-0 flex h-20 items-center justify-between bg-blue-500 text-white shadow-sm">
            <div className="pl-8">
                {/* TODO - 20: Add a logo */}

                <Link
                    href="/home"
                    className="text-xl font-semibold hover:text-gray-300"
                >
                    DocuDump
                </Link>
            </div>
            <div className="flex items-center">
                <Link
                    href="#"
                    className="rounded bg-white px-4 py-2 font-bold text-blue-500 hover:bg-blue-700 hover:text-gray-200"
                >
                    Log in
                </Link>
                <Link href="#" className="pl-4 hover:text-gray-200 md:pl-10">
                    <IoSettingsSharp size="36" />
                </Link>
                <Link
                    href="/dashboard"
                    className="px-4 hover:text-gray-200 md:px-10"
                >
                    <MdAccountCircle size="36" />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
