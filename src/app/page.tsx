"use client"
import Shader from "./components/Hero/Aurora";
import GradientWave from "./components/GradientWave/GradientWave";
import Nav from "./components/Nav/Nav";
import Render from "./components/Render";
import ScrollVelocity from "./components/ScrollText/ScrollText";
import Hero from "./components/Hero/Hero";
import Introduction from "./components/Introduction/Introduction";

export default function Home() {
  return (
    <div>
      <Hero />
      <Introduction />
      <div style={{background:"#161616",minHeight:"100%",width:"100vw",position:"relative"}}>
      <GradientWave />
      <ScrollVelocity texts={["SHARE CONNECT"]}className="scrollText" velocity={350}/>
      </div>
    </div>
  )
}