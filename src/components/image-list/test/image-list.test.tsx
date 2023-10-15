/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import ImageList from '../image-list';

describe('Image List', () => {
	it('Should render correctly', () => {
		const imageListComponent = render(<ImageList />);

		expect(imageListComponent).toMatchSnapshot();
	});
});
