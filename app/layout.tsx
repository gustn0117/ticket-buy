import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import ChatWidget from "@/components/chat/ChatWidget";
import VisitorTracker from "@/components/VisitorTracker";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "티켓바이 - 상품권 매입/매도 중개 플랫폼",
  description: "안전하고 빠른 온라인 상품권 거래, 티켓바이에서 시작하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-background">
        <AuthProvider>
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <ChatWidget />
          <VisitorTracker />
          <MobileNav />
        </AuthProvider>
      </body>
    </html>
  );
}
