import { FC, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import IDataService from '../../services/interface/data-service-interface';

import Links from '../links/links';
import INavigationProps from './interface/navigation-props';

import './navigation.scss';

const Navigation: FC<INavigationProps> = (props: INavigationProps) => {
	const [isCollasped, setIsCollasped] = useState<boolean>(true);

	const toggleNav = () => setIsCollasped(!isCollasped);

	const colaspeNavbar = (link?: string) => {
		setIsCollasped(true);

		if (!link) return;
		props.scrollToAnchor(link);
	}

	return <div className="navigation-container">
		<Navbar expanded={ !isCollasped } bg="light" expand="lg" fixed="top">
			<Navbar.Brand href="/">ADRIAN EYRE</Navbar.Brand>
			<span className="top-bar-links"><Links data={ props.linksData } showModal={ props.showModal } scrollToAnchor={ props.scrollToAnchor } /></span>
			<Navbar.Toggle onClick={ toggleNav } aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					{ props.data && props.data.map((item: IDataService, navIndex: number) => <Nav.Link key={ `navigation-${ navIndex }` }>
						{ item.link && <a onClick={ () => colaspeNavbar(item.link) }>{ item.title }</a> }
					</Nav.Link>) }
					<Nav.Link><Links data={ props.linksData } showModal={ props.showModal } scrollToAnchor={ props.scrollToAnchor } /></Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	</div>
}

export default Navigation;
