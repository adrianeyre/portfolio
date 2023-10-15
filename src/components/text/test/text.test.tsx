/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import IDataService from '../../../services/interface/data-service-interface';
import Text from '../text';

describe('Text', () => {
	const data: IDataService[] = [
		{
			title: 'My Title',
			subTitle: [
				'My Subtitle',
			],
			body: "My Body",
			image: {
				filename: 'myimage.png',
			},
			points: [
				'point 1',
			]
		}
	]

	it('Should render correctly', () => {
		const textComponent = render(<Text data={ data }/>);

		expect(textComponent).toMatchSnapshot();
	});
});
