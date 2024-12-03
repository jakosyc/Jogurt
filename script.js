// Funktion zum Teilen eines Listenpunkts
function shareEvent(event) {
    const shareIcon = event.target;
    const id = shareIcon.parentElement.id; // Die ID des Listenpunkts
    const title = shareIcon.getAttribute('data-title'); // Titel des Events
    const text = shareIcon.getAttribute('data-text'); // Text des Events
    const url = `${window.location.origin}${window.location.pathname}?event=${id}`; // URL mit Query-Parameter

    if (navigator.share) {
        // Web Share API (für moderne Browser)
        navigator.share({
            title: title,
            text: text,
            url: url,
        })
            .then(() => {
                console.log('Event erfolgreich geteilt.');
            })
            .catch((error) => {
                console.error('Fehler beim Teilen:', error);
            });
    } else {
        // Fallback: Link in Zwischenablage kopieren
        const shareText = `${text} - Link: ${url}`;
        navigator.clipboard
            .writeText(shareText)
            .then(() => {
                alert('Link wurde kopiert. Teile ihn jetzt manuell!');
            })
            .catch((error) => {
                console.error('Fehler beim Kopieren des Links:', error);
            });
    }
}

// Funktion zum Hervorheben des Listenpunkts basierend auf dem Query-Parameter
function highlightEventFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event'); // Query-Parameter "event"
    if (eventId) {
        const targetElement = document.getElementById(eventId);
        if (targetElement) {
            // Listenpunkt hervorheben
            targetElement.style.border = '1px dotted black';
            targetElement.style.transition = 'background-color 0.5s ease';

            // Scrollt den Listenpunkt in die Mitte des Bildschirms
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Eventlistener für alle Teilen-Symbole hinzufügen
document.querySelectorAll('.share-icon').forEach((icon) => {
    icon.addEventListener('click', shareEvent); // Klick-Event für das Teilen
});

// Query-Parameter beim Laden der Seite auswerten
window.addEventListener('DOMContentLoaded', highlightEventFromQuery);

document.querySelector('.sub-title').addEventListener('click', function() {
    // Füge die "shake"-Klasse hinzu
    this.classList.add('shake');

    // Entferne die "shake"-Klasse nach der Animation, um sie für den nächsten Klick wiederverwendbar zu machen
    setTimeout(() => {
        this.classList.remove('shake');
    }, 500); // Entspricht der Dauer der Animation (in ms)
});

// Funktion zur Aktualisierung von Datum und Uhrzeit
function updateDateTime() {
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');

    const now = new Date();

    // Format für das Datum (z. B. "29.11.2024")
    const dateString = now.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    // Format für die Uhrzeit (z. B. "14:35:08")
    const timeString = now.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    // Setze den Textinhalt der Elemente
    dateElement.textContent = dateString;
    timeElement.textContent = timeString;
}

// Aktualisiere Datum und Uhrzeit jede Sekunde
setInterval(updateDateTime, 1000);

// Starte die Funktion direkt beim Laden der Seite
updateDateTime();

// Liste der Stylesheets
const stylesheets = ["Style.css", "style2.css"];
let currentStylesheetIndex = 0; // Aktueller Index

// Funktion zum Wechseln des Stylesheets
function switchStylesheet() {
    currentStylesheetIndex = (currentStylesheetIndex + 1) % stylesheets.length; // Zyklischer Wechsel
    const newStylesheet = stylesheets[currentStylesheetIndex]; // Neues Stylesheet
    const themeStylesheet = document.getElementById("theme-stylesheet"); // Link-Tag

    // Aktualisiere das "href"-Attribut
    themeStylesheet.setAttribute("href", newStylesheet);
    console.log(`Stylesheet gewechselt zu: ${newStylesheet}`); // Debug-Ausgabe
}

// Eventlistener für den Style-Switcher
document.addEventListener("DOMContentLoaded", () => {
    const styleSwitcher = document.getElementById("style-switcher");
    if (styleSwitcher) {
        styleSwitcher.addEventListener("click", switchStylesheet); // Klick-Event hinzufügen
    } else {
        console.error("Style-Switcher-Element nicht gefunden.");
    }
});

