import { useState, useRef } from 'react';
import { Modal as ModalComponent, InputGroup, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelopeOpenText, faStickyNote, faShare, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from 'react-google-recaptcha';

import IEmailBodyProps from './interface/email-body-props';

const EmailBody = (props: IEmailBodyProps) => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	const [recaptchaValue, setRecaptchaValue] = useState<any>(null);

	const onRecaptchaChange = (value: string | null) => setRecaptchaValue(value);
	const handleNameChange = (event: React.ChangeEvent<any>) => setName(event.target.value);
	const handleEmailChange = (event: React.ChangeEvent<any>) => setEmail(event.target.value);
	const handleMessageChange = (event: React.ChangeEvent<any>) => setMessage(event.target.value);
	const recaptchaRef = useRef(null);

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
						onChange={ handleNameChange }
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
						onChange={ handleEmailChange }
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
						onChange={ handleMessageChange }
					/>
				</InputGroup>

				<div className="recaptcha">
					<ReCAPTCHA
						ref={ recaptchaRef }
						sitekey="6LfkZ7oUAAAAAIik0v6p7CQugJChqZ2SbsK4hpOd"
						onChange={ onRecaptchaChange }
					/>
				</div>
			</ModalComponent.Body>
			<ModalComponent.Footer>
				<Button className="modal-button" variant="primary" type="submit" disabled={ !recaptchaValue }><FontAwesomeIcon icon={ faShare } /> Send Email</Button>
				<Button className="modal-button" variant="secondary" onClick={ props.closeModal }><FontAwesomeIcon icon={ faTimesCircle} /> Close</Button>
			</ModalComponent.Footer>
		</Form>
	</div>
}

export default EmailBody;
