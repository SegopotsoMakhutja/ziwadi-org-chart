import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const notoSans = Lato({
  weight: ['400','700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Ziwadi Org Chart",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
