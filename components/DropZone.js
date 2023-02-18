import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export default function DropZone({ handler, removeHandler, file }) {

	function formatBytes(bytes, decimals = 2) {
		if (!+bytes) return '0 Bytes'
		const k = 1024
		const dm = decimals < 0 ? 0 : decimals
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
	}

	console.log(file);
	return (
		<>
			{
				file ? (
					<div className=''>
						<p className='mb-5'>File Selected:</p>
						<div className="border-gray-400 border-2 p-5 rounded-md inline-flex flex-col relative">
							<FontAwesomeIcon icon={faFile} size="2x" className='text-primary-400 mb-5' />
							<span>{file.name}</span>
							<span className="text-center text-gray-400">{formatBytes(file.size)}</span>
							<button className='absolute -top-2 -right-2' onClick={removeHandler}>
								<FontAwesomeIcon icon={faCircleXmark} size="lg" className="text-red-400 bg-white hover:text-red-600" />
							</button>
						</div>
					</div>
				) : (
					<div className="">
						<label
							htmlFor="fileSelect"
							className="flex h-64 w-full cursor-pointer appearance-none justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-4 transition hover:border-gray-400"
						>
							<span className="flex items-center space-x-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-gray-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
									/>
								</svg>
								<span className="font-medium text-gray-600">
									Drop files to Attach or <span className="text-blue-600 underline">Browse</span>
								</span>
							</span>
							<input id="fileSelect" type="file" className="hidden" onChange={handler} accept=".csv" />
						</label>
					</div>
				)
			}
		</>
	);
}
