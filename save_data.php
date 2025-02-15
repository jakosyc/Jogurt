<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    
    // E-Mail-Daten
    $to = 'deine-email@example.com'; // Ziel-E-Mail-Adresse
    $subject = 'Kontaktformular: ' . $name;
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // E-Mail-Inhalt
    $emailMessage = "<h3>Neue Nachricht vom Kontaktformular:</h3>";
    $emailMessage .= "<strong>Name:</strong> $name<br>";
    $emailMessage .= "<strong>E-Mail:</strong> $email<br>";
    $emailMessage .= "<strong>Nachricht:</strong><br>" . nl2br($message);
    
    // Sende die E-Mail
    if (mail($to, $subject, $emailMessage, $headers)) {
        echo "Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.";
    } else {
        echo "Es gab ein Problem beim Senden der E-Mail. Bitte versuchen Sie es später noch einmal.";
    }
} else {
    echo "Ungültige Anfrage.";
}
?>
