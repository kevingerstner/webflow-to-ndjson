import { useEffect, useState } from "react";
import _ from "lodash";
import classNames from "classnames";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-javascript.min";
import { convertFileToJSON, convertHSLAToColor, convertStringToNumber } from "../lib/convert";

export default function JSONPreview({ fileData, settings }) {

    let [mode, setMode] = useState("ndjson");

    let { _type, _id, headers, enabled, types } = settings;
    let convertedData = convertFileToJSON(fileData.slice(0, 10), settings);

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

    useEffect(() => {
        Prism.highlightAll();
    }, [fileData, settings, mode]);

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
            <pre className=" max-h-[90vh]">
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