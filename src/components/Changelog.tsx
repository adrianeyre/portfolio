import { useCallback, useEffect, useState, type ReactNode } from 'react';
import changelog from '../../CHANGELOG.md?raw';
import Modal from './Modal';
import { OPEN_CHANGELOG_EVENT } from './overlayEvents';

const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

/**
 * Turns the inline Markdown semantic-release writes — links and bold scopes —
 * into React nodes. Built as elements rather than an HTML string so nothing in
 * the changelog is ever handed to `dangerouslySetInnerHTML`.
 */
export const renderInline = (text: string): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(INLINE)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const [, linkText, href, bold] = match;
    nodes.push(
      bold !== undefined ? (
        <strong key={index}>{bold}</strong>
      ) : (
        <a key={index} href={href} target="_blank" rel="noreferrer">
          {renderInline(linkText)}
        </a>
      )
    );
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
};

/**
 * Renders the subset of Markdown that semantic-release's changelog uses:
 * `##` release headings, `###` section headings, `*` bullets and paragraphs.
 * The `#` title is dropped because the modal already has one. Headings shift
 * down a level to sit under the dialog's own `<h2>`.
 */
export const renderChangelog = (markdown: string): ReactNode[] => {
  const blocks: ReactNode[] = [];
  let items: string[] = [];

  const flushList = () => {
    if (!items.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="changelog-list">
        {items.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    items = [];
  };

  for (const raw of markdown.split('\n')) {
    const line = raw.trim();
    const bullet = /^[*-] (.*)$/.exec(line);
    if (bullet) {
      items.push(bullet[1]);
      continue;
    }
    flushList();
    if (!line || /^# /.test(line)) continue;

    const key = `b-${blocks.length}`;
    if (line.startsWith('### ')) {
      blocks.push(<h4 key={key}>{renderInline(line.slice(4))}</h4>);
    } else if (line.startsWith('## ')) {
      blocks.push(<h3 key={key}>{renderInline(line.slice(3))}</h3>);
    } else {
      blocks.push(<p key={key}>{renderInline(line)}</p>);
    }
  }
  flushList();
  return blocks;
};

/**
 * The project's CHANGELOG.md, rendered in the shared {@link Modal} and opened
 * from the version number in the footer by {@link OPEN_CHANGELOG_EVENT}.
 *
 * The file is imported raw at build time. The site is only built after
 * semantic-release has committed the new version, so the changelog shown
 * always matches the version in the footer.
 */
const Changelog = () => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_CHANGELOG_EVENT, handler);
    return () => window.removeEventListener(OPEN_CHANGELOG_EVENT, handler);
  }, []);

  return (
    <Modal
      open={open}
      onClose={close}
      title="Changelog"
      titleId="changelogModalTitle"
      closeLabel="Close changelog"
    >
      <div className="changelog">{renderChangelog(changelog)}</div>
    </Modal>
  );
};

export default Changelog;
