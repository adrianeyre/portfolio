import { shallow } from 'enzyme';

import IDataService from '../../../services/interface/data-service-interface';
import Text from '../text';

describe('Text', () => {
	const data: IDataService[] = [
		{
			title: 'My Title',
			subTitle: [
				{
					name: 'My Subtitle'
				}
			],
			body: "My Body",
			image: {
				filename: 'myimage.png',
			},
			points: [
				{
					name: 'point 1',
				}
			]
		}
	]

	it('Should render correctly', () => {
		const textComponent = shallow(<Text data={ data }/>);

		expect(textComponent).toMatchSnapshot();
	});
});
