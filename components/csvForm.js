import FilePreview from "../components/filePreview";
import DropZone from "../components/dropZone";
import { parse } from "papaparse";
import { useCallback, useState, useEffect } from "react";
import JSONPreview from "./jsonPreview";

export default function CSVForm() {

    const [fileUpload, setFile] = useState(null);
    const [uploadInfo, setUploadInfo] = useState(null);
    const [uploadErrors, setUploadErrors] = useState(null);
    const [fileData, setFileData] = useState(null);

    const [settings, setSettings] = useState("");
    const [type, setType] = useState(""); // the _type field for Sanity (the name)
    const [idColumn, setIdColumn] = useState(0); // the column containing the document ID

    const handleFileChosen = useCallback((event) => {
        let file = event.target.files[0];
        setFile(file);

        parse(file, {
            worker: true,
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                setFileData(results.data);
                setUploadInfo(results.meta);
                setUploadErrors(results.errors);
            }
        });
    }, [setFileData]);

    function handleChangeIdColumn(event) {
        setSettings({ ...settings, _id: event.target.value })
    }

    // Modify the JSON Converted Data
    function handleTypeSubmit(event) {
        event.preventDefault();
        setSettings({ ...settings, _type: type });
    }

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
                    <h1>ID Column: {idColumn}</h1>
                    <FilePreview file={fileUpload} fileData={fileData} fileMeta={uploadInfo} idColumnHandler={handleChangeIdColumn} />
                </div>
            </section>
            <section className="py-5">
                <div className="container">
                    <h2>Step 3) Input Info</h2>
                    <form onSubmit={handleTypeSubmit}>
                        <label className="mr-2">Input the type name for the target Sanity collection: </label>
                        <input type="text" id="type" name="type" className="border border-gray-400 px-3 py-1 rounded-md" onChange={(e) => { setType(e.target.value) }} /><br />
                        <button type="submit" className="bg-blue-500 rounded-md mt-5 py-2 px-5 text-white font-bold hover:bg-blue-300 transition-colors">Submit</button>
                    </form>
                </div>
            </section>
            <section className="py-5">
                <div className="container">
                    <JSONPreview fileData={fileData} settings={settings} />
                    <hr className="my-10" />
                </div>
            </section>
        </>
    )
}