<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    $date = date("Y-m-d H:i:s");
    $data = [$date, $name, $email, $message];

    $file = fopen("kontaktanfragen.csv", "a");
    fputcsv($file, $data);
    fclose($file);

    echo "Ihre Nachricht wurde erfolgreich gespeichert!";
}
?>
