/* =========================================================
   LOKENDRA KUSHWAHA // WORKSPACE RUNTIME (SOP)
   ========================================================= */

// 1. System Color Scheme Matching & Manual Toggle
(function initThemeManager() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const themeLabel = document.getElementById('theme-label');
    const systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Modes: 'system' -> 'dark' -> 'light'
    let currentMode = localStorage.getItem('lokendra_theme_mode') || 'system';

    function applyTheme(mode) {
        let resolved = mode;
        if (mode === 'system') {
            resolved = systemDarkQuery.matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-theme', resolved);

        if (themeLabel) {
            themeLabel.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
        }
    }

    applyTheme(currentMode);

    systemDarkQuery.addEventListener('change', () => {
        if (currentMode === 'system') applyTheme('system');
    });

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const nextMap = { system: 'dark', dark: 'light', light: 'system' };
            currentMode = nextMap[currentMode] || 'system';
            localStorage.setItem('lokendra_theme_mode', currentMode);
            applyTheme(currentMode);
        });
    }
})();

// 2. Mobile Navigation Toggle
(function initNavigation() {
    const hamburger = document.getElementById('hamburger-btn');
    const menu = document.getElementById('nav-menu');

    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !menu.classList.contains('active'));
                icon.classList.toggle('fa-times', menu.classList.contains('active'));
            }
        });

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
})();

// 3. Direct Contact Form & Click-to-Copy Email
(function initContactHandler() {
    const copyLink = document.getElementById('copy-email-link');
    const copyBadge = document.getElementById('copy-badge');

    if (copyLink && copyBadge) {
        copyLink.addEventListener('click', (e) => {
            if (navigator.clipboard) {
                e.preventDefault();
                navigator.clipboard.writeText('thelokendrakushwaha@gmail.com');
                copyBadge.textContent = 'Copied!';
                setTimeout(() => { copyBadge.textContent = 'Click to copy'; }, 2000);
            }
        });
    }

    const form = document.getElementById('contact-form');
    const nameInp = document.getElementById('sender-name');
    const emailInp = document.getElementById('sender-email');
    const msgInp = document.getElementById('sender-message');
    const submitBtn = document.getElementById('submit-btn');
    const statusBox = document.getElementById('form-status');

    if (!form || !nameInp || !emailInp || !msgInp || !submitBtn || !statusBox) return;

    function setStatus(msg, type) {
        statusBox.style.display = 'block';
        statusBox.className = `form-status ${type || ''}`;
        statusBox.textContent = msg;
    }

    [nameInp, emailInp, msgInp].forEach((el) => {
        el.addEventListener('input', () => el.classList.remove('input-error'));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInp.value.trim();
        const email = emailInp.value.trim();
        const message = msgInp.value.trim();

        if (!name || !email || !message) {
            if (!name) nameInp.classList.add('input-error');
            if (!email) emailInp.classList.add('input-error');
            if (!message) msgInp.classList.add('input-error');
            setStatus('Please complete all required fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailInp.classList.add('input-error');
            setStatus('Please enter a valid email address.', 'error');
            return;
        }

        submitBtn.disabled = true;
        const origText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';

        const subject = `Direct Inquiry from ${name}`;
        const mailtoFallback = `mailto:thelokendrakushwaha@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

        fetch('https://formsubmit.co/ajax/thelokendrakushwaha@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ _subject: subject, Name: name, Email: email, Message: message })
        })
        .then((res) => res.json())
        .then((data) => {
            if (data && (data.success === 'true' || data.success === true)) {
                setStatus('Message delivered directly to Lokendra.', 'success');
                nameInp.value = '';
                emailInp.value = '';
                msgInp.value = '';
            } else {
                window.location.href = mailtoFallback;
                setStatus('Opening mail client...', 'success');
            }
        })
        .catch(() => {
            window.location.href = mailtoFallback;
            setStatus('Opening mail client...', 'success');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = origText;
        });
    });
})();