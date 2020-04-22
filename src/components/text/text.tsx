import * as React from 'react';
import { Component } from 'react';

import IDataService from '../../services/interface/data-service-interface'
import IPoints from '../../services/interface/points-interface'
import ISubTitle from '../../services/interface/subtitle-interface'
import ITextProps from './interface/text-props';
import ITextState from './interface/text-state';
import './text.css';

export default class Text extends Component<ITextProps, ITextState> {

	constructor(props: ITextProps) {
		super(props);

		this.state = {
			data: this.props.data,
		}
	}

	public render() {
		return <div className="text-container">
			<div className="row">
				{ this.props.imageName && this.props.imagePosition === 'left' && <div className="col-md-6">
					<img width="100%" height="100%" src={`/images/backgrounds/${ this.props.imageName }`} style={ this.styleImage() } />
				</div> }
				<div className={ this.props.imageName ? 'col-md-6' : 'col-md-12' }>
					{ this.state.data && this.state.data.map((item: IDataService, textIndex: number) => <div key={ `text-item-${ textIndex }` } className="text-item">
						<div className="title">
							{ item.image && <a href={ item.image.link } target="_blank"><img src={ item.image.filename } /></a> }
							{ item.title && <h2>{ item.title }</h2> }
						</div>

						{ item.subTitle && item.subTitle.map((subTitle: ISubTitle, subtitleIndex: number) => <h4 key={ `subtitle-${ subtitleIndex }` }>{ subTitle }</h4>) }
						{ item.body && <span dangerouslySetInnerHTML={{__html: item.body }} /> }
						{ item.points && <ul>
							{ item.points.map((point: IPoints, pointIndex: number) => <li key={ pointIndex }>{ point }</li>) }
						</ul> }
					</div>) }
					{ this.props.page }
				</div>
				{ this.props.imageName && this.props.imagePosition === 'right' && <div className="col-md-6">
					<img width="100%" height="100%" src={`/images/backgrounds/${ this.props.imageName }`} style={ this.styleImage() } />
				</div> }
			</div>
		</div>
	}

	private styleImage = () => ({
		borderRadius: this.props.imageRadius ? this.props.imageRadius : undefined,
	})
}
