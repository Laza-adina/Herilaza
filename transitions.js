// Crée l'overlay au chargement
const overlay = document.createElement('div');
overlay.classList.add('page-overlay');
document.body.appendChild(overlay);

// Entrée : l'overlay se dissipe
window.addEventListener('DOMContentLoaded', () => {
    overlay.classList.add('leave');
    setTimeout(() => overlay.classList.remove('leave'), 500);
});

// Sortie : l'overlay apparaît, puis change de page
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');

    // Ignore : ancres, mailto, liens externes, cible blank
    if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto') ||
        href.startsWith('http') ||
        link.target === '_blank'
    ) return;

    e.preventDefault();
    overlay.classList.add('enter');

    setTimeout(() => {
        window.location.href = href;
    }, 500);
});
