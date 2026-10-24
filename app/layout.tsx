import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://a7rio.vercel.app"),
  title: "A7 Rio | Passeios de Jet Ski, Ilhas Tijucas e experiências no RJ",
  description: "Descubra o Rio pelo mar. Consulte passeios de Jet Ski, Ilhas Tijucas e lancha com Jet Ski. Reservas diretamente com operadores parceiros da A7 Rio.",
  keywords: ["A7 Rio", "passeios Rio de Janeiro", "jet ski Barra da Tijuca", "Ilhas Tijucas", "lancha Rio de Janeiro"],
  openGraph: {
    title: "A7 Rio | Viva um outro lado do Rio de Janeiro",
    description: "Passeios, mar, ilhas e experiências para descobrir o Rio. Confira opções e consulte os parceiros.",
    images: ["/assets/tijucas.jpg"],
    siteName: "A7 Rio",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}><body className="min-h-full flex flex-col">{children}</body></html>;
}
