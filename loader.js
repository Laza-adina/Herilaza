// Crée le loader
const loaderOverlay = document.createElement('div');
loaderOverlay.classList.add('loader-overlay');
loaderOverlay.innerHTML = `
    <div class="loader-inner">
        <span class="loader-name">HERILAZA</span>
        <div class="loader-bar-track">
            <div class="loader-bar-fill"></div>
        </div>
    </div>
`;
document.body.appendChild(loaderOverlay);

// Disparaît après l'animation
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        loaderOverlay.classList.add('hide');
        setTimeout(() => loaderOverlay.remove(), 400);
    }, 750);
});