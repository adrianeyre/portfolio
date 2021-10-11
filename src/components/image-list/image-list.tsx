import { Component } from 'react';

import IDataService from '../../services/interface/data-service-interface';
import IImageListProps from './interface/image-list-props';
import IImageListState from './interface/image-list-state';

import './image-list.scss';

export default class ImageList extends Component<IImageListProps, IImageListState> {
	private container: any;

	constructor(props: IImageListProps) {
		super(props);

		this.state = {
			data: this.props.data,
			width: this.props.width ? this.props.width : 'auto',
			autoWidth: !this.props.width || this.props.width === 'auto',
		}
	}

	public async componentDidMount() {
		this.updatePlayerArea();
		window.addEventListener('resize', this.updatePlayerArea);
	}

	public render() {
		return <div className="image-list-container" ref={(d) => { this.container = d }}>
			{ this.props.title && <h2>{ this.props.title }</h2> }
			{ this.state.data && this.state.data.map((item: IDataService, imageIndex: number) => <div key={ `image-list-${ imageIndex }` } className="image-list-box">
				{ item.image?.filename &&
					<img
						className="thumbnail"
						alt={ item.image.filename }
						src={ item.image.filename }
						width={ this.state.width }
						height={ this.props.height ? this.props.height : undefined }
					/>
				}
			</div> )}
		</div>
	}

	private updatePlayerArea = (): void => {
		if (!this.container || !this.state.data || !this.state.autoWidth) return;

		const amountOfImages = Object.keys(this.state.data).length
		const width = (this.container.getBoundingClientRect().width - ((amountOfImages - 1) * 15)) / amountOfImages;

		this.setState(() => ({ width: `${ width }px` }))
	}
}
