<div align="center">

# Adrian Eyre — Portfolio

**The source for [adrianeyre.co.uk](https://adrianeyre.co.uk): a single-page React portfolio of projects, skills and experience.**

[![Release](https://github.com/adrianeyre/portfolio/actions/workflows/release.yml/badge.svg)](https://github.com/adrianeyre/portfolio/actions/workflows/release.yml)
[![Version](https://img.shields.io/github/package-json/v/adrianeyre/portfolio)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

React 19 · TypeScript · Vite · Vitest · Framer Motion · GitHub Pages

</div>

---

## Quick start

**Prerequisites:** [Node.js](https://nodejs.org/) 26 or newer (see `.nvmrc`) and npm.

```shell
git clone https://github.com/adrianeyre/portfolio.git
cd portfolio
nvm use        # optional: switches to the Node version in .nvmrc
npm install
npm run dev
```

The site will be at **http://localhost:5173**, and changes reload as you save.

## Scripts

| Command              | What it does                                          |
| -------------------- | ----------------------------------------------------- |
| `npm run dev`        | Starts the Vite dev server with hot reload            |
| `npm run build`      | Type-checks, then builds the production site to `dist/` |
| `npm run preview`    | Serves the production build locally                   |
| `npm test`           | Runs the test suite once with Vitest                  |
| `npm run test:watch` | Runs the tests in watch mode                          |
| `npm run typecheck`  | Type-checks the code without emitting files           |

## Project structure

```
src/
├── data/        # JSON content: projects, experience, skills, education…
├── sections/    # Page sections (About, Skills, Projects, Contact…)
├── layout/      # Hero, navigation bar and footer
├── components/  # Shared UI: modals, carousels, theme toggle, cookie consent
├── hooks/       # Scroll spy, reduced-motion and focus helpers
├── theme/       # Light/dark theme provider
└── test/        # Smoke, accessibility (axe-core) and deployment tests
public/          # Static assets, images, fonts and the CNAME for the custom domain
```

## Editing content

All site content lives in **`src/data/*.json`**, so you can update most of it without touching a component. For example, to add a project, add an entry to `src/data/projects.json` and put its screenshot in `public/images/projects/`:

```json
{
  "title": "My Project",
  "body": "A short description of what it does.",
  "image": {
    "filename": "/images/projects/my-project.png",
    "link": "https://github.com/adrianeyre/my-project"
  },
  "tags": [{ "label": "TypeScript" }, { "label": "React" }]
}
```

## Releases & deployment

Releases and deployment are automated with [GitHub Actions](.github/workflows/release.yml):

- **Every pull request** to `master` is type-checked, tested and built.
- **Every merge** to `master` runs [semantic-release](https://github.com/semantic-release/semantic-release). It uses the [Conventional Commit](https://www.conventionalcommits.org/) messages to bump the version and update the [CHANGELOG](CHANGELOG.md), then publishes the site to **GitHub Pages**.

Write commit messages as `feat: …`, `fix: …`, `docs: …` and so on, so that each release gets the right version bump.

## License

[MIT](LICENSE) © Adrian Eyre
