import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// import { SessionProvider } from "next-auth/react"; //context provider that fetches the session internally and provides it to the children
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CMS",
  description: "Content Management System for ecommerce bussiness",
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
        <ModalProvider />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
