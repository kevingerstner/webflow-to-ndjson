import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar";
import CSVForm from "../components/csvForm";
import { useRouter } from "next/router";
import Webflow from "webflow-api";
import { useState } from "react";
import WebflowSite from "../components/webflowSite";
import WebflowSiteBrowser from "../components/webflowSiteBrowser";

export async function getServerSideProps(context) {
	console.log(context.query.token);
	let authToken = context.query.token;
	if (authToken) {
		const app = new Webflow({ token: authToken });
		const { user } = await app.authenticatedUser();
		let res = await fetch("https://api.webflow.com/user", {
			method: "GET",
			headers: { 'Authorization': `Bearer ${authToken}` }
		});
		const userInfo = await res.json();
		let sites = await fetch("https://api.webflow.com/sites", {
			method: "GET",
			headers: { 'Authorization': `Bearer ${authToken}` }
		});
		const sitesInfo = await sites.json();
		return {
			props: {
				userInfo,
				sitesInfo,
			}
		}
	}
	return {
		props: {}
	}
}

export default function Index({ userInfo, sitesInfo }) {

	const router = useRouter();
	console.log(router.query);

	const [selectedSite, setSelectedSite] = useState(null);

	function selectSite(event, index) {
		setSelectedSite(index);
	}

	function deselectSite(event) {
		setSelectedSite(null);
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
				<section className="py-60 bg-black text-white w-full">
					<div className="container">
						<h1 className="mb-5">Webflow to Sanity</h1>
						<div className="max-w-2xl text-xl text-gray-300">
							<p>Want to move your data from a Webflow CMS to a headless CMS like Sanity? This tool will convert Webflow's exported .csv file to .ndjson, the supported file format for Sanity. </p>
						</div>
						<p className="my-5 text-primary-400">Created by <a href="https://github.com/kevingerstner">Kevin Gerstner</a></p>
					</div>
				</section>
				{
					selectedSite !== null ? (
						<WebflowSite site={sitesInfo[selectedSite]} backHandler={deselectSite} />
					) : (
						<WebflowSiteBrowser userInfo={userInfo} sitesInfo={sitesInfo} selectHandler={selectSite} />
					)
				}
			</main>
		</>
	);
}
