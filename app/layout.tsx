import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "A7Rio — Experiências premium no mar do Rio",
  description:
    "A7Rio cria experiências exclusivas no mar do Rio, com roteiros personalizados, passeios de lancha e suporte completo para turistas e moradores.",
  keywords: ["A7Rio", "Rio de Janeiro", "lancha", "jet ski", "ilhas Tijucas", "ilhas Gigoia", "experiência premium"],
  openGraph: {
    title: "A7Rio — Experiências premium no mar do Rio",
    description:
      "A7Rio cria experiências exclusivas no mar do Rio, com roteiros personalizados, passeios de lancha e suporte completo para turistas e moradores.",
    images: ["/assets/tijucas.jpg"],
    siteName: "A7Rio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
