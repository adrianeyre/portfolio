import { render, screen } from '@testing-library/react';
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
});

const tracks: Track[] = [
  { artist: 'Acen', title: 'Trip II The Moon', genre: 'Dance', id: 'aaaaaaaaaaa' },
  { artist: 'Lockjaw', title: 'Reactor', genre: 'Techno', id: 'bbbbbbbbbbb' },
];

// The genre accordion is a toggle, so opening it a second time would close it
// again and take the track buttons with it.
const openGenre = (genre: string) =>
  userEvent.click(screen.getByRole('button', { name: new RegExp(genre) }));

const playTrack = (title: string) =>
  userEvent.click(screen.getByRole('button', { name: new RegExp(title) }));

describe('Music player', () => {
  it('starts the video playing when a track is picked', async () => {
    render(<Music tracks={tracks} />);

    await openGenre('Techno');
    await playTrack('Reactor');

    // `autoplay=1` is the whole feature: the click is the user gesture that
    // lets the embed start on its own, so the parameter has to survive here.
    expect(screen.getByTitle('Lockjaw — Reactor')).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/bbbbbbbbbbb?autoplay=1',
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
});
