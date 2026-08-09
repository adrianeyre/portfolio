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

const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;

const App = () => (
  <>
    <div className="page-shell">
      <Hero />
      <NavBar />
      <main className="content">
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
  </>
);

export default App;
