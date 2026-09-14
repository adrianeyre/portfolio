import { FaYoutube } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

export interface Playlist {
  name: string;
  handle: string;
  description: string;
  link: string;
}

interface PlaylistsProps {
  playlists: Playlist[];
}

/**
 * Channels worth watching, as cards that open YouTube in a new tab.
 *
 * Unlike the music list below it, there is no embedded player here: these are
 * whole channels rather than single tracks, so the useful action is to leave
 * for YouTube. Each card is one `<a>` rather than a div wrapping a link, so it
 * is a single tab stop with the whole card as its target, and the accessible
 * name says where it goes and that it opens in a new tab.
 */
const Playlists = ({ playlists }: PlaylistsProps) => (
  <ul className="playlist-grid">
    {playlists.map((playlist) => (
      <li key={playlist.link}>
        <a
          className="playlist-card"
          href={playlist.link}
          target="_blank"
          rel="noreferrer"
          aria-label={`${playlist.name} on YouTube, ${playlist.handle} (opens in a new tab)`}
        >
          <span className="playlist-icon" aria-hidden="true">
            <FaYoutube />
          </span>
          <span className="playlist-copy">
            <span className="playlist-name">{playlist.name}</span>
            <span className="playlist-handle">{playlist.handle}</span>
            <span className="playlist-description">{playlist.description}</span>
          </span>
          <span className="playlist-go" aria-hidden="true">
            <FiArrowUpRight />
          </span>
        </a>
      </li>
    ))}
  </ul>
);

export default Playlists;
