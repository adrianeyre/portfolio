import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import TitleImage from '../components/TitleImage';
import voluntaryData from '../data/voluntary.json';

const Voluntary = () => (
  <section id="voluntary" className="section panel">
    <Reveal>
      <SectionHeader tag="Voluntary Work" title="Giving Back" />
    </Reveal>
    <div className="grid cards-grid">
      {voluntaryData.map((item, index) => (
        <Reveal key={index} delay={index * 0.08}>
          <article className="card">
            <h3>
              <TitleImage filename={item.image?.filename} link={item.image?.link} alt={item.title} />
              {item.title}
            </h3>
            {item.subTitle && item.subTitle.map((subTitleItem) => <p key={subTitleItem}>{subTitleItem}</p>)}
            <p>{item.body}</p>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Voluntary;
