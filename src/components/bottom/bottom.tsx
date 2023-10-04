import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'

import IBottomProps from './interface/bottom-props';

import styles from '@/styles/bottom.module.scss';

const Bottom = (props: IBottomProps) => {
	return  <div className={styles.bottomContainer}>
		<button className={styles.flatButton} onClick={ props.scrollToTop }><FontAwesomeIcon icon={ faArrowCircleUp } /></button>
	</div>
}

export default Bottom;
