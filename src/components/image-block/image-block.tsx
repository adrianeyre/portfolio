import * as React from 'react';
import { Component } from 'react';
import Slider, { Settings } from "react-slick";

import IImageBlockProps from './interface/image-block-props';
import IDataService from '../../services/interface/data-service-interface';

import './image-block.css';

export default class ImageBlock extends Component<IImageBlockProps, {}> {
	private images: string[]

	constructor(props: IImageBlockProps) {
		super(props);

		this.images = []
	}

	public componentDidMount() {
		if (!this.props.data) return;

		this.props.data.forEach((data: IDataService) => {
			if (data.image) this.images.push(data.image.filename);
		})
	}

	public render() {
		const screenWidth = this.props.screenWidth > 0 ? this.props.screenWidth : window.innerWidth;

		const settings: Settings = {
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			slidesToShow: screenWidth <= 700 ? screenWidth / 100 : 8,
		}

		return <div className="image-block-container">
			<Slider {...settings}>
				{ this.images.map((image: string, imageIndex: number) => <img className="thumbnail" key={ imageIndex } src={ image } onClick={ this.handleClick.bind(this, image) }/> )}
			</Slider>
		</div>
	}

	private handleClick = (image: string): void => {
		window.open(image, '_blank');
	}
}
