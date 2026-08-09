import { useMemo, useState } from 'react';

export interface Track {
  artist: string;
  title: string;
  genre: string;
  /** YouTube video id. */
  id: string;
}

interface MusicProps {
  tracks: Track[];
}

/**
 * A two-pane music browser: on the left, genres are collapsible accordions
 * (all closed by default) listing each track's artist and title; selecting a
 * track loads its YouTube video in the player on the right.
 */
const Music = ({ tracks }: MusicProps) => {
  const genres = useMemo(() => {
    const grouped = new Map<string, (Track & { uid: string })[]>();
    tracks.forEach((track, index) => {
      const list = grouped.get(track.genre) ?? [];
      list.push({ ...track, uid: `${index}-${track.id}` });
      grouped.set(track.genre, list);
    });
    return Array.from(grouped, ([genre, items]) => ({
      genre,
      items: [...items].sort(
        (a, b) =>
          a.artist.localeCompare(b.artist) || a.title.localeCompare(b.title),
      ),
    }));
  }, [tracks]);

  const [openGenre, setOpenGenre] = useState<string | null>(null);
  const [selected, setSelected] = useState<(Track & { uid: string }) | null>(null);

  const toggleGenre = (genre: string) => {
    setOpenGenre((current) => (current === genre ? null : genre));
  };

  return (
    <div className="music-grid">
      <div className="music-accordions">
        {genres.map(({ genre, items }) => {
          const isOpen = openGenre === genre;
          const panelId = `music-panel-${genre}`;
          const buttonId = `music-trigger-${genre}`;

          return (
            <div key={genre} className={`music-accordion${isOpen ? ' open' : ''}`}>
              <button
                type="button"
                id={buttonId}
                className="music-accordion-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleGenre(genre)}
              >
                <span className="music-genre-name">{genre}</span>
                <span className="music-genre-meta">
                  <span className="music-count">{items.length}</span>
                  <svg
                    className="music-chevron"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="music-accordion-panel"
                hidden={!isOpen}
              >
                <ul className="music-track-list">
                  {items.map((track) => {
                    const isActive = selected?.uid === track.uid;
                    return (
                      <li key={track.uid}>
                        <button
                          type="button"
                          className={`music-track${isActive ? ' active' : ''}`}
                          aria-pressed={isActive}
                          onClick={() => setSelected(track)}
                        >
                          <span className="music-artist">{track.artist}</span>
                          <span className="music-title">{track.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="music-player">
        {selected ? (
          <>
            <div className="music-player-frame">
              <iframe
                key={selected.id}
                src={`https://www.youtube-nocookie.com/embed/${selected.id}`}
                title={`${selected.artist} — ${selected.title}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="music-now-playing">
              <span className="music-now-artist">{selected.artist}</span>
              <span className="music-now-title">{selected.title}</span>
            </div>
          </>
        ) : (
          <div className="music-player-empty">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <p>Pick a genre, then choose a track to play it here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Music;
