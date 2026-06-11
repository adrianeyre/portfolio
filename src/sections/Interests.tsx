import { Fragment } from 'react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import ImageBlock from '../components/ImageBlock';
import interestsData from '../data/interests.json';
import interestsImagesData from '../data/interestsImages.json';

interface InterestsProps {
  screenWidth: number;
}

const Interests = ({ screenWidth }: InterestsProps) => (
  <section id="interests" className="section panel">
    <Reveal>
      <SectionHeader tag="Interests" title="Personal Passions" />
    </Reveal>
    <Reveal className="about-copy" delay={0.1}>
      {interestsData.map((item, index) => (
        <Fragment key={index}>
          <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
        </Fragment>
      ))}
    </Reveal>
    <Reveal delay={0.15}>
      <ImageBlock data={interestsImagesData} screenWidth={screenWidth} />
    </Reveal>
  </section>
);

export default Interests;
