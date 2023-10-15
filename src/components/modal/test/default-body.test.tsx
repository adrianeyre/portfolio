/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import IDefaultBodyProps from '../interface/default-body-props';
import DefaultBody from '../default-body';

describe('DefaultBody', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: IDefaultBodyProps = {
		item: undefined,
		closeModal: mockRouteProp,
	};
	
	it('Should render correctly', () => {
		const defaultBodyComponent = render(<DefaultBody { ...defaultProps }/>);

		expect(defaultBodyComponent).toMatchSnapshot();
	});
});
