import FilePreview from "../components/filePreview";
import DropZone from "../components/dropZone";
import { parse } from "papaparse";
import { useCallback, useState } from "react";
import JSONPreview from "./jsonPreview";

export default function CSVForm() {

    /**
     * NEXT STEPS:
     * ** Visual indication of disabled columns, disallow ID column on disabled column
     * ** Add toolbar with save button and title preview
     * ** Export to file
     * ** Date format?
     */

    const [fileUpload, setFile] = useState(null);
    const [fileMeta, setFileMeta] = useState(null);
    const [uploadErrors, setUploadErrors] = useState(null);
    const [fileData, setFileData] = useState(null);

    const [settings, setSettings] = useState({ headers: [], enabled: [], _id: 0, _type: "" });

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
                });
            }
        });
    }, [setFileData]);

    // Modify the JSON Converted Data
    function handleSettingsSubmit(event) {
        event.preventDefault();
        const elements = event.target.elements;

        let headers = [];
        elements["header"].forEach((header) => {
            if (header.value) headers.push(header.value);
            else headers.push(header.placeholder);
        });

        let enabled = [];
        elements["enabled"].forEach((e) => {
            enabled.push(e.checked);
        })

        setSettings({ ...settings, headers: headers, enabled: enabled, _type: elements.type.value, _id: elements.idColumn.value });
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
                    </>
                )
            }
        </>
    )
}