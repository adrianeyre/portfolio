import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Footer from '../layout/Footer';
import AccessibilityStatement from './AccessibilityStatement';

const renderFooterAndModal = () =>
  render(
    <>
      <Footer />
      <AccessibilityStatement />
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

describe('the accessibility statement', () => {
  it('is closed until the footer link is used', () => {
    renderFooterAndModal();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens from the footer, after the cookie policy link', async () => {
    const user = userEvent.setup();
    renderFooterAndModal();

    const footerButtons = screen.getAllByRole('button');
    const labels = footerButtons.map((button) => button.textContent);
    expect(labels).toEqual(['Cookie Policy', 'Accessibility']);

    await user.click(screen.getByRole('button', { name: 'Accessibility' }));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(
      screen.getByRole('heading', { name: 'Accessibility', level: 2 })
    ).toBeInTheDocument();
    expect(dialog).toHaveTextContent(
      /Web Content Accessibility Guidelines \(WCAG\) 2\.2/
    );
    expect(dialog).toHaveTextContent(/Level AA/);
  });

  it('moves focus to the close button and returns it to the trigger', async () => {
    const user = userEvent.setup();
    renderFooterAndModal();

    const trigger = screen.getByRole('button', { name: 'Accessibility' });
    await user.click(trigger);

    const close = screen.getByRole('button', {
      name: 'Close accessibility statement',
    });
    expect(close).toHaveFocus();

    await user.keyboard('{Escape}');
    // AnimatePresence keeps the node mounted until its exit animation ends.
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    expect(trigger).toHaveFocus();
  });
});
