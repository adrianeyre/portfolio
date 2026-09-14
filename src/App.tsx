import { lazy, Suspense } from 'react';
import Hero from './layout/Hero';
import NavBar from './layout/NavBar';
import Footer from './layout/Footer';

/*
 * Only the hero and the navigation are needed to paint. Everything below the
 * fold is split into its own chunk so first paint waits on a fraction of the
 * JavaScript: the carousel sections in particular drag in react-slick, which
 * nothing above the fold uses.
 *
 * These are not gated on scrolling — React starts each import as soon as it
 * renders — so every section still reaches the DOM on load, for a crawler as
 * much as for a visitor. Only the *order* of arrival changes.
 */
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Education = lazy(() => import('./sections/Education'));
const Voluntary = lazy(() => import('./sections/Voluntary'));
const Codewars = lazy(() => import('./sections/Codewars'));
const Interests = lazy(() => import('./sections/Interests'));
const Contact = lazy(() => import('./sections/Contact'));

/*
 * Neither of these is needed to paint, and both pull in Framer Motion for
 * their enter/exit animation — the last thing keeping a 40KB animation
 * library on the critical path once Reveal stopped using it.
 */
const CookieConsent = lazy(() => import('./components/CookieConsent'));
const AccessibilityStatement = lazy(() => import('./components/AccessibilityStatement'));

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
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Projects screenWidth={screenWidth} />
          <Education />
          <Voluntary />
          <Codewars />
          <Interests screenWidth={screenWidth} />
          <Contact />
        </Suspense>
      </main>
    </div>
    <Footer />
    <Suspense fallback={null}>
      <CookieConsent />
      <AccessibilityStatement />
    </Suspense>
  </>
);

export default App;
