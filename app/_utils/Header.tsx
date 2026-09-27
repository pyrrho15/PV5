import Link from "next/link";

export default function Header() {
    return (
        <header
            className="h-17 w-full flex bg-white items-center justify-end gap-x-6 px-6 font-sans text-[15px] tracking-wide font-light"
        >
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/">Playground</Link>
        </header>
    );
}