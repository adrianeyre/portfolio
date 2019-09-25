import * as React from 'react';
import { Component } from 'react';
import { Modal as ModalComponent } from 'react-bootstrap';

import IDataService, { IModalType } from '../../services/data-interface';
import DefaultBody from './default-body';
import EmailBody from './email-body';

import './modal.css';

interface IModalProps {
	data?: IDataService;
	modalType?: IModalType;
	closeModal(): void;
}

interface IModalState {
	data?: IDataService;
	show: boolean;
	modalType?: IModalType;
}

class Modal extends Component<IModalProps, IModalState> {
	constructor(props: IModalProps) {
		super(props);

		this.state = {
			data: this.props.data,
			modalType: this.props.modalType,
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
				{ this.state.modalType === IModalType.data && <DefaultBody item={ item } closeModal={ this.props.closeModal } /> }
				{ this.state.modalType === IModalType.email && <EmailBody item={ item } closeModal={ this.props.closeModal } /> }
			</ModalComponent>
		</div>
	}
}

export default Modal;