import * as React from 'react';
import { Component } from 'react';

import IDataService, { IModalType } from '../../services/data-interface'

import './links.css';

interface ILinksProps {
	data: IDataService[];
	showModal(type: IModalType, data?: IDataService): void;
}

interface ILinksState {
	data: IDataService[];
}

class Links extends Component<ILinksProps, ILinksState> {
	constructor(props: ILinksProps) {
		super(props);

		this.state = {
			data: this.props.data,
		}
	}

	public render() {
		return <div className="links-container">
			{ this.state.data && this.state.data.map((item: IDataService, linkIndex: number) => <span key={ `link-${ linkIndex }` }>
				{ item.image && <a onClick={ this.handleClickLink.bind(this, item.image.link, item.image.type) }><img src={ item.image.filename } /></a> }
			</span>)}
		</div>
	}

	private handleClickLink = (link: string, type: string) => {
		if (type === 'link') {
			window.open(link, '_blank');
			return;
		}

		const data: IDataService = {
			title: 'Contact Me'
		};

		this.props.showModal(IModalType.email, data);
	}
}

export default Links;