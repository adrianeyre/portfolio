/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import ILinksProps from '../interface/links-props';
import Links from '../links';

describe('Links', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: ILinksProps = {
		data: undefined,
		showModal: mockRouteProp,
		scrollToAnchor: mockRouteProp,
	};

	it('Should render correctly', () => {
		const linksComponent = render(<Links { ...defaultProps }/>);

		expect(linksComponent).toMatchSnapshot();
	});
});
