import React, { FC } from 'react';
import { Image } from 'react-bootstrap';

import IDataService from '../../services/interface/data-service-interface'
import Links from '../links/links';
import ISideBarProps from './interface/side-bar-props';

import './side-bar.css';

const SideBar: FC<ISideBarProps> = (props: ISideBarProps) => {
	return <div className="side-bar-container">
		<div className="image">
			<Image src="/images/links/photo.jpeg" roundedCircle={true} />
		</div>

		{ props.data && props.data.map((item: IDataService, sidebarIndex: number) => <nav key={ `sidebar-${ sidebarIndex }` } className="link-container">
			{ item.link && <a className="link" onClick={ () => props.scrollToAnchor(item.link || '') }>{ item.title }</a> }
		</nav>) }

		<Links data={ props.linksData } showModal={ props.showModal } scrollToAnchor={ props.scrollToAnchor } />
	</div>
}

export default SideBar;
