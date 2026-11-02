import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import PhotoGrid from '../components/PhotoGrid';
import Music from '../components/Music';
import Playlists, { type Playlist } from '../components/Playlists';
import interestsData from '../data/interests.json';
import interestsImagesData from '../data/interestsImages.json';
import musicData from '../data/music.json';
import playlistsData from '../data/playlists.json';

/** The passions are one list in the data; flattened, they read as chips. */
const passions = interestsData.flatMap((item) => item.points);

const Interests = () => (
  <section id="interests" className="section">
    <Reveal>
      <SectionHeader
        tag="Interests"
        title="Personal Passions"
        intro="Away from the keyboard, mostly outdoors, often in or on the water."
      />
    </Reveal>
    <Reveal delay={0.05}>
      <ul className="chip-list" aria-label="My interests">
        {passions.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </Reveal>
    <Reveal delay={0.1}>
      <PhotoGrid data={interestsImagesData} />
    </Reveal>
    <div className="interests-split">
      <Reveal delay={0.1}>
        <div className="subsection-header">
          <h3>Worth Following</h3>
          <p>Channels, sites and newsletters I keep coming back to. Each one opens in a new tab.</p>
        </div>
        <Playlists playlists={playlistsData as Playlist[]} />
      </Reveal>
    </div>
    <Reveal delay={0.1}>
      <div className="subsection-header">
        <h3>Music I Like</h3>
        <p>Tunes on rotation. Browse by genre and hit play.</p>
      </div>
      <Music tracks={musicData} />
    </Reveal>
  </section>
);

export default Interests;
