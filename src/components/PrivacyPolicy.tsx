import { useCallback, useEffect, useState } from 'react';
import Modal from './Modal';
import { OPEN_PRIVACY_POLICY_EVENT } from './overlayEvents';

/**
 * The site's privacy policy, rendered in the shared {@link Modal} and opened
 * from the footer by {@link OPEN_PRIVACY_POLICY_EVENT}.
 *
 * Like the accessibility statement, every claim here describes something the
 * codebase actually does: the contact form hands off to a `mailto:` link, the
 * fonts are self-hosted, and the only third-party request is the YouTube
 * embed, served from the no-cookie domain once a track is chosen.
 */
const PrivacyPolicy = () => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_PRIVACY_POLICY_EVENT, handler);
    return () => window.removeEventListener(OPEN_PRIVACY_POLICY_EVENT, handler);
  }, []);

  return (
    <Modal
      open={open}
      onClose={close}
      title="Privacy Policy"
      titleId="privacyModalTitle"
      closeLabel="Close privacy policy"
    >
      <p className="policy-updated">Last updated: October 2026</p>

      <h3>Who I am</h3>
      <p>
        This is the personal portfolio of Adrian Eyre, at adrianeyre.co.uk. I am
        the data controller for any personal information you share through it.
        You can reach me at{' '}
        <a href="mailto:info@adrianeyre.co.uk">info@adrianeyre.co.uk</a>.
      </p>

      <h3>The short version</h3>
      <p>
        This site does not ask you to sign up, does not run analytics or
        advertising, and does not send what you type anywhere on its own. I only
        receive personal information if you choose to email me.
      </p>

      <h3>What I collect and why</h3>
      <ul>
        <li>
          <strong>Emails you send me</strong> — the contact form does not submit
          to a server. It opens your own email application with your message
          pre-filled, and nothing is sent until you press send there. When you
          do, I receive your email address, the subject and anything else you
          write. I use it only to reply to you, on the basis of my legitimate
          interest in answering messages people choose to send me.
        </li>
        <li>
          <strong>Preferences in your browser</strong> — your colour theme and
          whether you have acknowledged the cookie notice are saved in your
          browser's local storage. They stay on your device and are never sent
          to me. The Cookie Policy lists each item.
        </li>
      </ul>

      <h3>Third parties</h3>
      <ul>
        <li>
          <strong>Hosting</strong> — the site is hosted on GitHub Pages. Like any
          web server, GitHub receives your IP address and browser details when
          you load the page, and may keep them in its logs for security
          purposes. See{' '}
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
            target="_blank"
            rel="noreferrer"
          >
            GitHub's privacy statement
          </a>
          .
        </li>
        <li>
          <strong>YouTube</strong> — the music player embeds YouTube from its
          privacy-enhanced <code>youtube-nocookie.com</code> domain, and only
          loads once you choose a track. From then on, YouTube's own{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            privacy policy
          </a>{' '}
          applies to the player.
        </li>
        <li>
          <strong>Links out</strong> — links to GitHub, LinkedIn, Codewars and
          other sites take you to services with their own privacy policies.
        </li>
      </ul>
      <p>
        The site's fonts are served from this site itself, so loading them does
        not contact anyone else. I do not sell, rent or share your information.
      </p>

      <h3>How long I keep it</h3>
      <p>
        I keep emails for as long as the conversation is useful, then delete
        them. Anything in your browser's local storage stays until you clear it.
      </p>

      <h3>Your rights</h3>
      <p>
        Under UK data protection law you can ask me for a copy of the
        information I hold about you, and ask me to correct or delete it, or to
        stop using it. Email me and I will respond within one month. If you are
        unhappy with how I have handled your information, you can complain to
        the{' '}
        <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noreferrer">
          Information Commissioner's Office
        </a>
        .
      </p>

      <h3>Changes</h3>
      <p>
        If this policy changes, the updated version will appear here with a new
        date at the top.
      </p>
    </Modal>
  );
};

export default PrivacyPolicy;
