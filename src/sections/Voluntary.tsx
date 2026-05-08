import SectionHeader from '../components/SectionHeader';
import TitleImage from '../components/TitleImage';
import voluntaryData from '../data/voluntary.json';

const Voluntary = () => (
  <section id="voluntary" className="section panel">
    <SectionHeader tag="Voluntary Work" title="Giving Back" />
    <div className="grid cards-grid">
      {voluntaryData.map((item, index) => (
        <article className="card" key={index}>
          <h3>
            <TitleImage filename={item.image?.filename} link={item.image?.link} alt={item.title} />
            {item.title}
          </h3>
          {item.subTitle && item.subTitle.map((subTitleItem) => <p key={subTitleItem}>{subTitleItem}</p>)}
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  </section>
);

export default Voluntary;
