import FilePreview from "../components/filePreview";
import DropZone from "../components/dropZone";
import { parse } from "papaparse";
import { useCallback, useState, useEffect } from "react";
import JSONPreview from "./jsonPreview";

export default function CSVForm() {

    const [fileUpload, setFile] = useState("");
    const [fileData, setFileData] = useState("");

    let fileLoadCache = [];

    const handleFileChosen = useCallback((event) => {
        let file = event.target.files[0];
        console.log(file);
        setFile(file);

        parse(file, {
            worker: true,
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.log(results);
                setFileData(results);
            }
        });
    }, [setFileData]);

    return (
        <>
            <section className="container pt-20">
                <div className="grid grid-cols-2 gap-x-20">
                    <div>
                        <p className="text-overline">Weblow CMS</p>
                        <h1 className="mb-3">Webflow CMS to Sanity CMS</h1>
                        <p className="text-xl mb-6 text-gray-400">Converts .csv to .ndjson</p>
                        <div className="max-w-2xl">
                            <p>Want to move your data from a Webflow CMS to a headless CMS like Sanity? This tool will convert Webflow's exported .csv file to .ndjson, the supported file format for Sanity. </p>
                        </div>

                    </div>
                    <div>
                        <h2>Step 1) Upload CSV File:</h2>
                        <form className="pb-10">
                            <DropZone handler={handleFileChosen} />
                        </form>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="container">
                    <h2>Step 2) View Data:</h2>
                    <FilePreview file={fileUpload} fileData={fileData} />
                </div>
            </section>
            <section className="py-5">
                <div className="container">
                    <h2>Step 3) Preview Data:</h2>
                    <JSONPreview fileData={fileData} />
                    <hr className="my-10" />
                </div>
            </section>
        </>
    )
}