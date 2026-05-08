import { Fragment } from 'react';
import SectionHeader from '../components/SectionHeader';
import ImageBlock from '../components/ImageBlock';
import interestsData from '../data/interests.json';
import interestsImagesData from '../data/interestsImages.json';

interface InterestsProps {
  screenWidth: number;
}

const Interests = ({ screenWidth }: InterestsProps) => (
  <section id="interests" className="section panel">
    <SectionHeader tag="Interests" title="Personal Passions" />
    <div className="split-grid">
      <div className="about-copy">
        {interestsData.map((item, index) => (
          <Fragment key={index}>
            <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
          </Fragment>
        ))}
      </div>
    </div>
    <ImageBlock data={interestsImagesData} screenWidth={screenWidth} />
  </section>
);

export default Interests;
