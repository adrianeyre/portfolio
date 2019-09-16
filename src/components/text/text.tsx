import * as React from 'react';
import { Component } from 'react';

import IDataService, { IPoints } from '../../services/data-interface'

import './text.css';

interface ITextProps {
	data: IDataService[];
}

interface ITextState {
	data: IDataService[];
}

class Text extends Component<ITextProps, ITextState> {

	constructor(props: ITextProps) {
		super(props);

		this.state = {
			data: this.props.data,
		}
	}

	public render() {
		return <div className="text-container">
			{ this.state.data && this.state.data.map((item: IDataService, i: number) => <div key={i} className="text-item">
				{ item.title && <h2>{ item.title }</h2> }
				{ item.subTitle && <h4>{ item.subTitle }</h4> }
				{ item.body && <span dangerouslySetInnerHTML={{__html: item.body }} /> }
				{ item.points && <ul>
					{ item.points.map((point: IPoints, idx: number) => <li key={ idx }>{ point }</li>) }
				</ul> }
			</div>) }
		</div>
	}
}

export default Text;