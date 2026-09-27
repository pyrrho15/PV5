import Image from "next/image";

export default function About() {
    return (
        <section className="flex flex-col gap-y-9">
            <div className="flex items-center gap-7">
                <Image className="rounded-xl border-2 border-gray-300" src="/icons/me.png" loading="eager" alt="Pyrrho" width={120} height={120} />
                <div className="flex flex-col gap-y-0.5">
                    <h1 className="text-2xl font-sans tracking-tight font-medium">Mahesh Kumar G</h1>
                    <h3 className="text-[16px] font-sans text-gray-600/80">Engineer.</h3>
                    <p className="text-[14px] font-sans text-gray-600/90">21, Karnataka, India</p>
                </div>
            </div>

            <div className="font-sans text-md flex flex-col gap-y-3 text-[#282828] text-balance">
                <h2>I build full-stack applications, handling everything from design to deployment. I love exploring both the software and hardware worlds, and sometimes, I just don’t do anything at all.
                </h2>
                <h2>Currently working with TypeScript, Next.js, Tailwind CSS and bit of Arduino.</h2>
            </div>
        </section>
    )
}