import FilePreview from "./filePreview";

export default function DropZone() {
	return (
		<>
			<div className="max-w-lg">
				<label
					htmlFor="fileSelect"
					class="flex h-32 w-full cursor-pointer appearance-none justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-4 transition hover:border-gray-400"
				>
					<span class="flex items-center space-x-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-gray-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
							/>
						</svg>
						<span class="font-medium text-gray-600">
							Drop files to Attach or <span class="text-blue-600 underline">Browse</span>
						</span>
					</span>
					<input id="fileSelect" type="file" class="hidden" />
				</label>
				<h3>Hello</h3>
			</div>
			<FilePreview />
		</>
	);
}
