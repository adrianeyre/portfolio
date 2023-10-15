/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';


import ITitleProps from '../interface/title-props';
import Title from '../title';

describe('Image', () => {
	const defaultProps: ITitleProps = {
		title: 'My Title',
		subTitle: 'My Subtitle',
	};
	
	it('Should render correctly', () => {
		const imageComponent = render(<Title { ...defaultProps }/>);

		expect(imageComponent).toMatchSnapshot();
	});
});
