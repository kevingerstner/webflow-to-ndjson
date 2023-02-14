export default function SaveButton({ saved }) {

    return (
        <>
            {
                saved ? <button type="submit" disabled className="bg-gray-300 rounded-md mt-5 py-2 px-5 text-white font-bold">Saved</button>
                    : <button type="submit" className="bg-primary-400 rounded-md mt-5 py-2 px-5 text-white font-bold hover:bg-blue-300 transition-colors">Save</button>

            }
        </>
    )
}