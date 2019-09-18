import * as React from 'react';
import { Component } from 'react';
import { Image } from 'react-bootstrap';

import IDataService from '../../services/data-interface'

import Links from '../links/links';

import './side-bar.css';

interface ISideBarProps {
	data: IDataService[];
	linksData: IDataService[];
	scrollToAnchor(anchor: string): void;
}

interface ISideBarState {
	data: IDataService[];
	linksData: IDataService[];
}

class SideBar extends Component<ISideBarProps, ISideBarState> {
	constructor(props: ISideBarProps) {
		super(props);

		this.state = {
			data: this.props.data,
			linksData: this.props.linksData,
		}
	}

	public render() {
		return <div className="side-bar-container">
			<h3>Adrian Eyre</h3>

			<div className="image">
				<Image src="/images/photo.jpeg" roundedCircle={true} />
			</div>

			{ this.state.data && this.state.data.map((item: IDataService, i: number) => <div key={i} className="link-container">
				<a className="link" onClick={ this.props.scrollToAnchor.bind(this, item.link) }>{ item.title }</a>
			</div>) }

			<Links data={ this.state.linksData }/>
		</div>
	}
}

export default SideBar;