import * as React from 'react';
import { Component } from 'react';
import { Element, animateScroll as scroll, scroller } from 'react-scroll'


import Image from './components/image/image';
import Text from './components/text/text';
import Navigation from './components/navigation/navigation';
import Cards from './components/cards/cards';
import SideBar from './components/side-bar/side-bar';
import Bottom from './components/bottom/bottom';
import Links from './components/links/links';

import './App.css';

class App extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.scrollToAnchor = this.scrollToAnchor.bind(this);
		this.scrollToTop = this.scrollToTop.bind(this);
	}

	public render() {
		return <div className="wrapper">
			<div className="menu">
				<Navigation scrollToAnchor={ this.scrollToAnchor }/>
			</div>

			<div className="sidebar">
				<SideBar scrollToAnchor={ this.scrollToAnchor }/>
			</div>

			<div className="main">
				<Element name="about">
					<Image imageName="image1.jpg" title="ADRIAN EYRE" subTitle="Software Developer" />
					<Text filename="about.json" />
					<Links filename="links.json"/>
				</Element>
				<Element name="skills">
					<Image imageName="image2.jpg" title="SKILLS" />
					<Text filename="skills.json" />
				</Element>
				<Element name="projects">
					<Image imageName="image3.jpg" title="PROJECTS" />
					<Cards filename="projects.json"/>
				</Element>
				<Element name="education">
					<Image imageName="image4.jpg" title="EDUCATION" />
					<Text filename="education.json"/>
				</Element>
				<Element name="experience">
					<Image imageName="image5.jpg" title="EXPERIENCE" />
					<Text filename="experience.json"/>
				</Element>
			</div>

			<div className="bottom">
				<Bottom scrollToTop={ this.scrollToTop }/>
			</div>
		</div>
	}

	private scrollToTop = () => scroll.scrollToTop();

	private scrollToAnchor = (anchor: string) => scroller.scrollTo(anchor, {
		duration: 800,
		delay: 0,
		smooth: 'easeInOutQuart',
		offset: 0
	})
}

export default App;
