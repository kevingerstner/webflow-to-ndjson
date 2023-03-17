import { useEffect, useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { parseFullName } from "parse-full-name";
import { getUserData } from "../lib/queries";

export default function UserInfoCollect({ session }) {
    const user = useUser();
    const supabase = useSupabaseClient();

    const [loading, setLoading] = useState(false);
    const [userDataFound, setUserDataFound] = useState(false);
    const [name, setName] = useState();

    useEffect(() => {
        if (user) getProfile();
    }, [session]);

    // Trying to figure out where to store the session / user data once fetched so profile can access

    async function getProfile() {
        try {
            setLoading(true);

            let { data, error, status } = await getUserData(supabase);
            if (error && status !== 406) throw error;

            if (data) {
                setUserDataFound(true);
                window.location.href = "/profile";
            }
        } catch (err) { setUserDataFound(false); }
        finally { setLoading(false); }
    }

    async function submitProfile(name) {
        const parsedName = parseFullName(name);
        try {
            setLoading(true);

            const userData = {
                id: user.id,
                first_name: parsedName.first,
                last_name: parsedName.last,
            }

            let { error } = await supabase.from('users').upsert(userData);
            if (error) throw error;

            window.location.href = "/profile";

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    if (userDataFound) {
        return (
            <>
                <h1>User Data Found</h1>
            </>
        )
    }

    return (
        <>
            <form className="mt-10">
                <div className="mb-8">
                    <label htmlFor="name" className="block font-bold text-sm">Name</label>
                    <input type="text" name="name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)}></input>
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    submitProfile(name)
                }
                } className="bg-primary-400" disabled={loading}>Continue</button>
            </form>
        </>
    )
}