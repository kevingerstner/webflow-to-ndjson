export default function WebflowSite({ site, backHandler }) {

    return (
        <section className="py-20">
            <div className="container">
                <button onClick={backHandler} className="mb-10 px-5 py-2 rounded-full border-2 border-black bg-transparent">Back to sites</button>
                <h1>{site.name}</h1>
            </div>
        </section>
    )
}