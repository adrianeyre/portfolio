/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import ISideBarProps from '../interface/side-bar-props';
import SideBar from '../side-bar';

describe('SideBar', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: ISideBarProps = {
		data: undefined,
		linksData:  undefined,
		scrollToAnchor: mockRouteProp,
		showModal: mockRouteProp,
	};

	it('Should render correctly', () => {
		const sidebarComponent = render(<SideBar { ...defaultProps }/>);

		expect(sidebarComponent).toMatchSnapshot();
	});
});
