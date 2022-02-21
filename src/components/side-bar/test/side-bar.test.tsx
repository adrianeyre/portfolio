import { shallow } from 'enzyme';

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
		const sidebarComponent = shallow(<SideBar { ...defaultProps }/>);

		expect(sidebarComponent).toMatchSnapshot();
	});
});
