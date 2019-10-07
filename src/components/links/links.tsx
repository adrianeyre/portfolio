import * as React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as FreeFonts from '@fortawesome/free-solid-svg-icons';
import * as BrandFonts from '@fortawesome/free-brands-svg-icons';
import { get } from 'lodash';

import IDataService from '../../services/interface/data-service-interface';
import IModalType from '../../services/interface/modal-type-interface';
import ILinksProps from './interface/links-props';
import ILinksState from './interface/links-state';
import './links.css';

class Links extends Component<ILinksProps, ILinksState> {
	constructor(props: ILinksProps) {
		super(props);

		this.state = {
			data: this.props.data,
			fonts: {
				free: FreeFonts,
				brand: BrandFonts,
			}
		}
	}

	public render() {
		return <div className="links-container">
			{ this.state.data && this.state.data.map((item: IDataService, linkIndex: number) => <span key={ `link-${ linkIndex }` }>
				{ item.image && item.image.link && item.image.type && <a onClick={ this.handleClickLink.bind(this, item.image.link, item.image.type) }>
					{ item.image.filename && <img src={ item.image.filename } /> }
					{ item.image.font && <FontAwesomeIcon className="icon" icon={ get(this.state.fonts, item.image.font) } /> }
				</a> }
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
