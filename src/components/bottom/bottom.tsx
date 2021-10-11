import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'

import IBottomProps from './interface/bottom-props';
import './bottom.scss';

const Bottom: FC<IBottomProps> = (props: IBottomProps) => {
	return  <div className="bottom-container">
		<button className="flat-button" onClick={ props.scrollToTop }><FontAwesomeIcon icon={ faArrowCircleUp } /></button>
	</div>
}

export default Bottom;
