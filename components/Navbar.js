import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="flex w-full border-b border-gray-200 bg-white">
            <div className="px-5 py-3 w-full items-center content-center">
                <Image src="/Wellflow-Logo-02.png" width="220" height="100" alt="Wellflow Logo" />
            </div>
        </nav>
    )
}