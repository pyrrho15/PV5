import Image from "next/image";
import Socials from "../_utils/Socials";

export default function About() {
    return (
        <section className="flex flex-col gap-y-7">
            <div className="flex items-center gap-6">
                <Image className="rounded-xl border-2 border-gray-300" src="/icons/me.png" loading="eager" alt="Pyrrho" width={100} height={100} />
                <div className="flex flex-col gap-y-0.5">
                    <h1 className="text-2xl font-sans tracking-tighter font-medium">Mahesh Kumar G</h1>
                    <h3 className="text-[16px] font-sans text-neutral-500/90 tracking-tight">Engineer.</h3>
                    <p className="text-[13px] font-sans tracking-tight text-neutral-500/80">21, Karnataka, India</p>
                </div>
            </div>

            <div className="font-sans text-[15px] flex flex-col gap-y-3 text-black">
                <h2>I build full-stack applications, handling everything from design to deployment. I love exploring both the software and hardware worlds and have an eye for design.</h2>
                <h2>Currently working with Next.js, Arduino and learning design.</h2>
            </div>

            <Socials />
        </section>
    )
}