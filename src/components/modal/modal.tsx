import { useState, useEffect } from 'react';
import { Modal as ModalComponent } from 'react-bootstrap';

import IModalType from '../../services/interface/modal-type-interface';
import DefaultBody from './default-body';
import EmailBody from './email-body';
import IModalProps from './interface/modal-props';

const Modal = (props: IModalProps) => {
	const [data, setData] = useState<any>({});

	useEffect(() => {
		setData(props.data || {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const item = data ? data : {}
	return <div className="modal-container">
		<ModalComponent show={ true } onHide={ props.closeModal } size="lg">
			<ModalComponent.Header translate={undefined} closeButton={ true }>
				<ModalComponent.Title>
					{ item.title && <h2>{ item.title }</h2>}
				</ModalComponent.Title>
			</ModalComponent.Header>
			{ props.modalType === IModalType.data && <DefaultBody item={ item } closeModal={ props.closeModal } /> }
			{ props.modalType === IModalType.email && <EmailBody item={ item } closeModal={ props.closeModal } /> }
		</ModalComponent>
	</div>
}

export default Modal;
