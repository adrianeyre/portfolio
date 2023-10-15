/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import IMessageProps from '../interface/message-props';
import Message from '../message';

describe('Message', () => {
	const defaultProps: IMessageProps = {
		message: 'My Message',
		type: 'type',
	};

	it('Should render correctly', () => {
		const messageComponent = render(<Message { ...defaultProps }/>);

		expect(messageComponent).toMatchSnapshot();
	});
});
