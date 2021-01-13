import React, { FC, useState } from 'react';
import { Alert } from 'react-bootstrap';

import IMessageProps from './interface/message-props';

import './message.css';

const Message: FC<IMessageProps> = (props: IMessageProps) => {
	const [show, setShow] = useState<boolean>(!!props.message);

	const handleClickLink = () => setShow(false);

	if (!props.message || !show) return null;

	return <div className="message-container">
		<Alert variant={ props.type === 'success' ? 'success' : 'danger' }>
			<div className="message-area">
				<div className="message">{ props.message }</div>

				<div className="message-close">
					<a onClick={ handleClickLink }>X</a>
				</div>
			</div>
		</Alert>
	</div>
}

export default Message;
