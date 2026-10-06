"use client"
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Github01Icon, Link01Icon } from "@hugeicons/core-free-icons";
import { ArrowRight } from "lucide-react";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { projects } from "@/lib/array";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Projects() {
    const featuredProjects = projects.filter(project => project.isFeatured);
    const viewAllRef = useRef<HTMLAnchorElement>(null);
    const arrowRef = useRef<SVGSVGElement>(null);

    const { contextSafe } = useGSAP({ scope: viewAllRef });

    const handleViewAllEnter = contextSafe(() => {
        if (arrowRef.current) {
            gsap.to(arrowRef.current, { x: 4, duration: 0.3 });
        }
    });

    const handleViewAllLeave = contextSafe(() => {
        if (arrowRef.current) {
            gsap.to(arrowRef.current, { x: 0, duration: 0.3 });
        }
    });

    return (
        <section className="space-y-7">
            <div className="flex items-center justify-between">
                <h2 className="uppercase text-[16px] font-medium tracking-tight text-neutral-500">Featured Projects</h2>
                <a
                    ref={viewAllRef}
                    href="/projects"
                    className="flex items-center gap-1 text-sm text-neutral-600/90 hover:text-neutral-900 transition-colors"
                    onMouseEnter={handleViewAllEnter}
                    onMouseLeave={handleViewAllLeave}
                >
                    View All
                    <ArrowRight size={16} ref={arrowRef} />
                </a>
            </div>

            <div className="flex flex-row flex-wrap gap-4 items-stretch justify-center">
                {featuredProjects.map((project) => (
                    <div key={project.name} className="border border-neutral-300/90 shadow-[inset_0_0_4px_0px_rgba(0,0,0,0.1)] rounded-2xl max-w-90">

                        {project.img && (
                            <div className="w-full h-45 overflow-hidden rounded-t-2xl">
                                <Image src={project.img} width={0} height={0} sizes="100vw" className="w-full h-full object-cover" alt={project.name} />
                            </div>
                        )}

                        <div className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="font-medium text-[18px]">{project.name}</h2>
                                <div className="flex gap-2 text-neutral-600/90">
                                    {project.link[0] && (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <a href={project.link[0]} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                                                    <HugeiconsIcon size={22} strokeWidth={1.6} color="currentColor" icon={Link01Icon} />
                                                </a>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Live Demo</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                    {project.link[1] && (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <a href={project.link[1]} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                                                    <HugeiconsIcon size={22} strokeWidth={1.6} color="currentColor" icon={Github01Icon} />
                                                </a>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Source Code</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )}
                                </div>
                            </div>
                            <p className="text-neutral-500/95 tracking-tight text-[15px] -mt-2">{project.description}</p>

                            <div className="flex items-center gap-3 mt-5">
                                {project.techStack.map((tech) => (
                                    tech.imgURL && (
                                        <Tooltip key={tech.name}>
                                            <TooltipTrigger>
                                                <Image src={tech.imgURL} alt={tech.name} width={23} height={23} className="hover:scale-120 transition-all duration-300 cursor-pointer" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{tech.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    )
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}