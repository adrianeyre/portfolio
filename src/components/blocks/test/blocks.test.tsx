import { shallow } from 'enzyme';

import IBlocksProps from '../interface/blocks-props';
import Blocks from '../blocks';

describe('Blocks', () => {
	const mockRouteProp: any = jest.fn();

	const defaultProps: IBlocksProps = {
		scrollToAnchor: mockRouteProp,
		showModal: mockRouteProp,
	};
	
	it('Should render correctly', () => {
		const blocksComponent = shallow(<Blocks { ...defaultProps }/>);

		expect(blocksComponent).toMatchSnapshot();
	});
});
