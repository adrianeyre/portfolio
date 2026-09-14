import { Fragment } from 'react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import ImageBlock from '../components/ImageBlock';
import Music from '../components/Music';
import Playlists from '../components/Playlists';
import interestsData from '../data/interests.json';
import interestsImagesData from '../data/interestsImages.json';
import musicData from '../data/music.json';
import playlistsData from '../data/playlists.json';

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
          <ul className="passions-list">
            {item.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </Fragment>
      ))}
    </Reveal>
    <Reveal delay={0.15}>
      <ImageBlock data={interestsImagesData} screenWidth={screenWidth} />
    </Reveal>
    <Reveal delay={0.2}>
      <div className="playlist-header">
        <h3>Playlists</h3>
        <p>Channels I keep coming back to — each one opens on YouTube.</p>
      </div>
    </Reveal>
    <Reveal delay={0.25}>
      <Playlists playlists={playlistsData} />
    </Reveal>
    <Reveal delay={0.3}>
      <div className="music-header">
        <h3>Music I Like</h3>
        <p>Tunes on rotation — browse by genre and hit play.</p>
      </div>
    </Reveal>
    <Reveal delay={0.35}>
      <Music tracks={musicData} />
    </Reveal>
  </section>
);

export default Interests;
