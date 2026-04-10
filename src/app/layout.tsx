import type { Metadata } from "next";
import { Montserrat, Orbitron } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const orbitron = Orbitron({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "LIPT Protocol - DeFi na Polygon",
  description:
    "LIPT Protocol - O protocolo DeFi deflacionário na Polygon Mainnet. Onde o fogo da escassez forja o valor do futuro. The Forge, The Vault, The BurnEngine.",
  keywords: [
    "LIPT Protocol",
    "DeFi",
    "Polygon",
    "Polygon Mainnet",
    "BurnEngine",
    "Staking",
    "Token",
    "Deflacionário",
    "Crypto",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${orbitron.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-charcoal text-ash font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
            <Toaster position="top-right" richColors />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
