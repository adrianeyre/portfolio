import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Footer from '../layout/Footer';
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';

const renderFooterAndModals = () =>
  render(
    <>
      <Footer />
      <PrivacyPolicy />
      <TermsAndConditions />
    </>
  );

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

const MODALS = [
  {
    trigger: 'Privacy Policy',
    close: 'Close privacy policy',
    content: /does not run analytics or advertising/,
  },
  {
    trigger: 'Terms and Conditions',
    close: 'Close terms and conditions',
    content: /governed by the law of England and Wales/,
  },
];

describe.each(MODALS)('the $trigger modal', ({ trigger, close, content }) => {
  it('is closed until the footer link is used', () => {
    renderFooterAndModals();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens from the footer on its own', async () => {
    const user = userEvent.setup();
    renderFooterAndModals();

    await user.click(screen.getByRole('button', { name: trigger }));

    // Only the requested modal opens; the other listener ignores the event.
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(
      screen.getByRole('heading', { name: trigger, level: 2 })
    ).toBeInTheDocument();
    expect(dialog).toHaveTextContent(content);
  });

  it('moves focus to the close button and returns it to the trigger', async () => {
    const user = userEvent.setup();
    renderFooterAndModals();

    const button = screen.getByRole('button', { name: trigger });
    await user.click(button);
    expect(screen.getByRole('button', { name: close })).toHaveFocus();

    await user.keyboard('{Escape}');
    // AnimatePresence keeps the node mounted until its exit animation ends.
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    expect(button).toHaveFocus();
  });
});
