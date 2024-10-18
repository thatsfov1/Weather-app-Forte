import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "../components/sidebar";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Test task for Forte Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex">
        <StoreProvider>
          <Sidebar />
          <div className="flex-1 ml-6 sm:ml-48 lg:ml-64 p-6">{children}</div>
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
