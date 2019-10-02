import React from 'react';
import { shallow } from 'enzyme';

import IDefaultBodyProps from '../interface/default-body-props';
import DefaultBody from '../default-body';

describe('DefaultBody', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: IDefaultBodyProps = {
		item: undefined,
		closeModal: mockRouteProp,
	};
	
	it('Should render correctly', () => {
		const login = shallow(<DefaultBody { ...defaultProps }/>);

		expect(login).toMatchSnapshot();
	});
});