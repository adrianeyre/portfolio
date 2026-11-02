# Rehearsal

The hand-over note the Stageshow skill asks for: what each scene was copied
from, what changed, and what was and was not checked.

## HeroDemo

- **Gold copied:** `hero-demo` (an animated hero beside copy, a terminal
  satellite coming forward).
- **Changed:** the story is now a pull request rather than page annotation:
  the command is typed into the terminal, the diff streams in with `Code`, the
  three checks go pending then pass with `Check`, and the cursor's one click
  merges it. Corner bleed instead of the gold's pinned bottom bleed, so the
  terminal can straddle the window's left edge over its file sidebar.
  `play="once"` with a Replay button in the page rather than a loop, so there
  is no reset to justify. The poster is the merged state.
- **Checked:** `film.mjs --gate` passes on the full animation at 720 wide
  (light). Poster stills checked at 720 wide in light and dark, and at 390
  wide in light; the whole story was also read frame by frame in a contact
  sheet. The 390-wide animation was only seen as stills.
- **Known and accepted:**
  - At 358 wide (compact) the review window is taller than it is wide, which
    the film flags. The terminal and the window's checks both have to stay
    whole in a phone column, and a landscape crop could not hold both.
  - The film reports a few pixels of jump at 0.4s on the preview page, where
    Inter arrives late. The real page preloads the font, so it is already in
    place by the time the demo plays.
  - The diff box is laid out at its final height from the start, so the first
    second shows two lines over an empty band while the rest stream in.

## PipelineTile

- **Gold copied:** the bento rules (`references/bento.md`) for a "one
  component" tile, with `payout-flow`'s status timing.
- **Changed:** a release card with three steps; one step passes and the badge
  goes live, once, on scroll. It sits on the tile's copy gutter and runs off
  the bottom.
- **Checked:** `film.mjs --gate` passes; still checked in the page at 1440 wide.
- **Not checked:** the compact (358) design was not filmed on its own; it was
  only seen in the full-page mobile screenshot.

## ProjectShot

- **Gold copied:** `static-card`'s pinned bottom bleed.
- **Changed:** a still. The content is the project's real screenshot, in a
  browser window whose URL pill carries the project's demo address. `fill`
  lets it grow with its card; the featured card uses a taller design.
- **Checked:** the film reports no issues. Checked in the page in both themes.
- **Not checked:** the older games' screenshots load from GitHub, and their
  aspect ratios vary. Only the first few were looked at.
