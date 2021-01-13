import React, { FC } from 'react';
import { Badge } from 'react-bootstrap';
import Slider, { Settings } from "react-slick";
import { get } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FreeFonts from '@fortawesome/free-solid-svg-icons';
import * as BrandFonts from '@fortawesome/free-brands-svg-icons';

import IDataService from '../../services/interface/data-service-interface';
import ITags from '../../services/interface/tag-interface';
import ILink from '../../services/interface/link-interface';
import IModalType from '../../services/interface/modal-type-interface';
import ICarouselProps from './interface/carousel-props';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './carousel.css';

const Carousel: FC<ICarouselProps> = (props: ICarouselProps) => {
	const fonts = {
		free: FreeFonts,
		brand: BrandFonts,
	}

	const screenWidth = props.screenWidth > 0 ? props.screenWidth : window.innerWidth;
	
	const settings: Settings = {
		dots: true,
		infinite: true,
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: screenWidth <= 700 ? 1 : 2,
	}

	return <div className="carousel-container">
		<Slider {...settings}>
			{ props.data && props.data.map((item: IDataService, cardIndex: number) => <article key={ `card-item-${ cardIndex }` } className="card">
				<div className="card-image">
					{ item.image && <a href={ item.image.link } rel="noopener noreferrer" target="_blank">
						<img alt={ item.image.filename } src={ item.image.filename } />
					</a> }
				</div>

				<header className="card-title">
					<h3>{ item.title }</h3>
				</header>

				<div className="card-body">
					<div className="card-tags">
						{ item.tags && <div>
							<FontAwesomeIcon icon={ FreeFonts.faTags } />
							{ item.tags.map((tag: ITags, tagInbdex: number) => <Badge className="card-tag" key={ `card-item-${ cardIndex }-card-tag-${ tagInbdex }` } pill={ true } variant="primary">
								{ tag }
							</Badge>) }
						</div> }
					</div>

					<div className="card-text">
						{ item.body }
					</div>
				</div>

				<div className="card-buttons">
					{ item.links && item.links.map((link: ILink, linkIndex: number) => <a key={ `link-${ linkIndex }` } href={ link.link } rel="noopener noreferrer" target="_blank" className="btn btn-primary">
						{ link.font && <FontAwesomeIcon icon={ get(fonts, link.font) } /> } { link.text }
					</a>)}
					<a onClick={ () => props.showModal(IModalType.data, item) } className="btn btn-primary"><FontAwesomeIcon icon={ FreeFonts.faInfoCircle } /> Info</a>
				</div>
			</article> )}
		</Slider>
	</div>
}

export default Carousel;
