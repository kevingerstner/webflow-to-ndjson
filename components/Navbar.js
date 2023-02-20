import Image from "next/image";

export default function Navbar() {

    return (
        <nav className="flex w-full items-center justify-between px-5 py-3 border-b border-gray-200 bg-white">
            <Image src="/Wellflow-Logo-02.png" width="256" height="135" alt="Wellflow Logo" />
            <a href="https://www.buymeacoffee.com/cactoid" target="_blank">
                <Image width="187" height="30" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" />
            </a>
        </nav>
    )
}