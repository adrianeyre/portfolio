import React from 'react';
import { shallow } from 'enzyme';

import ITextProps from '../interface/text-props';
import Text from '../text';

describe('Text', () => {
	const defaultProps: ITextProps = {
		data: undefined,
	};
	
	it('Should render correctly', () => {
		const login = shallow(<Text { ...defaultProps }/>);

		expect(login).toMatchSnapshot();
	});
});