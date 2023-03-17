import Image from "next/image";

export default function WebflowSiteBrowser({ userInfo, sitesInfo, selectHandler }) {
    return (
        <>
            <section className="py-20">
                <div className="container">
                    <h2>Select a site:</h2>
                    <div className="grid grid-cols-3 gap-5">
                        {
                            sitesInfo ? (sitesInfo.map((site, index) => (
                                <div key={index} onClick={(event) => selectHandler(event, index)} className="border-2 border-gray-300 p-5 rounded-md inline-block hover:opacity-75 cursor-pointer transition-opacity duration-300">
                                    <Image src={site.previewUrl} width="300" height="200" alt={site.name}></Image>
                                    <h3 className="font-bold mt-5">{site.name}</h3>
                                </div>
                            ))) : null
                        }
                    </div>
                </div>
            </section>
        </>
    )
}