import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
import DropZone from "../components/DropZone";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const [error, setError] = useState("");

	const handleFileChange = (e) => {
		console.log("HI");
		setError("BITCHES");

		let files = [...e.target.files];

		if (files && files[0]) {
			let attachedFile = files[0];
			var reader = new FileReader();
			reader.onload = (progressEvent) => {
				console.log(this.result);
			};

			reader.readAsText(this.files[0]);
		}
	};

	return (
		<>
			<Head>
				<title>Webflow CSV to Sanity NDJSON</title>
				<meta name="description" content="Convert CSV files to a NDJSON format for Sanity." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div className="container py-6">
					<h1>Webflow CMS to Sanity CMS</h1>
					<form>
						<label htmlFor="csvFile">Input CSV File:</label>
						<DropZone />
						<button type="submit">Submit</button>
					</form>
				</div>
			</main>
		</>
	);
}
