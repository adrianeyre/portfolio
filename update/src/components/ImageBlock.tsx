import { useState, useEffect } from 'react';
import Slider, { Settings } from 'react-slick';

interface IImageBlockProps {
	data?: any[];
	screenWidth: number;
}

const ImageBlock = (props: IImageBlockProps) => {
	const [images, setImages] = useState<string[]>([]);

	const handleClick = (image: string): void => {
		window.open(image, '_blank');
	}

	useEffect(() => {
		const updatedImages: string[] = [];

		props?.data?.forEach((data: any) => {
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
		slidesToShow: screenWidth <= 700 ? Math.floor(screenWidth / 100) : 8,
		dots: false,
		infinite: true,
	}

	return <div className="image-block-container">
		<Slider {...settings}>
			{ images.map((image: string, imageIndex: number) =>
				<div key={ imageIndex } className="image-slide">
					<img alt={ image } className="thumbnail" src={ image } onClick={ handleClick.bind(this, image) }/>
				</div>
			)}
		</Slider>
	</div>
}

export default ImageBlock;