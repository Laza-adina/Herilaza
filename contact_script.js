// ── EMAILJS CONFIG ──
// 1. Va sur https://www.emailjs.com et crée un compte gratuit
// 2. Crée un service (Gmail) → note ton SERVICE_ID
// 3. Crée un template avec les variables : {{name}}, {{email}}, {{message}}
//    et mets lazaher23@gmail.com comme destinataire → note ton TEMPLATE_ID
// 4. Dans Account > API Keys → note ta PUBLIC_KEY
// 5. Remplace les 3 valeurs ci-dessous

const EMAILJS_PUBLIC_KEY  = "VOTRE_PUBLIC_KEY";   // ex: "xK2_abc123def"
const EMAILJS_SERVICE_ID  = "VOTRE_SERVICE_ID";   // ex: "service_abc123"
const EMAILJS_TEMPLATE_ID = "VOTRE_TEMPLATE_ID";  // ex: "template_abc123"

// ── INIT ──
emailjs.init(EMAILJS_PUBLIC_KEY);

// ── ÉLÉMENTS ──
const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const btnText    = document.getElementById('btn-text');
const btnLoader  = document.getElementById('btn-loader');
const successMsg = document.getElementById('form-success');
const errorMsg   = document.getElementById('form-error');

// ── ENVOI ──
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset messages
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    // Loading
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    submitBtn.disabled = true;

    const params = {
        name:    document.getElementById('name').value,
        email:   document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
        successMsg.classList.remove('hidden');
        form.reset();
    } catch (err) {
        console.error(err);
        errorMsg.classList.remove('hidden');
    } finally {
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        submitBtn.disabled = false;
    }
});