import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@components/Navbar";
// change color theme


export const metadata: Metadata = {
  title: "FlickFusion",
  description: "A Movie Streaming Service",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="">
        <div className="main dark:bg-primary-dark bg-primary-light">
          <div className="gradient"/>
        </div>
        <main className="app dark:text-primary-light text-primary-dark ">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
