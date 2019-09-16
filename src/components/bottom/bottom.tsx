import * as React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'

import './bottom.css';

interface IBottomProps {
	scrollToTop(): void;
}


class Bottom extends Component<IBottomProps, any> {
	constructor(props: IBottomProps) {
		super(props);
	}

	public render() {
		return  <div className="bottom-container">
			<a onClick={ this.props.scrollToTop }><FontAwesomeIcon icon={ faArrowCircleUp } /></a>
		</div>
	}
}

export default Bottom;