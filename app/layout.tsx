import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./(header)/Navbar";

export const metadata: Metadata = {
  title: "Urlaubstracker Clone | Finde echte Urlaubsschnäppchen",
  description: "Wir durchsuchen täglich das Internet nach den besten Reisedeals für dich.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased font-poppins selection:bg-secondary selection:text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

