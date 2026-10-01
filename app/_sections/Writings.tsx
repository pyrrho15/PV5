"use client"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronsRight } from "lucide-react"
import { useRef } from 'react';

export default function Writings() {

    const writings = [
        {
            name: "Effeciency of 100 Lines of Code",
            description: "Does writing more lines of code mean better performance?",
            link: "https://magicalcodelines.hashnode.dev/the-secret-efficiency-of-100-lines-of-code"
        },
        {
            name: "Time Simplicity",
            description: "Quick go-through about time complexity",
            link: "https://time-simplicity.hashnode.dev/time-simplicity"
        },
        {
            name: "Dockerfile Simplified",
            description: "Dockerfile commands",
            link: "https://understand-dockerfile.hashnode.dev/simplifying-dockerfile-commands"
        },
        {
            name: "Understanding React Lifecycles",
            description: "Learn how React works internally and manages component lifecycles",
            link: "https://medium.com/@maheshh.kumar1508/react-lifecycle-is-easy-33bb40fbb82e"
        },
    ]

    const container = useRef<HTMLDivElement>(null)

    const { contextSafe } = useGSAP({ scope: container })

    // useGSAP(()=>{
    //     gsap.set(".arrow", { rotateZ: -40 })
    // })

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
    })

    return (
        <section>
            <div className="space-y-7">
                <h2 className="uppercase text-[16px] font-medium tracking-wide text-neutral-500">Writings</h2>

                <div ref={container} className="space-y-6">
                    {writings.map((blog) => (
                        <a
                            key={blog.name}
                            className="group font-sans space-y-1.5 block relative text-neutral-500/90"
                            href={blog.link}
                            target="_blank"
                            onMouseEnter={(e) => handleEnter(e)}
                            onMouseLeave={(e) => handleLeave(e)}
                        >
                            <div className="flex items-center gap-1">
                                <h3 className="group-hover:text-neutral-500/90 transition-colors duration-300 text-black text-[17px] font-medium tracking-tight">
                                    {blog.name}
                                </h3>
                                <ChevronsRight size={21} strokeWidth={2} color="blackcc" className="arrow shrink-0 -rotate-x-45 mt-1 -translate-x-4 opacity-0" />
                            </div>

                            <p className="text-neutral-500/90 text-[15px]">{blog.description}</p>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    )
}