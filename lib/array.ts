export const tech_stack = [
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
  { name: "Cloudflare", imgURL: "/tech-stack/cloudflare.svg" },
  { name: "Electron", imgURL: "/tech-stack/electron.svg" },
  { name: "Figma", imgURL: "/tech-stack/figma.svg" },
  { name: "Gemini API", imgURL: "/tech-stack/gemini.svg" },
  { name: "npm", imgURL: "/tech-stack/npm.svg" },
  { name: "Supabase", imgURL: "/tech-stack/supabase.svg" },
  { name: "Vercel", imgURL: "/tech-stack/vercel.svg" },
];

export const writings = [
  {
    name: "Effeciency of 100 Lines of Code",
    description: "Does writing more lines of code mean better performance?",
    link: "https://magicalcodelines.hashnode.dev/the-secret-efficiency-of-100-lines-of-code",
    img: "/writings/100Lines.png"
  },
  {
    name: "Time Simplicity",
    description: "Quick go-through about time complexity",
    link: "https://time-simplicity.hashnode.dev/time-simplicity",
    img: "/writings/timecomplexity.png"
  },
  {
    name: "Dockerfile Simplified",
    description: "Dockerfile commands",
    link: "https://understand-dockerfile.hashnode.dev/simplifying-dockerfile-commands",
    img: "/writings/docker.png"
  },
  {
    name: "Understanding React Lifecycles",
    description: "Learn how React works internally and manages component lifecycles",
    link: "https://medium.com/@maheshh.kumar1508/react-lifecycle-is-easy-33bb40fbb82e",
    img: "/writings/reactlifecycle.png"
  },
];

export const experience = [
  {
    company: "Stealth Team",
    img: "",
    position: "App Developer",
    location: "Remote",
    period: "July 2026 - Present",
    current: true,
    description: [
      "Building an mobile application using ExpoGo.",
    ],
    techStack: [
      { name: "Expo", imgURL: "/tech-stack/expo.svg" },
      { name: "TypeScript", imgURL: "/tech-stack/typescript.svg" },
    ]
  },
  {
    company: "Adversity Solutions",
    img: "/work/adversity.png",
    position: "Full Stack Developer",
    location: "Remote, Intern",
    period: "Nov 2025 - May 2026",
    current: false,
    description: [
      "Architected and developed an internal tool into a production-ready SaaS product.",
      "Built an AI-powered content planner that helped creators plan and schedule their posts.",
      "Collaborated with the team as a backend developer to build an e-commerce platform for a client."
    ],
    techStack: [
      { name: "React", imgURL: "/tech-stack/reactjs.svg" },
      { name: "Express.js", imgURL: "/tech-stack/expressjs.svg" },
      { name: "Node.js", imgURL: "/tech-stack/nodejs.svg" },
      { name: "MongoDB", imgURL: "/tech-stack/mongodb.svg" },
      { name: "Tailwind CSS", imgURL: "/tech-stack/tailwindcss.svg" }
    ]
  }
];

