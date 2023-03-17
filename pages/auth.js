import Head from "next/head";
import Navbar from "../components/navbar";
import Webflow from "webflow-api";

export async function getServerSideProps(context) {
    const webflow = new Webflow();
    console.log("GET SERVER SIDE PROPS");
    const { access_token } = await webflow.accessToken({
        client_id: process.env.WEBFLOW_CLIENT_ID,
        client_secret: process.env.WEBFLOW_CLIENT_SECRET,
        code: context.query.code,
    });
    return {
        props: { access_token }
    }
}

export default function Auth({ access_token }) {

    function backToHome() {
        console.log(access_token);
        window.location.href = `/?token=${access_token}`;
    }

    return (
        <>
            <Head>
                <title>Webflow CSV to Sanity NDJSON</title>
                <meta name="description" content="Convert CSV files to a NDJSON format for Sanity." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/wellflow-04.png" />
            </Head>
            <main className="min-h-screen">
                <Navbar />
                <section className="container pt-20">
                    <div>
                        <button onClick={backToHome}>Go Back</button>

                    </div>
                </section>
            </main>
        </>
    )
}