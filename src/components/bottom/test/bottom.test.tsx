/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import IBottomProps from '../interface/bottom-props';
import Bottom from '../bottom';

describe('Bottom', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: IBottomProps = {
		scrollToTop: mockRouteProp
	};
	
	it('Should render correctly', () => {
		const bottomComponent = render(<Bottom { ...defaultProps }/>);

		expect(bottomComponent).toMatchSnapshot();
	});
});
