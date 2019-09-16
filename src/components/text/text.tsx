import * as React from 'react';
import { Component } from 'react';

import DataService from '../../services/data-service'
import IDataService, { IPoints } from '../../services/data-interface'

import './text.css';

interface ITextProps {
	filename: string;
}

interface ITextState {
	data: IDataService[];
}

class Text extends Component<ITextProps, ITextState> {
	private dataService: DataService;

	constructor(props: ITextProps) {
		super(props);

		this.dataService = new DataService;
	}

	public async componentDidMount() {
		const data = await this.dataService.getData(this.props.filename);
		this.setState(prev => ({ data }));
	}

	public render() {
		return <div className="text-container">
			{ this.state && this.state.data && this.state.data.map((item: IDataService, i: number) => <div key={i} className="text-item">
				{ item.title && <h2>{ item.title }</h2> }
				{ item.subTitle && <h4>{ item.subTitle }</h4> }
				{ item.body && <span dangerouslySetInnerHTML={{__html: item.body }} /> }
				{ item.points && <ul>
					{ item.points.map((point: IPoints) => <li key={ point.name }>{ point }</li>) }
				</ul> }
			</div>) }
		</div>
	}
}

export default Text;