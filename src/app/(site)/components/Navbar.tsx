import Link from "next/link";
import Image from "next/image";
import { IoSettingsSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import styles from "./Navbar.module.css";
import logo from "../home/logos/logo.png";


function Navbar() {
    return (
        <nav className="inset-x-0 top-0 flex h-16 items-center justify-between bg-blue-500 text-white shadow-sm md:h-20">
            <div className="px-4 md:px-8">
                <div className="flex gap-2 items-center">
                <Link href="/home" passHerf>
                    <Image width={200} height={50} src={logo} alt="Logo" />
                </Link>
                </div>
            </div>
            <div className="flex items-center justify-between gap-3 md:gap-8">
                <Link
                    href="#"
                    className="rounded bg-white px-1.5 py-1 text-sm font-bold text-blue-500 hover:bg-blue-700 hover:text-gray-200 md:px-4 md:py-2 md:text-lg"
                >
                    Log in
                </Link>
                <Link href="#" className="hover:text-gray-200">
                    <IoSettingsSharp className={styles.iconBase} />
                </Link>
                <Link
                    href="/dashboard"
                    className="pr-3 hover:text-gray-200 md:pr-6"
                >
                    <MdAccountCircle className={styles.iconBase} />
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;