/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import IModalProps from '../interface/modal-props';
import Modal from '../modal';

describe('Modal', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: IModalProps = {
		data: undefined,
		modalType: undefined,
		closeModal: mockRouteProp,
	};

	it('Should render correctly', () => {
		const modelComponent = render(<Modal { ...defaultProps }/>);

		expect(modelComponent).toMatchSnapshot();
	});
});
