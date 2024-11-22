"use client"

import Header from "@/components/UI/Header";
import Navbar from "@/components/UI/Navbar";

import { SessionProvider } from "next-auth/react";
import "../globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  
    return (
        <SessionProvider>
            <main className="relative bg-white w-full min-h-screen" >
                <section className="flex w-full h-full">
                    <Navbar></Navbar>
                    <main className="w-full">
                        <section className="w-full min-h-screen max-h-screen relative  overflow-y-auto ">
                            <Header></Header>
                            <div className="mt-16 px-4 w-full " >
                                {children}
                            </div>
                        </section>
                    </main >
                </section>
               
            </main>
        </SessionProvider>
    );
}
