import * as React from 'react';
import { Component } from 'react';
import { Badge } from 'react-bootstrap';
import Slider, { Settings } from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faInfoCircle, faLink } from '@fortawesome/free-solid-svg-icons';

import IDataService from '../../services/interface/data-service-interface';
import ITags from '../../services/interface/tag-interface';
import IModalType from '../../services/interface/modal-type-interface';
import ICarouselProps from './interface/carousel-props';
import ICarouselState from './interface/carousel-state';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './carousel.css';

class Carousel extends Component<ICarouselProps, ICarouselState> {
	constructor(props: ICarouselProps) {
		super(props);

		this.state = {
			data: this.props.data,
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
				{ this.state.data && this.state.data.map((item: IDataService, cardIndex: number) => <div key={ `card-item-${ cardIndex }` } className="card">
					<div className="card-image">
						{ item.image && <a href={ item.image.link } target="_blank">
							<img src={ item.image.filename } />
						</a> }
					</div>

					<div className="card-title">
						<h3>{ item.title }</h3>
					</div>

					<div className="card-body">
						<div className="card-tags">
							{ item.tags && <div>
								<FontAwesomeIcon icon={ faTags } />
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
						{ item.link && <div>
							<a href={ item.link } target="_blank" className="btn btn-primary"><FontAwesomeIcon icon={ faLink} /> Link</a>
							<a onClick={ this.props.showModal.bind(this, IModalType.data, item) } className="btn btn-primary"><FontAwesomeIcon icon={ faInfoCircle } /> Info</a>
						</div> }
					</div>
				</div>)}
			</Slider>
		</div>
	}
}

export default Carousel;