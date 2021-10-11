import { FC } from 'react';

import IImageProps from './interface/image-props';

import './image.scss';

const Image: FC<IImageProps> = (props: IImageProps) => {
	const style = {
		backgroundImage: `url("./images/blocks/${ props.imageName }")`,
	}

	return <div className="image-container">
		<div className="image" style={ style }>
			{ (props.title || props.subTitle) && <div className="text-row">
				<div className="text-container">
					{ props.title && <h1 className="primary-text">{ props.title }</h1> }
					{ props.subTitle && <span className="secondary-text">{ props.subTitle }</span> }
				</div>
			</div> }
		</div>
	</div>
}

export default Image;
