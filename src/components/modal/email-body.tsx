import * as React from 'react';
import { Component } from 'react';
import { InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelopeOpenText, faStickyNote, faShare } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from "react-google-recaptcha";

interface IEmailBodyData {
	name: string;
	email: string;
	message: string;
	recaptchaInstance?: any;
	recaptchaValue?: any;
}

class EmailBody extends Component<any, any> {
	private data: IEmailBodyData;
	private recaptchaRef: any

	constructor(props: any) {
		super(props);

		this.data = {
			name: '',
			email: '',
			message: '',
			recaptchaInstance: undefined,
			recaptchaValue: undefined,
		}

		this.recaptchaRef = React.createRef();
	}

	public render() {
		return <div>
			<Form onSubmit={ this.handleSubmit }>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={ faUser } /></InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						required={ true }
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

				<div className="submit-button">
					<Button variant="primary" type="submit">
						<FontAwesomeIcon icon={ faShare } /> Send Email
					</Button>
				</div>
			</Form>
		</div>
	}

	private onChange = (r: any) => {
		console.log('onChange')
		console.log(r);
		this.data.recaptchaInstance = r;
	}

	private handleSubmit = (event: any) => {
		this.data.recaptchaValue = this.recaptchaRef.current.getValue();

		console.log(this.data)
		event.preventDefault();
		event.stopPropagation();
	};

	private handleNameChange = (event: any) => this.data.name = event.target.value;
	private handleEmailChange = (event: any) => this.data.email = event.target.value;
	private handleMessageChange = (event: any) => this.data.message = event.target.value;
}

export default EmailBody;