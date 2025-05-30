// "use client"
import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav/Nav";
import SmoothScroll from "./components/SmoothScroll";
import { ViewTransitions } from "next-view-transitions";
import Loader from "./components/Loader/Loader";
import Alert from "./components/Alert/Alert";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "DAYDREAM",
  description: "A music player built for the now. Seamless, social, and made to move with you.",
  openGraph: {
    title: "DAYDREAM",
    description: "A music player built for the now. Seamless, social, and made to move with you.",
    url: "https://www.daydreamplayer.com/",
    siteName: "DAYDREAM",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/a829d42c-ed09-4747-8f43-58e1499022a0.png?token=ruKvAORKjKW6MaMDFUDxz1sDkvyHb4T9LHGU_8z5Zko&height=297&width=512&expires=33282915381",
        width: 512,
        height: 297,
        alt: "DAYDREAM preview image",
      },
    ],
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
    <html lang="en">
    <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration = "manual"` }} />
        <link
          rel="icon"
          href="logo.svg"
        />
        <link
          rel="preload"
          href="Archivo_SemiExpanded-SemiBold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="Archivo_SemiExpanded-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        </head>
      <body>
        <Loader />
        <SmoothScroll>
          {children}
          <Alert />
        </SmoothScroll>
        <Nav />
        <Analytics />
      </body>
    </html>
    </ViewTransitions>
  );
}
