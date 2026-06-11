import { useState, useEffect } from 'react';
import menuData from '../data/menu.json';
import ThemeToggle from '../components/ThemeToggle';
import { useScrollSpy } from '../hooks/useScrollSpy';

const sectionIds = menuData.map((item) => ({ id: item.link, label: item.title }));
const sectionOrder = sectionIds.map((section) => section.id);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });

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
    <nav className={`nav-bar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="nav-logo">
          <img src="/images/links/photo.jpeg" alt="Adrian Eyre" />
        </div>
        <div className="nav-links">
          {sectionIds.map((section) => {
            const isActive = section.id === activeId;
            const classNames = [
              section.label === 'Interests' ? 'nav-interests' : '',
              isActive ? 'active' : '',
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={classNames}
                aria-current={isActive ? 'true' : undefined}
              >
                {section.label}
              </button>
            );
          })}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
