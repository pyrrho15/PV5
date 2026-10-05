import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Github01Icon, Link01Icon } from "@hugeicons/core-free-icons";

export default function Projects() {
    return (
        <section className="space-y-7">
            <h2 className="uppercase text-[16px] font-medium tracking-tight text-neutral-500">Projects</h2>

            <div className="border border-neutral-300/90 shadow-[inset_0_0_3px_1px_rgba(0,0,0,0.1)] rounded-2xl max-w-90">

                <div className="w-full h-45 overflow-hidden rounded-t-2xl">
                    <Image src="/projects/1.png" width={0} height={0} sizes="100vw" className="w-full h-full object-cover" alt="Eleva" />
                </div>

                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium text-[18px]">Eleva</h2>
                        <div className="flex gap-2 text-neutral-600/90">
                            <HugeiconsIcon size={22} strokeWidth={1.6} color="currentColor" icon={Link01Icon} />
                            <HugeiconsIcon size={22} strokeWidth={1.6} color="currentColor" icon={Github01Icon} />
                        </div>
                    </div>
                    <p className="text-neutral-500/95 tracking-tight text-[15px] -mt-2">A prompt enhancing tool where you simply describe what you need in plain English, and it generates a refined, structured prompt optimized for LLMs.</p>

                    <div className="flex items-center gap-3 mt-5">
                        <Image src="/tech-stack/nextjs.svg" alt="Next.js" width={23} height={23} />
                        <Image src="/tech-stack/reactjs.svg" alt="React" width={23} height={23} />
                        <Image src="/tech-stack/typescript.svg" alt="TypeScript" width={23} height={23} />
                        <Image src="/tech-stack/tailwindcss.svg" alt="Tailwind CSS" width={23} height={23} />
                    </div>
                </div>

            </div>
        </section>
    )
}