import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import "./globals.css";
import ConditionalNavbar from "./components/ConditionalNavbar";

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
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}

