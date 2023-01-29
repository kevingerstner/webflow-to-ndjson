export default function FilePreview({ file, fileData, fileMeta, idColumnHandler }) {

	const fileDataPreview = fileData?.slice(0, 50);
	const headers = fileMeta?.fields;

	return (
		<>
			{
				fileData && file && (
					<p className=" py-5 font-bold text-lg">Showing {fileDataPreview.length}/50 rows ({file.name})</p>
				)
			}

			<div className=" border-blue-500 border rounded-lg overflow-scroll h-[80vh]">
				<div>
					{fileData && (
						<>
							<table>
								<thead className="sticky top-0">
									<tr>
										<th className="bg-blue-500 text-white text-lg font-bold sticky top-0 py-1 px-5">{file.name}</th>
										{
											headers.map((header, index) => (
												<th key={index} className="bg-blue-500 text-white text-lg font-bold sticky top-0 py-1 px-5">
													{header}
												</th>
											))
										}
									</tr>
									<tr className="sticky top-0">
										<th className="sticky top-0 py-2 bg-amber-100">ID Column</th>
										{
											headers.map((header, index) => (
												<th className="sticky top-0 py-2 bg-amber-100" key={index}>
													<label htmlFor={header}></label>
													<input type="radio" id={header} defaultChecked={index === 0} name="idColumn" value={index} onChange={idColumnHandler}></input>
												</th>
											))
										}
									</tr>
								</thead>
								<tbody>
									{
										fileDataPreview.map((row, index) => {
											return (
												<tr key={index} className="bg-white border-gray-400 border">
													<td className="border-gray-200 border px-5 py-1"></td>
													{
														Object.keys(row).map((key, index) => {
															return (
																<td key={index} className="border-gray-200 border px-5 py-1">
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
