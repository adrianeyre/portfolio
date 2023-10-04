import IImageProps from './interface/image-props';

import styles from '@/styles/image.module.scss';

const Image = (props: IImageProps) => {
	const style = {
		backgroundImage: `url("./images/blocks/${ props.imageName }")`,
	}

	return <div className={styles.imageContainer}>
		<div className={styles.image} style={ style }>
			{ (props.title || props.subTitle) && <div className={styles.textRow}>
				<div className={styles.textContainer}>
					{ props.title && <h1 className={styles.primaryText}>{ props.title }</h1> }
					{ props.subTitle && <span className={styles.secondaryText}>{ props.subTitle }</span> }
				</div>
			</div> }
		</div>
	</div>
}

export default Image;
