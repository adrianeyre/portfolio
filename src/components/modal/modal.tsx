import * as React from 'react';
import { Component } from 'react';
import { Modal as ModalComponent, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import IDataService, { ITags } from '../../services/data-interface';

import './modal.css';

interface IModalProps {
	data?: IDataService;
	closeModal(): void;
}

interface IModalState {
	data?: IDataService;
	show: boolean;
}

class Modal extends Component<IModalProps, IModalState> {
	constructor(props: IModalProps) {
		super(props);

		this.state = {
			data: this.props.data,
			show: true
		}
	}

	public render() {
		const item = this.state.data ? this.state.data : {}
		return <div className="modal-container">
			<ModalComponent show={ this.state.show } onHide={ this.props.closeModal } size="lg">
				<ModalComponent.Header closeButton={ true }>
					<ModalComponent.Title>
						{ item.title && <h2>{ item.title }</h2>}
					</ModalComponent.Title>
				</ModalComponent.Header>
				<ModalComponent.Body>
					{ item.image && <a href={ item.image.link } target="_blank">
						<img src={ item.image.filename } />
					</a> }

					{ item.tags && <div className="card-tags">
						<FontAwesomeIcon icon={ faTags } />
						{ item.tags.map((tag: ITags, tagInbdex: number) => <Badge className="card-tag" key={ `card-tag-${ tagInbdex }` } pill={ true } variant="primary">
							{ tag }
						</Badge>) }
					</div> }

					{ item.body && <div>{ item.body }</div> }
				</ModalComponent.Body>
				<ModalComponent.Footer>
					<a href={ item.link } target="_blank" className="btn btn-primary">Link</a>
					<Button variant="secondary" onClick={ this.props.closeModal }>
						Close
					</Button>
				</ModalComponent.Footer>
			</ModalComponent>
		</div>
	}
}

export default Modal;