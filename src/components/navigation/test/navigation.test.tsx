import { shallow } from 'enzyme';

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
		const navigationComponent = shallow(<Navigation { ...defaultProps }/>);

		expect(navigationComponent).toMatchSnapshot();
	});
});
