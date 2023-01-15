export default function FilePreview({ fileData }) {
	return (
		<div>
			<div>
				{fileData &&
					fileData.fileList.map((f) => {
						return (
							<>
								<ol>
									<li key={f.lastModified}>
										<div key={f.name}>{f.name}</div>
									</li>
								</ol>
							</>
						);
					})}
			</div>
		</div>
	);
}
