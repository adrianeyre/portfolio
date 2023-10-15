/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import IBlocksProps from '../interface/blocks-props';
import Blocks from '../blocks';

describe('Blocks', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: IBlocksProps = {
		scrollToAnchor: mockRouteProp,
		showModal: mockRouteProp,
	};
	
	it('Should render correctly', () => {
		const blocksComponent = render(<Blocks { ...defaultProps } />);

		expect(blocksComponent).toMatchSnapshot();
	});
});
