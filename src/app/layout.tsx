// "use client"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TransitionLink from "./components/TransitionLink3D";
import Render from './components/Logo3D/Logo3D'
import FadeLayer from "./components/FadeLayer";
import Nav from "./components/Nav/Nav";
import SmoothScroll from "./components/SmoothScroll";
import { ViewTransitions } from "next-view-transitions";
import { usePathname } from "next/navigation";
import Loader from "./components/Loader/Loader";

export const metadata: Metadata = {
  title: "DAYDREAM",
  description: "A music player built for the now. Seamless, social, and made to move with you.",
  openGraph: {
    title: "DAYDREAM",
    description: "A music player built for the now. Seamless, social, and made to move with you.",
    url: "https://daydream-lilac.vercel.app/",
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
        <link
          rel="icon"
          href="logo.svg"
        />
        <link
          rel="preload"
          href="acumin-pro-wide-medium.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="acumin-pro-wide-bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="acumin-pro-wide.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        
        </head>

      <body>
        <Loader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {/* <div style={{color:"white",position: "absolute",top:"1%",left:"50%",transform:"translate(-50%,-50%)",zIndex:10}}>
            <TransitionLink href="/oldal">oldal</TransitionLink>
            <TransitionLink href="/">fing</TransitionLink>
        </div> */}
        <Nav />
        {/* <FadeLayer /> */}
        {/* <Render /> */}
      </body>
    </html>
    </ViewTransitions>
  );
}
