/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import IEmailBodyProps from '../interface/email-body-props';
import EmailBody from '../email-body';

describe('EmailBody', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: IEmailBodyProps = {
		item: undefined,
		closeModal: mockRouteProp,
	};

	it('Should render correctly', () => {
		const emailBodyComponent = render(<EmailBody { ...defaultProps }/>);

		expect(emailBodyComponent).toMatchSnapshot();
	});
});
