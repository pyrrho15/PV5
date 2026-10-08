import Link from "next/link";

export default function Header() {
    return (
        <header
            className="h-17 w-full flex bg-white items-center justify-end gap-x-6 px-6 font-sans text-[14px] tracking-wide text-neutral-600/90"
        >
            <Link href="/">Home</Link>
            {/* <Link href="/about">About</Link> */}
            <Link href="https://playground-mahi.vercel.app/">Playground</Link>
        </header>
    );
}