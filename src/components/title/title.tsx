import * as React from 'react';
import { Component } from 'react';

import ITitleProps from './interface/title-props';
import './title.css';

export default class Title extends Component<ITitleProps, {}> {
	public render() {
		return <div className="title-container">
			{ (this.props.title || this.props.subTitle) && <div className="text-row">
				<header className="text-container">
					{ this.props.title && <h1 className="primary-text">{ this.props.title }</h1> }
					{ this.props.subTitle && <span className="secondary-text">{ this.props.subTitle }</span> }
				</header>
			</div> }
		</div>
	}
}
