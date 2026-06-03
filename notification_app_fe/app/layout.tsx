import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Notification System",
  description: "Notification Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}