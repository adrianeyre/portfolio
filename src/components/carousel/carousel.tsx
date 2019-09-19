import * as React from 'react';
import { Component } from 'react';
import { Card, Badge } from 'react-bootstrap';
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'

import IDataService, { ITags } from '../../services/data-interface';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './carousel.css';

interface ICarouselProps {
	title?: string;
	body?: string;
	data: IDataService[];
}

interface ICarouselState {
	data: IDataService[];
}

class Carousel extends Component<ICarouselProps, ICarouselState> {
	constructor(props: ICarouselProps) {
		super(props);

		this.state = {
			data: this.props.data,
		}
	}

	public render() {
		const settings = {
			dots: true,
			infinite: true,
			centerMode: true,
 			centerPadding: '60px',
			slidesToShow: 3,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						arrows: false,
						centerMode: true,
						centerPadding: '40px',
						slidesToShow: 3
					}
				},
				{
					breakpoint: 480,
					settings: {
						arrows: false,
						centerMode: true,
						centerPadding: '40px',
						slidesToShow: 1
					}
				}
			]
		};

		return <div className="carousel-container">
			<Slider {...settings}>
				{ this.state.data && this.state.data.map((item: IDataService, cardIndex: number) => <div key={ `card-item-${ cardIndex }` } className="card-item">
					<Card>
						{ item.image && <a href={ item.image.link } target="_blank">
							<Card.Img variant="top" src={ item.image.filename } />
						</a> }
						<Card.Body>
							<Card.Title>{item.title}</Card.Title>
							{ item.tags && <div className="card-tags">
								<FontAwesomeIcon icon={ faTags } />
								{ item.tags.map((tag: ITags, tagInbdex: number) => <Badge className="card-tag" key={ `card-item-${ cardIndex }-card-tag-${ tagInbdex }` } pill={ true } variant="primary">
									{ tag }
								</Badge>) }
							</div> }
							<Card.Text>{item.body}</Card.Text>
							{ item.link && <div className="card-button">
								<a href={ item.link } target="_blank" className="btn btn-primary">Link</a>
							</div> }
						</Card.Body>
					</Card>
				</div>)}
			</Slider>
		</div>
	}
}

export default Carousel;