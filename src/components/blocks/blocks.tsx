import * as React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import IDataService from '../../services/interface/data-service-interface';
import IModalType from '../../services/interface/modal-type-interface';
import IBlocksProps from './interface/blocks-props';
import IBlocksState from './interface/blocks-state';

import './blocks.css';

export default class Blocks extends Component<IBlocksProps, IBlocksState> {
	private readonly evenBoxBackgroundColour: string = '#25A7E1';
	private readonly oddBoxBackgroundColour: string = '#056B93';

	constructor(props: IBlocksProps) {
		super(props);

		this.state = {
			data: this.props.data,
		}
	}

	public render() {
		return <div className="blocks-container">
			<div className="row">
				{ this.state.data && this.state.data.map((item: IDataService, blockIndex: number) => <div key={ `block-${ blockIndex }` } className="col-md-4">
					<div className="block-box" onClick={ this.handleClickLink.bind(this, item.image?.link, item.image?.type) } style={ this.styleBlockBox(blockIndex, item.image?.link !== undefined) }>
						{ item.body && <div className="body-text">{ item.body }</div>}
						
						{ item.image?.link && <div className="link"><FontAwesomeIcon icon={ faPlayCircle } /></div>}
					</div>
				</div> )}
			</div>
		</div>
	}

	private styleBlockBox = (blockIndex: number, isLink: boolean) => ({
		backgroundColor: blockIndex % 2 === 0 ? this.evenBoxBackgroundColour : this.oddBoxBackgroundColour,
		cursor: isLink ? 'pointer' : undefined,
	})

	private handleClickLink = (link?: string, type?: string) => {
		if (!link || !type) return;

		if (type === 'link') {
			window.open(link, '_blank');
			return;
		}

		if (type === 'anchor') {
			return this.props.scrollToAnchor(link);
		}

		const data: IDataService = {
			title: 'Contact Me'
		};

		this.props.showModal(IModalType.email, data);
	}
}
