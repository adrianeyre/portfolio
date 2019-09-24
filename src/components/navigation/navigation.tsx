import * as React from 'react';
import { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import IDataService, { IModalType } from '../../services/data-interface'

import Links from '../links/links';

import './navigation.css';

interface INavigationProps {
	data: IDataService[];
	linksData: IDataService[];
	scrollToAnchor(anchor: string): void;
	showModal(type: IModalType, data?: IDataService): void;
}

interface INavigationState {
	data: IDataService[];
	linksData: IDataService[];
}

class Navigation extends Component<INavigationProps, INavigationState> {
	constructor(props: INavigationProps) {
		super(props);

		this.state = {
			data: this.props.data,
			linksData: this.props.linksData,
		}
	}

	public render() {
		return <div className="navigation-container">
			<Navbar bg="light" expand="lg" fixed="top">
				<Navbar.Brand href="/">ADRIAN EYRE</Navbar.Brand>
				<Links data={ this.state.linksData } showModal={ this.props.showModal } />
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						{ this.state.data && this.state.data.map((item: IDataService, navIndex: number) => <Nav.Link key={ `navigation-${ navIndex }` }>
							<a onClick={ this.props.scrollToAnchor.bind(this, item.link) }>{ item.title }</a>
						</Nav.Link>) }
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	}
}

export default Navigation;