import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar";
import CSVForm from "../components/csvForm";

export default function Index() {
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
				<CSVForm />
			</main>
		</>
	);
}
