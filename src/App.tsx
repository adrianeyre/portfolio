import Hero from './layout/Hero';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Voluntary from './sections/Voluntary';
import Codewars from './sections/Codewars';
import Interests from './sections/Interests';
import Contact from './sections/Contact';
import CookieConsent from './components/CookieConsent';
import AccessibilityStatement from './components/AccessibilityStatement';

const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

const App = () => (
  <>
    {/*
      First tab stop on the page, visually hidden until focused. Without it a
      keyboard or screen-reader user has to walk the whole navigation bar on
      every visit (WCAG 2.4.1 Bypass Blocks).
    */}
    <a className="skip-link" href="#main-content">
      Skip to main content
    </a>
    <div className="page-shell">
      <Hero />
      <NavBar />
      {/* `tabIndex={-1}` lets the skip link move focus here, not just scroll. */}
      <main className="content" id="main-content" tabIndex={-1}>
        <About />
        <Skills />
        <Projects screenWidth={screenWidth} />
        <Education />
        <Voluntary />
        <Codewars />
        <Interests screenWidth={screenWidth} />
        <Contact />
      </main>
    </div>
    <Footer />
    <CookieConsent />
    <AccessibilityStatement />
  </>
);

export default App;
