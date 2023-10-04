import { useState, useEffect } from 'react';

import IDataService from '../../services/interface/data-service-interface';
import IImageListProps from './interface/image-list-props';

import styles from '@/styles/image-list.module.scss';

const ImageList = (props: IImageListProps) => {
	const [container, setContainer] = useState<any>();
	const [data, setData] = useState<any>();
	const [width, setWidth] = useState<string>('auto');
	const [autoWidth, setAutoWidth] = useState<any>(true);

	useEffect(() => {
		setData(props.data);
		setWidth(props.width ? props.width : 'auto');
		setAutoWidth(props.width || props.width === 'auto');

		if (!props.data) return;

		const amountOfImages = Object.keys(props.data).length
		const width = (container?.getBoundingClientRect().width - ((amountOfImages - 1) * 15)) / amountOfImages;

		setWidth(`${ width }px`);
	}, []);

	return <div className={styles.imageListContainer} ref={(d) => { setContainer(d) }}>
		{ props.title && <h2>{ props.title }</h2> }
		{ data && data.map((item: IDataService, imageIndex: number) => <div key={ `image-list-${ imageIndex }` } className={styles.imageListBox}>
			{ item.image?.filename &&
				<img
					className={styles.thumbnail}
					alt={ item.image.filename }
					src={ item.image.filename }
					width={ width }
					height={ props.height ? props.height : undefined }
				/>
			}
		</div> )}
	</div>
}

export default ImageList;
