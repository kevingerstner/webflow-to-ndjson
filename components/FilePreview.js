export default function FilePreview({ file, fileData }) {

	const fileDataPreview = fileData?.data?.slice(0, 50);

	return (
		<>
			<p className=" py-5 font-bold text-lg">Showing {fileDataPreview.length}/50 rows ({file.name})</p>

			<div className=" border-blue-500 border rounded-lg overflow-scroll h-[80vh] sticky top-0">
				<div>
					{fileData && (
						<>
							<table>
								<thead className="sticky top-0">
									<tr className="sticky top-0">
										{fileDataPreview[0].map((col) => (
											<th className="bg-blue-500 text-white text-lg font-bold sticky top-0 py-1 px-5">{col}</th>
										))}
									</tr>
								</thead>
								<tbody>
									{fileDataPreview.map((row, index) => {
										if (index !== 0) {
											return (
												<tr className="bg-white border-gray-400 border">
													{row.map((col) => (
														<td className="border-gray-200 border px-5 py-1">{col}</td>
													))}
												</tr>
											)
										}
									})}
								</tbody>
							</table>
						</>
					)}
				</div>
			</div>
		</>
	);
}
