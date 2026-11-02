import { Badge, Bar, Caret, Check, Code, Collapse, Prompt, Stage, States, Swap, Window, type Act, type CodeLine, type Theme } from '../stageshow/kit';
import './hero-demo.css';

/*
 * The hero illustration: an AI coding agent picks up a change in the
 * terminal, the diff writes itself into the pull request, the checks go
 * green and the pull request is merged.
 *
 * Built with Stageshow (see src/stageshow/README.md). Layout is "corner
 * bleed": the review window is inset from the top and left and runs off the
 * right and bottom, and the terminal is a satellite straddling its left edge,
 * over the window's file sidebar rather than its content.
 */

type S = {
  typed: string;
  /** How many terminal output lines have arrived. */
  out: number;
  /** How many diff lines have streamed in. */
  diff: number;
  checks: ('idle' | 'pending' | 'done')[];
  merged: boolean;
};

const COMMAND = 'claude "retry failed webhooks"';

const DIFF: CodeLine[] = [
  { text: 'export async function handle(event) {' },
  { text: '  await deliver(event)', kind: 'del' },
  { text: '  await retry(() => deliver(event), {', kind: 'add' },
  { text: '    attempts: 5,', kind: 'add' },
  { text: "    backoff: 'exponential',", kind: 'add' },
  { text: '  })', kind: 'add' },
  { text: '}' },
];

const CHECKS = ['Tests', 'Lint', 'Build'];

const initial: S = {
  typed: '',
  out: 0,
  diff: 2,
  checks: ['idle', 'idle', 'idle'],
  merged: false,
};

/** The frame most people see: the change made, every check green, merged. */
const POSTER: S = {
  typed: COMMAND,
  out: 3,
  diff: DIFF.length,
  checks: ['done', 'done', 'done'],
  merged: true,
};

const REST = { wide: { x: 470, y: 316 }, compact: { x: 300, y: 268 } };

async function script(a: Act<S>) {
  await a.wait(700);

  // 1. Ask the agent for the change
  await a.type('typed', COMMAND);
  await a.wait(250);
  await a.key('enter');
  await a.set({ out: 1 });
  await a.wait(700);

  // 2. The diff writes itself into the pull request
  for (let n = 3; n <= DIFF.length; n += 1) {
    await a.set({ diff: n });
    await a.wait(170);
  }
  await a.set({ out: 2 });
  await a.wait(500);

  // 3. The checks run, then pass one after another
  await a.set({ checks: ['pending', 'pending', 'pending'] });
  await a.wait(900);
  for (let i = 0; i < CHECKS.length; i += 1) {
    await a.set((s) => ({ checks: s.checks.map((c, j) => (j === i ? 'done' : c)) }));
    await a.wait(320);
  }
  await a.set({ out: 3 });
  await a.wait(500);

  // 4. Merge: the payoff lands on the button and the status badge
  await a.move('merge');
  await a.wait(250);
  await a.click();
  await a.set({ merged: true });
  await a.wait(500);
  await a.move('rest');
}

interface HeroDemoProps {
  theme: Theme;
}

const HeroDemo = ({ theme }: HeroDemoProps) => (
  <Stage
    width={720}
    height={360}
    compact={{ below: 600, width: 358, height: 480 }}
    initial={initial}
    poster={POSTER}
    script={script}
    play="once"
    theme={theme}
    accent={theme === 'dark' ? '#2dd4bf' : '#0f766e'}
    cursor={{ at: REST, idle: 2500 }}
    keys={{ wide: 'bottom-left', compact: 'bottom-left' }}
    className="hero-demo"
  >
    {(s, _rect, layout) => (
      <>
        <Window
          title={layout === 'wide' ? 'Retry failed payment webhooks' : 'Retry failed webhooks'}
          lead={
            <States
              align="start"
              className="hd-status"
              value={s.merged ? 'merged' : 'open'}
              states={{
                open: <Badge tone="success" dot>Open</Badge>,
                merged: <Badge tone="accent" dot>Merged</Badge>,
              }}
            />
          }
          // A plain window centers its title; a toolbar slot moves it left,
          // beside the lights, so the status badge after it stays in frame.
          toolbar={layout === 'compact' ? <span /> : undefined}
          className="hd-review"
          sidebar={layout === 'wide' ? <Sidebar /> : undefined}
          sidebarWidth={160}
        >
          <div className="hd-body">
            <div className="hd-diff">
              <div className="hd-file">
                <span>src/webhooks.ts</span>
              </div>
              <Code lines={DIFF} count={s.diff} start={41} />
            </div>

            <div className="hd-checks">
              {CHECKS.map((label, i) => (
                <span key={label} className="hd-check">
                  <Check on={s.checks[i] === 'done'} pending={s.checks[i] === 'pending'} size={14} />
                  {label}
                </span>
              ))}
              <span
                className="hd-merge"
                data-target="merge"
                data-cursor="pointer"
                data-done={s.merged || undefined}
              >
                <Swap id={s.merged ? 'merged' : 'merge'}>{s.merged ? (layout === 'wide' ? 'Merged into main' : 'Merged') : 'Merge'}</Swap>
              </span>
            </div>

            <div className="hd-comment">
              <Bar w={22} h={22} r={11} tone={2} />
              <div className="hd-comment-lines">
                <Bar w={180} h={6} tone={2} />
                <Bar w={130} h={6} tone={1} />
              </div>
            </div>
          </div>
        </Window>

        <Window chrome="terminal" title="~/payments-api" className="hd-term">
          <div className="ss-term">
            <Prompt path="~/api">
              {s.typed}
              {s.out === 0 && <Caret still={s.typed.length > 0 && s.typed.length < COMMAND.length} />}
            </Prompt>
            <Collapse open={s.out >= 1} reveal="drop">
              <div className="dim">Reading src/webhooks.ts</div>
            </Collapse>
            <Collapse open={s.out >= 2} reveal="drop">
              <div className="ok">✓ Edited src/webhooks.ts</div>
            </Collapse>
            <Collapse open={s.out >= 3} reveal="drop">
              <div className="ok">✓ 42 tests passed</div>
            </Collapse>
          </div>
        </Window>

        <span data-target="rest" className="hd-rest" style={REST[layout]} />
      </>
    )}
  </Stage>
);

/** The repository's file list: filler, and what the terminal sits over. */
const Sidebar = () => (
  <div className="hd-sidebar">
    {[64, 82, 52, 74, 60, 88, 48].map((w, i) => (
      <div key={i} className="hd-file-row">
        <Bar w={10} h={10} r={2} tone={2} />
        <Bar w={w} h={6} tone={i === 3 ? 3 : 2} />
      </div>
    ))}
  </div>
);

export default HeroDemo;
