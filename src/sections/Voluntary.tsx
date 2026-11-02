import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import TitleImage from '../components/TitleImage';
import voluntaryData from '../data/voluntary.json';
import { parseMeta } from '../utils/meta';

const Voluntary = () => (
  <section id="voluntary" className="section">
    <Reveal>
      <SectionHeader tag="Voluntary Work" title="Giving Back" />
    </Reveal>
    <ul className="cred-grid cred-grid-two">
      {voluntaryData.map((item, index) => {
        const meta = parseMeta(item.subTitle);
        return (
          <li key={item.title}>
            <Reveal className="cred-card" delay={index * 0.08}>
              <div className="cred-head">
                <TitleImage filename={item.image?.filename} link={item.image?.link} alt={item.title} />
                <h3>{item.title}</h3>
              </div>
              <ul className="cred-meta">
                  {meta.map((line) => (
                    <li key={line.value}>
                      {line.label ? <span className="meta-label">{line.label}</span> : null}
                      {line.value}
                    </li>
                  ))}
                </ul>
              <p className="cred-body">{item.body}</p>
            </Reveal>
          </li>
        );
      })}
    </ul>
  </section>
);

export default Voluntary;
