import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative w-full h-72 flex flex-col justify-center">
            <div className="bg-gradient-to-r from-black to-transparent w-full h-full absolute z-10"></div>
            <div className="container relative z-20 text-white p10">
                <h1>Dashboard</h1>
            </div>
            <Image src="https://gopjskfngehdlvdeewoi.supabase.co/storage/v1/object/public/images/twigs-g0de051870_1920.jpg?t=2023-03-18T19%3A46%3A06.149Z" alt="" fill className="object-cover z-0" />
        </div>
    )
}