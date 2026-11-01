import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Education from "./components/sections/Education";
import Exploring from "./components/sections/Exploring";
import Approach from "./components/sections/Approach";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <div className="relative min-h-svh bg-void">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-electric focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <Loader />
      <Cursor />
      <Navbar />
      <BackToTop />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Exploring />
        <Approach />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
