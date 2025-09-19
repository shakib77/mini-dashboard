"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Providers from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}
      >
        <Providers>
          <Header toggle={toggleSidebar} />
          <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
          <main className="pt-16 md:pl-64">
            <div className="p-4 md:p-6">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
