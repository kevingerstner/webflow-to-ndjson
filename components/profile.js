import Image from "next/image";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from "react";
import { getUserData } from "../lib/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
    const user = useUser();
    const supabase = useSupabaseClient();
    const [userData, setUserData] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("USE EFFECT");
        getProfile();
    }, []);

    async function getProfile() {
        console.log("GET PROFILE");
        try {
            let { data, error, status } = await getUserData(supabase);
            if (error && status !== 406) throw error;

            if (data) {
                console.log(data);
                console.log(data["first_name"]);
                setUserData(data);
            }
        } catch (err) { console.log(err) }
    }


    if (!user) return (
        <a className="bg-primary-400 px-5 py-2 rounded-md" href="/login">Login</a>
    )

    async function logout() {
        const { error } = await supabase.auth.signOut();
    }

    if (userData) return (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} >
            <div className="flex flex-row items-center gap-3 cursor-pointer">
                <p>{`Hi, ${userData["first_name"]}`}</p>
                <div className="rounded-full w-8 h-8 bg-gray-200 relative overflow-hidden">
                    <Image alt="profile" fill src="https://gopjskfngehdlvdeewoi.supabase.co/storage/v1/object/public/images/profile-pic.webp?t=2023-03-17T17%3A14%3A07.145Z" />
                </div>
            </div>
            {
                open ? (
                    <>
                        <div className="absolute top-0 right-0 h-[200%] w-[150%] cursor-pointer"></div>
                        <ul className="absolute top-12 w-60 bg-white right-0 border overflow-y-auto border-gray-100 py-10 rounded-sm shadow-md">
                            <li className="hover:bg-gray-50 w-full text-center py-2">
                                <a href="/profile" className="no-underline">
                                    Account
                                </a>
                            </li>
                            <li className="hover:bg-gray-50 w-full text-center py-2 cursor-pointer" onClick={logout}>
                                Sign Out
                            </li>
                        </ul>
                    </>
                ) : null
            }
        </div>
    )

    return (
        <div>
            <div className="flex flex-row items-center gap-3">
                {/* <Image src={user.picture} width="32" height="32" className="rounded-full" />
                <div>
                    <span>Hey, {user.name} 👋</span>
                </div> */}
                <button className="bg-primary-400 px-5 py-2 rounded-md" onClick={logout}>Logout</button>
            </div>
        </div>
    )
}