import React, { FC } from 'react';

import IDataService from '../../services/interface/data-service-interface'
import IPoints from '../../services/interface/points-interface'
import ISubTitle from '../../services/interface/subtitle-interface'
import IImage from '../../services/interface/image-interface';
import ITextProps from './interface/text-props';

import './text.css';

const Text: FC<ITextProps> = (props: ITextProps) => {
	const styleImage = () => ({
		borderRadius: props.imageRadius ? props.imageRadius : undefined,
	})

	return <div className="text-container">
		<div className="row">
			{ props.imageName && props.imagePosition === 'left' && <div className="col-md-6">
				<img width="100%" height="100%" alt={ props.imageName } src={`/images/backgrounds/${ props.imageName }`} style={ styleImage() } />
			</div> }
			<div className={ props.imageName ? 'col-md-6' : 'col-md-12' }>
				{ props.data && props.data.map((item: IDataService, textIndex: number) => <article key={ `text-item-${ textIndex }` } className="text-item">
					<div className="title">
						{ item.image && <a href={ item.image.link } rel="noopener noreferrer" target="_blank"><img alt={ item.image.filename } src={ item.image.filename } /></a> }
						{ item.title && <h2>{ item.title }</h2> }
					</div>

					{ item.subTitle && item.subTitle.map((subTitle: ISubTitle, subtitleIndex: number) => <h4 key={ `subtitle-${ subtitleIndex }` }>{ subTitle }</h4>) }
					{ item.images && <div className="images-row">
						{ item.images.map((image: IImage, imageIndex: number) => <div key={ `item-image-${ textIndex }-${ imageIndex }` } >
							<a href={ image.link } rel="noopener noreferrer" target="_blank"><img height={ image.height } width={ image.width } alt={ image.filename } src={ image.filename } title={ image.title }/></a>
						</div>) }
					</div> }
					{ item.body && <span dangerouslySetInnerHTML={{__html: item.body }} /> }
					{ item.points && <ul>
						{ item.points.map((point: IPoints, pointIndex: number) => <li key={ pointIndex }>{ point }</li>) }
					</ul> }
				</article>) }
				{ props.page }
			</div>
			{ props.imageName && props.imagePosition === 'right' && <div className="col-md-6">
				<img width="100%" height="100%" alt={ props.imageName } src={`/images/backgrounds/${ props.imageName }`} style={ styleImage() } />
			</div> }
		</div>
	</div>
}

export default Text;
