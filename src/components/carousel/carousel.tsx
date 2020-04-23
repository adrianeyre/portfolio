import * as React from 'react';
import { Component } from 'react';
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
import ICarouselState from './interface/carousel-state';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './carousel.css';

export default class Carousel extends Component<ICarouselProps, ICarouselState> {
	constructor(props: ICarouselProps) {
		super(props);

		this.state = {
			data: this.props.data,
			fonts: {
				free: FreeFonts,
				brand: BrandFonts,
			}
		}
	}

	public render() {
		const screenWidth = this.props.screenWidth > 0 ? this.props.screenWidth : window.innerWidth;
		
		const settings: Settings = {
			dots: true,
			infinite: true,
			centerMode: true,
			centerPadding: '60px',
			slidesToShow: screenWidth <= 700 ? 1 : 2,
		}

		return <div className="carousel-container">
			<Slider {...settings}>
				{ this.state.data && this.state.data.map((item: IDataService, cardIndex: number) => <article key={ `card-item-${ cardIndex }` } className="card">
					<div className="card-image">
						{ item.image && <a href={ item.image.link } target="_blank">
							<img src={ item.image.filename } />
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
						{ item.links && item.links.map((link: ILink, linkIndex: number) => <a key={ `link-${ linkIndex }` } href={ link.link } target="_blank" className="btn btn-primary">
							{ link.font && <FontAwesomeIcon icon={ get(this.state.fonts, link.font) } /> } { link.text }
						</a>)}
						<a onClick={ this.props.showModal.bind(this, IModalType.data, item) } className="btn btn-primary"><FontAwesomeIcon icon={ FreeFonts.faInfoCircle } /> Info</a>
					</div>
				</article> )}
			</Slider>
		</div>
	}
}
