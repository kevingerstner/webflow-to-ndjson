import { useEffect, useState } from "react";
import classNames from "classnames";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-javascript.min";

export default function JSONPreview({ fileData, type }) {

    let [mode, setMode] = useState("ndjson");

    useEffect(() => {
        Prism.highlightAll();
    }, [fileData, mode]);

    let ndjsonPreview = fileData?.slice(0, 50);
    let ndjsonPreviewString = "";
    ndjsonPreview?.forEach((row) => {
        ndjsonPreviewString += (JSON.stringify(row) + "\n");
    })

    let jsonPreview = fileData?.slice(0, 5);
    let jsonPreviewString = "";
    jsonPreview?.forEach(row => {
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