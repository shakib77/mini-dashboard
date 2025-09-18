import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/providers";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini Dashboard",
  description: "A mini dashboard built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <Providers>
          <Header />
          <Sidebar />
          <main className="pt-16 md:pl-64">
            <div className="p-4 md:p-6">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
