import Image from "next/image";
import { tech_stack } from "@/lib/array";

export default function TechStack() {
  return (
    <section className="space-y-7">
      <h2 className="uppercase text-[16px] font-medium tracking-tight text-neutral-500">Tech Stack</h2>

      <div className="flex flex-wrap gap-x-2.5 gap-y-2.5">
        {tech_stack.map((tech) => (
          <div key={tech.name} className="flex items-center gap-x-1.5 bg-neutral-100 px-2 py-1 rounded-sm w-fit border border-gray-300 hover:border-gray-400/60 group cursor-pointer shadow">
            <Image src={tech.imgURL} alt={tech.name} className="grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-300" width={17} height={17} />
            <h4 className="text-[13px] text-gray-600/90 group-hover:text-black transition-colors duration-300">{tech.name}</h4>
          </div>
        ))}
      </div>

    </section>
  )
}