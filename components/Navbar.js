import Image from "next/image";


export default function Navbar() {
    return (
        <nav className="flex w-full border-b border-gray-200">
            <div className="px-5 py-2">
                <Image src="/wellflow-01.png" width="220" height="100" alt="Wellflow Logo" />
                <Image src="/wellflow-02.png" width="200" height="200" className="absolute right-0 top-0" alt="Bucket" />
            </div>
        </nav>
    )
}