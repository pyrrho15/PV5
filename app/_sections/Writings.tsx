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
    return (
        <section>
            <div className="space-y-5">
                <h2 className="uppercase text-[16px] font-medium tracking-wide text-neutral-500">Writings</h2>

                <div className="space-y-6">
                    {writings.map((blog) => (
                        <a key={blog.name} className="group font-sans space-y-1.5 block" href={blog.link} target="_blank">
                            <h3 className="group-hover:text-neutral-500/90 transition-colors duration-300 text-[#282828] text-[17px] font-medium tracking-tight">{blog.name}</h3>
                            <p className="text-neutral-500/90 text-[15px]">{blog.description}</p>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    )
}
