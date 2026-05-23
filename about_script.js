const SLIDES = [
    {
        title: "Je suis :",
        text:  "Je m'appelle Herilaza, développeur web passionné par la création de sites modernes et fonctionnels. HTML, CSS, JavaScript,je construis des expériences utilisateur qui ont du sens.",
        right: "menu",
        cta:   false
    },
    {
        title: "Ma formation",
        text:  "Actuellement en Master 1 en école d'ingénieur. Entre algorithmique, architecture logicielle et projets concrets, je construis une vision large de l'ingénierie.",
        right: "info",
        cta:   false
    },
    {
        title: "Ce que je fais",
        text:  "Automatiser ce qui se répète, construire ce qui manque, styliser ce qui sera vu. Python, web, problem solving,je cherche toujours la solution la plus propre.",
        right: "skills",
        cta:   false
    },
    {
        title: "En dehors du code",
        text:  "Il n'y a peut-être pas un mot pour quelqu'un qui collectionne les passions sans ordre ni raison. Sports, musique, dark fantasy,je cherche encore ce mot.",
        right: "passions",
        cta:   false
    },
    {
        title: "Travaillons ensemble",
        text:  "Un projet, une idée, une question. Je suis disponible pour collaborer sur des projets qui ont du sens.",
        right: "menu",
        cta:   true
    }
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#&%$!?";

const titleEl  = document.getElementById('main-title');
const textEl   = document.getElementById('main-text');
const ctaEl    = document.getElementById('main-cta');
const dots     = document.querySelectorAll('.dot');

const blocks = {
    menu:     document.getElementById('block-menu'),
    info:     document.getElementById('block-info'),
    skills:   document.getElementById('block-skills'),
    passions: document.getElementById('block-passions')
};

let current     = 0;
let isAnimating = false;

/* ── SCRAMBLE ── */
function scramble(el, newText, duration = 600) {
    return new Promise(resolve => {
        const original = newText.split('');
        const steps    = Math.floor(duration / 30);
        let   step     = 0;

        // Wrap each char in a span
        el.innerHTML = el.textContent
            .split('')
            .map(c => `<span class="letter">${c}</span>`)
            .join('');

        const spans = el.querySelectorAll('.letter');

        const interval = setInterval(() => {
            step++;
            const progress = step / steps;

            // Reconstruct the string : settled chars + random chars
            let html = '';
            for (let i = 0; i < newText.length; i++) {
                const settled = i < Math.floor(progress * newText.length);
                if (settled) {
                    html += `<span class="letter">${original[i]}</span>`;
                } else {
                    const rnd = CHARS[Math.floor(Math.random() * CHARS.length)];
                    html += `<span class="letter scrambling">${rnd}</span>`;
                }
            }
            el.innerHTML = html;

            if (step >= steps) {
                clearInterval(interval);
                el.innerHTML = newText; // clean final
                resolve();
            }
        }, 30);
    });
}

/* ── SWITCH RIGHT BLOCK ── */
function switchRight(newKey) {
    return new Promise(resolve => {
        const current = Object.entries(blocks).find(([, el]) => !el.classList.contains('hidden'));
        if (!current) {
            blocks[newKey].classList.remove('hidden');
            blocks[newKey].classList.add('block-in');
            setTimeout(() => { blocks[newKey].classList.remove('block-in'); resolve(); }, 350);
            return;
        }

        const [oldKey, oldEl] = current;
        if (oldKey === newKey) { resolve(); return; }

        oldEl.classList.add('block-out');
        setTimeout(() => {
            oldEl.classList.add('hidden');
            oldEl.classList.remove('block-out');
            blocks[newKey].classList.remove('hidden');
            blocks[newKey].classList.add('block-in');
            setTimeout(() => { blocks[newKey].classList.remove('block-in'); resolve(); }, 350);
        }, 250);
    });
}

/* ── GO TO SLIDE ── */
async function goTo(index) {
    if (index < 0 || index >= SLIDES.length || isAnimating) return;
    isAnimating = true;

    const slide = SLIDES[index];

    dots[current].classList.remove('active');
    current = index;
    dots[current].classList.add('active');

    // Run scramble on title + text in parallel with right block switch
    await Promise.all([
        scramble(titleEl, slide.title, 500),
        scramble(textEl,  slide.text,  700),
        switchRight(slide.right)
    ]);

    // CTA
    if (slide.cta) {
        ctaEl.classList.remove('hidden');
        ctaEl.classList.add('block-in');
        setTimeout(() => ctaEl.classList.remove('block-in'), 350);
    } else {
        ctaEl.classList.add('hidden');
    }

    isAnimating = false;
}

/* ── EVENTS ── */

// Molette
let acc = 0;
window.addEventListener('wheel', (e) => {
    acc += e.deltaY;
    if (acc >  60) { goTo(current + 1); acc = 0; }
    if (acc < -60) { goTo(current - 1); acc = 0; }
}, { passive: true });

// Clavier
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown'  || e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowUp'    || e.key === 'ArrowLeft')  goTo(current - 1);
});

// Dots
dots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.i)));

// Swipe mobile
let tx = 0;
window.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
window.addEventListener('touchend',   e => {
    const diff = tx - e.changedTouches[0].clientX;
    if (diff >  50) goTo(current + 1);
    if (diff < -50) goTo(current - 1);
}, { passive: true });

// Cache la souris après le premier scroll
const scrollHint = document.querySelector('.scroll-hint');
function hideHint() {
    if (scrollHint) {
        scrollHint.classList.add('hide');
        window.removeEventListener('wheel', hideHint);
        window.removeEventListener('touchstart', hideHint);
    }
}
window.addEventListener('wheel', hideHint, { passive: true });
window.addEventListener('touchstart', hideHint, { passive: true });