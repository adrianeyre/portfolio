import { lazy, Suspense, useState } from 'react';
import { FiArrowRight, FiRotateCcw } from 'react-icons/fi';
import { useTheme } from '../theme/ThemeProvider';
import { scrollToSection } from '../utils/scrollToSection';

/*
 * The illustration is split out so the hero's words paint first; the frame
 * it lands in is reserved at the same proportions, so nothing shifts when it
 * arrives.
 */
const HeroDemo = lazy(() => import('../demos/HeroDemo'));

const FACTS = [
  { label: 'Experience', value: '15+ years' },
  { label: 'Stack', value: 'TypeScript · Python · AWS' },
  { label: 'Focus', value: 'Leadership · Architecture · AI tooling' },
];

const Hero = () => {
  const { theme } = useTheme();
  // Remounting the demo is what replays it (Stageshow's "explicit replay").
  const [run, setRun] = useState(0);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <span className="eyebrow">
          <span className="eyebrow-dot" aria-hidden="true" />
          Lead Software Developer
        </span>
        <h1 id="hero-title">Adrian Eyre</h1>
        <p className="hero-lead">
          Building modern applications using AI and cloud-native tooling, and
          leading the teams that ship them.
        </p>
        <div className="hero-actions">
          <button type="button" className="button button-primary" onClick={() => scrollToSection('projects')}>
            View projects
            <FiArrowRight aria-hidden="true" />
          </button>
          <button type="button" className="button button-ghost" onClick={() => scrollToSection('contact')}>
            Get in touch
          </button>
        </div>
        <dl className="hero-facts">
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <figure className="hero-visual">
        <div
          className="hero-stage"
          role="img"
          aria-label="Illustration: an AI coding agent in a terminal edits a webhook handler, the pull request's tests, lint and build checks pass, and the pull request is merged into main."
        >
          <Suspense fallback={<div className="hero-stage-placeholder" />}>
            <HeroDemo key={run} theme={theme} />
          </Suspense>
        </div>
        <figcaption>
          <span>AI-assisted delivery, from prompt to merge.</span>
          <button type="button" className="replay" onClick={() => setRun((n) => n + 1)}>
            <FiRotateCcw aria-hidden="true" />
            Replay
          </button>
        </figcaption>
      </figure>
    </section>
  );
};

export default Hero;
