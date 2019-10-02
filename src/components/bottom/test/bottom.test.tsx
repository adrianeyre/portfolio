import React from 'react';
import { shallow } from 'enzyme';

import IBottomProps from '../interface/bottom-props';
import Bottom from '../bottom';

describe('Bottom', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: IBottomProps = {
		scrollToTop: mockRouteProp
	};
	
	it('Should render correctly', () => {
		const login = shallow(<Bottom { ...defaultProps }/>);

		expect(login).toMatchSnapshot();
	});
});