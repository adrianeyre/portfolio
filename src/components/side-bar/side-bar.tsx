import * as React from 'react';
import { Component } from 'react';
import { Image } from 'react-bootstrap';

import IDataService from '../../services/interface/data-service-interface'

import Links from '../links/links';
import ISideBarProps from './interface/side-bar-props';
import ISideBarState from './interface/side-bar-state';
import './side-bar.css';

export default class SideBar extends Component<ISideBarProps, ISideBarState> {
	constructor(props: ISideBarProps) {
		super(props);

		this.state = {
			data: this.props.data,
			linksData: this.props.linksData,
		}
	}

	public render() {
		return <div className="side-bar-container">
			<div className="image">
				<Image src="/images/links/photo.jpeg" roundedCircle={true} />
			</div>

			{ this.state.data && this.state.data.map((item: IDataService, sidebarIndex: number) => <div key={ `sidebar-${ sidebarIndex }` } className="link-container">
				{ item.link && <a className="link" onClick={ this.props.scrollToAnchor.bind(this, item.link) }>{ item.title }</a> }
			</div>) }

			<Links data={ this.state.linksData } showModal={ this.props.showModal } scrollToAnchor={ this.props.scrollToAnchor } />
		</div>
	}
}
