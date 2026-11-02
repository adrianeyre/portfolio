# Stageshow kit

`kit/` is the React kit from the **Stageshow** skill by Benji Taylor
([benjitaylor/skills](https://github.com/benjitaylor/skills), `stageshow/kit`),
copied unchanged at commit `8020574` (31 October 2026). It is MIT licensed; see
[`LICENSE`](LICENSE). The brand artwork in `kit/brands/` carries its own
licences, listed in `kit/brands/SOURCES.md`.

The site's illustrations are built on it, in [`src/demos`](../demos):

| Scene | Where it shows | What it does |
| --- | --- | --- |
| `HeroDemo` | Hero | An AI agent takes a change in the terminal, the diff writes itself into the pull request, the checks pass and the pull request is merged. Plays once when it scrolls into view; **Replay** remounts it. |
| `PipelineTile` | Skills bento | A release's build, test and deploy steps pass and it goes live. Plays once. |
| `ProjectShot` | Projects | A project's screenshot inside a browser window, pinned to the top of a well and running off its bottom. A still. |

Each scene's still state (its `poster`) is what a visitor who prefers reduced
motion sees, and what the README screenshots show.

## Working on a scene

Edit the kit only by re-copying it from upstream, so it can be updated by
diffing against a newer version. Restyle its parts from the scene's own CSS.

To look at one scene on its own, run `npm run dev` and open
`/demos.html?scene=hero` (or `pipeline`, `project`; add `&theme=dark` or
`&width=390`). That page is for development only and is not built.

To check a scene the way the skill does, film it with Stageshow's own tool
from a checkout of the skills repo (`npm install` in its `stageshow` folder
first):

```sh
node scripts/film.mjs "http://localhost:5173/demos.html?scene=hero" --select '#example .ss-fit' --gate
node scripts/film.mjs "http://localhost:5173/demos.html?scene=hero" --select '#example .ss-fit' --width 390 --gate
```

`REHEARSAL.md` in `src/demos` records what was checked last time.
