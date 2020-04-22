import React from 'react';
import { shallow } from 'enzyme';

import ImageList from '../image-list';

describe('Image List', () => {
	it('Should render correctly', () => {
		const imageListComponent = shallow(<ImageList />);

		expect(imageListComponent).toMatchSnapshot();
	});
});
