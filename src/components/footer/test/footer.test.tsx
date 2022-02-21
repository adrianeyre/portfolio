import { shallow } from 'enzyme';

import Footer from '../footer';

describe('Footer', () => {
	it('Should render correctly', () => {
		const footerComponent = shallow(<Footer />);

		expect(footerComponent).toMatchSnapshot();
	});
});
