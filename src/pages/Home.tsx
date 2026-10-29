import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import CloudWork from "../components/CloudWork";
import DesignWork from "../components/DesignWork";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  const { hash } = useLocation();

  // Arriving from another page with #section: scroll once the curtain has lifted.
  useEffect(() => {
    const id = hash.slice(1);
    if (!id) return;
    const t = window.setTimeout(() => {
      if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 900);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <main className="relative z-10">
      <Hero />
      <Marquee />
      <CloudWork />
      <DesignWork />
      <About />
      <Contact />
    </main>
  );
}
