import { lazy, Suspense } from 'react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import skillsData from '../data/skills.json';
import languageImagesData from '../data/languageImages.json';
import frameworksImagesData from '../data/frameworksImages.json';
import { useTheme } from '../theme/ThemeProvider';
import { assetUrl } from '../utils/assetUrl';
import { experienceLabel } from '../utils/yearsSince';

const PipelineTile = lazy(() => import('../demos/PipelineTile'));

interface Mark {
  label: string;
  image?: { filename: string };
}

/** Logos with their names: the bento's two "collection" tiles. */
const MarkList = ({ items, label }: { items: Mark[]; label: string }) => (
  <ul className="mark-list" aria-label={label}>
    {items.map((item) => (
      <li key={item.label}>
        {item.image?.filename && (
          <img src={assetUrl(item.image.filename)} alt="" loading="lazy" decoding="async" width={24} height={24} />
        )}
        {item.label}
      </li>
    ))}
  </ul>
);

/*
 * A bento of four tiles, planned with Stageshow's bento rules: one UI tile
 * (the release pipeline) leads, a stat sits beside it, and two collections
 * fill the second row in the opposite order, so no two neighbours are the
 * same kind. The four strengths follow as ordinary cards.
 */
const Skills = () => {
  const { theme } = useTheme();

  return (
    <section id="skills" className="section">
      <Reveal>
        <SectionHeader
          tag="Skills"
          title="What I Do Best"
          intro="Full-stack engineering and the delivery around it: pipelines, platforms and the people who run them."
        />
      </Reveal>

      <div className="bento">
        <Reveal className="tile tile-wide tile-ui">
          <div className="tile-copy">
            <h3>
              Ship it, safely.{' '}
              <span>CI/CD with GitHub Actions, TeamCity, Octopus Deploy and Buddy Works, onto AWS and Azure.</span>
            </h3>
          </div>
          <div
            className="tile-picture"
            role="img"
            aria-label="Illustration: a release pipeline whose build, test and deploy-to-AWS steps each pass, and the release goes live."
          >
            <Suspense fallback={null}>
              <PipelineTile theme={theme} />
            </Suspense>
          </div>
        </Reveal>

        <Reveal className="tile tile-stat" delay={0.1}>
          <p className="stat-lead">Building software and infrastructure for</p>
          <p className="stat-number">{experienceLabel()}</p>
          <p className="stat-label">Across education, retail, finance and automotive.</p>
        </Reveal>

        <Reveal className="tile" delay={0.1}>
          <div className="tile-copy">
            <h3>Languages</h3>
          </div>
          <MarkList items={languageImagesData} label="Languages" />
        </Reveal>

        <Reveal className="tile tile-wide" delay={0.2}>
          <div className="tile-copy">
            <h3>
              Frameworks and platforms. <span>From React and Node to the clouds they run on.</span>
            </h3>
          </div>
          <MarkList items={frameworksImagesData} label="Frameworks and platforms" />
        </Reveal>
      </div>

      <div className="strengths">
        {skillsData.map((skill, index) => (
          <Reveal key={skill.title} delay={(index % 2) * 0.08}>
            <article className="strength">
              <h3>{skill.title}</h3>
              <div className="prose" dangerouslySetInnerHTML={{ __html: skill.body }} />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;
