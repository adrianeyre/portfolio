import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import packageJson from '../../package.json';
import Footer from '../layout/Footer';
import Changelog, { renderChangelog } from './Changelog';

beforeEach(() => {
  if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  }
});

const versionLabel = `Version: ${packageJson.version}`;

describe('the changelog modal', () => {
  it('is closed until the footer version is used', () => {
    render(
      <>
        <Footer />
        <Changelog />
      </>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens from the version in the footer and shows the current release', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Footer />
        <Changelog />
      </>
    );

    const trigger = screen.getByRole('button', { name: versionLabel });
    await user.click(trigger);

    const dialog = screen.getByRole('dialog');
    expect(
      within(dialog).getByRole('heading', { name: 'Changelog', level: 2 })
    ).toBeInTheDocument();
    // The latest release in CHANGELOG.md is the version in package.json.
    const releases = within(dialog).getAllByRole('heading', { level: 3 });
    expect(releases[0]).toHaveTextContent(packageJson.version);
    expect(screen.getByRole('button', { name: 'Close changelog' })).toHaveFocus();

    await user.keyboard('{Escape}');
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    expect(trigger).toHaveFocus();
  });
});

describe('renderChangelog', () => {
  it('renders headings, bullets, links and bold scopes without raw Markdown', () => {
    const { container } = render(
      <>
        {renderChangelog(
          [
            '# Changelog',
            '',
            '## [2.0.0](https://example.com/compare) (2026-01-01)',
            '',
            '### Features',
            '',
            '* **scope:** do a thing ([abc123](https://example.com/abc123))',
            '* plain item',
          ].join('\n')
        )}
      </>
    );

    expect(container.querySelector('h1')).toBeNull();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      '2.0.0 (2026-01-01)'
    );
    expect(screen.getByRole('heading', { level: 4, name: 'Features' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('scope:').tagName).toBe('STRONG');
    expect(screen.getByRole('link', { name: 'abc123' })).toHaveAttribute(
      'href',
      'https://example.com/abc123'
    );
    expect(container.textContent).not.toMatch(/\*\*|\]\(/);
  });
});