export const projects = [
  {
    name: "Aegis (Building)",
    img: "/projects/demo.png",
    description: "It's a privacy-focused file storage app where you upload files that which gets encrypted server-side and stored in R2. You can share and download the files within the application.",
    link: ["", "https://github.com/pyrrho15/aegis"],
    techStack: [
      { name: "Next.js", imgURL: "/tech-stack/nextjs.svg" },
      { name: "Better Auth", imgURL: "/tech-stack/better-auth.svg" },
      { name: "PostgreSQL", imgURL: "/tech-stack/postgresql.svg" },
      { name: "Drizzle", imgURL: "/tech-stack/drizzle.svg" },
      { name: "GSAP", imgURL: "/tech-stack/gsap.svg" },
      { name: "Cloudflare", imgURL: "/tech-stack/cloudflare.svg" }
    ],
    tags: ["fullstack", "new", "design"],
    isFeatured: true
  },
  {
    name: "WildCast Co.",
    img: "/projects/wildcast.png",
    description: "Landing page that shows the fishing gears with animations and a clean design.",
    link: ["https://design-fishing.vercel.app/", "https://github.com/pyrrho15/fishing"],
    techStack: [
      { name: "Next.js", imgURL: "/tech-stack/nextjs.svg" },
      { name: "Tailwind CSS", imgURL: "/tech-stack/tailwindcss.svg" },
      { name: "GSAP", imgURL: "/tech-stack/gsap.svg" }
    ],
    tags: ["design", "new"],
    isFeatured: true
  },
  {
    name: "Content Planner AI",
    img: "/projects/contentplanner.png",
    description: "An AI powered platform where you tell about your brand, and it'll generate a month's worth of platform-ready marketing posts in under a minute.",
    link: ["https://ai-content-planner-xi.vercel.app/", "https://github.com/pyrrho15/content-planner-ai"],
    techStack: [
      { name: "React", imgURL: "/tech-stack/reactjs.svg" },
      { name: "Express.js", imgURL: "/tech-stack/expressjs.svg" },
      { name: "Node.js", imgURL: "/tech-stack/nodejs.svg" },
      { name: "Gemini API", imgURL: "/tech-stack/gemini.svg" },
      { name: "MongoDB", imgURL: "/tech-stack/mongodb.svg" }
    ],
    tags: ["ai", "fullstack"],
    isFeatured: false
  },
  {
    name: "GymTrac",
    img: "/projects/demo.png",
    description: "A fitness tracking app built to help users manage and track their gym workouts. It provides a structured way to keep track of exercises and workout progress, with a simple mobile-first interface.",
    link: ["", "https://github.com/pyrrho15/GymTrac"],
    techStack: [
      { name: "Expo", imgURL: "/tech-stack/expo.svg" },
      { name: "Supabase", imgURL: "/tech-stack/supabase.svg" }
    ],
    tags: ["app", "new"],
    isFeatured: false
  },
  {
    name: "ExpenseMCP",
    img: "/projects/expensemcp.png",
    description: "An MCP-based expense tracker that lets AI assistants manage expenses through natural language. It provides tools to add, retrieve, and delete expenses while supporting filtering by categories, dates, and descriptions.",
    link: ["", "https://github.com/pyrrho15/mcp-server-expense-tracker"],
    techStack: [
      { name: "MCP", imgURL: "/tech-stack/mcp.svg" },
      { name: "TypeScript", imgURL: "/tech-stack/typescript.svg" }
    ],
    tags: ["ai"],
    isFeatured: false
  },
  {
    name: "Taimer",
    img: "/projects/taimer.png",
    description: "A lightweight desktop timer designed to help users stay aware of how long they spend on a task. The timer stays on top of other windows, keeping the elapsed time visible while you work. It provides a simple, distraction-free way to track task duration without constantly switching between applications.",
    link: ["", "https://github.com/pyrrho15/Taimer"],
    techStack: [
      { name: "Electron", imgURL: "/tech-stack/electron.svg" },
      { name: "React", imgURL: "/tech-stack/reactjs.svg" }
    ],
    tags: ["app", "fullstack"],
    isFeatured: false
  },
  {
    name: "Eleva",
    img: "/projects/eleva.png",
    description: "A prompt enhancing tool where you simply describe what you need in plain English, and it generates a refined, structured prompt optimized for LLMs.",
    link: ["https://eleva-ai.vercel.app/", "https://github.com/pyrrho15/prompt-enhancer"],
    techStack: [
      { name: "React", imgURL: "/tech-stack/reactjs.svg" },
      { name: "Tailwind CSS", imgURL: "/tech-stack/tailwindcss.svg" }
    ],
    tags: ["ai", "design"],
    isFeatured: false
  },
  {
    name: "Foobia",
    img: "/projects/foobia.png",
    description: "Tired of waiting in queue to order the food, so built a food ordering app, where students can place order and collect the food when it's ready.",
    link: ["https://foobia.vercel.app/", "https://github.com/pyrrho15/Foobia"],
    techStack: [
      { name: "React", imgURL: "/tech-stack/reactjs.svg" },
      { name: "Node.js", imgURL: "/tech-stack/nodejs.svg" },
      { name: "Express.js", imgURL: "/tech-stack/expressjs.svg" },
      { name: "MongoDB", imgURL: "/tech-stack/mongodb.svg" }
    ],
    tags: ["fullstack"],
    isFeatured: false
  },
  {
    name: "Bookmark Vault",
    img: "/projects/bookmark.png",
    description: "Store and manage your bookmarks in a secure vault, with features to add delete bookmarks and extract to pdf along with a user-friendly interface",
    link: ["bookmark-vault.vercel.app", "https://github.com/pyrrho15/Bookmark-Vault"],
    techStack: [
      { name: "React", imgURL: "/tech-stack/reactjs.svg" },
      { name: "Node.js", imgURL: "/tech-stack/nodejs.svg" },
      { name: "Express.js", imgURL: "/tech-stack/expressjs.svg" },
      { name: "MongoDB", imgURL: "/tech-stack/mongodb.svg" }
    ],
    tags: ["fullstack"],
    isFeatured: false
  },
  {
    name: "Todo CLI",
    img: "/projects/todocli.png",
    description: "Built a simple CLI tool to manage your tasks for terminal lovers, with an auto-deletion mechanism after 24 hours to reduce long-term task backlog.",
    link: ["https://www.npmjs.com/package/todo-in-cli", "https://github.com/pyrrho15/todo-cli"],
    techStack: [
      { name: "TypeScript", imgURL: "/tech-stack/typescript.svg" },
      { name: "npm", imgURL: "/tech-stack/npm.svg" }
    ],
    tags: [],
    isFeatured: false
  },
]
