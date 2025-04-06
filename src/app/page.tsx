"use client"
import Hero from "./components/Hero/Hero";
import Introduction from "./components/Introduction/Introduction";
import FloatingCards from "./components/FloatingCards/FloatingCards";
import Features from "./components/Features/Features";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useState } from "react";
import styles from './main.module.scss'
import { useStore } from "@/useStore";
import FullCards from "./components/Cards/FullCards";
import Render from "./components/Render";
import Colors from "./components/Colors/Colors";
import Specs from "./components/Specs/Specs";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [mounted,setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      ScrollTrigger.getAll().forEach((instance) => {
        instance.kill();
      });
    }
  },[])

  if (!mounted) return <></>;   

  return (
    <>
    <div className={styles.wrapper}>
      <Hero />
      <Introduction />
      <FloatingCards />
      <Features />
      <FullCards />
      <Render />
      <Colors />
      <Specs />
    </div>
    <Footer />
    </>
  )
}