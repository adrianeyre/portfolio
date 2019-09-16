import * as React from 'react';
import { Component } from 'react';
import { Image } from 'react-bootstrap';

import './side-bar.css';

interface ISideBarProps {
	scrollToAnchor(anchor: string): void;
}

interface ISideBarState {
	style?: any;
}

class SideBar extends Component<ISideBarProps, ISideBarState> {
	constructor(props: ISideBarProps) {
		super(props);
	}

	public render() {
		return <div className="side-bar-container">
			<h3>Adrian Eyre</h3>
			<div className="image">
				<Image src="/images/photo.jpeg" roundedCircle={true} />
			</div>
			<a className="link" onClick={ this.props.scrollToAnchor.bind(this, 'about') }>About</a>
			<a className="link" onClick={ this.props.scrollToAnchor.bind(this, 'skills') }>Skills</a>
			<a className="link" onClick={ this.props.scrollToAnchor.bind(this, 'projects') }>Projects</a>
			<a className="link" onClick={ this.props.scrollToAnchor.bind(this, 'education') }>Education</a>
			<a className="link" onClick={ this.props.scrollToAnchor.bind(this, 'experience') }>Experience</a>
		</div>
	}
}

export default SideBar;