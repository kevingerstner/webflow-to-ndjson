import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Webflow from "webflow-api";
import WebflowAuthorize from "../components/webflowAuthorize";
import WebflowSiteBrowser from "../components/webflowSiteBrowser";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

export async function getServerSideProps(context) {
    const supabase = createServerSupabaseClient(context);
    const { data: { session } } = await supabase.auth.getSession();
    const { code } = context.query;

    if (!session) return { redirect: { destination: '/', permanent: false } }

    let webflow, wfAccessToken, sitesInfo, userInfo, wfUser = null;

    // Check if user has an access token
    const { data, error } = await supabase.from('users').select("wf_access_token").single();
    wfAccessToken = data?.wf_access_token;

    // If no access token was found for this user, and there is a code, create an access token and store in user's data. Then fetch
    if (!wfAccessToken && code) {
        try {
            webflow = new Webflow({ token: code });
            wfAccessToken = await webflow.accessToken({
                client_id: process.env.WEBFLOW_CLIENT_ID,
                client_secret: process.env.WEBFLOW_CLIENT_SECRET,
                code,
            });
            const { data, error } = await supabase.from('users').update({ wf_access_token: wfAccessToken.access_token }).eq('id', session.user.id);
            if (error) throw (error);

        } catch (err) {
            console.log(err);
        }
    }

    if (wfAccessToken) {
        webflow = new Webflow({ token: wfAccessToken });
        const { user } = await webflow.authenticatedUser();
        wfUser = user;
        let res = await fetch("https://api.webflow.com/user", {
            method: "GET",
            headers: { 'Authorization': `Bearer ${wfAccessToken}` }
        });
        userInfo = await res.json();
        let sites = await fetch("https://api.webflow.com/sites", {
            method: "GET",
            headers: { 'Authorization': `Bearer ${wfAccessToken}` }
        });
        sitesInfo = await sites.json();
    }

    return {
        props: {
            initialSession: session,
            user: session.user,
            wfAccessToken,
            wfUser,
            sitesInfo,
            userInfo,
        },
    }
}

export default function Dashboard({ wfAccessToken, userInfo, sitesInfo }) {

    console.log(wfAccessToken);


    function renderDashboard() {
        if (!wfAccessToken) return <WebflowAuthorize />
        else return (
            <WebflowSiteBrowser userInfo={userInfo} sitesInfo={sitesInfo} />
        )
    }

    return (
        <>
            <main>
                <Navbar />
                <Hero />
                <section className="py-20">
                    <div className="container">
                        <h2>Select a Service</h2>
                        <div className="grid columns-3">
                            <a className="border border-gray-200 p-10 no-underline" href="/webflow-to-sanity">
                                <div className="flex flex-row content-center gap-3">
                                    <FontAwesomeIcon icon={faDatabase} size="2x" className="text-primary-400" />
                                    <h3>Webflow to Sanity</h3>
                                </div>
                                <p>Move your CMS data in Webflow to Sanity, an open-source headless CMS with a free tier</p>
                            </a>
                        </div>
                    </div>
                </section>
                {renderDashboard()}
            </main>
        </>
    )
}