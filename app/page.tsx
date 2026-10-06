"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import About from "./_sections/About";
import TechStack from "./_sections/TechStack";
import Writings from "./_sections/Writings";
import Experience from "./_sections/Experience";
import Projects from "./_sections/Projects";
import HireMe from "./_sections/HireMe";

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sections = containerRef.current?.children

    if (sections) {
      gsap.to(containerRef.current, { opacity: 1, duration: 0.3 })

      Array.from(sections).forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        )
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col gap-y-13 opacity-0">
      <About />
      <Experience />
      <TechStack />
      <Projects />
      <Writings />
      <HireMe />
    </div>
  );
}
