import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import "./globals.css";
import { auth } from "@/auth";
import ThemeProvider from "@/context/Theme";
import { Toaster } from "@/components/ui/sonner"; // Ensure this path is correct

export const metadata: Metadata = {
    title: "DevOverflow",
    description: "A community-driven platform for asking and answering programming questions.",
    icons: {
        icon: "/images/site-logo.svg",
    },
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="stylesheet"
                      type='text/css'
                      href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
                />
            </head>

            <body className="min-h-screen bg-background font-sans antialiased">
            <SessionProvider session={session}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster />
                </ThemeProvider>
            </SessionProvider>
            </body>
        </html>
    );
};

export default RootLayout;