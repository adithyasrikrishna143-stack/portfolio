import { Suspense, lazy } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Business from "./components/Business.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

// Code-split heavy / optional sections
const MemoryGame = lazy(() => import("./components/MemoryGame.jsx"));
const NanoCalendar = lazy(() => import("./components/NanoCalendar.jsx"));
const ResumeOverlay = lazy(() => import("./components/ResumeOverlay.jsx"));

export default function App() {
  return (
    <>
      <div className="space-background" />
      <div className="space-background">
        <div className="stars" />
        <div className="twinkling" />
        <div className="clouds" />
      </div>

      <Header />
      <Hero />
      <About />
      <Skills />
      <Business />

      <p className="business-intro">
        Welcome to my professional services! I provide high-quality Frontend Development
        and Video Editing solutions. Whether you need a responsive, polished website or
        creative video content for social media or ads, I can help bring your vision to
        life. Feel free to get in touch to discuss your project!
      </p>

      <Contact />
      <Footer />

      <Suspense fallback={null}>
        <MemoryGame />
        <NanoCalendar />
        <ResumeOverlay />
      </Suspense>
    </>
  );
}

