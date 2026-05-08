import { useState, useEffect } from 'react';
import menuData from '../data/menu.json';

const sectionIds = menuData.map((item) => ({ id: item.link, label: item.title }));

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

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
          {sectionIds.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={section.label === 'Interests' ? 'nav-interests' : ''}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
