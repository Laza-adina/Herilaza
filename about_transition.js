const overlay = document.createElement('div');
overlay.classList.add('page-overlay');
document.body.appendChild(overlay);

// Entrée : panneau noir se retire vers la gauche
window.addEventListener('DOMContentLoaded', () => {
    overlay.classList.add('enter-about');
});

// Sortie vers une autre page
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http')) return;

    e.preventDefault();

    overlay.style.animation  = 'none';
    overlay.style.transform  = 'translateX(0)';
    overlay.style.width      = '0%';
    overlay.style.background = '#0a0a0a';
    overlay.style.pointerEvents = 'all';

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            overlay.style.transition = 'width 0.65s cubic-bezier(0.77, 0, 0.18, 1)';
            overlay.style.width = '100%';
        });
    });

    setTimeout(() => {
        window.location.href = href;
    }, 680);
});