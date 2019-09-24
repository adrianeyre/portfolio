import * as React from 'react';
import { InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelopeOpenText, faStickyNote, faShare } from '@fortawesome/free-solid-svg-icons';
import * as Recaptcha from 'react-recaptcha';

const handleSubmit = (event: any) => {
	// const form = event.currentTarget;
	event.preventDefault();
	event.stopPropagation();
};

const data = {
	name: '',
	email: '',
	message: '',
};

const handleNameChange = (event: any) => data.name = event.target.value;
const handleEmailChange = (event: any) => data.email = event.target.value;
const handleMessageChange = (event: any) => data.message = event.target.value;

const EmailBody = (props: any) => (
	<div>
		<Form onSubmit={ handleSubmit }>
			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={ faUser } /></InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl
					required={ true }
					placeholder="Your Name"
					aria-label="Your Name"
					aria-describedby="basic-addon1"
					onChange={ handleNameChange}
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
					onChange={ handleEmailChange}
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
					onChange={ handleMessageChange}
				/>
			</InputGroup>

			<div className="recaptcha">
				<Recaptcha
					sitekey="6LelMLoUAAAAAK6x5PuJ2PUcWrqXhU8FJjWMZ2dV"
					render="explicit"
				/>
			</div>

			<div className="submit-button">
				<Button variant="primary" type="submit">
					<FontAwesomeIcon icon={ faShare } /> Send Email
				</Button>
			</div>
		</Form>
	</div>
)

export default EmailBody