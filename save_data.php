<?php
// PHPMailer und Exception einbinden (Pfad zu PHPMailer anpassen)
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Falls du Composer verwendest
// Oder manuell: require 'Pfad/zu/PHPMailer/PHPMailerAutoload.php';

// Formularverarbeitung
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Benutzereingaben sanitieren
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Instanz von PHPMailer erstellen
    $mail = new PHPMailer(true);
    
    try {
        // SMTP-Server konfigurieren
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Ersetze mit deinem SMTP-Host (z.B. smtp.gmail.com für Gmail)
        $mail->SMTPAuth = true;
        $mail->Username = 'spuckerfeuer@gmail.com'; // Deine E-Mail-Adresse
        $mail->Password = 'FSHooligans'; // Dein E-Mail-Passwort
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; // SMTP-Port (587 für TLS, 465 für SSL)

        // Absender und Empfänger
        $mail->setFrom($email, $name); // Der Absender ist die E-Mail-Adresse, die im Formular eingegeben wurde
        $mail->addAddress('spuckerfeuer@gmail.com', 'Empfänger Name'); // Ziel-E-Mail-Adresse (Empfänger)

        // E-Mail-Inhalt
        $mail->isHTML(true);
        $mail->Subject = 'Neue Nachricht vom Kontaktformular: ' . $name;
        $mail->Body    = "<h3>Neue Nachricht:</h3>
                          <strong>Name:</strong> $name<br>
                          <strong>E-Mail:</strong> $email<br>
                          <strong>Nachricht:</strong><br>" . nl2br($message);

        // E-Mail senden
        if ($mail->send()) {
            echo 'Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.';
        } else {
            echo 'Es gab ein Problem beim Senden der E-Mail. Bitte versuchen Sie es später noch einmal.';
        }
    } catch (Exception $e) {
        echo "Die Nachricht konnte nicht gesendet werden. Fehler: {$mail->ErrorInfo}";
    }
} else {
    echo "Ungültige Anfrage.";
}
?>
