import type { Metadata } from "next";
import "./globals.css";
import { AppGate } from "@/components/AppGate";

export const metadata: Metadata = {
  title: "DB Imports | Estilo. Qualidade. Presença.",
  description: "Catálogo de moda masculina da DB Imports. Conheça nossas peças, cores e tamanhos. @db_imports79",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="antialiased">
        <AppGate>{children}</AppGate>
      </body>
    </html>
  );
}
