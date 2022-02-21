import { shallow } from 'enzyme';

import IImageProps from '../interface/image-props';
import Image from '../image';

describe('Image', () => {
	const defaultProps: IImageProps = {
		imageName: 'ImageName.pnd',
		title: 'My Title',
		subTitle: 'My Subtitle',
	};
	
	it('Should render correctly', () => {
		const imageComponent = shallow(<Image { ...defaultProps }/>);

		expect(imageComponent).toMatchSnapshot();
	});
});
