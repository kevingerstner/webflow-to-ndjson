export default function JSONPreview({ fileData }) {

    let fileDataPreview = fileData?.data?.slice(0, 50);

    return (
        <>
            {fileDataPreview?.forEach((row) => (
                <pre>
                    <code>
                        <p>{JSON.stringify(row)}</p>
                    </code>
                </pre>
            ))}
        </>
    )
}