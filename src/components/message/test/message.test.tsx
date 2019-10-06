import React from 'react';
import { shallow } from 'enzyme';

import IMessageProps from '../interface/message-props';
import Message from '../message';

describe('Message', () => {
	const defaultProps: IMessageProps = {
		message: 'My Message',
		type: 'type',
	};

	it('Should render correctly', () => {
		const messageComponent = shallow(<Message { ...defaultProps }/>);

		expect(messageComponent).toMatchSnapshot();
	});
});