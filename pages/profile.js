import Head from "next/head";
import Navbar from "../components/navbar";

export default function Profile() {
    return (
        <>
            <Head>
                <title>Profile | Wellflow</title>
            </Head>
            <main>
                <Navbar />
                <section>
                    <div className="container">
                        <h1>Profile</h1>
                    </div>
                </section>
            </main>
        </>
    )
}