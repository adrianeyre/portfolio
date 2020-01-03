import React from 'react';
import { shallow } from 'enzyme';

import ITitleProps from '../interface/title-props';
import Title from '../title';

describe('Image', () => {
	const defaultProps: ITitleProps = {
		title: 'My Title',
		subTitle: 'My Subtitle',
	};
	
	it('Should render correctly', () => {
		const imageComponent = shallow(<Title { ...defaultProps }/>);

		expect(imageComponent).toMatchSnapshot();
	});
});
