import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import Profile from "./profile";

export default function Navbar({ style = "default" }) {

    const user = useUser();

    if (style === "default")
        return (
            <nav className="flex w-full items-center justify-between px-5 py-3 border-b border-gray-200 bg-white">
                <div>
                    <a href={user ? "/dashboard" : "/"}>
                        <Image src="/Wellflow-Logo-01.png" width="200" height="110" alt="Wellflow Logo" />
                    </a>
                </div>
                <Profile />
                {/* <a href="https://www.buymeacoffee.com/cactoid" target="_blank">
                <Image width="187" height="30" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" />
            </a> */}
            </nav>
        )
    if (style === "simple") {
        return (
            <nav className="flex w-full items-center justify-between px-5 py-3 border-b border-gray-200 bg-white">
                <Image src="/Wellflow-Logo-01.png" width="256" height="135" alt="Wellflow Logo" />
                <Profile />
            </nav>
        )
    }
}