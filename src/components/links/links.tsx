import * as React from 'react';
import { Component } from 'react';

import IDataService from '../../services/data-interface'

import './links.css';

interface ILinksProps {
	data: IDataService[];
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
				{ item.image && <a href={ item.image.link } target="_blank"><img src={ item.image.filename } /></a> }
			</span>)}
		</div>
	}
}

export default Links;