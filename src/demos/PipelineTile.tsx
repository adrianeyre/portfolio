import { Badge, Check, Stage, States, type Act, type Theme } from '../stageshow/kit';
import './pipeline-tile.css';

/*
 * The Skills bento's one UI tile: a deployment pipeline, cropped to the
 * component and running off the bottom of its tile. It does one small thing
 * once as it scrolls into view: each step passes in turn and the release
 * goes live.
 */

type Step = 'idle' | 'pending' | 'done';
type S = { steps: Step[]; live: boolean };

const STEPS = [
  { label: 'Build', time: '48s' },
  { label: 'Test', time: '1m 12s' },
  { label: 'Deploy to AWS', time: '2m 05s' },
];

const initial: S = { steps: ['done', 'pending', 'idle'], live: false };
const POSTER: S = { steps: ['done', 'done', 'done'], live: true };

async function script(a: Act<S>) {
  await a.wait(600);
  await a.set({ steps: ['done', 'done', 'pending'] });
  await a.wait(1100);
  await a.set({ steps: ['done', 'done', 'done'] });
  await a.wait(350);
  await a.set({ live: true });
}

const PipelineTile = ({ theme }: { theme: Theme }) => (
  <Stage
    width={780}
    height={230}
    compact={{ below: 560, width: 358, height: 230 }}
    initial={initial}
    poster={POSTER}
    script={script}
    play="once"
    theme={theme}
    accent={theme === 'dark' ? '#2dd4bf' : '#0f766e'}
    className="pipeline-tile"
  >
    {(s) => (
      <div className="pl-card">
        <div className="pl-head">
          <span className="pl-title">Release 4.2.0</span>
          <States
            align="end"
            value={s.live ? 'live' : 'running'}
            states={{
              running: <Badge tone="warning" dot>Running</Badge>,
              live: <Badge tone="success" dot>Live</Badge>,
            }}
          />
        </div>
        {STEPS.map((step, i) => (
          <div key={step.label} className="pl-row" data-state={s.steps[i]}>
            <Check on={s.steps[i] === 'done'} pending={s.steps[i] === 'pending'} size={16} />
            <span className="pl-label">{step.label}</span>
            <span className="pl-time">{s.steps[i] === 'done' ? step.time : ''}</span>
          </div>
        ))}
      </div>
    )}
  </Stage>
);

export default PipelineTile;
