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
      <body className="flex flex-col items-center">
        {/* Header + Tabs */}
        <nav className=" mt-5">
          <Tabs
            activeKey={activeKey}
            onChange={(key) => router.push(`/${key}`)}
            items={tabItems}
          />
        </nav>

        {/* Контент страницы */}
        <main className="w-screen flex justify-center mt-10">{children}</main>
      </body>
    </html>
  );
}
