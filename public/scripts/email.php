<?php

	function died($error) {
		echo "We are very sorry, but there were error(s) found with the form you submitted. ";
		echo "These errors appear below.<br /><br />";
		echo $error."<br /><br />";
		echo "Please go back and fix these errors.<br /><br />";
		die();
	}

	function clean_string($string) {
		$bad = array("content-type", "bcc:", "to:", "cc:", "href");
		return str_replace($bad, "", $string);
	}

	if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['message'])) {
		died('We are sorry, but there appears to be a problem with the form you submitted.');
	}

	$email_to = 'info@adrianeyre.co.uk';
	$email_subject = 'Message from portfolio site';
	$name = $_POST['name'];
	$email_from = $_POST['email'];
	$message = $_POST['message'];
	$error_message = "";

	if (strlen($message) < 2) {
		$error_message .= 'The Comments you entered do not appear to be valid.<br />';
	}

	if (strlen($error_message) > 0) {
		died($error_message);
	}

	$email_message = "Form details below.\n\n";
	$email_message .= "Name: ".clean_string($email)."\n";
	$email_message .= "Email: ".clean_string($email_from)."\n";
	$email_message .= "Message: ".clean_string($message)."\n";

	$headers = 'From: '.$email_from."\r\n".
	'Reply-To: '.$email_from."\r\n" .
	'X-Mailer: PHP/' . phpversion();

	@mail($email_to, $email_subject, $email_message, $headers);
?>

	<div>Thank you for contacting us. We will be in touch with you very soon.</div>
