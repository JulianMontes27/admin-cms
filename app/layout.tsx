import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "next-auth/react"; //context provider that fetches the session internally and provides it to the children
import ModalProvider from "@/providers/modal-provider";
import toast, { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CMS",
  description: "CMS",
};
//root
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <SessionProvider>
          <ModalProvider />
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
