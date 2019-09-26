<?php

	function died($error) {
		header("Location: /?type=danger&message={ $error }");
		die();
	}

	function clean_string($string) {
		$bad = array("content-type", "bcc:", "to:", "cc:", "href");
		return str_replace($bad, "", $string);
	}

	if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['message'])) {
		died('Im sorry, but there appears to be a problem with the form you submitted.');
	}

	$email_to = 'info@adrianeyre.co.uk';
	$email_subject = 'Message from portfolio site';
	$name = $_POST['name'];
	$email_from = $_POST['email'];
	$message = $_POST['message'];

	if (strlen($message) < 2) {
		died('The Comments you entered do not appear to be valid.');
	}

	$email_message = "Form details below.\n\n";
	$email_message .= "Name: ".clean_string($name)."\n";
	$email_message .= "Email: ".clean_string($email_from)."\n";
	$email_message .= "Message: ".clean_string($message)."\n";

	$headers = 'From: '.$email_from."\r\n".
	'Reply-To: '.$email_from."\r\n" .
	'X-Mailer: PHP/' . phpversion();

	@mail($email_to, $email_subject, $email_message, $headers);

	header("Location: /?type=success&message=Thank you for contacting me, I shall get back to you as soon as possible");
?>
