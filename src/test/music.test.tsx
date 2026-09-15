import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Music, { type Track } from '../components/Music';
import musicData from '../data/music.json';

/*
 * The list is hand-maintained, and the same track had been pasted in twice in
 * six places — once under a second YouTube upload of the identical recording,
 * which no id-only check would have caught. Keying on what the visitor
 * actually reads (artist, title, genre) is what makes this guard useful.
 */
describe('music.json', () => {
  it('lists every track once', () => {
    const seen = new Map<string, number>();
    (musicData as Track[]).forEach((track) => {
      const key = [track.artist, track.title, track.genre]
        .map((field) => field.trim().toLowerCase())
        .join('|');
      seen.set(key, (seen.get(key) ?? 0) + 1);
    });

    expect([...seen].filter(([, count]) => count > 1).map(([key]) => key)).toEqual([]);
  });

  /*
   * File order is what the visitor sees: the accordions are built in the order
   * the tracks appear, and autoplay runs straight down that same order. So the
   * alphabetising is a display concern, not tidiness, and belongs under test.
   */
  it('stays sorted by genre, then artist, then title', () => {
    const tracks = musicData as Track[];
    const sorted = [...tracks].sort(
      (a, b) =>
        a.genre.localeCompare(b.genre) ||
        a.artist.localeCompare(b.artist) ||
        a.title.localeCompare(b.title),
    );

    expect(tracks.map((track) => `${track.genre} / ${track.artist} / ${track.title}`)).toEqual(
      sorted.map((track) => `${track.genre} / ${track.artist} / ${track.title}`),
    );
  });

  it('files Revox and Steve Baltes under Trance', () => {
    const genreOf = (artist: string) =>
      (musicData as Track[]).find((track) => track.artist === artist)?.genre;

    expect(genreOf('Revox')).toBe('Trance');
    expect(genreOf('Steve Baltes')).toBe('Trance');
  });
});

/*
 * Three tracks over two genres: enough for a hand-off inside a genre (Acen to
 * Revox), a hand-off across the genre boundary (Revox to Lockjaw), and a last
 * entry with nothing after it.
 */
const tracks: Track[] = [
  { artist: 'Acen', title: 'Trip II The Moon', genre: 'Dance', id: 'aaaaaaaaaaa' },
  { artist: 'Revox', title: 'Sysex', genre: 'Dance', id: 'ccccccccccc' },
  { artist: 'Lockjaw', title: 'Reactor', genre: 'Techno', id: 'bbbbbbbbbbb' },
];

const EMBED_ORIGIN = 'https://www.youtube-nocookie.com';

// The genre accordion is a toggle, so opening it a second time would close it
// again and take the track buttons with it.
const openGenre = (genre: string) =>
  userEvent.click(screen.getByRole('button', { name: new RegExp(genre) }));

const playTrack = (title: string) =>
  userEvent.click(screen.getByRole('button', { name: new RegExp(title) }));

const frameFor = (nowPlaying: string) =>
  screen.getByTitle(nowPlaying) as HTMLIFrameElement;

/*
 * Stand in for the embed reporting its own state. The `source` matters as much
 * as the payload: the component only listens to the frame currently on screen,
 * which is what stops a torn-down player from skipping a track.
 */
const postFromPlayer = async (
  frame: HTMLIFrameElement,
  data: unknown,
  origin = EMBED_ORIGIN,
) => {
  await act(async () => {
    window.dispatchEvent(
      new MessageEvent('message', {
        origin,
        data: JSON.stringify(data),
        source: frame.contentWindow,
      }),
    );
  });
};

const finish = (frame: HTMLIFrameElement) =>
  postFromPlayer(frame, { event: 'onStateChange', info: 0 });

describe('Music player', () => {
  it('starts the video playing when a track is picked', async () => {
    render(<Music tracks={tracks} />);

    await openGenre('Techno');
    await playTrack('Reactor');

    // `autoplay=1` is the whole feature: the click is the user gesture that
    // lets the embed start on its own, so the parameter has to survive here.
    // `enablejsapi=1` is what lets the embed tell us when it has finished.
    expect(screen.getByTitle('Lockjaw — Reactor')).toHaveAttribute(
      'src',
      `${EMBED_ORIGIN}/embed/bbbbbbbbbbb?autoplay=1&enablejsapi=1`,
    );
  });

  it('restarts the track that is already showing when it is picked again', async () => {
    render(<Music tracks={tracks} />);

    await openGenre('Dance');
    await playTrack('Trip II The Moon');
    const first = screen.getByTitle('Acen — Trip II The Moon');
    await playTrack('Trip II The Moon');

    // A fresh iframe node, rather than the same one left in place, is what
    // makes the embed load and autoplay from the top a second time.
    expect(screen.getByTitle('Acen — Trip II The Moon')).not.toBe(first);
  });

  it('plays the next track in the genre when the video ends', async () => {
    render(<Music tracks={tracks} />);

    await openGenre('Dance');
    await playTrack('Trip II The Moon');
    await finish(frameFor('Acen — Trip II The Moon'));

    expect(screen.getByTitle('Revox — Sysex')).toBeInTheDocument();
  });

  it('carries on into the next genre and opens it', async () => {
    render(<Music tracks={tracks} />);

    await openGenre('Dance');
    await playTrack('Sysex');
    await finish(frameFor('Revox — Sysex'));

    expect(screen.getByTitle('Lockjaw — Reactor')).toBeInTheDocument();
    // The playing track is no use to the visitor inside a collapsed accordion.
    expect(screen.getByRole('button', { name: /Techno/ })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('stops at the last entry', async () => {
    render(<Music tracks={tracks} />);

    await openGenre('Techno');
    await playTrack('Reactor');
    await finish(frameFor('Lockjaw — Reactor'));

    // Nothing follows it, so the last video stays put rather than wrapping
    // back round to the top of the list.
    expect(screen.getByTitle('Lockjaw — Reactor')).toBeInTheDocument();
  });

  it('stays put while the video is still playing', async () => {
    render(<Music tracks={tracks} />);

    await openGenre('Dance');
    await playTrack('Trip II The Moon');
    // 1 is PLAYING. Only 0 (ENDED) should advance the playlist.
    await postFromPlayer(frameFor('Acen — Trip II The Moon'), {
      event: 'infoDelivery',
      info: { playerState: 1 },
    });

    expect(screen.getByTitle('Acen — Trip II The Moon')).toBeInTheDocument();
  });

  it('ignores end-of-video messages from anywhere but the embed', async () => {
    render(<Music tracks={tracks} />);

    await openGenre('Dance');
    await playTrack('Trip II The Moon');
    await postFromPlayer(
      frameFor('Acen — Trip II The Moon'),
      { event: 'onStateChange', info: 0 },
      'https://evil.example.com',
    );

    expect(screen.getByTitle('Acen — Trip II The Moon')).toBeInTheDocument();
  });
});
