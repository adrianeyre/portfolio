/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import Footer from '../footer';

describe('Footer', () => {
	it('Should render correctly', () => {
		const footerComponent = render(<Footer />);

		expect(footerComponent).toMatchSnapshot();
	});
});
