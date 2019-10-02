import React from 'react';
import { shallow } from 'enzyme';

import ILinksProps from '../interface/links-props';
import Links from '../links';

describe('Links', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: ILinksProps = {
		data: undefined,
		showModal: mockRouteProp,
	};

	it('Should render correctly', () => {
		const login = shallow(<Links { ...defaultProps }/>);

		expect(login).toMatchSnapshot();
	});
});