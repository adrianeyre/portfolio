import * as React from 'react';
import { Component, RefObject } from 'react';
import { Modal as ModalComponent, InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelopeOpenText, faStickyNote, faShare, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from 'react-google-recaptcha';

import IEmailBodyProps from './interface/email-body-props';
import IEmailBodyState from './interface/email-body-state';

interface IEmailBodyData {
	name: string;
	email: string;
	message: string;
}

export default class EmailBody extends Component<IEmailBodyProps, IEmailBodyState> {
	private data: IEmailBodyData;
	private recaptchaRef: RefObject<any>;

	constructor(props: IEmailBodyProps) {
		super(props);

		this.data = {
			name: '',
			email: '',
			message: '',
		}

		this.state = {
			recaptchaValue: null,
		}

		this.recaptchaRef = React.createRef();
	}

	public render() {
		return <div>
			<Form method="post" action="/scripts/email.php">
				<ModalComponent.Body>
					<InputGroup className="mb-3">
						<InputGroup>
							<InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={ faUser } /></InputGroup.Text>
						</InputGroup>
						<FormControl
							required={ true }
							name="name"
							placeholder="Your Name"
							aria-label="Your Name"
							aria-describedby="basic-addon1"
							onChange={ this.handleNameChange }
						/>
					</InputGroup>

					<InputGroup className="mb-3">
						<InputGroup>
							<InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={ faEnvelopeOpenText } /></InputGroup.Text>
						</InputGroup>
						<FormControl
							type="email"
							name="email"
							required={ true }
							placeholder="Your Email"
							aria-label="Your Email"
							aria-describedby="basic-addon1"
							onChange={ this.handleEmailChange }
						/>
					</InputGroup>

					<InputGroup>
						<InputGroup>
							<InputGroup.Text><FontAwesomeIcon icon={ faStickyNote } /></InputGroup.Text>
						</InputGroup>
						<FormControl
							required={ true }
							name="message"
							as="textarea"
							aria-label="Your Message"
							placeholder="Your Message"
							onChange={ this.handleMessageChange }
						/>
					</InputGroup>

					<div className="recaptcha">
						<ReCAPTCHA
							ref={ this.recaptchaRef }
							sitekey="6LfkZ7oUAAAAAIik0v6p7CQugJChqZ2SbsK4hpOd"
							onChange={ this.onRecaptchaChange }
						/>
					</div>
				</ModalComponent.Body>
				<ModalComponent.Footer>
					<Button variant="primary" type="submit" disabled={ !this.state.recaptchaValue }><FontAwesomeIcon icon={ faShare } /> Send Email</Button>
					<Button variant="secondary" onClick={ this.props.closeModal }><FontAwesomeIcon icon={ faTimesCircle} /> Close</Button>
				</ModalComponent.Footer>
			</Form>
		</div>
	}

	private onRecaptchaChange = (value: string | null) => this.setState({ recaptchaValue: value });
	private handleNameChange = (event: React.ChangeEvent<any>) => this.data.name = event.target.value;
	private handleEmailChange = (event: React.ChangeEvent<any>) => this.data.email = event.target.value;
	private handleMessageChange = (event: React.ChangeEvent<any>) => this.data.message = event.target.value;
}
