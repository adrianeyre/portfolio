/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';


import INavigationProps from '../interface/navigation-props';
import Navigation from '../navigation';

describe('Navigation', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: INavigationProps = {
		data: undefined,
		linksData:  undefined,
		scrollToAnchor: mockRouteProp,
		showModal: mockRouteProp,
	};

	it('Should render correctly', () => {
		const navigationComponent = render(<Navigation { ...defaultProps }/>);

		expect(navigationComponent).toMatchSnapshot();
	});
});
