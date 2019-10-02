import React from 'react';
import { shallow } from 'enzyme';

import IModalrops from '../interface/modal-props';
import Modal from '../modal';

describe('Modal', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: IModalrops = {
		data: undefined,
		modalType: undefined,
		closeModal: mockRouteProp,
	};
	
	it('Should render correctly', () => {
		const login = shallow(<Modal { ...defaultProps }/>);

		expect(login).toMatchSnapshot();
	});
});