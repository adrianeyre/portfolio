import * as React from 'react';
import { Component } from 'react';
import { Element, animateScroll as scroll, scroller } from 'react-scroll'

import DataService from './services/data-service'
import IDataService from './services/data-interface'

import Image from './components/image/image';
import Text from './components/text/text';
import Navigation from './components/navigation/navigation';
import Carousel from './components/carousel/carousel';
import SideBar from './components/side-bar/side-bar';
import Bottom from './components/bottom/bottom';
import Links from './components/links/links';

import './App.css';

interface IAppState {
	data: any;
	height: number;
}

class App extends Component<any, IAppState> {
	private dataService: DataService;
	private dataFiles = ['menu', 'about', 'links', 'skills', 'projects', 'education', 'experience', 'codewars'];

	constructor(props: any) {
		super(props);

		this.dataService = new DataService;

		this.scrollToAnchor = this.scrollToAnchor.bind(this);
		this.scrollToTop = this.scrollToTop.bind(this);

		this.state = {
			data: {},
			height: 0,
		};
	}

	public async componentDidMount() {
		const data = {};

		await this.dataFiles.forEach(async (filename: string) =>  {
			data[filename] = await this.dataService.getData(`${ filename }.json`) as IDataService[]
			this.setState(({ data }));
		})

		window.addEventListener('scroll', this.listenToScroll)
	}

	public componentWillUnmount() {
		window.removeEventListener('scroll', this.listenToScroll)
	}

	public render() {
		if (Object.keys(this.state.data).length !== this.dataFiles.length) return <div>Loading</div>

		return <div className="wrapper">
			<div className="menu">
				<Navigation data={ this.state.data.menu } linksData={ this.state.data.links } scrollToAnchor={ this.scrollToAnchor }/>
			</div>

			<div className="sidebar">
				<SideBar data={ this.state.data.menu } linksData={ this.state.data.links } scrollToAnchor={ this.scrollToAnchor }/>
			</div>

			<div className="main">
				<Element name="about">
					<Image imageName="image1.jpg" title="ADRIAN EYRE" subTitle="Software Developer" />
					<Text data={ this.state.data.about } />
					<Links data={ this.state.data.links }/>
				</Element>
				<Element name="skills">
					<Image imageName="image2.jpg" title="SKILLS" />
					<Text data={ this.state.data.skills } />
				</Element>
				<Element name="projects">
					<Image imageName="image3.jpg" title="PROJECTS" />
					<Carousel data={ this.state.data.projects }/>
				</Element>
				<Element name="education">
					<Image imageName="image4.jpg" title="EDUCATION" />
					<Text data={ this.state.data.education } />
				</Element>
				<Element name="experience">
					<Image imageName="image5.jpg" title="EXPERIENCE" />
					<Text data={ this.state.data.experience } />
				</Element>
				<Element name="codewars">
					<Image imageName="image6.jpg" title="AUTHORED CODEWARS KATAS" />
					<Carousel data={ this.state.data.codewars }/>
				</Element>
			</div>

			{ this.state.height > 0.01 && <div className="bottom">
				<Bottom scrollToTop={ this.scrollToTop }/>
			</div> }
		</div>
	}

	private listenToScroll = () => {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
		this.setState({ height: winScroll / height })
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
