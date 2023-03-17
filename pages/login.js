import Head from "next/head";
import Image from "next/image";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import UserInfoCollect from "../components/userInfoCollect";
import Navbar from "../components/navbar";
import { getUserData } from "../lib/queries";

export default function Login() {
    const supabase = useSupabaseClient();
    const session = useSession();
    const user = useUser();

    if (!user) return (
        <>
            <Head>
                <title>Login | Wellflow</title>
            </Head>
            <main className="min-h-screen">
                <section className="w-full">
                    <div className="container py-40 px-20 max-w-3xl bg-white">
                        <div className="flex flex-col items-center">
                            <Image src="/Wellflow-Logo-02.png" width="300" height="300" alt="Wellflow Logo" />
                        </div>
                        <Auth
                            redirectTo="http://localhost:3000/login"
                            appearance={{ theme: ThemeSupa }}
                            supabaseClient={supabase}
                            providers={['google', 'facebook', 'twitter']}
                        />
                    </div>
                </section>
            </main>
        </>
    )

    return (
        <>
            <Head>
                <title>Login | Wellflow</title>
            </Head>
            <main className="min-h-screen">
                <Navbar style="simple" />
                <section className="w-full">
                    <div className="container py-40 px-20 max-w-3xl bg-white">
                        <div>
                            <h1>Welcome in!</h1>
                            <p className="text-gray-400 text-lg">Let's get the introductions out of the way. I'm Wellflow, what's your name?</p>
                            <UserInfoCollect session={session} />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}