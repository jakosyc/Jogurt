// script.js

function shareEvent(event) {
    const shareIcon = event.target;
    const title = shareIcon.getAttribute('data-title');
    const text = shareIcon.getAttribute('data-text');
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        }).then(() => {
            console.log('Erfolgreich geteilt');
        }).catch((error) => {
            console.error('Fehler beim Teilen:', error);
        });
    } else {
        const shareText = `${text} - Link: ${url}`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Link wurde kopiert. Teile ihn jetzt manuell!');
        }).catch((error) => {
            console.error('Fehler beim Kopieren des Links:', error);
        });
    }
}

// Eventlistener für alle Share-Symbole
document.querySelectorAll('.share-icon').forEach(icon => {
    icon.addEventListener('click', shareEvent);
});
