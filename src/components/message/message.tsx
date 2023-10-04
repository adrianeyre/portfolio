import { FC, useState } from 'react';
import { Alert } from 'react-bootstrap';

import IMessageProps from './interface/message-props';

import styles from '@/styles/message.module.scss';

const Message: FC<IMessageProps> = (props: IMessageProps) => {
	const [show, setShow] = useState<boolean>(!!props.message);

	const handleClickLink = () => setShow(false);

	if (!props.message || !show) return null;

	return <div className={styles.messageContainer}>
		<Alert variant={ props.type === 'success' ? 'success' : 'danger' }>
			<div className={styles.messageArea}>
				<div className={styles.message}>{ props.message }</div>

				<div className={styles.messageClose}>
					<a onClick={ handleClickLink }>X</a>
				</div>
			</div>
		</Alert>
	</div>
}

export default Message;
