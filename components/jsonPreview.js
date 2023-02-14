import { useEffect, useState } from "react";
import _ from "lodash";
import classNames from "classnames";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-javascript.min";

export default function JSONPreview({ fileData, settings }) {

    let [mode, setMode] = useState("ndjson");

    let type = settings._type;
    let idCol = settings._id;
    let convertedData = [];
    let headers = settings.headers;
    let enabled = settings.enabled;

    // Create the converted preview
    fileData?.slice(0, 10).forEach((row) => {
        let convertedRow = {};
        // set _id name
        convertedRow["_id"] = `imported-${type}-${row[headers[idCol]]}`.toLowerCase();
        delete convertedRow[headers[idCol]]; // delete the col with the original name
        // set _type
        convertedRow["_type"] = type;
        // rename keys
        let keys = Object.keys(row);
        let values = Object.values(row);
        for (let i = 0; i < keys.length; i++) {
            convertedRow[headers[i]] = values[i];
        }
        // delete disabled columns
        for (let i = 0; i < enabled.length; i++) {
            if (enabled[i] === false) {
                delete convertedRow[headers[i]];
            }
        }
        convertedData.push(convertedRow);
    });

    useEffect(() => {
        Prism.highlightAll();
    }, [fileData, settings, mode]);

    // Display the converted preview data in ndjson (output) format
    let ndjsonPreviewString = "";
    convertedData?.forEach((row) => {
        ndjsonPreviewString += (JSON.stringify(row) + "\n");
    })

    // Display the converted preview data in json (formatted) format
    let jsonPreviewString = "";
    convertedData?.forEach(row => {
        jsonPreviewString += (JSON.stringify(row, null, 2));
    });

    let btnClass = classNames("p-3 rounded-t-lg", {
        "bg-gray-500 text-white": mode === "ndjson",
        "bg-gray-200 text-black": mode === "json",
    });

    let btnClass2 = classNames("p-3 rounded-t-lg", {
        "bg-gray-500 text-white": mode === "json",
        "bg-gray-200 text-black": mode === "ndjson",
    });

    if (!fileData) return <></>
    else return (
        <>
            <h2>Step 3) Preview Data in NDJSON format:</h2>

            <button className={btnClass} onClick={() => { setMode("ndjson") }}>NDJSON (Output)</button>
            <button className={btnClass2} onClick={() => { setMode("json") }}>JSON (Formatted)</button>
            <pre>
                {
                    mode === "ndjson" ? (
                        <code className="language-javascript">
                            {ndjsonPreviewString}
                        </code>
                    ) : mode === "json" ? (
                        <code className="language-javascript">
                            {jsonPreviewString}
                        </code>) : null
                }
            </pre>
        </>
    )
}