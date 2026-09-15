import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

type PlaylistTrack = Track & { uid: string };

/** Where the embed is served from, and so the only origin we accept messages from. */
const EMBED_ORIGIN = 'https://www.youtube-nocookie.com';

/** `YT.PlayerState.ENDED` — the player reports states as bare numbers. */
const ENDED = 0;

/*
 * The embed only talks back once it has been asked to, and it ignores anything
 * that is not addressed to a widget channel. `listening` opens the stream of
 * `infoDelivery` updates; the `addEventListener` command asks for explicit
 * `onStateChange` events as well, since which of the two a given embed build
 * sends is not something we control.
 */
const HANDSHAKE = [
  { event: 'listening', id: 1, channel: 'widget' },
  {
    event: 'command',
    func: 'addEventListener',
    args: ['onStateChange'],
    id: 1,
    channel: 'widget',
  },
].map((message) => JSON.stringify(message));

/** How often to re-send the handshake until the player answers, and for how long. */
const HANDSHAKE_RETRY_MS = 500;
const HANDSHAKE_TIMEOUT_MS = 15_000;

/**
 * Pull the player state out of a message from the embed. State arrives in two
 * shapes: `onStateChange` carries the number directly, while the `infoDelivery`
 * updates nest it under `info.playerState`.
 */
const playerStateOf = (data: unknown): number | undefined => {
  let payload = data;

  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      return undefined;
    }
  }

  if (typeof payload !== 'object' || payload === null) return undefined;
  const { event, info } = payload as { event?: unknown; info?: unknown };

  if (event === 'onStateChange' && typeof info === 'number') return info;

  if (typeof info === 'object' && info !== null) {
    const { playerState } = info as { playerState?: unknown };
    if (typeof playerState === 'number') return playerState;
  }

  return undefined;
};

/**
 * A two-pane music browser: on the left, genres are collapsible accordions
 * (all closed by default) listing each track's artist and title; selecting a
 * track loads its YouTube video in the player on the right and starts it
 * playing: the click is the user gesture browsers require for autoplay.
 *
 * When a video finishes, the next track takes over automatically and keeps
 * going across genre boundaries — the accordions read top to bottom as one
 * playlist — until the very last track, where playback simply stops.
 */
const Music = ({ tracks }: MusicProps) => {
  const genres = useMemo(() => {
    const grouped = new Map<string, PlaylistTrack[]>();
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

  /*
   * The accordions flattened back into one running order, which is what
   * "play the next one" means: the rest of this genre, then the genre below
   * it, and so on to the bottom of the list.
   */
  const playlist = useMemo(
    () => genres.flatMap(({ items }) => items),
    [genres],
  );

  const [openGenre, setOpenGenre] = useState<string | null>(null);
  const [selected, setSelected] = useState<PlaylistTrack | null>(null);
  /*
   * Bumped on every track click, and folded into the iframe key, so clicking
   * the track already showing restarts it. Without it React bails out on the
   * unchanged `selected` value, the iframe is never remounted, and a finished
   * video just sits there.
   */
  const [playCount, setPlayCount] = useState(0);
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  const playTrack = useCallback((track: PlaylistTrack) => {
    setSelected(track);
    setPlayCount((count) => count + 1);
  }, []);

  const toggleGenre = (genre: string) => {
    setOpenGenre((current) => (current === genre ? null : genre));
  };

  useEffect(() => {
    const frame = frameRef.current;
    if (!selected || !frame) return;

    let answered = false;

    const handshake = () => {
      HANDSHAKE.forEach((message) =>
        frame.contentWindow?.postMessage(message, EMBED_ORIGIN),
      );
    };

    const handleMessage = (event: MessageEvent) => {
      /*
       * The window check is what keeps a track from being skipped: the embed
       * repeats its last state, so the iframe being torn down can still emit
       * "ended" after the next one has mounted. Only the frame on screen now
       * is allowed to advance the playlist.
       */
      if (event.origin !== EMBED_ORIGIN) return;
      if (event.source !== frame.contentWindow) return;

      answered = true;
      if (playerStateOf(event.data) !== ENDED) return;

      const index = playlist.findIndex((track) => track.uid === selected.uid);
      const next = index === -1 ? undefined : playlist[index + 1];
      // The end of the last genre is the end of the playlist: stop there.
      if (!next) return;

      // Follow the playlist with the accordions so the playing track stays visible.
      setOpenGenre(next.genre);
      playTrack(next);
    };

    window.addEventListener('message', handleMessage);

    /*
     * The handshake is only heard once the embed's own scripts are running, and
     * there is no event here that says when that is. Repeating it until the
     * player answers costs nothing and is the difference between autoplay-next
     * working and silently never firing.
     */
    handshake();
    const retry = setInterval(() => {
      if (answered) clearInterval(retry);
      else handshake();
    }, HANDSHAKE_RETRY_MS);
    const giveUp = setTimeout(() => clearInterval(retry), HANDSHAKE_TIMEOUT_MS);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(retry);
      clearTimeout(giveUp);
    };
    // `playCount` remounts the iframe, so the listener has to rebind to the new window.
  }, [selected, playCount, playlist, playTrack]);

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
                          onClick={() => playTrack(track)}
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
                key={`${selected.uid}-${playCount}`}
                ref={frameRef}
                src={`${EMBED_ORIGIN}/embed/${selected.id}?autoplay=1&enablejsapi=1`}
                title={`${selected.artist} — ${selected.title}`}
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
