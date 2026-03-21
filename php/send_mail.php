<?
$mail_to = "vavistudios@gmail.com"; // Updated to real email from contact page
$mail_from = "webmaster@vavistudios.com"; // Placeholder, should be valid sender

$name = strip_tags(trim($_POST['name']));
$email = strip_tags(trim($_POST['email']));
$phone = strip_tags(trim($_POST['phone']));

// Handle arrays
$coverage = isset($_POST['coverage']) ? implode(", ", $_POST['coverage']) : 'None selected';
$style = isset($_POST['style']) ? implode(", ", $_POST['style']) : 'None selected';

$date_from = strip_tags(trim($_POST['event_date_from']));
$date_to = strip_tags(trim($_POST['event_date_to']));
$venue = strip_tags(trim($_POST['venue']));
$budget = strip_tags(trim($_POST['budget']));

$mail_subject = 'New Contact Wizard Submission from ' . $name;

$message = "<h3>NEW CONTACT WIZARD SUBMISSION</h3>"."<br>";
$message .= "<b>Name:</b> ".$name."<br>";
$message .= "<b>Email:</b> ".$email."<br>";
$message .= "<b>Phone:</b> ".$phone."<br>";
$message .= "<br><b>Event Details:</b><br>";
$message .= "<b>Coverage Type(s):</b> ".$coverage."<br>";
$message .= "<b>Dates:</b> ".$date_from." to ".$date_to."<br>";
$message .= "<b>Venue:</b> ".$venue."<br>";
$message .= "<br><b>Preferences:</b><br>";
$message .= "<b>Style:</b> ".$style."<br>";
$message .= "<b>Budget:</b> ".$budget."<br>";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: <".$mail_from.">" . "\r\n";

if(mail($mail_to, $mail_subject, $message, $headers)) {
    echo "success";
} else {
    echo "failed";
}
?>