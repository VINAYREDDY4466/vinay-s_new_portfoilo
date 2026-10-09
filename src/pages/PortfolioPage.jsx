import BackgroundEffects from '../components/layout/BackgroundEffects';
import CursorFollower from '../components/layout/CursorFollower';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/navbar/Navbar';
import ScrollProgress from '../components/layout/ScrollProgress';
import SkipLink from '../components/layout/SkipLink';
import About from '../components/sections/about/About';
import Contact from '../components/sections/contact/Contact';
import Experience from '../components/sections/experience/Experience';
import Hero from '../components/sections/hero/Hero';
import Projects from '../components/sections/projects/Projects';
import Services from '../components/sections/services/Services';
import Skills from '../components/sections/skills/Skills';

export default function PortfolioPage() {
  return (
    <>
      <SkipLink />
      <BackgroundEffects />
      <ScrollProgress />
      <CursorFollower />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
