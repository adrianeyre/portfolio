import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Playlists, { type Playlist, type PlaylistIcon } from '../components/Playlists';
import playlistsData from '../data/playlists.json';

const ICONS: PlaylistIcon[] = ['youtube', 'web', 'newsletter'];

/*
 * Interests.tsx casts this file to Playlist[], so nothing at compile time
 * checks that `icon` is one of the kinds the component knows how to render. An
 * unknown value would throw on the lookup at render, taking the section with
 * it, so the cast is only honest while this guard holds.
 */
describe('playlists.json', () => {
  it('only uses icons the component can render', () => {
    const unknown = (playlistsData as Playlist[])
      .filter((playlist) => !ICONS.includes(playlist.icon))
      .map((playlist) => `${playlist.name}: ${playlist.icon}`);

    expect(unknown).toEqual([]);
  });

  it('links to each source once', () => {
    const links = (playlistsData as Playlist[]).map((playlist) => playlist.link);

    expect(links).toEqual([...new Set(links)]);
  });
});

/*
 * The card is a link out, so the destination is the thing a screen reader user
 * needs before following it — and it differs per source kind now that the list
 * is no longer YouTube-only.
 */
describe('Playlists', () => {
  const playlists: Playlist[] = [
    {
      name: 'Chase AI',
      handle: '@Chase-H-AI',
      description: 'Practical AI engineering.',
      link: 'https://www.youtube.com/@Chase-H-AI',
      icon: 'youtube',
    },
    {
      name: 'The Faction Group',
      handle: 'gofactiongroup.com',
      description: 'AI product design lab.',
      link: 'https://gofactiongroup.com',
      icon: 'web',
    },
    {
      name: 'TLDR',
      handle: 'tldr.tech',
      description: 'Daily tech newsletter.',
      link: 'https://tldr.tech',
      icon: 'newsletter',
    },
  ];

  it('names the destination for each kind of source', () => {
    render(<Playlists playlists={playlists} />);

    expect(
      screen.getByRole('link', { name: /Chase AI on YouTube, @Chase-H-AI \(opens in a new tab\)/ }),
    ).toHaveAttribute('href', 'https://www.youtube.com/@Chase-H-AI');
    expect(
      screen.getByRole('link', {
        name: /The Faction Group website, gofactiongroup.com \(opens in a new tab\)/,
      }),
    ).toHaveAttribute('href', 'https://gofactiongroup.com');
    expect(
      screen.getByRole('link', { name: /TLDR newsletter, tldr.tech \(opens in a new tab\)/ }),
    ).toHaveAttribute('href', 'https://tldr.tech');
  });

  it('opens links in a new tab without leaking the referrer window', () => {
    render(<Playlists playlists={playlists} />);

    screen.getAllByRole('link').forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noreferrer');
    });
  });
});
