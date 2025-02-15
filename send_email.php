<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $empfaenger = "deine-email@example.com";  // Ersetze mit deiner echten E-Mail-Adresse
    $betreff = "Neue Nachricht vom Kontaktformular";
    
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $nachricht = "Du hast eine neue Nachricht erhalten:\n\n";
    $nachricht .= "Name: " . $name . "\n";
    $nachricht .= "E-Mail: " . $email . "\n";
    $nachricht .= "Nachricht:\n" . $message . "\n";

    // E-Mail senden
    if (mail("jakobsycha@gmail.com, $betreff, $nachricht, $headers)) {
        echo "Deine Nachricht wurde gesendet!";
    } else {
        echo "Fehler beim Senden der Nachricht.";
    }
}
?>
