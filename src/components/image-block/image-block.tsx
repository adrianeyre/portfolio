import { useState, useEffect } from 'react';
import Slider, { Settings } from "react-slick";

import IImageBlockProps from './interface/image-block-props';
import IDataService from '../../services/interface/data-service-interface';

const ImageBlock = (props: IImageBlockProps) => {
	const [images, setImages] = useState<string[]>([]);

	const handleClick = (image: string): void => {
		window.open(image, '_blank');
	}

	useEffect(() => {
		const updatedImages: string[] = [];
	
		props?.data?.forEach((data: IDataService) => {
			if (data.image) updatedImages.push(data.image.filename);
		});

		setImages(updatedImages);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const screenWidth = props.screenWidth > 0 ? props.screenWidth : window.innerWidth;

	const settings: Settings = {
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		slidesToShow: screenWidth <= 700 ? screenWidth / 100 : 8,
	}

	return <div className="image-block-container">
		<Slider {...settings}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			{ images.map((image: string, imageIndex: number) => <img alt={ image } className="thumbnail" key={ imageIndex } src={ image } onClick={ handleClick.bind(this, image) }/> )}
		</Slider>
	</div>
}

export default ImageBlock;
