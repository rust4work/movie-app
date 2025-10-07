// import Link from "next/link"
"use client";
import "./globals.css";
import { Tabs, TabsProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

const tabItems: TabsProps["items"] = [
  { key: "/", label: "Search" },
  { key: "rated", label: "Rated" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const activeKey = pathname.includes("rated") ? "rated" : "/";
  return (
    <html lang="en">
      <head>
        <title>Movie Search</title>
        <link rel="icon" href="./movie-icon.ico" />
      </head>
      <body className="flex flex-col items-center ">
        <nav className=" mt-5 w-screen flex justify-center shadow-sm">
          <Tabs
            activeKey={activeKey}
            onChange={(key) => router.push(`/${key}`)}
            items={tabItems}
          />
        </nav>

        <main className="w-screen flex justify-center mt-1">{children}</main>
      </body>
    </html>
  );
}
