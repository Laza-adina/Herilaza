// ── DONNÉES DES PROJETS ──
const PROJECTS = [
    {
        id:    1,
        num:   "01",
        name:  "Ravinahitra",
        img:   "ravinahitra.PNG", // Image miniature pour la galerie
        desc:  "Site web pour un salon de thé. Présentation des produits, ambiance chaleureuse et menu interactif pour les clients.",
        tags:  ["HTML", "CSS", "JavaScript"],
        link:  "https://ravinahitra.vercel.app" // Le https:// est obligatoire pour l'iframe
    },
    {
        id:    2,
        num:   "02",
        name:  "Portfolio Auteur",
        img:   "dani 1.PNG", // Image miniature pour la galerie
        desc:  "Portfolio web d'un auteur de science-fiction (Dani Randri). Présentation de ses œuvres, biographie, et section de contact avec un design épuré.",
        tags:  ["ReactJS", "Tailwind CSS"],
        link:  "https://dani-randri.vercel.app"
    },
    {
        id:    2,
        num:   "03",
        name:  "site professionnel",
        img:   "rz1.PNG", // Image miniature pour la galerie
        desc:  "Site professionnel pour les un entreprise de transport.",
        tags:  ["ReactJS", "Tailwind CSS"],
        link:  "https://rz-test-2-a1np.vercel.app/"
    }
];

// ── ÉLÉMENTS DOM ──
const gallery      = document.getElementById('gallery');
const emptyState   = document.getElementById('empty-state');
const backdrop     = document.getElementById('popup-backdrop');
const popupClose   = document.getElementById('popup-close');
const popupPreview = document.getElementById('popup-preview'); // Remplacé popupImg
const popupNum     = document.getElementById('popup-num');
const popupTitle   = document.getElementById('popup-title');
const popupDesc    = document.getElementById('popup-desc');
const popupTags    = document.getElementById('popup-tags');
const popupLink    = document.getElementById('popup-link');
const bottomSide   = document.querySelector('.bottom-side');

// ── RENDU GALERIE ──
function renderGallery() {
    if (PROJECTS.length === 0) {
        gallery.style.display    = 'none';
        emptyState.style.display = 'flex';
        return;
    }

    emptyState.style.display = 'none';
    gallery.style.display    = 'grid';
    gallery.innerHTML        = '';

    PROJECTS.forEach((p) => {
        const item = document.createElement('div');
        item.classList.add('gallery-item'); 
        item.dataset.id = p.id;
        
        item.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <div class="gallery-item-info">
                <span style="display: block; font-size: 14px; letter-spacing: 0.15em; color: rgba(255,255,255,0.6); margin-bottom: 4px;">${p.num}</span>
                <span style="display: block; font-size: 26px; font-weight: 500;">${p.name}</span>
            </div>
        `;
        
        item.addEventListener('click', () => openPopup(p));
        gallery.appendChild(item);
    });
}

// ── POPUP ──
function openPopup(p) {
    // Injection de l'iframe à la place de l'image de fond
    popupPreview.innerHTML         = `<iframe src="${p.link}" title="Prévisualisation de ${p.name}"></iframe>`;
    
    popupNum.textContent           = p.num;
    popupTitle.textContent         = p.name;
    popupDesc.textContent          = p.desc;
    popupLink.href                 = p.link;

    popupTags.innerHTML = p.tags
        .map(t => `<span>${t}</span>`)
        .join('');

    backdrop.classList.add('active');
    
    if (bottomSide) bottomSide.style.overflow = 'hidden';
}

function closePopup() {
    backdrop.classList.remove('active');
    
    // Vider l'iframe à la fermeture pour éviter que le site continue de tourner en fond (audio, vidéos, etc.)
    setTimeout(() => {
        popupPreview.innerHTML = '';
    }, 400); // Attend la fin de l'animation CSS

    if (bottomSide) bottomSide.style.overflow = 'auto';
}

// ── ÉCOUTEURS D'ÉVÉNEMENTS ──
popupClose.addEventListener('click', closePopup);

backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePopup();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
});

// ── INIT ──
renderGallery();