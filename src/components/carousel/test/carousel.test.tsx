import React from 'react';
import { shallow } from 'enzyme';

import IBottomProps from '../interface/carousel-props';
import Carousel from '../carousel';

describe('Carousel', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: IBottomProps = {
		title: 'My Title',
		body: 'My Body',
		data: undefined,
		screenWidth: 0,
		showModal: mockRouteProp
	};
	
	it('Should render correctly', () => {
		const carouselComponent = shallow(<Carousel { ...defaultProps }/>);

		expect(carouselComponent).toMatchSnapshot();
	});
});