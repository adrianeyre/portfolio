import { useState, useEffect } from 'react';
import menuData from '../data/menu.json';
import ThemeToggle from '../components/ThemeToggle';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { scrollToSection } from '../utils/scrollToSection';
import { assetUrl } from '../utils/assetUrl';

const sectionIds = menuData.map((item) => ({ id: item.link, label: item.title }));
const sectionOrder = sectionIds.map((section) => section.id);

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(sectionOrder);

  useEffect(() => {
    const handleScroll = () => {
      const navElement = document.querySelector('.nav-bar');
      if (navElement) {
        const rect = navElement.getBoundingClientRect();
        setScrolled(rect.top <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Named, because a page may hold several navigation landmarks and a
    // screen-reader user picking from a landmark list needs to tell them apart.
    <nav className={`nav-bar${scrolled ? ' scrolled' : ''}`} aria-label="Sections">
      <div className="nav-inner">
        <div className="nav-logo">
          {/* Decorative: the site's name is already the page's h1. */}
          <img src={assetUrl('/images/links/photo.jpeg')} alt="" />
        </div>
        <ul className="nav-links">
          {sectionIds.map((section) => {
            const isActive = section.id === activeId;
            const classNames = [
              section.label === 'Interests' ? 'nav-interests' : '',
              isActive ? 'active' : '',
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <li key={section.id}>
                {/*
                  A real anchor rather than a button: these navigate within the
                  document, so they should announce as links, work with the
                  browser's context menu, and still function if scripting fails.
                  `aria-current="location"` is the value for "the section of the
                  page you are currently viewing".
                */}
                <a
                  href={`#${section.id}`}
                  className={classNames}
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
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
