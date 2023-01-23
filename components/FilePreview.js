export default function FilePreview({ file, fileData }) {

	const fileDataPreview = fileData?.data?.slice(0, 50);
	const headers = fileData?.meta?.fields;
	console.log(fileDataPreview);

	return (
		<>
			<p className=" py-5 font-bold text-lg">Showing {fileData && fileDataPreview.length}/50 rows ({file.name})</p>

			<div className=" border-blue-500 border rounded-lg overflow-scroll h-[80vh]">
				<div>
					{fileData && (
						<>
							<table>
								<thead className="sticky top-0">
									<tr className="sticky top-0">
										{
											headers.map((header) => {
												return (
													<th className="bg-blue-500 text-white text-lg font-bold sticky top-0 py-1 px-5">
														{header}
													</th>
												)
											})
										}
									</tr>
								</thead>
								<tbody>
									{
										fileDataPreview.map((row) => {
											return (
												<tr className="bg-white border-gray-400 border">
													{
														Object.keys(row).map((key, index) => {
															return (
																<td className="border-gray-200 border px-5 py-1">
																	{row[key]}
																</td>
															)
														})
													}
												</tr>
											)
										})
									}
								</tbody>
							</table>
						</>
					)}
				</div>
			</div>
		</>
	);
}
