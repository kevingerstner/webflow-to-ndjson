export default function FilePreview({ fileData }) {

	return (
		<div className="p-5 bg-slate-500">
			<p>Test element</p>
			<div>
				<p>{fileData}</p>
				{fileData && (
					<>
						<h3>{fileData.name}</h3>
						<h3>{fileData.lastModified}</h3>
					</>
				)}
			</div>
		</div>
	);
}
