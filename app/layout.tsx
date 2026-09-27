import type { Metadata } from "next";
import "./globals.css";
import Header from "./_utils/Header";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "Pyrrho | Engineer",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-w-screen h-screen relative">

        <svg className="absolute mask-r-from-50% mask-l-from-50% inset-0 w-full h-full -z-1">
          <defs>
            <pattern id="grid" width="70" height="70" patternUnits="userSpaceOnUse">
              <rect width="100%" height="100%" strokeWidth="1" stroke="#707070" opacity="0.1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="h-screen max-w-3xl mx-auto border-x-0">
          <Header />
          <div className="px-4 mt-8">
            {children}
          </div>
        </div>

      </body>
    </html>
  );
}
