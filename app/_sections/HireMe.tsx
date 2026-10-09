"use client"
import ContactForm from "@/app/_utils/ContactForm"
import { ArrowRight } from "lucide-react"
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function HireMe() {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const arrowRef = useRef<SVGSVGElement>(null);
    const shadowRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP({ scope: linkRef });

    const handleLinkEnter = contextSafe(() => {
        if (arrowRef.current) {
            gsap.to(arrowRef.current, { x: 4, duration: 0.3 });
        }
        if (shadowRef.current) {
            gsap.to(shadowRef.current, { left: "120%", duration: 0.4, ease:"power4.out" });
        }
    });

    const handleLinkLeave = contextSafe(() => {
        if (arrowRef.current) {
            gsap.to(arrowRef.current, { x: 0, duration: 0.3 });
        }
        if (shadowRef.current) {
            gsap.to(shadowRef.current, { left: "-30px", duration: 0.4, ease:"power4.out" });
        }
    });

    return (
        <div className="space-y-7 font-sans">

            <h2 className="uppercase text-[16px] font-medium tracking-wide text-neutral-500">Hire me</h2>

            <div className="flex gap-x-3 gap-y-5 flex-wrap flex-col md:flex-row">


                {/* <div className="flex-1 flex flex-col gap-y-4 border border-neutral-300/90 shadow-[inset_0_0_4px_0px_rgba(0,0,0,0.1)] rounded-lg px-6 py-6 justify-between items-center"> */}
                <div className="flex-1 flex flex-col gap-y-6 justify-between items-center">
                    <div className="space-y-2">
                        {/* <h3 className="text-[20px] font-medium tracking-tight">Get in touch</h3> */}
                        <p className="text-[16px] text-black text-center">
                            Have an idea? I can bring it live within weeks. I'm available for internships & freelancing gigs.
                            I can build from fancy websites to lame (like this one) or, are you confused with your requirements? Schedule a free 30-minute call.
                        </p>
                    </div>
                    <a
                        ref={linkRef}
                        href="https://calendly.com/maheshh-kumarr05/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-fit items-center justify-center gap-x-3 bg-black text-white py-2 px-7 rounded-lg relative overflow-hidden"
                        onMouseEnter={handleLinkEnter}
                        onMouseLeave={handleLinkLeave}
                    >
                        <div className="absolute z-15 inset-0 border-t-2 border-white/50 shadow-[inset_0_2px_12px_1px_rgba(255,255,255,0.5)]" />
                        
                        <div ref={shadowRef} className="absolute -left-8 blur-md shadow-[0_0_10px_2px_rgba(255,255,255,0.5)] bg-white skew-x-40 z-10 w-3 h-full" />

                        <p className="text-[15px] tracking-tight relative z-2">Let's talk</p>
                        <ArrowRight color="currentColor" size={18} ref={arrowRef} className="relative z-15" />
                    </a>
                </div>

                {/* <div className="flex-1 border border-neutral-300/90 shadow-[inset_0_0_4px_0px_rgba(0,0,0,0.1)] rounded-lg px-6 py-5 space-y-3">
                    <div className="space-y-1">
                        <h3 className="text-[20px] font-medium tracking-tight">Send a message</h3>
                        <p className="text-[14px] text-neutral-500">Prefer to write? I'll get back to you within 24-hours</p>
                    </div>
                    <ContactForm />
                </div> */}
            </div>
        </div>
    )
}

export default HireMe
