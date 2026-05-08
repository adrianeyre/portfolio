import { Fragment } from 'react';
import ImageBlock from '../components/image-block/image-block';
import interestsData from '../data/interests.json';
import interestsImagesData from '../data/interestsImages.json';

interface InterestsProps {
  screenWidth: number;
}

const Interests = ({ screenWidth }: InterestsProps) => (
  <section id="interests" className="section panel">
    <div className="section-header">
      <span className="section-tag">Interests</span>
      <h2>Personal Passions</h2>
    </div>
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
