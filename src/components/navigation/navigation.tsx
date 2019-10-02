import * as React from 'react';
import { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import IDataService from '../../services/interface/data-service-interface';

import Links from '../links/links';
import INavigationProps from './interface/navigation-props';
import INavigationState from './interface/navigation-state';
import './navigation.css';

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
				<span className="top-bar-links"><Links data={ this.state.linksData } showModal={ this.props.showModal } /></span>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						{ this.state.data && this.state.data.map((item: IDataService, navIndex: number) => <Nav.Link key={ `navigation-${ navIndex }` }>
							{ item.link && <a onClick={ this.props.scrollToAnchor.bind(this, item.link) }>{ item.title }</a> }
						</Nav.Link>) }
						<Nav.Link><Links data={ this.state.linksData } showModal={ this.props.showModal } /></Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	}
}

export default Navigation;