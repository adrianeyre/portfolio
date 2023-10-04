import { Component } from 'react';
import { Modal as ModalComponent } from 'react-bootstrap';

import IModalType from '../../services/interface/modal-type-interface';
import DefaultBody from './default-body';
import EmailBody from './email-body';
import IModalProps from './interface/modal-props';
import IModalState from './interface/modal-state';

export default class Modal extends Component<IModalProps, IModalState> {
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
				<ModalComponent.Header translate={undefined} closeButton={ true }>
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
