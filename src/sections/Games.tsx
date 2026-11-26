import ProjectGallery from '../components/ProjectGallery';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import gamesData from '../data/games.json';

const Games = () => (
  <section id="games" className="section">
    <Reveal>
      <SectionHeader
        tag="Games"
        title="Game Projects"
        intro="Arcade remakes, puzzles and originals, from C# desktop builds to TypeScript in the browser. Most have a live demo you can play."
      />
    </Reveal>
    <ProjectGallery projects={gamesData} kicker="Latest game" gridLabel="More games" noun="games" />
  </section>
);

export default Games;
