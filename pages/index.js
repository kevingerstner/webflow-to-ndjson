import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
import DropZone from "../components/DropZone";
import Navbar from "../components/Navbar";

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
				<link rel="icon" href="/wellflow-04.png" />
			</Head>
			<main>
				<Navbar />
				<div className="container py-20">
					<div className="grid grid-cols-2 gap-x-20">
						<div>
							<h1 className="font-display pb-5">Webflow CMS to Sanity CMS</h1>
							<p>Ready to get a restraining order from Webflow CMS and move your data to a real CMS like Sanity? This tool will convert Webflow's exported .csv file to .ndjson, the supported file format for Sanity. </p>

						</div>
						<div>

							<form>
								<label htmlFor="csvFile">Input CSV File:</label>
								<DropZone />
								<button type="submit">Submit</button>
							</form>
						</div>
					</div>
				</div>
				<div className="container">

					<hr className="my-10" />
				</div>
				<div className="container relative flex justify-center py-10">
					<Image src="/wellflow-05.png" width="300" height="600" />
				</div>
			</main>
		</>
	);
}
