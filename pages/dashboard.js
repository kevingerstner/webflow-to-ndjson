import Navbar from "../components/navbar";
import Image from "next/image";
import { useEffect } from "react";
import WebflowAuthorize from "../components/webflowAuthorize";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function getServerSideProps(context) {
    const supabase = createServerSupabaseClient(context);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    return {
        props: {
            initialSession: session,
            user: session.user,
        },
    }
}

async function authorize() {
    console.log("AUTHORIZE");
    const res = await fetch("/api/auth/webflow", {
        method: "POST",
        body: "",
    });
    window.location.href = await res.json();
}

export default function Dashboard({ user }) {

    return (
        <>
            <main>
                <Navbar />
                <section className="py-20">
                    <div className="container max-w-4xl">
                        <div className="bg-white rounded-sm p-10 shadow-md">
                            <h1 className="h3">Welcome to Wellflow!</h1>
                            <p>Before we can get started, we need to link your Webflow account.</p>
                            <p className="mt-5 font-bold">Privacy Notice:</p>
                            <ul className="list-disc">
                                <li className="ml-5" >You can control which sites Wellflow has access to.</li>
                                <li className="ml-5">Wellflow <b>cannot</b> access your account information, including passwords</li>
                            </ul>
                            {
                                (
                                    <button onClick={authorize} className="bg-primary-400 hover:bg-primary-500 p-5 my-10 rounded-md flex content-baseline gap-2 text-black">
                                        <Image src="/webflow-icon.png" width="22" height="22" alt="Webflow Icon" />
                                        Authorize Webflow
                                    </button>
                                )

                            }
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}