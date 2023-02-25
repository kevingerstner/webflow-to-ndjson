import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import SaveButton from './saveButton';
import { useState, useRef } from 'react';

export default function FilePreview({ file, fileData, fileMeta, settings, handleSettingsSubmit }) {

	const [saved, setSaved] = useState(false);
	const [enabled, setEnabled] = useState(new Array(fileMeta.fields.length).fill(true)); // stores which columns are disabled
	const [idColumn, setIdColumn] = useState(0); // stores which column is selected as the id column
	const formRef = useRef(null);

	const fileDataPreview = fileData?.slice(0, 50);

	function submit(event) {
		setSaved(true);
		handleSettingsSubmit(event);
	}

	const settingChanged = () => { setSaved(false); }

	function idColumnChanged(event, index) {
		setIdColumn(index);
		setSaved(false);
	}

	function enabledChanged(event, index) {
		// Prevent every column from being disabled
		if (enabled.filter(e => e === true).length <= 1 && event.target.checked === false) {
			alert("Can't disable every column");
			event.target.checked = !event.target.checked; // revert check
			return;
		};
		// Set the enabled array
		let newEnabled = [...enabled];
		newEnabled[index] = event.target.checked;
		setEnabled(newEnabled);
		// Move the ID Column if the column gets disabled
		const idColumnRefs = formRef.current.elements["idColumn"];
		if (idColumn === index) {
			for (let i = 0; i < newEnabled.length; i++) {
				if (newEnabled[i]) {
					idColumnRefs[i].checked = true;
					setIdColumn(i);
					break;
				}
			}
		}
		settingChanged();
	}

	return (
		<form onSubmit={submit} ref={formRef}>
			<div className='flex justify-between items-center mb-5'>
				<h2 className="m-0">Step 2) Preview and Edit Data:</h2>
				<SaveButton saved={saved} />
			</div>

			<div className='py-5'>
				<label className="mr-2">Name of this schema (_type): </label>
				<input type="text" id="type" name="type" className="border border-gray-400 px-5 py-3 rounded-md" onChange={settingChanged} placeholder="Stinkbug" />
			</div>

			<div>
				<p>Tips: </p>
				<ol>
					<li>Deselect Collection ID Column</li>
					<li>Select Item ID as the ID Column</li>
					<li></li>
				</ol>
			</div>

			<div className=" border-white border rounded-lg overflow-scroll h-[80vh]">
				{fileData && (
					<table>
						<thead className="sticky top-0">
							{/* Header Row */}
							<tr>
								<th className="bg-primary-400 text-white text-lg font-bold sticky top-0 py-2 px-5 whitespace-nowrap text-left leading-4">
									{file.name}<br />
									<span className="text-sm">Showing {fileDataPreview.length}/10 rows</span>
								</th>
								{
									fileMeta.fields.map((header, index) => (
										<th key={index} className={`${enabled[index] ? "bg-primary-400" : "bg-primary-500"} text-white text-lg font-bold sticky top-0 py-1 pl-2 pr-5 whitespace-nowrap`}>
											<input type="checkbox" name="enabled" defaultChecked onChange={(event) => enabledChanged(event, index)} className="mr-2"></input>
											<input type="text" name="header" placeholder={header} className="border-b-2 border-white bg-transparent placeholder:text-primary-600" onChange={settingChanged}></input>
											<div className="text-xs inline ml-3">
												<FontAwesomeIcon icon={faPencil} />
											</div>
										</th>
									))
								}
							</tr>

							{/* ID Column Row */}
							<tr className="sticky top-0">
								<th className="sticky top-0 py-2 bg-gray-200">_id Column</th>
								{
									fileMeta.fields.map((header, index) => (
										<th className={`${enabled[index] ? "bg-gray-200" : "bg-gray-300"} sticky top-0 py-2`} key={index}>
											<label htmlFor={header}></label>
											<input type="radio" id={header} disabled={!enabled[index]} defaultChecked={index === 0} name="idColumn" value={index} onChange={event => idColumnChanged(event, index)}></input>
										</th>
									))
								}
							</tr>
							{/* Type */}
							<tr className="sticky top-0">
								<th className="sticky top-0 py-2 bg-gray-300">Type</th>
								{
									fileMeta.fields.map((header, index) => (
										<th className={`${enabled[index] ? "bg-gray-300" : "bg-gray-400"} sticky top-0 py-2`} key={index}>
											<select name="types" className="rounded-sm border-2 border-gray-400 w-10/12 px-2 py-1" onChange={settingChanged}>
												<option value="string">String</option>
												<option value="color">Color</option>
												<option value="number">Number</option>
												<option value="slug">Slug</option>
											</select>
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
											<td className="border-gray-200 border px-5 py-1 bg-gray-200">{index + 1}</td>
											{
												Object.keys(row).map((key, index) => (
													<td key={index} className={`${enabled[index] ? "bg-white" : "bg-gray-100"} border-gray-200 border px-5 py-1`}>
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
