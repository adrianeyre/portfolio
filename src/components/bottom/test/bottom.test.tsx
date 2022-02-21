import { shallow } from 'enzyme';

import IBottomProps from '../interface/bottom-props';
import Bottom from '../bottom';

describe('Bottom', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: IBottomProps = {
		scrollToTop: mockRouteProp
	};
	
	it('Should render correctly', () => {
		const bottomComponent = shallow(<Bottom { ...defaultProps }/>);

		expect(bottomComponent).toMatchSnapshot();
	});
});
