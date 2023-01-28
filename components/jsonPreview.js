export default function JSONPreview({ fileData, type }) {

    let fileDataPreview = fileData?.slice(0, 50);

    return (
        <>
            <pre className="border border-blue-500 rounded-md overflow-scroll p-5">
                <code>
                    {fileDataPreview?.map((row, index) => (
                        <p key={index}>{JSON.stringify(row)}</p>
                    ))}
                </code>
            </pre>

        </>
    )
}