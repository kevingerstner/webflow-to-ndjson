import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import SaveButton from './saveButton';
import { useState } from 'react';

export default function FilePreview({ file, fileData, fileMeta, handleSettingsSubmit }) {

	const [saved, setSaved] = useState(false);
	const [enabled, setEnabled] = useState(new Array(fileMeta.fields.length).fill(true)); // stores which columns are disabled

	const fileDataPreview = fileData?.slice(0, 50);

	function submit(event) {
		setSaved(true);
		handleSettingsSubmit(event);
	}

	function settingChanged(event) {
		setSaved(false);
	}

	function enabledChanged(event, index) {
		let newEnabled = [...enabled];
		newEnabled[index] = event.target.checked;
		setEnabled(newEnabled);
		settingChanged(event);
	}

	return (
		<form onSubmit={submit}>
			<section className='py-10'>
				<h2>Step 2) Enter the name of the schema</h2>
				<label className="mr-2">Input the name of this schema (_type): </label>
				<input type="text" id="type" name="type" className="border border-gray-400 px-3 py-1 rounded-md" onChange={settingChanged} />
			</section>

			<div className='flex justify-between items-center mb-5'>
				<h2 className="m-0">Step 3) Preview and Edit Data:</h2>
				<SaveButton saved={saved} />
			</div>

			{
				fileDataPreview && file && (
					<p className=" py-5 font-bold text-lg whitespace-nowrap">Showing {fileDataPreview.length}/50 rows ({file.name})</p>
				)
			}

			<div className=" border-blue-500 border rounded-lg overflow-scroll h-[80vh]">
				{fileData && (
					<table>
						<thead className="sticky top-0">
							{/* Header Row */}
							<tr>
								<th className="bg-blue-500 text-white text-lg font-bold sticky top-0 py-1 px-5">{file.name}</th>
								{
									fileMeta.fields.map((header, index) => (
										<th key={index} className={`${enabled[index] ? "bg-blue-500" : "bg-blue-600"} text-white text-lg font-bold sticky top-0 py-1 px-5 whitespace-nowrap`}>
											<input type="text" name="header" placeholder={header} className="border-b-2 border-white bg-transparent placeholder:text-gray-300" onChange={settingChanged}></input>
											<div className="text-xs inline ml-3">
												<FontAwesomeIcon icon={faPencil} />
											</div>
										</th>
									))
								}
							</tr>
							{/* Enabled Row */}
							<tr>
								<th className="bg-blue-500">Enabled?</th>
								{
									fileMeta.fields.map((header, index) => (
										<th className={`${enabled[index] ? "bg-blue-500" : "bg-blue-600"} py-1`}>
											<input type="checkbox" name="enabled" defaultChecked onChange={(event) => enabledChanged(event, index)}></input>
										</th>
									))
								}
							</tr>
							{/* ID Column Row */}
							<tr className="sticky top-0">
								<th className="sticky top-0 py-2 bg-slate-200">ID Column</th>
								{
									fileMeta.fields.map((header, index) => (
										<th className={`${enabled[index] ? "bg-slate-200" : "bg-slate-300"} sticky top-0 py-2`} key={index}>
											<label htmlFor={header}></label>
											<input type="radio" id={header} defaultChecked={index === 0} name="idColumn" value={index} onChange={settingChanged}></input>
										</th>
									))
								}
							</tr>
						</thead>
						<tbody>
							{
								fileDataPreview.map((row, index) => {
									return (
										<tr key={index} className={`bg-white border-gray-400 border`}>
											<td className="border-gray-200 border px-5 py-1"></td>
											{
												Object.keys(row).map((key, index) => (
													<td key={index} className={`${enabled[index] ? "bg-white" : "bg-slate-100"} border-gray-200 border px-5 py-1`}>
														{row[key]}
													</td>
												))
											}
										</tr>
									)
								})
							}
						</tbody>
					</table>
				)}
			</div>
		</form>
	);
}
