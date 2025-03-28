<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $address = $_POST['address'];
    $message = $_POST['message'];

    $to = "dacheampong913@gmail.com";
    $subject = "New Contact Form Submission from $name";
    $body = "Name: $name\nAddress: $address\nMessage: $message";
    $headers = "From: $name <$to>";

    if (mail($to, $subject, $body, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }
} else {
    echo "Invalid request.";
}
?>
