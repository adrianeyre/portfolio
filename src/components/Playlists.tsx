import type { ComponentType } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { FiArrowUpRight, FiGlobe, FiMail } from 'react-icons/fi';

export type PlaylistIcon = 'youtube' | 'web' | 'newsletter';

export interface Playlist {
  name: string;
  handle: string;
  description: string;
  link: string;
  icon: PlaylistIcon;
}

interface PlaylistsProps {
  playlists: Playlist[];
}

/**
 * The icon and the words used to say where a card goes, keyed by source kind.
 * The destination has to reach screen readers too, so it lives in the
 * accessible name rather than only in the icon.
 */
const SOURCES: Record<PlaylistIcon, { Icon: ComponentType; destination: string }> = {
  youtube: { Icon: FaYoutube, destination: 'on YouTube' },
  web: { Icon: FiGlobe, destination: 'website' },
  newsletter: { Icon: FiMail, destination: 'newsletter' },
};

/**
 * Channels, sites and newsletters worth following, as cards that open in a new tab.
 *
 * Unlike the music list below it, there is no embedded player here: these are
 * whole sources rather than single tracks, so the useful action is to leave for
 * them. Each card is one `<a>` rather than a div wrapping a link, so it is a
 * single tab stop with the whole card as its target, and the accessible name
 * says where it goes and that it opens in a new tab.
 */
const Playlists = ({ playlists }: PlaylistsProps) => (
  <ul className="playlist-grid">
    {playlists.map((playlist) => {
      const { Icon, destination } = SOURCES[playlist.icon];

      return (
        <li key={playlist.link}>
          <a
            className="playlist-card"
            href={playlist.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`${playlist.name} ${destination}, ${playlist.handle} (opens in a new tab)`}
          >
            <span className="playlist-icon" aria-hidden="true">
              <Icon />
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
      );
    })}
  </ul>
);

export default Playlists;
