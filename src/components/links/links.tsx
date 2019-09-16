import * as React from 'react';
import { Component } from 'react';

import DataService from '../../services/data-service'
import IDataService from '../../services/data-interface'

import './links.css';

interface ILinksProps {
	filename: string;
}

interface ILinksState {
	data: IDataService[];
}

class Links extends Component<ILinksProps, ILinksState> {
	private dataService: DataService;

	constructor(props: ILinksProps) {
		super(props);

		this.dataService = new DataService;
	}

	public async componentDidMount() {
		const data = await this.dataService.getData(this.props.filename);
		this.setState(prev => ({ data }));
	}

	public render() {
		return <div className="links-container">
			{ this.state && this.state.data && this.state.data.map((item: IDataService, i: number) => <span key={i}>
				{ item.image && <a href={ item.image.link }><img src={ item.image.filename } /></a> }
			</span>)}
		</div>
	}
}

export default Links;