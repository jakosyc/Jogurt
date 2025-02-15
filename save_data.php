<?php

error_reporting(E_ALL);  // Alle Fehler melden
ini_set('display_errors', 1);  // Fehler im Browser anzeigen

// PHPMailer einbinden
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Autoload-Datei von PHPMailer einbinden
require 'PHPMailer-master/PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/PHPMailer-master/src/SMTP.php';

// Überprüfen, ob das Formular übermittelt wurde
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sammeln der Formulardaten
    $veranstaltungsname = isset($_POST['name']) ? $_POST['name'] : '';
    $datetime = isset($_POST['datetime']) ? $_POST['datetime'] : '';
    $artists = isset($_POST['artists']) ? $_POST['artists'] : '';
    $location = isset($_POST['location']) ? $_POST['location'] : '';
    $mood = isset($_POST['mood']) ? $_POST['mood'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    // E-Mail-Inhalt erstellen
    $email_content = "Veranstaltungsname: " . $veranstaltungsname . "\n";
    $email_content .= "Uhrzeit & Datum: " . $datetime . "\n";
    $email_content .= "Artists: " . $artists . "\n";
    $email_content .= "Location & Adresse & Stadt: " . $location . "\n";
    $email_content .= "Mood/Genre: " . $mood . "\n";
    $email_content .= "Deine E-Mail Adresse: " . $email . "\n";

    // Erstelle eine neue Instanz von PHPMailer
    $mail = new PHPMailer(true);

    try {
        // SMTP-Server-Einstellungen
        $mail->isSMTP();                                           // Setze Mailer auf SMTP
        $mail->Host = 'smtp.gmail.com';                             // Gmail SMTP-Server
        $mail->SMTPAuth = true;                                     // Aktiviere SMTP-Authentifizierung
        $mail->Username = 'spuckerfeuer@gmail.com';                  // Deine Gmail-Adresse
        $mail->Password = 'zgkg ueed fcts deji';                           // Dein Gmail-Passwort (oder App-Passwort)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Aktiviere TLS-Verschlüsselung
        $mail->Port = 587;                                          // TCP-Port für TLS

        // Absender und Empfänger
        $mail->setFrom('spuckerfeuer@gmail.com', 'Veranstaltungssystem');  // Absender-Adresse
        $mail->addAddress('spuckerfeuer@gmail.com', 'Empfänger Name');     // Empfänger-Adresse (auch deine Gmail-Adresse)

        // Betreff und Inhalt der E-Mail
        $mail->Subject = 'Neue Veranstaltungseinreichung';
        $mail->Body    = $email_content;

        // E-Mail senden
        $mail->send();
        echo 'Die E-Mail wurde erfolgreich gesendet.';
    } catch (Exception $e) {
        echo "Es gab ein Problem beim Senden der E-Mail. Fehler: {$mail->ErrorInfo}";
    }
}
?>
