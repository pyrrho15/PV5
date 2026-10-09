"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    return (
        <header
            className="h-15 w-full flex items-center justify-end gap-x-6 px-6 font-sans text-[14px] text-neutral-600/90 tracking-normal  sticky top-0 z-50 bg-white "
        >
            <Link href="/" className={pathname === "/" ? "text-black" : ""}>Home</Link>
            {/* <Link href="/about">About</Link> */}
            <Link href="https://playground-mahi.vercel.app/">Playground</Link>
        </header>
    );
}