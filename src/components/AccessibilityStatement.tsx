import { useCallback, useEffect, useState } from 'react';
import { FiShield } from 'react-icons/fi';
import Modal from './Modal';

/**
 * Custom event the footer dispatches on `window` to open the accessibility
 * statement, matching the pattern the cookie policy already uses.
 */
export const OPEN_ACCESSIBILITY_EVENT = 'open-accessibility-statement';

/**
 * The site's accessibility statement, modelled on the belvoircare and
 * ab-electrical panels and rendered in the shared {@link Modal}.
 *
 * The claims below are deliberately specific: each bullet names a thing that
 * is actually done in this codebase, so the statement can be checked against
 * the source rather than taken on trust.
 */
const AccessibilityStatement = () => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_ACCESSIBILITY_EVENT, handler);
    return () => window.removeEventListener(OPEN_ACCESSIBILITY_EVENT, handler);
  }, []);

  return (
    <Modal
      open={open}
      onClose={close}
      title="Accessibility"
      titleId="a11yModalTitle"
      closeLabel="Close accessibility statement"
    >
      <p className="policy-updated">Last reviewed: September 2026</p>

      <div className="a11y-status">
        <span className="a11y-status-ic" aria-hidden="true">
          <FiShield />
        </span>
        <p>
          <strong>Conformance status:</strong> this website is built to meet the
          Web Content Accessibility Guidelines (WCAG) 2.2 at{' '}
          <strong>Level AA</strong>.
        </p>
      </div>

      <h3>My commitment</h3>
      <p>
        I want this site to be usable by as many people as possible — including
        people using a screen reader, screen magnification, speech input or a
        keyboard on its own, and people who need reduced motion or a
        higher-contrast display. Building it any other way would rather
        undermine the point of a portfolio about software craft.
      </p>

      <h3>What I have done</h3>
      <ul>
        <li>
          <strong>Keyboard access</strong> — every link, button, carousel,
          accordion, form field and dialog can be reached and operated with a
          keyboard alone. A "Skip to main content" link is the first thing you
          reach on the page.
        </li>
        <li>
          <strong>Visible focus</strong> — focus is shown with a two-pixel
          outline in the accent colour, and sections are scrolled with enough
          offset that the sticky navigation bar never covers the item you have
          just focused (WCAG 2.2's <em>Focus Not Obscured</em>).
        </li>
        <li>
          <strong>Screen readers</strong> — semantic landmarks and headings,
          meaningful alternative text on informative images, empty alternative
          text on decorative ones, labelled form fields, and validation errors
          announced as they appear.
        </li>
        <li>
          <strong>Contrast</strong> — body and interface text meets at least
          4.5:1 against its background in both the light and dark themes, and
          borders, icons and focus indicators meet at least 3:1.
        </li>
        <li>
          <strong>Motion</strong> — the image strip has a visible pause button,
          and all reveal animations, smooth scrolling and auto-advancing content
          switch off automatically when your device asks for{' '}
          <em>reduced motion</em>.
        </li>
        <li>
          <strong>No dragging required</strong> — the carousels have previous
          and next buttons at every screen size; swiping is optional.
        </li>
        <li>
          <strong>Target sizes</strong> — interactive controls give at least a
          24 by 24 pixel target, and the main actions are 44 pixels or larger.
        </li>
        <li>
          <strong>Zoom and reflow</strong> — the page reflows to a single column
          and stays usable at 400% zoom, or in a 320 pixel-wide window, without
          horizontal scrolling.
        </li>
        <li>
          <strong>Text spacing</strong> — content stays readable when you
          increase line height, letter spacing or word spacing in your browser.
        </li>
        <li>
          <strong>Themes</strong> — light, dark and "follow my system" colour
          themes, all meeting the same contrast standards.
        </li>
      </ul>

      <h3>Compatibility</h3>
      <p>
        This site is built for current versions of Chrome, Edge, Firefox and
        Safari on desktop and mobile, used with screen readers such as NVDA,
        JAWS, VoiceOver and TalkBack. It should also work in older browsers,
        though some visual effects will be simplified.
      </p>

      <h3>Known limitations</h3>
      <ul>
        <li>
          This assessment is my own, based on automated tooling, keyboard-only
          navigation and screen-reader testing. I have not commissioned an
          independent third-party audit.
        </li>
        <li>
          The music player embeds YouTube. That player is a third-party
          component whose accessibility I do not control, and it only loads once
          you choose a track.
        </li>
        <li>
          Links out to GitHub, LinkedIn, Codewars and similar sites lead to
          pages I do not control and cannot guarantee.
        </li>
        <li>
          Typefaces come from Google Fonts. If those files fail to load, the
          site falls back to your system fonts — the appearance changes, the
          content does not.
        </li>
        <li>
          The contact form opens your own email application rather than sending
          from the page, so the final step happens in software I do not control.
          You can email me directly instead.
        </li>
      </ul>

      <h3>If something does not work for you</h3>
      <p>
        Please tell me — I would much rather hear about a problem than leave it
        in place. Email{' '}
        <a href="mailto:info@adrianeyre.co.uk">info@adrianeyre.co.uk</a> with
        the page or feature, what you were trying to do, and the browser or
        assistive technology you were using. I aim to respond within five
        working days.
      </p>
    </Modal>
  );
};

export default AccessibilityStatement;
