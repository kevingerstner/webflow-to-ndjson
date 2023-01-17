import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import DropZone from "../components/DropZone";
import Navbar from "../components/Navbar";
import FilePreview from "../components/filePreview";

export default function Home() {
	const [fileUpload, setFile] = useState("");

	function handleFileChosen(event) {
		let file = event.target.files[0];
		let reader = new FileReader();
		reader.onload = (e) => {
			const content = reader.result;
			setFile(content);
			console.log(content);
		};
		reader.readAsText(file);
	}

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
				<section className="container pt-20">
					<div className="grid grid-cols-2 gap-x-20">
						<div>
							<p className="text-overline">Weblow CMS</p>
							<h1 className="mb-3">Webflow CMS to Sanity CMS</h1>
							<p className="text-xl mb-6 text-gray-400">Converts .csv to .ndjson</p>
							<div className="max-w-2xl">
								<p>Ready to get a restraining order from Webflow CMS and move your data to a real CMS like Sanity? This tool will convert Webflow's exported .csv file to .ndjson, the supported file format for Sanity. </p>
							</div>

						</div>
						<div>
							<h2>Step 1) Upload CSV File:</h2>
							<form className="pb-10">
								<DropZone handler={handleFileChosen} />
								<button type="submit">Submit</button>
							</form>
						</div>
					</div>
				</section>
				<section className="py-5">
					<div className="container">
						<h2>Step 2) View Data:</h2>
						<FilePreview fileData={fileUpload} />
						<hr className="my-10" />
					</div>
				</section>
				<div className="container relative flex justify-center py-10">
					<Image src="/wellflow-05.png" width="300" height="600" alt="well" />
				</div>
			</main>
		</>
	);
}
