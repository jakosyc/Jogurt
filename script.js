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
