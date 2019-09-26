import * as React from 'react';
import { Component } from 'react';
import { Modal as ModalComponent, InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelopeOpenText, faStickyNote, faShare } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from "react-google-recaptcha";

import IDataService from '../../services/data-interface';

interface IEmailBodyProps {
	item: IDataService;
	closeModal(): void;
}

interface IEmailBodyData {
	name: string;
	email: string;
	message: string;
}

interface IEmailBodyState {
	recaptchaValue?: string;
}

class EmailBody extends Component<IEmailBodyProps, IEmailBodyState> {
	private data: IEmailBodyData;
	private recaptchaRef: any

	constructor(props: IEmailBodyProps) {
		super(props);

		this.data = {
			name: '',
			email: '',
			message: '',
		}

		this.state = {
			recaptchaValue: undefined,
		}

		this.recaptchaRef = React.createRef();
	}

	public render() {
		return <div>
			<Form method="post" action="/scripts/email.php">
				<ModalComponent.Body>
					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={ faUser } /></InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							required={ true }
							name="name"
							placeholder="Your Name"
							aria-label="Your Name"
							aria-describedby="basic-addon1"
							onChange={ this.handleNameChange}
						/>
					</InputGroup>

					<InputGroup className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={ faEnvelopeOpenText } /></InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							type="email"
							name="email"
							required={ true }
							placeholder="Your Email"
							aria-label="Your Email"
							aria-describedby="basic-addon1"
							onChange={ this.handleEmailChange}
						/>
					</InputGroup>

					<InputGroup>
						<InputGroup.Prepend>
							<InputGroup.Text><FontAwesomeIcon icon={ faStickyNote } /></InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							required={ true }
							name="message"
							as="textarea"
							aria-label="Your Message"
							placeholder="Your Message"
							onChange={ this.handleMessageChange}
						/>
					</InputGroup>

					<div className="recaptcha">
						<ReCAPTCHA
							ref={ this.recaptchaRef }
							sitekey="6LfkZ7oUAAAAAIik0v6p7CQugJChqZ2SbsK4hpOd"
							onChange={ this.onChange }
						/>
					</div>
				</ModalComponent.Body>
				<ModalComponent.Footer>
					<Button variant="primary" type="submit" disabled={ !this.state.recaptchaValue }>
						<FontAwesomeIcon icon={ faShare } /> Send Email
					</Button>
					<Button variant="secondary" onClick={ this.props.closeModal }>
						Close
					</Button>
				</ModalComponent.Footer>
			</Form>
		</div>
	}

	private onChange = (value: string) => this.setState({ recaptchaValue: value });
	private handleNameChange = (event: any) => this.data.name = event.target.value;
	private handleEmailChange = (event: any) => this.data.email = event.target.value;
	private handleMessageChange = (event: any) => this.data.message = event.target.value;
}

export default EmailBody;