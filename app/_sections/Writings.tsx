"use client"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronsRight } from "lucide-react"
import { useRef } from 'react';
import { writings } from "@/lib/array";
import Image from "next/image";

export default function Writings() {
    const container = useRef<HTMLDivElement>(null)

    const { contextSafe } = useGSAP({ scope: container })

    useGSAP(() => {
        gsap.set(".arrow", { opacity: 0, x: -16 })
        gsap.set(".writing-img", { opacity: 1 })
    }, { scope: container })
    
    const handleEnter = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
        const arrow = e.currentTarget.querySelector(".arrow")
        if (arrow) {
            gsap.to(arrow, {
                translateX: 0,
                opacity: 1,
                duration: 0.3,
                ease: "back.out(1.7)"
            })
        }
        const img = e.currentTarget.querySelector(".writing-img") as HTMLElement | null
        if (img) {
            gsap.to(img, {
                opacity: 0.8,
                duration: 0.3,
                ease: "power2.out"
            })
        }
    })
    const handleLeave = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
        const arrow = e.currentTarget.querySelector(".arrow")
        if (arrow) {
            gsap.to(arrow, {
                translateX: -16,
                opacity: 0,
                duration: 0.3,
                ease: "back.in(1.7)"
            })
        }
        const img = e.currentTarget.querySelector(".writing-img") as HTMLElement | null
        if (img) {
            gsap.to(img, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            })
        }
    })

    return (
        <section>
            <div className="space-y-7">
                <h2 className="uppercase text-[16px] font-medium tracking-wide text-neutral-500">Writings</h2>

                <div ref={container} className="space-y-6">
                    {writings.map((blog) => (
                        <a
                            key={blog.name}
                            className="block relative"
                            href={blog.link}
                            target="_blank"
                            onMouseEnter={(e) => handleEnter(e)}
                            onMouseLeave={(e) => handleLeave(e)}
                        >
                            <div className="flex items-center space-x-4">
                                {blog.img && (
                                    <div className="shrink-0">
                                        <Image
                                            src={blog.img}
                                            alt={blog.name}
                                            width={55}
                                            height={55}
                                            className="object-cover rounded-md writing-img"
                                        />
                                    </div>
                                )}
                                <div className="group font-sans space-y-1.5 text-neutral-500/90">
                                    <div className="flex items-center gap-1">
                                        <h3 className="group-hover:text-neutral-500/90 transition-colors duration-300 text-black text-[17px] font-medium tracking-tight">
                                            {blog.name}
                                        </h3>
                                        <ChevronsRight size={21} strokeWidth={2} color="#000000cc" className="arrow shrink-0 -rotate-x-45 mt-1" />
                                    </div>

                                    <p className="text-neutral-500/90 text-[15px]">{blog.description}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    )
}