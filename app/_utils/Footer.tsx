import Socials from "./Socials";

export default function Footer() {
    return (
        <footer
            className="h-17 w-full flex flex-col md:flex-row bg-white items-center justify-between px-6 font-sans text-[14px] tracking-wide gap-y-4 font-light border-t border-t-neutral-500/70 pt-5 mt-15 mb-8"
        >
            <h3>&copy; 2026 Pyrrho</h3>
            <Socials />
        </footer>
    )
}