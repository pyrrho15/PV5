"use client"
import Image from "next/image";
import { experience } from "@/lib/array";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Experience() {
    return (
        <div className="space-y-7">
            <h2 className="uppercase text-[16px] font-medium tracking-wide text-neutral-500">Experience</h2>

            <div className="space-y-10 border-l border-neutral-200 pl-4">

                {experience.map((exp) => (

                    <div key={exp.company} className="space-y-3 relative">
                        <div className={`h-2 w-2 rounded-full absolute top-2 -left-5 ${exp.current ? 'bg-green-500' : 'bg-neutral-300'}`} />
                        <div className="flex flex-col sm:flex-row gap-y-1 items-start justify-between">
                            <div className="space-y-1 sm:space-y-1.5">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {exp.img && <Image src={exp.img} alt={exp.company} width={22} height={22} />}
                                        <h2 className="text-[17px] tracking-tighter font-medium text-black">{exp.company}</h2>
                                    </div>
                                    <span className="text-[14px] text-neutral-500/90">|</span>
                                    <p className="text-[14px] text-neutral-500/90">{exp.location}</p>
                                </div>

                                <h4 className="font-normal text-[15px] text-neutral-700 tracking-tight">{exp.position}</h4>
                            </div>

                            <p className="text-[14px] text-neutral-500/90">{exp.period}</p>
                        </div>

                        <div className="">
                            <ul className="list-disc pl-5 text-[15px] space-y-1 text-black marker:text-neutral-500/90">
                                {exp.description.map((desc) => (
                                    <li key={desc}>{desc}</li>
                                ))}
                            </ul>
                        </div>

                        {/* show images */}
                        <div className="flex items-center gap-3 pl-1 mt-5">
                            {exp.techStack.map((tech) => (
                                <Tooltip key={tech.name}>
                                    <TooltipTrigger>
                                        <Image src={tech.imgURL} alt={tech.name} width={21} height={21} className="hover:scale-120 transition-all duration-300 cursor-pointer" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{tech.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
}