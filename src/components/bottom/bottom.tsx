import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'

import IBottomProps from './interface/bottom-props';
import './bottom.css';

const Bottom: FC<IBottomProps> = (props: IBottomProps) => {
	return  <div className="bottom-container">
		<a onClick={ props.scrollToTop }><FontAwesomeIcon icon={ faArrowCircleUp } /></a>
	</div>
}

export default Bottom;
