import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import IDataService from '../../services/interface/data-service-interface';
import IModalType from '../../services/interface/modal-type-interface';
import IBlocksProps from './interface/blocks-props';

import './blocks.css';

const Blocks: FC<IBlocksProps> = (props: IBlocksProps) => {
	const evenBoxBackgroundColour: string = '#25A7E1';
	const oddBoxBackgroundColour: string = '#056B93';

	const styleBlockBox = (blockIndex: number, isLink: boolean) => ({
		backgroundColor: blockIndex % 2 === 0 ? evenBoxBackgroundColour : oddBoxBackgroundColour,
		cursor: isLink ? 'pointer' : undefined,
	})

	const handleClickLink = (link?: string, type?: string) => {
		if (!link || !type) return;

		if (type === 'link') {
			window.open(link, '_blank');
			return;
		}

		if (type === 'anchor') {
			return props.scrollToAnchor(link);
		}

		const data: IDataService = {
			title: 'Contact Me'
		};

		props.showModal(IModalType.email, data);
	}

	return <div className="blocks-container">
		<div className="row">
			{ props.data && props.data.map((item: IDataService, blockIndex: number) => <div key={ `block-${ blockIndex }` } className="col-md-4">
				<div className="block-box" onClick={ () => handleClickLink(item.image?.link, item.image?.type) } style={ styleBlockBox(blockIndex, item.image?.link !== undefined) }>
					{ item.body && <div className="body-text">{ item.body }</div>}
					
					{ item.image?.link && <div className="link"><FontAwesomeIcon icon={ faPlayCircle } /></div>}
				</div>
			</div> )}
		</div>
	</div>
}

export default Blocks;
