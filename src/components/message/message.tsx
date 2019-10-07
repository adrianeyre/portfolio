import * as React from 'react';
import { Component } from 'react';
import { Alert } from 'react-bootstrap';

import IMessageProps from './interface/message-props';
import IMessageState from './interface/message-state';
import './message.css';

class Message extends Component<IMessageProps, IMessageState> {
	constructor(props: IMessageProps) {
		super(props);

		this.state = {
			show: !!this.props.message
		}
	}

	public render() {
		if (!this.props.message || !this.state.show) return null;

		return <div className="message-container">
			
			<Alert variant={ this.props.type === 'success' ? 'success' : 'danger' }>
				<div className="message-area">
					<div className="message">{ this.props.message }</div>

					<div className="message-close">
						<a onClick={ this.handleClickLink }>X</a>
					</div>
				</div>
			</Alert>
		</div>
	}

	private handleClickLink = () => this.setState({ show: false });
}

export default Message;
