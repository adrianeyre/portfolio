import { shallow } from 'enzyme';

import IImageBlockProps from '../interface/image-block-props';
import ImageBlock from '../image-block';

describe('Image Block', () => {
	const defaultProps: IImageBlockProps = {
		data: undefined,
		screenWidth: 0,
	};
	
	it('Should render correctly', () => {
		const imageBlockComponent = shallow(<ImageBlock { ...defaultProps }/>);

		expect(imageBlockComponent).toMatchSnapshot();
	});
});
