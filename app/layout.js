import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Undangan Jujum & Putri",
  description: "Undangan Pernikahan Jujum & Putri",
  openGraph: {
    title: "Undangan Jujum & Putri",
    description: "Undangan Pernikahan Jujum & Putri",
    url: "https://undangan-jujum-putri.vercel.app",
    images: [
      {
        url: "/preview.jpeg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
