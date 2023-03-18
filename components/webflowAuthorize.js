import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react";
import { getUserData } from "../lib/queries";

export default function WebflowAuthorize() {
    const user = useUser();
    const supabase = useSupabaseClient();

    const [userData, setUserData] = useState(null);

    useEffect(async () => {
        const userData = await getUserData();
        if (userData) setUserData(userData);
    }, [userData]);

    return (
        <>
            <div>

            </div>
        </>
    )
}