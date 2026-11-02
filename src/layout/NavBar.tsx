import { useEffect, useState } from 'react';
import menuData from '../data/menu.json';
import ThemeToggle from '../components/ThemeToggle';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { scrollToSection } from '../utils/scrollToSection';
import { assetUrl } from '../utils/assetUrl';

const sections = menuData.map((item) => ({ id: item.link, label: item.title }));
const sectionOrder = sections.map((section) => section.id);

/**
 * The site header: name on the left, section links and the theme control on
 * the right. It sticks to the top of the viewport and gains a hairline and a
 * frosted ground once the page has scrolled beneath it.
 */
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(sectionOrder);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="site-header-inner">
        <a
          className="brand"
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {/* Decorative: the name beside it is the link's text. */}
          <img src={assetUrl('/images/links/photo.jpeg')} alt="" width={32} height={32} />
          <span>Adrian Eyre</span>
        </a>
        {/* Named, because a screen-reader user picking from a landmark list needs to tell navigations apart. */}
        <nav className="nav" aria-label="Sections">
          <ul className="nav-links">
            {sections.map((section) => {
              const isActive = section.id === activeId;
              return (
                <li key={section.id}>
                  {/*
                    Real anchors: these navigate within the document, so they
                    announce as links and still work without scripting.
                    `aria-current="location"` marks the section in view.
                  */}
                  <a
                    href={`#${section.id}`}
                    className={isActive ? 'active' : undefined}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(section.id);
                    }}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default NavBar;
