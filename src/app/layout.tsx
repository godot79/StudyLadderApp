import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dharma's Study Ladder",
  description: "Practice maths, english, geography, space, and science.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
