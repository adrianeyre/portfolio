import * as React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'

import IBottomProps from './interface/bottom-props';
import './bottom.css';

export default class Bottom extends Component<IBottomProps, any> {
	public render() {
		return  <div className="bottom-container">
			<a onClick={ this.props.scrollToTop }><FontAwesomeIcon icon={ faArrowCircleUp } /></a>
		</div>
	}
}
