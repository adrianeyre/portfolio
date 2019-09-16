import * as React from 'react';
import { Component } from 'react';

import './text.css';

interface ITextProps {
	filename: string;
}

interface IData {
	title?: string;
	subTitle?: string;
	body?: string;
	points?: any;
}

interface ITextState {
	data: IData[];
}

class Text extends Component<ITextProps, ITextState> {
	constructor(props: ITextProps) {
		super(props);
	}

	public async componentDidMount() {
		fetch(`./data/${ this.props.filename }`)
			.then(response => response.json())
			.then(data => this.setState(prev => ({ data })))
	}

	public render() {
		return <div className="text-container">
			{ this.state && this.state.data && this.state.data.map((item: IData, i: number) => <div key={i} className="text-item">
				{ item.title && <h2>{ item.title }</h2> }
				{ item.subTitle && <h4>{ item.subTitle }</h4> }
				{ item.body && <span dangerouslySetInnerHTML={{__html: item.body }} /> }
				{ item.points && <ul>
					{ item.points.map((point: string) => <li key={ point }>{ point }</li>) }
				</ul> }
			</div>) }
		</div>
	}
}

export default Text;