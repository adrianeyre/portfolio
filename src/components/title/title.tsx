import { FC } from 'react';

import ITitleProps from './interface/title-props';

import styles from '@/styles/title.module.scss';

const Title: FC<ITitleProps> = (props: ITitleProps) => {
	return <div className={styles.titleContainer}>
		{ (props.title || props.subTitle) && <div className={styles.textRow}>
			<header className={styles.textContainer}>
				{ props.title && <h1 className={styles.primaryText}>{ props.title }</h1> }
				{ props.subTitle && <span className={styles.secondaryText}>{ props.subTitle }</span> }
			</header>
		</div> }
	</div>
}

export default Title;
