import Image from "next/image";

const tech_stack = [
  { name: "JavaScript", imgURL: "/tech-stack/javascript.svg" },
  { name: "Python", imgURL: "/tech-stack/python.svg" },
  { name: "TypeScript", imgURL: "/tech-stack/typescript.svg" },
  { name: "Next.js", imgURL: "/tech-stack/nextjs.svg" },
  { name: "React", imgURL: "/tech-stack/reactjs.svg" },
  { name: "React Native", imgURL: "/tech-stack/reactnative.svg" },
  { name: "Express.js", imgURL: "/tech-stack/expressjs.svg" },
  { name: "Expo", imgURL: "/tech-stack/expo.svg" },
  { name: "FastAPI", imgURL: "/tech-stack/fastapi.svg" },
  { name: "MongoDB", imgURL: "/tech-stack/mongodb.svg" },
  { name: "Mongoose", imgURL: "/tech-stack/mongoose.svg" },
  { name: "PostgreSQL", imgURL: "/tech-stack/postgresql.svg" },
  { name: "NeonDB", imgURL: "/tech-stack/neondb.svg" },
  { name: "Firebase", imgURL: "/tech-stack/firebase.svg" },
  { name: "Better Auth", imgURL: "/tech-stack/better-auth.svg" },
  { name: "Docker", imgURL: "/tech-stack/docker.svg" },
  { name: "Drizzle", imgURL: "/tech-stack/drizzle.svg" },
  { name: "Git", imgURL: "/tech-stack/git.svg" },
  { name: "GitHub", imgURL: "/tech-stack/github.svg" },
  { name: "GSAP", imgURL: "/tech-stack/gsap.svg" },
  { name: "LangChain", imgURL: "/tech-stack/langchain.svg" },
  { name: "MCP", imgURL: "/tech-stack/mcp.svg" },
  { name: "n8n", imgURL: "/tech-stack/n8n.svg" },
  { name: "Postman", imgURL: "/tech-stack/postman.svg" },
  { name: "Tailwind CSS", imgURL: "/tech-stack/tailwindcss.svg" },
];

export default function TechStack() {
  return (
    <section className="space-y-7">
      <h2 className="uppercase text-[16px] font-medium tracking-tight text-neutral-500">Tech Stack</h2>

      <div className="flex flex-wrap gap-x-2.5 gap-y-2.5">
        {tech_stack.map((tech) => (
          <div key={tech.name} className="flex items-center gap-x-1.5 bg-neutral-100 px-2 py-1 rounded-sm w-fit border border-gray-300 hover:border-gray-400/60 group cursor-pointer shadow">
            <Image src={tech.imgURL} alt={tech.name} className="grayscale group-hover:grayscale-0 transition-all duration-300" width={17} height={17} />
            <h4 className="text-[13px] text-gray-600/90 group-hover:text-black transition-colors duration-300">{tech.name}</h4>
          </div>
        ))}
      </div>

    </section>
  )
}