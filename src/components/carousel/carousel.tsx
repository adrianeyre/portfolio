import * as React from 'react';
import { Component } from 'react';
import { Card, Badge, ListGroup } from 'react-bootstrap';
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import IDataService, { ITags } from '../../services/data-interface';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './carousel.css';

interface ICarouselProps {
	title?: string;
	body?: string;
	data: IDataService[];
	showModal(data: IDataService): void;
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
			slidesToShow: 2,
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

							<Card.Text className="card-text-body">{item.body}</Card.Text>
						</Card.Body>
						<ListGroup variant="flush">
							<ListGroup.Item>
								{ item.link && <div className="card-button">
									<a href={ item.link } target="_blank" className="btn btn-primary"><FontAwesomeIcon icon={ faGithub } /> Code</a>
									<a onClick={ this.props.showModal.bind(this, item) } className="btn btn-primary"><FontAwesomeIcon icon={ faInfoCircle } /> Info</a>
								</div> }
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</div>)}
			</Slider>
		</div>
	}
}

export default Carousel;