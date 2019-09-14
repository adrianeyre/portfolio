import * as React from 'react';
import { Component } from 'react';
import Image from './components/image/image';
import Text from './components/text/text';
import Navigation from './components/navigation/navigation';
import Cards from './components/cards/cards';

import './App.css';

class App extends Component<any, any> {
	public render() {
		// return <div className="website-container">
		// 	<div className="menu">
		// 		{/* <Navigation /> */}
		// 	</div>
		// 	<div className="content">
		// 		<a id="image1" />
		// 		<Image imageName="image1.jpg" title="MAIN TITLE" subTitle="Sub Title" />
		// 		<a id="text1" />
		// 		<Text filename="test.json" />
		// 		<a id="image2" />
		// 		<Image imageName="image2.jpg" title="NEXT TITLE" subTitle="Sub Title" />
		// 		<a id="text2" />
		// 		<Cards filename="test.json" title="CARD TITLE" />
		// 	</div>
		// </div>
		return <div className="wrapper">
					<div className="menu">
						<Navigation />
					</div>

					<div className="main">
						<a id="about" />
						<Image imageName="image1.jpg" title="ADRIAN EYRE" subTitle="Software Developer" />
						<Text filename="about.json" />
						<a id="skills" />
						<Image imageName="image2.jpg" title="SKILLS" />
						<Text filename="skills.json" />
						<a id="projects" />
						<Image imageName="image3.jpg" title="PROJECTS" />
						<Cards filename="projects.json"/>
					</div>
			
					<div className="sidebar">
						<h3>Adrian Eyre</h3>
						<p><a href="#about">Abount</a></p>
						<p><a href="#skills">Skills</a></p>
						<p><a href="#projects">Projects</a></p>
					</div>
				</div>
	}
}

export default App;
