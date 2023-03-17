import Navbar from "../components/navbar";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

export default function Dashboard() {
    const user = useUser();

    useEffect(() => {
        if (!user) window.location.href = '/';
    }, [])


    return (
        <>
            <main>
                <Navbar />
            </main>
        </>
    )
}