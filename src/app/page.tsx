"use client"
import Shader from "./components/Hero/Aurora";
import GradientWave from "./components/GradientWave/GradientWave";
import Nav from "./components/Nav/Nav";
import Render from "./components/Render";
import ScrollVelocity from "./components/ScrollText/ScrollText";
import Hero from "./components/Hero/Hero";
import Introduction from "./components/Introduction/Introduction";
import FloatingCards from "./components/FloatingCards/FloatingCards";
import Features from "./components/Features/Features";

export default function Home() {
  return (
    <div>
      <Hero />
      <Introduction />
      <FloatingCards />
      <Features />
    </div>
  )
}