// Datum und Uhrzeit aktualisieren
function updateDateTime() {
    const now = new Date();
    const dateElement = document.getElementById('current-date');
    const timeElement = document.getElementById('current-time');

    // Datum und Uhrzeit formatieren
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('de-DE', options);
    const formattedTime = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

    // In die Elemente einfügen
    dateElement.textContent = formattedDate;
    timeElement.textContent = formattedTime;
}

// Datum und Uhrzeit bei Start laden und jede Sekunde aktualisieren
updateDateTime();
setInterval(updateDateTime, 1000);

// Stylesheet wechseln
let currentStylesheet = "style.css"; // Standardstylesheet
function switchStylesheet() {
    const stylesheetLink = document.getElementById('stylesheet');
    currentStylesheet = currentStylesheet === "style.css" ? "alternate.css" : "style.css";
    stylesheetLink.href = currentStylesheet;
}

// Event-Listener für das "Better Colours"-Element
document.querySelector('.color-switcher').addEventListener('click', switchStylesheet);

// Event-Listener für den Text unter dem Oval-Titel
document.querySelector('.change-style').addEventListener('click', switchStylesheet);

// Highlight-Funktion für geteilte Listenpunkte
function highlightSharedEvent() {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedEventId = urlParams.get('event');
    if (sharedEventId) {
        const sharedElement = document.getElementById(sharedEventId);
        if (sharedElement) {
            sharedElement.style.border = '4px dotted yellow';
            sharedElement.style.transform = 'scale(1.1)';
        }
    }
}

// Event teilen
function shareEvent(eventId) {
    const url = `${window.location.origin}${window.location.pathname}?event=${eventId}`;
    navigator.clipboard.writeText(url).then(() => {
        alert("Link zum Teilen wurde in die Zwischenablage kopiert!");
    });
}

// Event-Listener für Share-Icons
document.querySelectorAll('.share-icon').forEach((icon, index) => {
    const eventId = `event-${index + 1}`; // Dynamische ID für jeden Listenpunkt
    icon.addEventListener('click', () => shareEvent(eventId));
    icon.parentElement.id = eventId; // ID auf Listenpunkt setzen
});

// Zitter-Animation beim Sub-Title
document.querySelector('.sub-title').addEventListener('click', () => {
    const subTitle = document.querySelector('.sub-title');
    subTitle.classList.add('shake');
    setTimeout(() => subTitle.classList.remove('shake'), 500);
});
