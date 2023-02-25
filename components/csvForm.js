import FilePreview from "../components/filePreview";
import DropZone from "../components/dropZone";
import { parse } from "papaparse";
import { useCallback, useState } from "react";
import JSONPreview from "./jsonPreview";
import { saveAs } from "file-saver";
import { convertFileToJSON } from "../lib/convert";

export default function CSVForm() {

    /**
     * NEXT STEPS:
     * ** Ensure ID Column's name is unedited (causing undefined id)
     * ** Date format?
     */

    const [fileUpload, setFile] = useState(null);
    const [fileMeta, setFileMeta] = useState(null);
    const [uploadErrors, setUploadErrors] = useState(null);
    const [fileData, setFileData] = useState(null);

    const [settings, setSettings] = useState({ headers: [], enabled: [], _id: 0, _type: "", types: [] });

    const handleFileChosen = useCallback((event) => {
        let file = event.target.files[0];
        setFile(file);

        parse(file, {
            worker: true,
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                setFileData(results.data);
                setFileMeta(results.meta);
                setUploadErrors(results.errors);
                let numCols = results.meta.fields.length;
                setSettings({
                    headers: results.meta.fields,
                    enabled: new Array(numCols).fill(true),
                    _id: 0,
                    _type: "",
                    types: new Array(numCols).fill("string"),
                });
            }
        });
    }, [setFileData]);

    function removeFile(event) {
        event.preventDefault();
        setFile(null);
        setFileMeta(null);
        setFileData(null);
    }

    // Modify the JSON Converted Data
    function handleSettingsSubmit(event) {
        event.preventDefault();
        const elements = event.target.elements;

        let idCols = document.getElementsByName("idColumn");
        let _id = 0;
        for (let i = 0; i < idCols.length; i++) {
            if (idCols[i].checked) _id = i;
        }

        let headers = [];
        elements["header"].forEach((header) => {
            if (header.value) headers.push(header.value);
            else headers.push(header.placeholder);
        });

        let enabled = [];
        elements["enabled"].forEach((e) => {
            enabled.push(e.checked);
        })

        let types = [];
        elements["types"].forEach((e) => {
            types.push(e.value);
        })

        setSettings({ ...settings, headers, enabled, _type: elements.type.value, _id, types });
    }

    function download() {
        // CONVERT
        let ndjson = convertFileToJSON(fileData, settings, true);

        // DOWNLOAD
        let downloadEnabled = true;
        let file = new Blob([ndjson], { type: "text/plain" });
        let fileName = settings._type + ".ndjson";
        downloadEnabled ? saveAs(file, fileName) : null;
    }

    return (
        <>
            <section className="container pt-20">
                <div>
                    <h1 className="mb-5">Webflow to Sanity</h1>
                    <p className="mb-5 text-gray-400">Created by <a href="https://github.com/kevingerstner">Kevin Gerstner</a></p>
                    <div className="max-w-2xl">
                        <p>Want to move your data from a Webflow CMS to a headless CMS like Sanity? This tool will convert Webflow's exported .csv file to .ndjson, the supported file format for Sanity. </p>
                    </div>

                </div>
            </section>
            <section className="py-20">
                <div className="container">
                    <h2 className="mb-10">Step 1) Upload CSV File:</h2>
                    <form id="csv-form" className="mb-10">
                        <DropZone handler={handleFileChosen} removeHandler={removeFile} file={fileUpload} />
                    </form>
                </div>
            </section>
            {
                fileUpload && fileMeta && (
                    <>
                        <section className="py-5">
                            <div className="container">
                                <FilePreview file={fileUpload} fileData={fileData} fileMeta={fileMeta} settings={settings} handleSettingsSubmit={handleSettingsSubmit} />
                            </div>
                        </section>
                        <section className="py-5">
                            <div className="container">
                                <JSONPreview fileData={fileData} settings={settings} />
                                <hr className="my-10" />
                            </div>
                        </section>
                        <section className="py-5">
                            <div className="container">
                                <button onClick={download} className="bg-primary-400 text-white px-5 py-3 rounded-md">
                                    Download
                                </button>
                            </div>
                        </section>
                    </>
                )
            }
        </>
    )
}