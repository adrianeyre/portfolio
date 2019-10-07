import * as React from 'react';
import { Component } from 'react';

import IImageProps from './interface/image-props';
import IImageState from './interface/image-state';
import './image.css';

class Image extends Component<IImageProps, IImageState> {
	constructor(props: IImageProps) {
		super(props);

		this.state = {
			style: {
				backgroundImage: `url("./images/blocks/${ props.imageName }")`,
			}
		}
	}

	public render() {
		return <div className="image-container">
			<div className="image" style={ this.state.style }>
				{ (this.props.title || this.props.subTitle) && <div className="text-row">
					<div className="text-container">
						{ this.props.title && <h1 className="primary-text">{ this.props.title }</h1> }
						{ this.props.subTitle && <span className="secondary-text">{ this.props.subTitle }</span> }
					</div>
				</div> }
			</div>
		</div>
	}
}

export default Image;
