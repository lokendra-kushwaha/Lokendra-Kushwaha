// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ==========================================
// Mobile Menu Logic
// ==========================================
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

// Toggle menu on clicking the hamburger icon
hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
    
    // Change hamburger icon to a cross (optional)
    const icon = hamburger.querySelector('i');
    if (menu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close the menu automatically when any link is clicked
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

const box = document.querySelector('.image-circle');
let canvas = document.getElementById('neuralCanvas');

if (box && !canvas) {
    box.innerHTML = '';
    canvas = document.createElement('canvas');
    canvas.id = 'neuralCanvas';
    box.appendChild(canvas);
}

if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        const size = window.innerWidth <= 768 ? 280 : 360;
        canvas.width = size;
        canvas.height = size;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodes = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
        [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5],
        [-0.5, -0.5, 0.5], [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5],
        [0, 0, 0]
    ];

    const edges = [
        [0,1], [1,2], [2,3], [3,0], [4,5], [5,6], [6,7], [7,4], [0,4], [1,5], [2,6], [3,7],
        [8,9], [9,10], [10,11], [11,8], [12,13], [13,14], [14,15], [15,12], [8,12], [9,13], [10,14], [11,15],
        [0,8], [1,9], [2,10], [3,11], [4,12], [5,13], [6,14], [7,15],
        [8,16], [10,16], [13,16], [15,16]
    ];

    let angleX = 0.012;
    let angleY = 0.018;
    let targetX = 0.012;
    let targetY = 0.018;

    function rotateX(point, theta) {
        const [x, y, z] = point;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);
        return [x, y * cos - z * sin, y * sin + z * cos];
    }

    function rotateY(point, theta) {
        const [x, y, z] = point;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);
        return [x * cos + z * sin, y, -x * sin + z * cos];
    }

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - canvas.width / 2;
        const mouseY = e.clientY - rect.top - canvas.height / 2;
        targetY = mouseX * 0.0005;
        targetX = -mouseY * 0.0005;
    });

    canvas.addEventListener('mouseleave', () => {
        targetX = 0.012;
        targetY = 0.018;
    });

    canvas.addEventListener('touchmove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const touchX = touch.clientX - rect.left - canvas.width / 2;
        const touchY = touch.clientY - rect.top - canvas.height / 2;
        targetY = touchX * 0.0006;
        targetX = -touchY * 0.0006;
    }, { passive: true });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        angleX += (targetX - angleX) * 0.1;
        angleY += (targetY - angleY) * 0.1;

        nodes.forEach((node, i) => {
            const rotated = rotateX(node, angleX);
            nodes[i] = rotateY(rotated, angleY);
        });

        const baseScale = canvas.width * 0.85;
        const projected = nodes.map(([x, y, z]) => {
            const scale = baseScale / (4.0 - z);
            return [
                x * scale + canvas.width / 2,
                y * scale + canvas.height / 2,
                z
            ];
        });

        edges.forEach(([a, b], idx) => {
            const [x1, y1, z1] = projected[a];
            const [x2, y2, z2] = projected[b];
            const alpha = Math.max(0.2, Math.min(0.95, (z1 + z2 + 3) / 5));

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = idx >= 24 ? 'rgba(255, 255, 255, ' + (alpha * 0.55) + ')' : 'rgba(0, 243, 255, ' + alpha + ')';
            ctx.lineWidth = 12 > idx ? 1.8 : 1.1;
            ctx.stroke();
        });

        projected.forEach(([x, y, z], idx) => {
            const radius = idx === 16 ? 4.5 : (8 > idx ? 3 : 2);
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = idx === 16 ? '#ffffff' : '#00f3ff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00f3ff';
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        requestAnimationFrame(draw);
    }

    draw();
}

const favCanvas = document.createElement('canvas');
favCanvas.width = 64;
favCanvas.height = 64;
const fCtx = favCanvas.getContext('2d');

fCtx.fillStyle = '#050505';
fCtx.fillRect(0, 0, 64, 64);

fCtx.strokeStyle = '#00f3ff';
fCtx.lineWidth = 4;
fCtx.strokeRect(2, 2, 60, 60);

fCtx.fillStyle = '#00f3ff';
fCtx.font = 'bold 28px sans-serif';
fCtx.textAlign = 'center';
fCtx.textBaseline = 'middle';
fCtx.fillText('LK', 32, 34);

let favLink = document.querySelector('link[rel="icon"]');
if (!favLink) {
    favLink = document.createElement('link');
    favLink.rel = 'icon';
    document.head.appendChild(favLink);
}
favLink.href = favCanvas.toDataURL('image/png');

// Live AI Terminal Typing Effect on Home Page
const subtitleEl = document.querySelector('.intro-text h2');
if (subtitleEl) {
    const phrases = [
        "I Build Advanced AI Engines & Data Architectures.",
        "Architecting Custom Linear Algebra & Matrix Engines.",
        "Engineering Pure NumPy Logic From Scratch.",
        "Reverse Engineering Core Python Mechanics."
    ];

    subtitleEl.textContent = '';

    const prefixSpan = document.createElement('span');
    prefixSpan.className = 'typing-prefix';
    prefixSpan.textContent = '>> ';

    const textSpan = document.createElement('span');
    textSpan.id = 'typewriter-text';

    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'typing-cursor';
    cursorSpan.textContent = '|';

    subtitleEl.appendChild(prefixSpan);
    subtitleEl.appendChild(textSpan);
    subtitleEl.appendChild(cursorSpan);

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        textSpan.textContent = currentPhrase.substring(0, charIndex);

        let speed = isDeleting ? 35 : 65;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}

// Interactive Terminal Mode
const termBtn = document.createElement('button');
termBtn.className = 'term-toggle-btn';
termBtn.textContent = '>_ TERMINAL';
document.body.appendChild(termBtn);

const termWin = document.createElement('div');
termWin.className = 'hacker-terminal';

const termHeader = document.createElement('div');
termHeader.className = 'term-header';

const termTitle = document.createElement('span');
termTitle.textContent = 'LOKENDRA_OS // AI_SHELL';

const termClose = document.createElement('span');
termClose.className = 'term-close';
termClose.textContent = '[X]';

termHeader.appendChild(termTitle);
termHeader.appendChild(termClose);

const termBody = document.createElement('div');
termBody.className = 'term-body';

const termInputRow = document.createElement('div');
termInputRow.className = 'term-input-row';

const termPrompt = document.createElement('span');
termPrompt.className = 'term-prompt';
termPrompt.textContent = 'lokendra@kushwaha:~$';

const termInput = document.createElement('input');
termInput.type = 'text';
termInput.className = 'term-input';
termInput.placeholder = 'type "help"...';

termInputRow.appendChild(termPrompt);
termInputRow.appendChild(termInput);

termWin.appendChild(termHeader);
termWin.appendChild(termBody);
termWin.appendChild(termInputRow);
document.body.appendChild(termWin);

function printTerm(text, className = 'term-line') {
    const line = document.createElement('div');
    line.className = className;
    line.innerText = text;
    termBody.appendChild(line);
    termBody.scrollTop = termBody.scrollHeight;
}

printTerm('Neural Optic Core Initialized...', 'term-res');
printTerm('Type "help" to view available commands.');

termBtn.addEventListener('click', () => {
    termWin.classList.toggle('open');
    if (termWin.classList.contains('open')) {
        termInput.focus();
    }
});

termClose.addEventListener('click', () => {
    termWin.classList.remove('open');
});

const commands = {
    help: 'INFO COMMANDS:\n  whoami, skills, projects, logs\n\nCONTROL COMMANDS:\n  goto home     -> Open Home Page\n  goto projects -> Open Projects Page\n  goto logs     -> Open Research Logs\n  goto about    -> Jump to About Section\n  goto contact  -> Jump to Contact Section\n  top / bottom  -> Scroll Page Top or Bottom\n  matrix        -> Launch Cyber Matrix Rain\n  clear         -> Clear Terminal',
    whoami: 'Lokendra Kushwaha — AI Engine & Data Architecture Builder. I build custom algorithms and math engines from scratch.',
    skills: 'Core Stack: Pure NumPy Logic, Custom Vectorization, Linear Algebra Matrices, Python Internals, DSA.',
    projects: '1. The Movie Matrix (Pure NumPy Recommendation Engine)\n2. Universe Crawler (Logic-Driven Architecture)\n(Tip: Type "goto projects" to open the page)',
    logs: '[LOG_001]: Building an AI Math Engine from Scratch - The Physics of Matrices & Hardware Memory Trap.\n(Tip: Type "goto logs" to read full article)'
};

const routes = {
    home: 'index.html#home',
    about: 'index.html#about',
    contact: 'index.html#contact',
    projects: 'projects.html',
    project: 'projects.html',
    logs: 'research.html',
    research: 'research.html'
};

function startMatrixRain() {
    let mCanvas = document.getElementById('matrixRainCanvas');
    if (mCanvas) mCanvas.remove();

    mCanvas = document.createElement('canvas');
    mCanvas.id = 'matrixRainCanvas';
    mCanvas.style.position = 'fixed';
    mCanvas.style.top = '0';
    mCanvas.style.left = '0';
    mCanvas.style.width = '100vw';
    mCanvas.style.height = '100vh';
    mCanvas.style.zIndex = '9997';
    mCanvas.style.pointerEvents = 'none';
    mCanvas.style.background = 'rgba(5, 5, 5, 0.85)';
    document.body.appendChild(mCanvas);

    const mCtx = mCanvas.getContext('2d');
    mCanvas.width = window.innerWidth;
    mCanvas.height = window.innerHeight;

    const chars = '01LOKENDRA_AI_MATRIX_NUMPY_∑∏∆∇λΩ';
    const fontSize = 16;
    const columns = Math.floor(mCanvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const interval = setInterval(() => {
        mCtx.fillStyle = 'rgba(5, 5, 5, 0.08)';
        mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);

        mCtx.fillStyle = '#00f3ff';
        mCtx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            mCtx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > mCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }, 35);

    setTimeout(() => {
        clearInterval(interval);
        mCanvas.remove();
        printTerm('Matrix Simulation Completed.', 'term-res');
    }, 6000);
}

const cmdHistory = [];
let historyIdx = -1;

termInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (cmdHistory.length > 0 && historyIdx > 0) {
            historyIdx--;
            termInput.value = cmdHistory[historyIdx];
        }
        return;
    }

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIdx < cmdHistory.length - 1) {
            historyIdx++;
            termInput.value = cmdHistory[historyIdx];
        } else {
            historyIdx = cmdHistory.length;
            termInput.value = '';
        }
        return;
    }

    if (e.key === 'Enter') {
        const rawVal = termInput.value.trim();
        const cmd = rawVal.toLowerCase();
        if (!cmd) return;

        cmdHistory.push(rawVal);
        historyIdx = cmdHistory.length;

        printTerm('lokendra@kushwaha:~$ ' + rawVal, 'term-cmd');
        termInput.value = '';

        const parts = cmd.split(' ');
        const action = parts[0];
        const target = parts[1];

        if (cmd === 'clear') {
            termBody.textContent = '';
        } else if (commands[cmd]) {
            printTerm(commands[cmd], 'term-res');
        } else if ((action === 'goto' || action === 'cd' || action === 'open') && target) {
            if (routes[target]) {
                printTerm('Navigating to ' + target.toUpperCase() + '...', 'term-res');
                setTimeout(() => {
                    window.location.href = routes[target];
                }, 600);
            } else {
                printTerm('Unknown destination: ' + target + '. Try: home, projects, logs, about, contact', 'term-line');
            }
        } else if (cmd === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            printTerm('Scrolled to top of page.', 'term-res');
        } else if (cmd === 'bottom') {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            printTerm('Scrolled to bottom of page.', 'term-res');
        } else if (cmd === 'matrix') {
            printTerm('Initializing Cyber Matrix Rain (6s)...', 'term-res');
            startMatrixRain();
        } else {
            printTerm('Command not found: ' + cmd + '. Type "help" for list.', 'term-line');
        }
    }
});

// Custom Magnetic Cursor
if (window.matchMedia('(pointer: fine)').matches) {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cyber-cursor-dot';

    const cursorRing = document.createElement('div');
    cursorRing.className = 'cyber-cursor-ring';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function renderCursor() {
        ringX += (mouseX - ringX) * 0.22;
        ringY += (mouseY - ringY) * 0.22;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Links, Buttons aur Inputs Hover Lock Effect
    const interactiveSelector = 'a, button, .btn, .copy-btn, .term-toggle-btn, .term-close, input, textarea';

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) {
            cursorRing.classList.add('cursor-active');
            cursorDot.classList.add('cursor-active');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelector)) {
            cursorRing.classList.remove('cursor-active');
            cursorDot.classList.remove('cursor-active');
        }
    });

    // Magnetic Pull Effect on Navigation Links & Buttons
    const magneticItems = document.querySelectorAll('nav a, .btn, .project-links a, .term-toggle-btn');

    magneticItems.forEach((item) => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const moveX = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
            const moveY = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
            item.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translate(0px, 0px)';
        });
    });
}

// ==========================================
// ADVANCED LIVE THEME ENGINE
// ==========================================
const CYBER_THEMES = {
    cyan:   { name: 'NEURAL_CYAN',      hex: '#00f3ff', rgb: '0, 243, 255' },
    green:  { name: 'MATRIX_EMERALD',   hex: '#00ff66', rgb: '0, 255, 102' },
    gold:   { name: 'QUANTUM_GOLD',     hex: '#ffb000', rgb: '255, 176, 0' },
    purple: { name: 'SYNTH_VIOLET',     hex: '#bd00ff', rgb: '189, 0, 255' },
    red:    { name: 'CRIMSON_CORE',     hex: '#ff2a54', rgb: '255, 42, 84' },
    blue:   { name: 'COBALT_PLASMA',    hex: '#3b82f6', rgb: '59, 130, 246' },
    orange: { name: 'SOLAR_FLARE',      hex: '#ff6b00', rgb: '255, 107, 0' },
    white:  { name: 'MONOCHROME_GHOST', hex: '#ffffff', rgb: '255, 255, 255' }
};

const THEME_ALIASES = {
    default: 'cyan',
    matrix: 'green',
    amber: 'gold',
    yellow: 'gold',
    violet: 'purple',
    pink: 'red',
    crimson: 'red',
    mono: 'white'
};

let activeThemeKey = localStorage.getItem('lokendra_cyber_theme') || 'cyan';
if (!CYBER_THEMES[activeThemeKey]) activeThemeKey = 'cyan';

let themeCycleInterval = null;

// 1. Intercept 2D Canvas Colors so 3D Neural Cube & Matrix Rain Change Live
(function hookCanvasColors() {
    const proto = CanvasRenderingContext2D.prototype;
    ['strokeStyle', 'fillStyle', 'shadowColor'].forEach((prop) => {
        const desc = Object.getOwnPropertyDescriptor(proto, prop);
        if (!desc || !desc.set) return;

        Object.defineProperty(proto, prop, {
            get() {
                return desc.get.call(this);
            },
            set(val) {
                if (typeof val === 'string') {
                    const t = CYBER_THEMES[activeThemeKey] || CYBER_THEMES.cyan;
                    let modified = val
                        .replace(/#00f3ff/gi, t.hex)
                        .replace(/#00ffff/gi, t.hex)
                        .replace(/0,\s*243,\s*255/g, t.rgb)
                        .replace(/0,\s*255,\s*255/g, t.rgb);
                    desc.set.call(this, modified);
                } else {
                    desc.set.call(this, val);
                }
            }
        });
    });
})();

// 2. Auto-Scan & Tag All Hardcoded Cyan Elements on the Page
function parseRgba(str) {
    if (!str) return null;
    const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!m) return null;
    return {
        r: Number(m[1]),
        g: Number(m[2]),
        b: Number(m[3]),
        a: m[4] !== undefined ? Number(m[4]) : 1
    };
}

function isCyanShade(c) {
    return c && c.a > 0 && c.r < 65 && c.g > 175 && c.b > 200;
}

function scanHardcodedCyanElements() {
    const prevStyle = document.getElementById('cyber-live-theme-styles');
    const savedCss = prevStyle ? prevStyle.textContent : '';
    if (prevStyle) prevStyle.textContent = '';

    document.querySelectorAll('*').forEach((el) => {
        const cs = window.getComputedStyle(el);

        // Check Text / Icon Color
        const txtCol = parseRgba(cs.color);
        if (isCyanShade(txtCol)) {
            el.setAttribute('data-theme-text', '1');
        }

        // Check Background Color (Solid Buttons vs Subtle Badges)
        const bgCol = parseRgba(cs.backgroundColor);
        if (isCyanShade(bgCol)) {
            if (bgCol.a > 0.6) {
                el.setAttribute('data-theme-bg', 'solid');
            } else {
                el.setAttribute('data-theme-bg', 'tint');
            }
        }

        // Check All 4 Borders on Element
        ['Top', 'Right', 'Bottom', 'Left'].forEach((side) => {
            const bCol = parseRgba(cs['border' + side + 'Color']);
            const bWidth = parseFloat(cs['border' + side + 'Width']);
            if (bWidth > 0 && isCyanShade(bCol)) {
                el.setAttribute('data-theme-border-' + side.toLowerCase(), bCol.a > 0.6 ? 'solid' : 'subtle');
            }
        });

        // Check ::before and ::after Pseudo-Elements (e.g., 3D Box Corners)
        ['::before', '::after'].forEach((pseudo) => {
            const pcs = window.getComputedStyle(el, pseudo);
            const tagPrefix = pseudo === '::before' ? 'data-theme-before' : 'data-theme-after';

            const pBg = parseRgba(pcs.backgroundColor);
            if (isCyanShade(pBg)) {
                el.setAttribute(tagPrefix + '-bg', pBg.a > 0.6 ? 'solid' : 'tint');
            }

            ['Top', 'Right', 'Bottom', 'Left'].forEach((side) => {
                const pbCol = parseRgba(pcs['border' + side + 'Color']);
                const pbWidth = parseFloat(pcs['border' + side + 'Width']);
                if (pbWidth > 0 && isCyanShade(pbCol)) {
                    el.setAttribute(tagPrefix + '-border', '1');
                }
            });
        });
    });

    if (prevStyle) prevStyle.textContent = savedCss;
}

// 3. Dynamic Style Tag for Instant Site-Wide Color Override
const themeStyleEl = document.createElement('style');
themeStyleEl.id = 'cyber-live-theme-styles';
document.head.appendChild(themeStyleEl);

function updateTabFavicon(hexColor) {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext('2d');

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, 64, 64);

    ctx.strokeStyle = hexColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 60, 60);

    ctx.fillStyle = hexColor;
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('LK', 32, 34);

    let link = document.querySelector('link[rel="icon"]');
    if (link) link.href = c.toDataURL('image/png');
}

function applyCyberTheme(key) {
    const resolvedKey = THEME_ALIASES[key] || key;
    const theme = CYBER_THEMES[resolvedKey];
    if (!theme) return false;

    activeThemeKey = resolvedKey;
    localStorage.setItem('lokendra_cyber_theme', resolvedKey);

    const { hex, rgb } = theme;

    themeStyleEl.textContent = `
        :root {
            --neon-color: ${hex} !important;
            --neon-rgb: ${rgb} !important;
            --primary-color: ${hex} !important;
            --accent-color: ${hex} !important;
        }
        ::selection {
            background: ${hex} !important;
            color: #050505 !important;
        }
        body {
            background-image: 
                linear-gradient(rgba(${rgb}, 0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(${rgb}, 0.04) 1px, transparent 1px) !important;
        }
        /* Auto-Tagged Hardcoded Cyan Elements */
        [data-theme-text="1"],
        .about-card h3, .card h3, .contact-info h3, .contact-box h3,
        .intro-text h1 span, .highlight, .typing-prefix, .typing-cursor {
            color: ${hex} !important;
        }
        .intro-text h1 span, .highlight, .typing-prefix, .typing-cursor {
            text-shadow: 0 0 15px rgba(${rgb}, 0.5) !important;
        }
        [data-theme-bg="solid"],
        .btn, .cta-btn, .explore-btn, .submit-btn,
        button[type="submit"], form button, .intro-text a, .project-links a:first-child {
            background-color: ${hex} !important;
            border-color: ${hex} !important;
            color: #050505 !important;
            box-shadow: 0 0 18px rgba(${rgb}, 0.4) !important;
        }
        [data-theme-bg="tint"],
        .cyber-top-tag, .tag, .tech-tag, .skill-tag, .project-tags span {
            color: ${hex} !important;
            border-color: rgba(${rgb}, 0.4) !important;
            background: rgba(${rgb}, 0.08) !important;
        }
        [data-theme-border-top="solid"]    { border-top-color: ${hex} !important; }
        [data-theme-border-right="solid"]  { border-right-color: ${hex} !important; }
        [data-theme-border-bottom="solid"] { border-bottom-color: ${hex} !important; }
        [data-theme-border-left="solid"]   { border-left-color: ${hex} !important; }
        [data-theme-border-top="subtle"]    { border-top-color: rgba(${rgb}, 0.35) !important; }
        [data-theme-border-right="subtle"]  { border-right-color: rgba(${rgb}, 0.35) !important; }
        [data-theme-border-bottom="subtle"] { border-bottom-color: rgba(${rgb}, 0.35) !important; }
        [data-theme-border-left="subtle"]   { border-left-color: rgba(${rgb}, 0.35) !important; }
        [data-theme-before-border="1"]::before { border-color: ${hex} !important; }
        [data-theme-after-border="1"]::after   { border-color: ${hex} !important; }
        [data-theme-before-bg="solid"]::before { background-color: ${hex} !important; }
        [data-theme-after-bg="solid"]::after   { background-color: ${hex} !important; }

        /* Navbar, Cards & Hover States */
        nav, .nav-box, header {
            border-color: rgba(${rgb}, 0.35) !important;
            box-shadow: 0 0 20px rgba(${rgb}, 0.12) !important;
        }
        nav a:hover, nav a.active {
            color: ${hex} !important;
            text-shadow: 0 0 10px rgba(${rgb}, 0.6) !important;
        }

        /* Mobile Dropdown Menu Border & Shadow Fix */
        nav ul, .nav-box ul, .nav-links, .nav-menu, [class*="nav-links"] {
            border-color: rgba(${rgb}, 0.4) !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.9), 0 0 20px rgba(${rgb}, 0.18) !important;
        }

        /* Mobile 3-Line Hamburger & Close (X) Icon Fix */
        .menu-toggle, .hamburger, .menu-icon, .nav-toggle,
        .nav-box [class*="menu"], .nav-box [class*="toggle"], .nav-box [class*="btn"],
        .nav-box > div:last-child, .nav-box > span:last-child, .nav-box > button {
            color: #ffffff !important;
        }

        .menu-toggle:hover, .menu-toggle:active, .menu-toggle:focus,
        .nav-box [class*="menu"]:hover, .nav-box [class*="toggle"]:hover,
        .nav-box > div:last-child:hover, .nav-box > button:hover {
            color: ${hex} !important;
            text-shadow: 0 0 10px rgba(${rgb}, 0.6) !important;
        }

        .menu-toggle span, .hamburger span, .bar {
            background-color: ${hex} !important;
        }

        .project-links a:last-child:hover,
        input:focus, textarea:focus {
            border-color: ${hex} !important;
            box-shadow: 0 0 12px rgba(${rgb}, 0.3) !important;
        }
        .section-title, .cyber-main-title, h1 {
            text-shadow: 0 0 18px rgba(${rgb}, 0.45) !important;
        }
        .telemetry-pill {
            border-color: rgba(${rgb}, 0.35) !important;
        }
        .project-card:hover, .card:hover, .holo-active:hover {
            border-color: rgba(${rgb}, 0.6) !important;
            box-shadow: 0 10px 30px rgba(${rgb}, 0.18) !important;
        }
        /* Research Logs & Audio Controls */
        #reading-progress {
            background: ${hex} !important;
            box-shadow: 0 0 12px \({hex}, 0 0 5px\){hex} !important;
        }
        .copy-btn, .audio-btn {
            color: ${hex} !important;
            border-color: rgba(${rgb}, 0.45) !important;
            background: rgba(${rgb}, 0.08) !important;
        }
        .copy-btn:hover, .audio-btn:hover {
            background: ${hex} !important;
            color: #050505 !important;
            box-shadow: 0 0 12px rgba(${rgb}, 0.5) !important;
        }
        .speaking-active {
            border-left-color: ${hex} !important;
            background: rgba(${rgb}, 0.04) !important;
        }
        /* Hacker Terminal & Custom Cursor */
        .term-toggle-btn {
            color: ${hex} !important;
            border-color: ${hex} !important;
            box-shadow: 0 0 15px rgba(${rgb}, 0.25) !important;
        }
        .term-toggle-btn:hover {
            background: ${hex} !important;
            color: #050505 !important;
            box-shadow: 0 0 25px rgba(${rgb}, 0.6) !important;
        }
        .hacker-terminal {
            border-color: ${hex} !important;
            box-shadow: 0 15px 40px rgba(0,0,0,0.9), 0 0 20px rgba(${rgb}, 0.22) !important;
        }
        .term-header {
            color: ${hex} !important;
            border-bottom-color: rgba(${rgb}, 0.3) !important;
        }
        .term-cmd, .term-prompt {
            color: ${hex} !important;
        }
        .cyber-cursor-dot {
            background-color: ${hex} !important;
            box-shadow: 0 0 10px \({hex}, 0 0 20px\){hex} !important;
        }
        .cyber-cursor-ring {
            border-color: rgba(${rgb}, 0.6) !important;
        }
        .cyber-cursor-ring.cursor-active {
            border-color: ${hex} !important;
            background-color: rgba(${rgb}, 0.08) !important;
            box-shadow: 0 0 15px rgba(${rgb}, 0.35) !important;
        }

        /* Social Icons (GitHub, LinkedIn, X) Hover Fix */
        .social-links a:hover,
        .social-icons a:hover,
        .social-icon:hover,
        .socials a:hover,
        a[href*="github"]:hover,
        a[href*="linkedin"]:hover,
        a[href*="x.com"]:hover,
        a[href*="twitter"]:hover {
            background-color: ${hex} !important;
            border-color: ${hex} !important;
            color: #050505 !important;
            box-shadow: 0 0 18px rgba(${rgb}, 0.65) !important;
        }

        a[href*="github"]:hover svg,
        a[href*="linkedin"]:hover svg,
        a[href*="x.com"]:hover svg,
        a[href*="twitter"]:hover svg,
        .social-links a:hover svg,
        .social-icons a:hover svg {
            fill: #050505 !important;
            color: #050505 !important;
        }

        /* Main Buttons & Cards Hover Glow Fix */
        [data-theme-bg="solid"]:hover,
        .btn:hover,
        .cta-btn:hover,
        button[type="submit"]:hover {
            background-color: ${hex} !important;
            border-color: ${hex} !important;
            color: #050505 !important;
            box-shadow: 0 0 25px rgba(${rgb}, 0.7) !important;
        }

        .about-card:hover,
        .contact-box:hover,
        .contact-container:hover {
            border-color: rgba(${rgb}, 0.5) !important;
            box-shadow: 0 0 25px rgba(${rgb}, 0.15) !important;
        }

        [class*="card"]:hover, [class*="box"]:hover, .holo-active:hover {
            border-color: rgba(${rgb}, 0.6) !important;
            box-shadow: 0 10px 30px rgba(${rgb}, 0.18) !important;
        }
        
        .term-toggle-btn, .cyber-sfx-btn {
            color: ${hex} !important;
            border-color: ${hex} !important;
            box-shadow: 0 0 15px rgba(${rgb}, 0.25) !important;
        }
        .term-toggle-btn:hover, .cyber-sfx-btn:hover {
            background: ${hex} !important;
            color: #050505 !important;
            box-shadow: 0 0 25px rgba(${rgb}, 0.6) !important;
        }
    `;

    updateTabFavicon(hex);
    return theme;
}

// Sync Quick Navigation Links with Activ Theme
(function syncQuickNavTheme() {
    var styleId = 'cyber-quicknav-theme-sync';
    if (document.getElementById(styleId)) return;

    var styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.textContent = [
        'a[href*="#LOG_"], .quick-nav a, #quick-nav-list a {',
        '    color: rgba(var(--neon-rgb, 0, 243, 255), 0.82) !important;',
        '    transition: all 0.22s ease !important;',
        '}',
        'a[href*="#LOG_"] *, .quick-nav a * {',
        '    color: inherit !important;',
        '}',
        'a[href*="#LOG_"]:hover, .quick-nav a:hover, #quick-nav-list a:hover {',
        '    color: var(--neon-color, #00f3ff) !important;',
        '    text-shadow: 0 0 12px rgba(var(--neon-rgb, 0, 243, 255), 0.7) !important;',
        '    border-color: var(--neon-color, #00f3ff) !important;',
        '}'
    ].join('\n');

    document.head.appendChild(styleEl);
})();

// Scan hardcoded colors first, then apply saved theme
scanHardcodedCyanElements();
applyCyberTheme(activeThemeKey);
window.addEventListener('DOMContentLoaded', () => {
    scanHardcodedCyanElements();
    applyCyberTheme(activeThemeKey);
});

// Update help menu with theme commands
if (typeof commands !== 'undefined') {
    commands.help += '\n\nTHEME ENGINE:\n  themes        -> List all 8 cyber themes\n  theme   -> e.g., theme green, theme gold, theme purple\n  theme random  -> Pick a random color theme\n  theme cycle   -> Auto-cycle RGB themes (type "theme stop" to lock)\n  [Shortcut]    -> Press Ctrl + K anytime to toggle terminal';
    commands.themes = 'AVAILABLE CYBER THEMES:\n  1. cyan   (Neural Cyan - Default)\n  2. green  (Matrix Emerald)\n  3. gold   (Quantum Gold)\n  4. purple (Synthwave Violet)\n  5. red    (Crimson Core)\n  6. blue   (Cobalt Plasma)\n  7. orange (Solar Flare)\n  8. white  (Monochrome Ghost)\nUsage: Type "theme " (e.g. theme gold)';
}

// 4. Intercept Terminal Input for Theme Commands & Ctrl+K Shortcut
window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (typeof termWin !== 'undefined') {
            termWin.classList.toggle('open');
            if (termWin.classList.contains('open') && typeof termInput !== 'undefined') {
                termInput.focus();
            }
        }
        return;
    }

    if (typeof termInput !== 'undefined' && e.target === termInput && e.key === 'Enter') {
        const rawVal = termInput.value.trim();
        const cmd = rawVal.toLowerCase();
        const parts = cmd.split(/\s+/);

        if (parts[0] === 'theme') {
            e.stopImmediatePropagation();
            e.stopPropagation();

            if (typeof cmdHistory !== 'undefined') {
                cmdHistory.push(rawVal);
                historyIdx = cmdHistory.length;
            }

            printTerm('lokendra@kushwaha:~$ ' + rawVal, 'term-cmd');
            termInput.value = '';

            const arg = parts[1];

            if (!arg || arg === 'list') {
                printTerm(commands.themes, 'term-res');
                return;
            }

            if (arg === 'stop') {
                if (themeCycleInterval) {
                    clearInterval(themeCycleInterval);
                    themeCycleInterval = null;
                    printTerm('Theme auto-cycle stopped. Locked on: ' + CYBER_THEMES[activeThemeKey].name, 'term-res');
                } else {
                    printTerm('Theme cycle is not running.', 'term-line');
                }
                return;
            }

            if (arg === 'cycle' || arg === 'rgb' || arg === 'party') {
                if (themeCycleInterval) clearInterval(themeCycleInterval);
                const keys = Object.keys(CYBER_THEMES);
                let idx = keys.indexOf(activeThemeKey);
                printTerm('Initiating Cyber RGB Overdrive... (Type "theme stop" to lock)', 'term-res');
                themeCycleInterval = setInterval(() => {
                    idx = (idx + 1) % keys.length;
                    applyCyberTheme(keys[idx]);
                }, 1200);
                return;
            }

            if (arg === 'random') {
                if (themeCycleInterval) {
                    clearInterval(themeCycleInterval);
                    themeCycleInterval = null;
                }
                const keys = Object.keys(CYBER_THEMES).filter(k => k !== activeThemeKey);
                const randKey = keys[Math.floor(Math.random() * keys.length)];
                const applied = applyCyberTheme(randKey);
                printTerm('Random Theme Activated: ' + applied.name + ' (' + applied.hex + ')', 'term-res');
                return;
            }

            if (themeCycleInterval) {
                clearInterval(themeCycleInterval);
                themeCycleInterval = null;
            }

            const applied = applyCyberTheme(arg);
            if (applied) {
                printTerm('System Theme Updated -> ' + applied.name + ' [' + applied.hex + ']', 'term-res');
            } else {
                printTerm('Unknown theme "' + arg + '". Type "themes" to see all 8 options.', 'term-line');
            }
        }
    }
}, true);

// ==========================================
// PURE MATH WEB-AUDIO SOUND ENGINE
// ==========================================
(function initCyberSoundEngine() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    let audioCtx = null;
    let sfxEnabled = localStorage.getItem('lokendra_sfx_enabled') !== 'false';
    let lastHoverTime = 0;

    function getAudioContext() {
        if (!audioCtx) {
            audioCtx = new AudioCtx();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    // 1. Soft High-Tech Hover Tick (Sine Wave Sweep)
    function playHoverTick() {
        if (!sfxEnabled) return;
        const nowMs = Date.now();
        if (nowMs - lastHoverTime < 65) return;
        lastHoverTime = nowMs;

        const ctx = getAudioContext();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(950, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.025);

        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.028);
    }

    // 2. Crisp Mechanical Button Click (Triangle Wave Drop)
    function playClickPulse() {
        if (!sfxEnabled) return;
        const ctx = getAudioContext();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.055);

        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.06);
    }

    // 3. Terminal Key Switch Tick
    function playKeyTick() {
        if (!sfxEnabled) return;
        const ctx = getAudioContext();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(680 + Math.random() * 120, now);
        osc.frequency.exponentialRampToValueAtTime(280, now + 0.02);

        gain.gain.setValueAtTime(0.022, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.022);
    }

    // 4. Terminal Command Execution Dual-Tone Beep
    function playCommandConfirm() {
        if (!sfxEnabled) return;
        const ctx = getAudioContext();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.04);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.115);
    }

    // 5. Create Floating SFX: ON/OFF Button Next to Terminal Button
    const sfxBtn = document.createElement('button');
    sfxBtn.className = 'cyber-sfx-btn';

    function updateSfxBtnUI() {
        if (sfxEnabled) {
            sfxBtn.textContent = '🔊 SFX: ON';
            sfxBtn.classList.remove('sfx-muted');
        } else {
            sfxBtn.textContent = '🔇 SFX: OFF';
            sfxBtn.classList.add('sfx-muted');
        }
    }

    function setSfxState(state) {
        sfxEnabled = state;
        localStorage.setItem('lokendra_sfx_enabled', String(sfxEnabled));
        updateSfxBtnUI();
        if (sfxEnabled) {
            playCommandConfirm();
        }
    }

    updateSfxBtnUI();
    document.body.appendChild(sfxBtn);

    sfxBtn.addEventListener('click', () => {
        setSfxState(!sfxEnabled);
    });

    // 6. Attach Hover & Click Sounds to Interactive Elements
    const soundTargets = 'a, button, .btn, .copy-btn, .audio-btn, .term-toggle-btn, .project-card, .card';

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(soundTargets)) {
            playHoverTick();
        }
    });

    document.addEventListener('mousedown', (e) => {
        if (e.target.closest(soundTargets) && e.target !== sfxBtn) {
            playClickPulse();
        }
    });

    // 7. Add Terminal Sound Commands ("sound on", "sound off", "mute")
    if (typeof commands !== 'undefined') {
        commands.help += '\n  sound on/off  -> Toggle Sci-Fi Audio Synthesizer';
    }

    window.addEventListener('keydown', (e) => {
        if (typeof termInput !== 'undefined' && e.target === termInput) {
            if (e.key === 'Enter') {
                const rawVal = termInput.value.trim();
                const cmd = rawVal.toLowerCase();

                playCommandConfirm();

                if (cmd === 'sound on' || cmd === 'sfx on' || cmd === 'unmute') {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    if (typeof cmdHistory !== 'undefined') {
                        cmdHistory.push(rawVal);
                        historyIdx = cmdHistory.length;
                    }
                    printTerm('lokendra@kushwaha:~$ ' + rawVal, 'term-cmd');
                    termInput.value = '';
                    setSfxState(true);
                    printTerm('Sci-Fi Audio Synthesizer: ONLINE', 'term-res');
                } else if (cmd === 'sound off' || cmd === 'sfx off' || cmd === 'mute') {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    if (typeof cmdHistory !== 'undefined') {
                        cmdHistory.push(rawVal);
                        historyIdx = cmdHistory.length;
                    }
                    printTerm('lokendra@kushwaha:~$ ' + rawVal, 'term-cmd');
                    termInput.value = '';
                    setSfxState(false);
                    printTerm('Sci-Fi Audio Synthesizer: MUTED', 'term-res');
                }
            } else if (e.key.length === 1 || e.key === 'Backspace') {
                playKeyTick();
            }
        }
    }, true);
})();

// =========================================================
// TERMINAL TAB AUTO-COMPLETE & LIVE MATRIX BENCHMARK ENGINE
// =========================================================
(function initTerminalAdvancedTools() {
    if (typeof termInput === 'undefined') return;

    const AUTO_COMPLETE_DICT = [
        'help', 'whoami', 'skills', 'projects', 'logs', 'themes', 'matrix', 'benchmark', 'sysinfo', 'clear', 'top', 'bottom',
        'goto home', 'goto projects', 'goto logs', 'goto about', 'goto contact',
        'theme cyan', 'theme green', 'theme gold', 'theme purple', 'theme red', 'theme blue', 'theme orange', 'theme white',
        'theme random', 'theme cycle', 'theme stop',
        'sound on', 'sound off'
    ];

    if (typeof commands !== 'undefined') {
        commands.help += '\n\nENGINEERING DIAGNOSTICS:\n  benchmark     -> Run 200x200 Float64 Matrix Compute Test\n  sysinfo       -> Display Hardware & Browser Telemetry\n  xray          -> Toggle Live X-Ray Architecture & Telemetry HUD\n  [X Key]       -> Press X anytime to toggle X-Ray Mode\n  [Tab Key]     -> Auto-complete any terminal command';
        commands.xray = '[X-RAY_HUD]: Toggling Live Architecture Wireframe...';
    }

    // Real 200x200 Float64 Matrix Multiplication Benchmark
    function runMatrixBenchmark() {
        const N = 200;
        const totalOps = 2 * N * N * N; // 16,000,000 FLOPs

        printTerm('[BENCHMARK] Allocating 200x200 Float64 Matrices (A, B)...', 'term-line');

        setTimeout(() => {
            const A = new Float64Array(N * N);
            const B = new Float64Array(N * N);
            const C = new Float64Array(N * N);

            for (let i = 0; i < N * N; i++) {
                A[i] = Math.random();
                B[i] = Math.random();
            }

            const t0 = performance.now();

            // Cache-friendly ikj Matrix Multiplication Loop
            for (let i = 0; i < N; i++) {
                const iRow = i * N;
                for (let k = 0; k < N; k++) {
                    const aVal = A[iRow + k];
                    const kRow = k * N;
                    for (let j = 0; j < N; j++) {
                        C[iRow + j] += aVal * B[kRow + j];
                    }
                }
            }

            const t1 = performance.now();
            const elapsedMs = Math.max(0.1, t1 - t0);
            const mflops = ((totalOps / (elapsedMs / 1000)) / 1e6).toFixed(2);
            const cores = navigator.hardwareConcurrency || 'N/A';

            let tier = 'STANDARD_NODE';
            if (elapsedMs < 12) tier = 'EXTREME_SILICON_CORE';
            else if (elapsedMs < 28) tier = 'HIGH_VELOCITY_ENGINE';

            const report = [
                '--- MATRIX COMPUTE BENCHMARK REPORT ---',
                '  Matrix Dimension : ' + N + ' x ' + N + ' (Dense Float64)',
                '  Total Operations : 16,000,000 FLOPs',
                '  Execution Time   : ' + elapsedMs.toFixed(2) + ' ms',
                '  Compute Speed    : ' + mflops + ' MFLOPS',
                '  Logical CPU Cores: ' + cores,
                '  Hardware Rating  : [' + tier + ']'
            ].join('\n');

            printTerm(report, 'term-res');
            if (typeof termBody !== 'undefined') {
                termBody.scrollTop = termBody.scrollHeight;
            }
        }, 120);
    }

    function showSysInfo() {
        const cores = navigator.hardwareConcurrency || 'Unknown';
        const mem = navigator.deviceMemory ? navigator.deviceMemory + ' GB+' : 'Protected';
        const res = window.innerWidth + 'x' + window.innerHeight + ' (@' + window.devicePixelRatio + 'x DPR)';

        const info = [
            '--- SYSTEM TELEMETRY HUD ---',
            '  Logical CPU Threads : ' + cores,
            '  Est. Device Memory  : ' + mem,
            '  Viewport Resolution : ' + res,
            '  Active Color Theme  : ' + (typeof activeThemeKey !== 'undefined' ? activeThemeKey.toUpperCase() : 'CYAN')
        ].join('\n');

        printTerm(info, 'term-res');
    }

    window.addEventListener('keydown', (e) => {
        if (e.target !== termInput) return;

        // 1. TAB Key Auto-Complete Logic
        if (e.key === 'Tab') {
            e.preventDefault();
            const currentVal = termInput.value.toLowerCase().trimStart();
            if (!currentVal) return;

            const matches = AUTO_COMPLETE_DICT.filter((item) => item.indexOf(currentVal) === 0);

            if (matches.length === 1) {
                termInput.value = matches[0];
                if (matches[0] === 'goto' || matches[0] === 'theme' || matches[0] === 'sound') {
                    termInput.value += ' ';
                }
            } else if (matches.length > 1) {
                // Find common shared prefix among matches
                let prefix = matches[0];
                for (let i = 1; i < matches.length; i++) {
                    while (matches[i].indexOf(prefix) !== 0 && prefix.length > 0) {
                        prefix = prefix.slice(0, -1);
                    }
                }
                if (prefix.length > currentVal.length) {
                    termInput.value = prefix;
                } else {
                    printTerm('Matches -> ' + matches.join('  |  '), 'term-line');
                    if (typeof termBody !== 'undefined') {
                        termBody.scrollTop = termBody.scrollHeight;
                    }
                }
            }
            return;
        }

        // 2. Intercept "benchmark" & "sysinfo" Commands on Enter
        if (e.key === 'Enter') {
            const rawVal = termInput.value.trim();
            const cmd = rawVal.toLowerCase();

            if (cmd === 'benchmark' || cmd === 'bench' || cmd === 'sysinfo') {
                e.stopImmediatePropagation();
                e.stopPropagation();

                if (typeof cmdHistory !== 'undefined') {
                    cmdHistory.push(rawVal);
                    historyIdx = cmdHistory.length;
                }

                printTerm('lokendra@kushwaha:~$ ' + rawVal, 'term-cmd');
                termInput.value = '';

                if (cmd === 'sysinfo') {
                    showSysInfo();
                } else {
                    runMatrixBenchmark();
                }
            }
        }
    }, true);
})();

// =========================================================
// ENCRYPTED PACKET TRANSMITTER (WORKING CONTACT FORM)
// =========================================================
(function initEncryptedContactForm() {
    const contactSection = document.getElementById('contact') || document.querySelector('.contact-section');
    if (!contactSection) return;

    const nameInput = contactSection.querySelector('input[placeholder*="Name" i], input[type="text"]');
    const emailInput = contactSection.querySelector('input[placeholder*="Email" i], input[type="email"]');
    const msgInput = contactSection.querySelector('textarea');
    const sendBtn = Array.from(contactSection.querySelectorAll('button, .btn, input[type="submit"]')).find(
        (el) => el.innerText && el.innerText.toUpperCase().indexOf('SEND') !== -1
    ) || contactSection.querySelector('button');

    if (!nameInput || !emailInput || !msgInput || !sendBtn) return;

    // Inject Transmitter Status Styling
    const txStyle = document.createElement('style');
    txStyle.textContent = [
        '.tx-status-box { margin-top: 14px; padding: 10px 14px; font-family: "Courier New", Courier, monospace; font-size: 0.78rem; letter-spacing: 1px; border: 1px solid rgba(var(--neon-rgb, 0, 243, 255), 0.4); background: rgba(10, 14, 20, 0.9); color: var(--neon-color, #00f3ff); display: none; text-align: left; line-height: 1.5; }',
        '.tx-status-box.tx-error { border-color: #ff4444 !important; color: #ff5555 !important; background: rgba(40, 10, 10, 0.85) !important; }',
        '.tx-status-box.tx-success { border-color: #00ff88 !important; color: #00ff88 !important; background: rgba(5, 30, 18, 0.9) !important; }',
        '.input-error-shake { border-color: #ff4444 !important; box-shadow: 0 0 12px rgba(255, 68, 68, 0.4) !important; }',
        '.email-copy-hint { cursor: pointer; transition: opacity 0.2s ease; }'
    ].join('\n');
    document.head.appendChild(txStyle);

    // Create Telemetry Status Box Below Send Button
    const statusBox = document.createElement('div');
    statusBox.className = 'tx-status-box';
    sendBtn.insertAdjacentElement('afterend', statusBox);

    function showTxStatus(text, type) {
        statusBox.style.display = 'block';
        statusBox.className = 'tx-status-box ' + (type || '');
        statusBox.textContent = text;
    }

    // Make thelokendrakushwaha@gmail.com Click-to-Copy
    const allContactEls = contactSection.querySelectorAll('p, span, div, a');
    allContactEls.forEach((el) => {
        if (el.children.length === 0 && el.textContent.indexOf('thelokendrakushwaha@gmail.com') !== -1) {
            el.classList.add('email-copy-hint');
            el.title = 'Click to copy email address';
            const origEmailText = el.textContent;
            el.addEventListener('click', (e) => {
                e.preventDefault();
                if (navigator.clipboard) {
                    navigator.clipboard.writeText('thelokendrakushwaha@gmail.com');
                    el.textContent = '[ COPIED: thelokendrakushwaha@gmail.com ]';
                    setTimeout(() => {
                        el.textContent = origEmailText;
                    }, 2000);
                }
            });
        }
    });

    // Clear red error border when user starts typing
    [nameInput, emailInput, msgInput].forEach((inp) => {
        inp.addEventListener('input', () => {
            inp.classList.remove('input-error-shake');
        });
    });

    let isTransmitting = false;
    const originalBtnText = sendBtn.innerText.trim() || 'SEND MESSAGE';

    function handlePacketTransmit(e) {
        if (e) e.preventDefault();
        if (isTransmitting) return;

        const senderName = nameInput.value.trim();
        const senderEmail = emailInput.value.trim();
        const senderMsg = msgInput.value.trim();

        // 1. Validate All Fields
        if (!senderName || !senderEmail || !senderMsg) {
            if (!senderName) nameInput.classList.add('input-error-shake');
            if (!senderEmail) emailInput.classList.add('input-error-shake');
            if (!senderMsg) msgInput.classList.add('input-error-shake');
            showTxStatus('[ ERROR // MISSING_PAYLOAD: Please fill in Name, Email, and Message fields. ]', 'tx-error');
            return;
        }

        // 2. Validate Email Format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(senderEmail)) {
            emailInput.classList.add('input-error-shake');
            showTxStatus('[ ERROR // INVALID_ADDRESS: Please enter a valid email address. ]', 'tx-error');
            return;
        }

        isTransmitting = true;
        sendBtn.style.pointerEvents = 'none';
        sendBtn.style.opacity = '0.9';

        // Generate Packet Hash ID
        const packetId = 'PKT_' + Math.random().toString(16).substring(2, 8).toUpperCase();

        // Step 1: Validating & Formatting
        sendBtn.innerText = '[ 01 // PACKAGING_DATA... ]';
        showTxStatus('> Initializing secure channel for ' + packetId + '...', '');

        setTimeout(() => {
            // Step 2: Encrypting Packet
            sendBtn.innerText = '[ 02 // ENCRYPTING_PACKET... ]';
            showTxStatus('> Encrypting payload from [' + senderEmail + '] -> [thelokendrakushwaha@gmail.com]...', '');
        }, 550);

        setTimeout(() => {
            // Step 3: Transmit via FormSubmit AJAX (Works on Live Hosted Site) + Mailto Fallback
            sendBtn.innerText = '[ 03 // UPLOADING_TO_NODE... ]';

            const subject = 'Portfolio Contact [' + packetId + '] from ' + senderName;
            const bodyLines = [
                '=== ENCRYPTED PORTFOLIO TRANSMISSION ===',
                'Packet ID : ' + packetId,
                'Sender    : ' + senderName,
                'Email     : ' + senderEmail,
                '----------------------------------------',
                '',
                senderMsg,
                '',
                '========================================'
            ].join('\r\n');

            const mailtoUrl = 'mailto:thelokendrakushwaha@gmail.com?subject=' +
                encodeURIComponent(subject) +
                '&body=' +
                encodeURIComponent(bodyLines);

            // If running on live http/https server, send via AJAX directly
            if (window.location.protocol.indexOf('http') === 0) {
                fetch('https://formsubmit.co/ajax/thelokendrakushwaha@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        _subject: subject,
                        Packet_ID: packetId,
                        Name: senderName,
                        Email: senderEmail,
                        Message: senderMsg
                    })
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data && (data.success === 'true' || data.success === true)) {
                        completeTransmission(packetId, false, mailtoUrl);
                    } else {
                        completeTransmission(packetId, true, mailtoUrl);
                    }
                })
                .catch(() => {
                    completeTransmission(packetId, true, mailtoUrl);
                });
            } else {
                // Local file:/// mode -> Open pre-filled email packet directly
                completeTransmission(packetId, true, mailtoUrl);
            }
        }, 1200);
    }

    function completeTransmission(packetId, openMailClient, mailtoUrl) {
        sendBtn.innerText = '[ ✓ PACKET_TRANSMITTED ]';

        if (openMailClient) {
            window.location.href = mailtoUrl;
            showTxStatus('[ STATUS: 200_OK // ' + packetId + ' READY -> Opening Mail Dispatch for thelokendrakushwaha@gmail.com ]', 'tx-success');
        } else {
            showTxStatus('[ STATUS: 200_OK // ' + packetId + ' DELIVERED TO thelokendrakushwaha@gmail.com ]', 'tx-success');
        }

        // Also log into Hacker Terminal if available
        if (typeof printTerm === 'function') {
            printTerm('[NET_LOG] Outbound Packet ' + packetId + ' transmitted to thelokendrakushwaha@gmail.com', 'term-res');
        }

        nameInput.value = '';
        emailInput.value = '';
        msgInput.value = '';

        setTimeout(() => {
            sendBtn.innerText = originalBtnText;
            sendBtn.style.pointerEvents = 'auto';
            sendBtn.style.opacity = '1';
            isTransmitting = false;
        }, 3200);
    }

    sendBtn.addEventListener('click', handlePacketTransmit);
    const parentForm = sendBtn.closest('form');
    if (parentForm) {
        parentForm.addEventListener('submit', handlePacketTransmit);
    }
})();

// =========================================================
// UNIVERSAL AUTO-DETECT SILICON LAB FOR ALL RESEARCH LOGS
// =========================================================
(function initUniversalResearchLabs() {
    function makeEl(tag, className, text) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text !== undefined) el.textContent = text;
        return el;
    }

    function mountSiliconLabs() {
        if (window.location.pathname.indexOf('research') === -1 && !document.getElementById('LOG_001')) return;

        // Remove old lab boxes before mounting updated ones
        document.querySelectorAll('.memory-trap-lab').forEach(function(old) {
            old.remove();
        });

        const allHeadings = Array.from(document.querySelectorAll('.research-section h2, .research-section h3, [id^="LOG_"] h2, [id^="LOG_"] h3'));

        const logHeadings = allHeadings.filter(function(h) {
            const t = (h.textContent || '').trim().toUpperCase();
            if (!t || t.indexOf('RESEARCH LOGS') !== -1 || t.indexOf('QUICK_NAVIGATION') !== -1) return false;
            if (h.closest('a')) return false;
            // Skip chapter subheadings inside a log (only match main log titles)
            if (t.indexOf('CHAPTER ') === 0 || t.indexOf('CONCLUSION:') === 0) return false;
            const parentBox = h.parentElement;
            if (parentBox && parentBox.textContent.indexOf('QUICK_NAVIGATION') !== -1 && parentBox.textContent.length < 400) return false;
            return true;
        });

        // Further ensure only 1 Silicon Lab per Research Log card
        const seenContainers = [];

        logHeadings.forEach(function(headingEl, idx) {
            const logContainer = headingEl.closest('[id^="LOG_"], .research-card, article, .log-entry, .log-box') || headingEl.parentElement;
            if (!logContainer || seenContainers.indexOf(logContainer) !== -1) return;
            seenContainers.push(logContainer);

            const titleText = (headingEl.textContent || '').toLowerCase();
            const fullText = (logContainer.innerText || titleText).toLowerCase();

            let labConfig = {
                mode: 'scaling',
                tag: '[ // LIVE_SILICON_LAB // ALGORITHMIC_SCALING_PROFILER ]',
                spec: 'WORKLOAD: N = 25,000 Elements',
                desc: 'Test algorithmic time-complexity directly on your CPU. Compares an optimized O(N) Single-Pass Linear Pipeline against a naive O(N\u00B2) Nested Pass in real time.',
                btnText: '[ \u25B6 RUN_SCALING_BENCHMARK ]',
                labelFast: '1. OPTIMIZED_LINEAR_PASS (O(N) Complexity)',
                labelSlow: '2. NAIVE_NESTED_PASS (O(N\u00B2) Bottleneck)'
            };

            // 1. Check for PANDAS / DATAFRAME Log First (LOG_002)
            if (titleText.indexOf('pandas') !== -1 || titleText.indexOf('dataframe') !== -1 || fullText.indexOf('settingwithcopywarning') !== -1) {
                labConfig = {
                    mode: 'pandas',
                    tag: '[ // LIVE_SILICON_LAB // PANDAS_VIEW_VS_COPY_BENCHMARK ]',
                    spec: 'SERIES: 5,000,000 Float64 Rows (40.0 MB C-Array)',
                    desc: 'Test Stride Mathematics (Views vs. Copies) & Pointer Overhead on your CPU. Compares sequential Stride Slicing (series[1:N:2] Zero-Copy C-Array View) against Fancy Indexing / Mask Filtering (df[mask] full RAM allocation + scattered copy).',
                    btnText: '[ \u25B6 RUN_VIEW_VS_COPY_BENCHMARK ]',
                    labelFast: '1. STRIDE_SLICE_VIEW (series[1:N:2] // Zero Extra RAM, Contiguous C-Array)',
                    labelSlow: '2. FANCY_INDEX_COPY (df[df > 25] // New Heap Allocation + Memory Copy)'
                };
            }
            // 2. Check for MATRIX / HARDWARE MEMORY TRAP Log (LOG_001)
            else if (titleText.indexOf('matrix') !== -1 || titleText.indexOf('matrices') !== -1 || titleText.indexOf('math engine') !== -1) {
                labConfig = {
                    mode: 'memory',
                    tag: '[ // LIVE_SILICON_LAB // CPU_CACHE_LOCALITY_TEST ]',
                    spec: 'BUFFER: 2048x2048 Float64 (33.55 MB RAM)',
                    desc: 'Test the hardware memory trap directly on your CPU. Allocates a contiguous 4,194,304-element Float64 matrix in RAM and compares Row-Major traversal (8-Byte sequential stride, L1/L2 cache hits) against Column-Major traversal (16,384-Byte jump stride, cache-line misses).',
                    btnText: '[ \u25B6 RUN_CACHE_LOCALITY_BENCHMARK ]',
                    labelFast: '1. ROW-MAJOR_CONTIGUOUS (M[i * N + j] // Stride: 8B)',
                    labelSlow: '2. COLUMN-MAJOR_TRAP (M[j * N + i] // Stride: 16KB)'
                };
            }
            // 3. Check for NEURAL / TENSOR / VISION Log
            else if (titleText.indexOf('neural') !== -1 || titleText.indexOf('tensor') !== -1 || titleText.indexOf('optic') !== -1) {
                labConfig = {
                    mode: 'tensor',
                    tag: '[ // LIVE_SILICON_LAB // TENSOR_VECTORIZATION_BENCHMARK ]',
                    spec: 'TENSOR: 4,000,000 Float32 Synapses',
                    desc: 'Compare flat TypedArray Contiguous Tensor Math against standard boxed JavaScript Array object allocations across 4 million weights.',
                    btnText: '[ \u25B6 RUN_TENSOR_THROUGHPUT_TEST ]',
                    labelFast: '1. FLAT_FLOAT32_TENSOR_BUFFER (Zero-Boxing)',
                    labelSlow: '2. DYNAMIC_HEAP_ARRAY_PASS (Pointer Chasing)'
                };
            }
            // 4. Check for CRAWLER / GRAPH Log
            else if (titleText.indexOf('crawler') !== -1 || titleText.indexOf('graph') !== -1 || titleText.indexOf('node') !== -1) {
                labConfig = {
                    mode: 'graph',
                    tag: '[ // LIVE_SILICON_LAB // GRAPH_INDEXING_BENCHMARK ]',
                    spec: 'TOPOLOGY: 30,000 Visited Node Lookups',
                    desc: 'Compare O(1) Hash-Set Indexing against O(N) Linear Queue Scanning during high-velocity graph crawling.',
                    btnText: '[ \u25B6 RUN_GRAPH_LOOKUP_BENCHMARK ]',
                    labelFast: '1. HASH_SET_INDEXING (O(1) Constant Lookup)',
                    labelSlow: '2. LINEAR_ARRAY_SCAN (O(N) Queue Bottleneck)'
                };
            }

            const labBox = makeEl('div', 'memory-trap-lab');

            const header = makeEl('div', 'mem-lab-header');
            header.appendChild(makeEl('span', 'mem-lab-tag', labConfig.tag));
            header.appendChild(makeEl('span', 'mem-lab-spec', labConfig.spec));

            const descP = makeEl('p', 'mem-lab-desc', labConfig.desc);
            const runBtn = makeEl('button', 'mem-run-btn', labConfig.btnText);
            runBtn.type = 'button';

            const resultsWrap = makeEl('div', 'mem-results-wrap');

            // Fast Metric Bar
            const row1 = makeEl('div', 'mem-metric-row');
            const label1 = makeEl('div', 'mem-metric-label');
            const fastTimeEl = makeEl('strong', 'row-time-val', '-- ms');
            label1.appendChild(makeEl('span', '', labConfig.labelFast));
            label1.appendChild(fastTimeEl);
            const track1 = makeEl('div', 'mem-bar-track');
            const fastBar = makeEl('div', 'mem-bar-fill mem-bar-row-major');
            track1.appendChild(fastBar);
            row1.appendChild(label1);
            row1.appendChild(track1);

            // Slow Metric Bar
            const row2 = makeEl('div', 'mem-metric-row');
            const label2 = makeEl('div', 'mem-metric-label');
            const slowTimeEl = makeEl('strong', 'col-time-val', '-- ms');
            label2.appendChild(makeEl('span', '', labConfig.labelSlow));
            label2.appendChild(slowTimeEl);
            const track2 = makeEl('div', 'mem-bar-track');
            const slowBar = makeEl('div', 'mem-bar-fill mem-bar-col-major');
            track2.appendChild(slowBar);
            row2.appendChild(label2);
            row2.appendChild(track2);

            const verdictBox = makeEl('div', 'mem-verdict-box', 'Initializing hardware telemetry...');

            resultsWrap.appendChild(row1);
            resultsWrap.appendChild(row2);
            resultsWrap.appendChild(verdictBox);

            labBox.appendChild(header);
            labBox.appendChild(descP);
            labBox.appendChild(runBtn);
            labBox.appendChild(resultsWrap);

            headingEl.insertAdjacentElement('afterend', labBox);

            let isRunning = false;

            runBtn.addEventListener('click', function() {
                if (isRunning) return;
                isRunning = true;

                runBtn.textContent = '[ EXECUTING_LIVE_KERNEL_BENCHMARK... ]';
                runBtn.style.opacity = '0.8';
                resultsWrap.style.display = 'block';
                fastBar.style.width = '0%';
                slowBar.style.width = '0%';
                verdictBox.textContent = 'Running live hardware benchmark on your CPU...';

                setTimeout(function() {
                    let fastMs = 1;
                    let slowMs = 10;
                    let detailSuffix = '';

                    if (labConfig.mode === 'pandas') {
                        const rows = 5000000;
                        const cArray = new Float64Array(rows);
                        for (let i = 0; i < rows; i += 64) {
                            cArray[i] = 42.5;
                        }

                        // 1. Stride Slice View (Zero-Copy Window + Stride Jump)
                        const t0 = performance.now();
                        const viewWindow = cArray.subarray(1, rows);
                        let viewSum = 0;
                        for (let i = 0; i < viewWindow.length; i += 2) {
                            viewSum += viewWindow[i];
                        }
                        fastMs = Math.max(0.2, performance.now() - t0);

                        // 2. Fancy Indexing / Boolean Filter Copy (Allocates New Array + Pointer Copy)
                        const t1 = performance.now();
                        const fancyCopy = [];
                        for (let i = 0; i < rows; i += 2) {
                            fancyCopy.push(cArray[i]);
                        }
                        let copySum = 0;
                        for (let i = 0; i < fancyCopy.length; i++) {
                            copySum += fancyCopy[i];
                        }
                        slowMs = Math.max(0.4, performance.now() - t1);

                        if (viewSum === -1 || copySum === -1) console.log('');
                        detailSuffix = ' because Stride Views reuse the contiguous C-Array with zero heap duplication, while Fancy Indexing allocates a brand-new copy in RAM.';
                    } else if (labConfig.mode === 'memory') {
                        const N = 2048;
                        const total = N * N;
                        const mat = new Float64Array(total);
                        for (let i = 0; i < total; i += 64) mat[i] = 1.0001;

                        const t0 = performance.now();
                        let s1 = 0;
                        for (let i = 0; i < N; i++) {
                            const r = i * N;
                            for (let j = 0; j < N; j++) s1 += mat[r + j];
                        }
                        fastMs = Math.max(0.2, performance.now() - t0);

                        const t1 = performance.now();
                        let s2 = 0;
                        for (let i = 0; i < N; i++) {
                            for (let j = 0; j < N; j++) s2 += mat[j * N + i];
                        }
                        slowMs = Math.max(0.3, performance.now() - t1);
                        if (s1 === -1 || s2 === -1) console.log('');
                        detailSuffix = ' by eliminating L1/L2 cache-line thrashing.';
                    } else if (labConfig.mode === 'tensor') {
                        const len = 4000000;
                        const typed = new Float32Array(len);
                        const boxed = new Array(len);
                        for (let i = 0; i < len; i++) {
                            typed[i] = 0.5;
                            boxed[i] = (i % 2 === 0) ? 0.5 : 0.25;
                        }

                        const t0 = performance.now();
                        let acc1 = 0;
                        for (let i = 0; i < len; i++) acc1 += typed[i] * 1.5;
                        fastMs = Math.max(0.2, performance.now() - t0);

                        const t1 = performance.now();
                        let acc2 = 0;
                        for (let i = 0; i < len; i++) acc2 += boxed[i] * 1.5;
                        slowMs = Math.max(0.3, performance.now() - t1);
                        if (acc1 === -1 || acc2 === -1) console.log('');
                        detailSuffix = ' using contiguous Float32 memory buffers.';
                    } else if (labConfig.mode === 'graph') {
                        const count = 30000;
                        const arr = [];
                        const set = new Set();
                        for (let i = 0; i < count; i++) {
                            arr.push(i);
                            set.add(i);
                        }

                        const t0 = performance.now();
                        let hits1 = 0;
                        for (let i = 0; i < count; i++) {
                            if (set.has(i)) hits1++;
                        }
                        fastMs = Math.max(0.15, performance.now() - t0);

                        const t1 = performance.now();
                        let hits2 = 0;
                        for (let i = 0; i < count; i++) {
                            if (arr.indexOf(i) !== -1) hits2++;
                        }
                        slowMs = Math.max(0.4, performance.now() - t1);
                        if (hits1 === -1 || hits2 === -1) console.log('');
                        detailSuffix = ' via O(1) hash-bucket indexing.';
                    } else {
                        const N = 25000;
                        const t0 = performance.now();
                        let s1 = 0;
                        for (let i = 0; i < N; i++) s1 += i;
                        fastMs = Math.max(0.1, performance.now() - t0);

                        const t1 = performance.now();
                        let s2 = 0;
                        for (let i = 0; i < N; i++) {
                            for (let j = 0; j < 400; j++) s2 += (i ^ j);
                        }
                        slowMs = Math.max(0.3, performance.now() - t1);
                        if (s1 === -1 || s2 === -1) console.log('');
                        detailSuffix = ' through linear-time algorithmic reduction.';
                    }

                    const speedup = (slowMs / fastMs).toFixed(2);
                    const maxMs = Math.max(fastMs, slowMs);

                    fastTimeEl.textContent = fastMs.toFixed(2) + ' ms';
                    slowTimeEl.textContent = slowMs.toFixed(2) + ' ms';

                    fastBar.style.width = Math.max(8, Math.round((fastMs / maxMs) * 100)) + '%';
                    slowBar.style.width = Math.max(8, Math.round((slowMs / maxMs) * 100)) + '%';

                    verdictBox.textContent = '[ TELEMETRY_VERDICT // ' + (logContainer.id || 'LOG') + ' ]: Optimized architecture executed ' +
                        speedup + 'x FASTER on your CPU (' + fastMs.toFixed(2) + ' ms vs ' + slowMs.toFixed(2) + ' ms)' + detailSuffix;

                    runBtn.textContent = '[ \u21BB RE-RUN_SILICON_BENCHMARK ]';
                    runBtn.style.opacity = '1';
                    isRunning = false;
                }, 80);
            });
        });
    }

    mountSiliconLabs();
    window.addEventListener('DOMContentLoaded', mountSiliconLabs);
    setTimeout(mountSiliconLabs, 200);
})();

// =========================================================
// GLOBAL X-RAY ARCHITECTURE MODE (BUTTON + TERMINAL + 'X' KEY)
// =========================================================
(function initCyberXRayArchitecture() {
    if (window.__cyberXRayV2Initialized) return;
    window.__cyberXRayV2Initialized = true;

    var xrayActive = false;
    var rafId = null;
    var lastFrameTime = performance.now();
    var frameCount = 0;
    var currentFps = 60;
    var currentFrameMs = 16.6;
    var mouseVec = { x: 0, y: 0 };
    var hoveredSignature = 'ROOT_VIEWPORT';
    var dockToggleBtn = null;

    function makeEl(tag, className, text) {
        var el = document.createElement(tag);
        if (className) el.className = className;
        if (text !== undefined) el.textContent = text;
        return el;
    }

    // 1. Inject Clean Theme-Synced X-Ray CSS
    var styleEl = document.createElement('style');
    styleEl.id = 'cyber-xray-styles';
    styleEl.textContent = [
        'body.cyber-xray-active::before {',
        '    content: "";',
        '    position: fixed;',
        '    inset: 0;',
        '    pointer-events: none;',
        '    z-index: 9990;',
        '    background-image:',
        '        linear-gradient(to right, rgba(var(--neon-rgb, 0, 243, 255), 0.06) 1px, transparent 1px),',
        '        linear-gradient(to bottom, rgba(var(--neon-rgb, 0, 243, 255), 0.06) 1px, transparent 1px);',
        '    background-size: 32px 32px;',
        '}',
        '.xray-hud-panel {',
        '    position: fixed !important;',
        '    top: auto !important;',
        '    bottom: 20px !important;',
        '    left: 20px !important;',
        '    z-index: 10002 !important;',
        '    width: 340px !important;',
        '    padding: 12px 14px !important;',
        '    background: rgba(5, 8, 12, 0.94) !important;',
        '    border: 1px solid var(--neon-color, #00f3ff) !important;',
        '    border-left: 4px solid var(--neon-color, #00f3ff) !important;',
        '    box-shadow: 0 0 25px rgba(0, 0, 0, 0.9), 0 0 15px rgba(var(--neon-rgb, 0, 243, 255), 0.25) !important;',
        '    font-family: "Courier New", Consolas, monospace !important;',
        '    color: #e6edf3 !important;',
        '    display: none;',
        '    pointer-events: auto;',
        '    user-select: none;',
        '}',
        'body.cyber-xray-active .xray-hud-panel {',
        '    display: block !important;',
        '}',
        '.xray-hud-title {',
        '    display: flex !important;',
        '    justify-content: space-between !important;',
        '    align-items: center !important;',
        '    white-space: nowrap !important;',
        '    gap: 10px !important;',
        '    font-size: 0.68rem !important;',
        '    font-weight: 700;',
        '    color: var(--neon-color, #00f3ff);',
        '    border-bottom: 1px solid rgba(var(--neon-rgb, 0, 243, 255), 0.3);',
        '    padding-bottom: 6px;',
        '    margin-bottom: 8px;',
        '    letter-spacing: 1px;',
        '}',
        '.xray-close-btn {',
        '    background: transparent;',
        '    border: 1px solid rgba(var(--neon-rgb, 0, 243, 255), 0.5);',
        '    color: var(--neon-color, #00f3ff);',
        '    font-family: "Courier New", Consolas, monospace !important;',
        '    font-size: 0.65rem !important;',
        '    padding: 2px 8px !important;',
        '    white-space: nowrap !important;',
        '    flex-shrink: 0 !important;',
        '    cursor: pointer;',
        '}',
        '.xray-close-btn:hover {',
        '    background: var(--neon-color, #00f3ff);',
        '    color: #050505;',
        '}',
        '.xray-hud-row {',
        '    display: flex;',
        '    justify-content: space-between;',
        '    font-size: 0.72rem !important;',
        '    line-height: 1.55;',
        '    color: #c9d1d9;',
        '    font-family: "Courier New", Consolas, monospace !important;',
        '}',
        '.xray-hud-val {',
        '    color: var(--neon-color, #00f3ff);',
        '    font-weight: 700;',
        '    font-family: "Courier New", Consolas, monospace !important;',
        '}',
        '.xray-hud-target {',
        '    margin-top: 8px;',
        '    padding-top: 6px;',
        '    border-top: 1px dashed rgba(var(--neon-rgb, 0, 243, 255), 0.3);',
        '    font-size: 0.66rem !important;',
        '    color: #8b949e;',
        '    white-space: nowrap;',
        '    overflow: hidden;',
        '    text-overflow: ellipsis;',
        '    font-family: "Courier New", Consolas, monospace !important;',
        '}',
        'body.cyber-xray-active .xray-inspected-node {',
        '    outline: 1px dashed rgba(var(--neon-rgb, 0, 243, 255), 0.65) !important;',
        '    outline-offset: 2px !important;',
        '    position: relative !important;',
        '}',
        'body.cyber-xray-active .xray-inspected-node:hover {',
        '    outline: 1px solid var(--neon-color, #00f3ff) !important;',
        '    box-shadow: inset 0 0 18px rgba(var(--neon-rgb, 0, 243, 255), 0.14) !important;',
        '}',
        '.xray-node-badge {',
        '    display: none;',
        '    position: absolute;',
        '    top: auto !important;',
        '    bottom: 0 !important;',
        '    left: 0 !important;',
        '    z-index: 30;',
        '    max-width: 100% !important;',
        '    overflow: hidden !important;',
        '    text-overflow: ellipsis !important;',
        '    background: rgba(5, 8, 12, 0.95) !important;',
        '    color: var(--neon-color, #00f3ff);',
        '    border: 1px solid rgba(var(--neon-rgb, 0, 243, 255), 0.55);',
        '    padding: 2px 8px !important;',
        '    font-family: "Courier New", Consolas, monospace !important;',
        '    font-size: 0.58rem !important;',
        '    letter-spacing: 0.5px !important;',
        '    pointer-events: none;',
        '    white-space: nowrap;',
        '}',
        'body.cyber-xray-active .xray-node-badge {',
        '    display: inline-block;',
        '}',
        '.telemetry-bar > .xray-node-badge,',
        '.cyber-filter-bar > .xray-node-badge,',
        '.quick-nav > .xray-node-badge {',
        '    display: none !important;',
        '}',
        '.cyber-xray-dock-btn {',
        '    background: rgba(5, 8, 12, 0.9) !important;',
        '    color: var(--neon-color, #00f3ff) !important;',
        '    border: 1px solid rgba(var(--neon-rgb, 0, 243, 255), 0.5) !important;',
        '    font-family: "Courier New", Consolas, monospace !important;',
        '    font-size: 0.75rem !important;',
        '    padding: 8px 12px !important;',
        '    cursor: pointer !important;',
        '    transition: all 0.2s ease !important;',
        '    letter-spacing: 0.8px !important;',
        '}',
        '.cyber-xray-dock-btn:hover, .cyber-xray-dock-btn.active {',
        '    background: rgba(var(--neon-rgb, 0, 243, 255), 0.18) !important;',
        '    border-color: var(--neon-color, #00f3ff) !important;',
        '    box-shadow: 0 0 12px rgba(var(--neon-rgb, 0, 243, 255), 0.4) !important;',
        '}',
        '@media (max-width: 768px) {',
        '    .xray-hud-panel {',
        '        bottom: 64px !important;',
        '        left: 10px !important;',
        '        right: 10px !important;',
        '        width: auto !important;',
        '        padding: 9px 12px !important;',
        '    }',
        '}'
    ].join('\n');
    document.head.appendChild(styleEl);

    // 2. Build Global Telemetry HUD Panel
    var hudPanel = makeEl('div', 'xray-hud-panel');
    var titleBar = makeEl('div', 'xray-hud-title');
    titleBar.appendChild(makeEl('span', '', '[ // X-RAY_ARCHITECTURE_HUD ]'));
    var closeBtn = makeEl('button', 'xray-close-btn', 'ESC / X');
    closeBtn.type = 'button';
    titleBar.appendChild(closeBtn);
    hudPanel.appendChild(titleBar);

    function createMetricRow(label, defaultVal) {
        var row = makeEl('div', 'xray-hud-row');
        var lbl = makeEl('span', '', label);
        var val = makeEl('span', 'xray-hud-val', defaultVal);
        row.appendChild(lbl);
        row.appendChild(val);
        hudPanel.appendChild(row);
        return val;
    }

    var fpsValEl = createMetricRow('REALTIME_FPS:', '60 FPS');
    var frameMsValEl = createMetricRow('FRAME_TIME:', '16.6 ms');
    var memValEl = createMetricRow('MEMORY_FOOTPRINT:', '-- MB');
    var domValEl = createMetricRow('DOM_GRAPH_NODES:', '--');
    var canvasValEl = createMetricRow('ACTIVE_CANVASES:', '--');
    var vecValEl = createMetricRow('CURSOR_VECTOR:', '(0, 0)');

    var targetEl = makeEl('div', 'xray-hud-target', 'INSPECT: ROOT_VIEWPORT');
    hudPanel.appendChild(targetEl);

    // 3. Mount On-Screen Button (Next to SFX: ON & >_ TERMINAL) so No Keyboard is Required!
    function mountHudAndButton() {
        if (document.body && !document.body.contains(hudPanel)) {
            document.body.appendChild(hudPanel);
        }

        if (!dockToggleBtn || !document.body.contains(dockToggleBtn)) {
            var allBtns = Array.from(document.querySelectorAll('button, div, span'));
            var sfxOrTermBtn = allBtns.find(function(el) {
                var txt = (el.textContent || '').trim();
                return (txt.indexOf('SFX:') !== -1 || txt === '>_ TERMINAL') && el.tagName === 'BUTTON';
            });

            if (sfxOrTermBtn && sfxOrTermBtn.parentElement) {
                dockToggleBtn = makeEl('button', sfxOrTermBtn.className + ' cyber-xray-dock-btn', 'X-RAY: OFF');
                dockToggleBtn.type = 'button';
                dockToggleBtn.title = 'Toggle X-Ray Architecture HUD (Shortcut: X)';
                sfxOrTermBtn.parentElement.insertBefore(dockToggleBtn, sfxOrTermBtn);

                dockToggleBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleCyberXRay();
                });
            }
        }
    }

    if (document.body) mountHudAndButton();
    window.addEventListener('DOMContentLoaded', mountHudAndButton);
    setTimeout(mountHudAndButton, 400);

    // 4. Attach Corner Telemetry Badges to Cards & Canvases
    function refreshNodeBadges() {
        var selectors = [
            '.project-card',
            '[id^="LOG_"]',
            '.memory-trap-lab',
            '#contact form',
            '.main-section canvas'
        ];
        var targets = Array.from(document.querySelectorAll(selectors.join(',')));

        targets.forEach(function(el, idx) {
            if (el.tagName === 'A') return;
            var targetBox = (el.tagName === 'CANVAS' && el.parentElement) ? el.parentElement : el;
            targetBox.classList.add('xray-inspected-node');

            var badge = targetBox.querySelector(':scope > .xray-node-badge');
            if (!badge) {
                badge = makeEl('span', 'xray-node-badge');
                targetBox.appendChild(badge);
            }

            var rect = targetBox.getBoundingClientRect();
            var w = Math.round(rect.width);
            var h = Math.round(rect.height);
            var domCount = targetBox.querySelectorAll('*').length;
            var hasCanvas = targetBox.querySelector('canvas');

            var memKb = (domCount * 0.45);
            if (hasCanvas) {
                memKb += (hasCanvas.width * hasCanvas.height * 4) / 1024;
            }
            var renderEstMs = (0.08 + (domCount * 0.012) + (hasCanvas ? 0.42 : 0)).toFixed(2);
            var nodeName = targetBox.id || (hasCanvas ? 'CANVAS_KERNEL_0' + (idx + 1) : 'ARCH_BLOCK_0' + (idx + 1));

            badge.textContent = '[ ' + nodeName.toUpperCase() + ' // ' + w + 'x' + h + 'px // DOM:' + domCount + ' // MEM:' + memKb.toFixed(1) + 'KB // ' + renderEstMs + 'ms ]';
        });
    }

    // 5. Live 60FPS Telemetry Loop
    function updateTelemetryLoop(now) {
        if (!xrayActive) return;

        frameCount++;
        var delta = now - lastFrameTime;

        if (delta >= 250) {
            currentFps = Math.min(144, Math.round((frameCount * 1000) / delta));
            currentFrameMs = (delta / frameCount).toFixed(2);
            frameCount = 0;
            lastFrameTime = now;

            fpsValEl.textContent = currentFps + ' FPS';
            frameMsValEl.textContent = currentFrameMs + ' ms';

            var allDom = document.getElementsByTagName('*').length;
            var canvases = document.querySelectorAll('canvas');
            domValEl.textContent = allDom + ' NODES';
            canvasValEl.textContent = canvases.length + ' KERNELS';

            var memMb = 0;
            if (window.performance && performance.memory && performance.memory.usedJSHeapSize) {
                memMb = (performance.memory.usedJSHeapSize / 1048576);
            } else {
                var pixelBytes = 0;
                canvases.forEach(function(c) {
                    pixelBytes += (c.width || 300) * (c.height || 200) * 4;
                });
                memMb = 14.2 + (allDom * 0.004) + (pixelBytes / 1048576);
            }
            memValEl.textContent = memMb.toFixed(2) + ' MB';

            refreshNodeBadges();
        }

        vecValEl.textContent = '(' + mouseVec.x + ', ' + mouseVec.y + ')';
        targetEl.textContent = 'INSPECT: ' + hoveredSignature;

        rafId = requestAnimationFrame(updateTelemetryLoop);
    }

    // 6. Master Toggle Function (Syncs HUD, Body Class & On-Screen Button)
    function toggleCyberXRay(forceState) {
        mountHudAndButton();
        xrayActive = (typeof forceState === 'boolean') ? forceState : !xrayActive;

        if (xrayActive) {
            document.body.classList.add('cyber-xray-active');
            refreshNodeBadges();
            lastFrameTime = performance.now();
            frameCount = 0;
            rafId = requestAnimationFrame(updateTelemetryLoop);
        } else {
            document.body.classList.remove('cyber-xray-active');
            if (rafId) cancelAnimationFrame(rafId);
        }

        if (dockToggleBtn) {
            dockToggleBtn.textContent = xrayActive ? 'X-RAY: ON' : 'X-RAY: OFF';
            dockToggleBtn.classList.toggle('active', xrayActive);
        }

        return xrayActive;
    }

    window.toggleCyberXRay = toggleCyberXRay;

    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleCyberXRay(false);
    });

    // 7. Track Mouse Coordinates & Inspected DOM Element
    document.addEventListener('mousemove', function(e) {
        mouseVec.x = e.clientX;
        mouseVec.y = e.clientY;
        if (!xrayActive) return;

        var el = e.target;
        if (el && el !== document.body && el !== document.documentElement) {
            var tag = el.tagName.toLowerCase();
            var idStr = el.id ? '#' + el.id : '';
            var clsStr = (el.className && typeof el.className === 'string')
                ? '.' + el.className.trim().split(/\s+/)[0]
                : '';
            hoveredSignature = (tag + idStr + clsStr).toUpperCase();
        }
    });

    // 8. Helper to Close/Minimize Terminal Overlay When X-Ray Turns ON from Terminal
    function closeTerminalModalIfOpen() {
        var termInput = document.querySelector('#term-input, .term-input, .terminal-input');
        if (!termInput) return;

        // Find terminal modal wrapper and close button
        var modal = termInput.closest('.cyber-terminal-modal, .terminal-overlay, .terminal-window, #cyber-terminal, [class*="terminal"]');
        if (modal) {
            var closeTermBtn = modal.querySelector('button, .term-close, [class*="close"]');
            if (closeTermBtn && closeTermBtn !== dockToggleBtn) {
                closeTermBtn.click();
                return;
            }
            var parentOverlay = modal.parentElement;
            if (parentOverlay && window.getComputedStyle(parentOverlay).position === 'fixed') {
                parentOverlay.style.display = 'none';
            } else if (window.getComputedStyle(modal).position === 'fixed') {
                modal.style.display = 'none';
            }
        }
        termInput.blur();
    }

    // 9. Unified Keyboard & Terminal Command Handler
    document.addEventListener('keydown', function(e) {
        var activeEl = document.activeElement;
        var activeTag = activeEl ? activeEl.tagName.toUpperCase() : '';
        var isTyping = (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || (activeEl && activeEl.isContentEditable));

        // CASE A: User is typing inside the Hacker Terminal Input & presses Enter
        if (isTyping && activeTag === 'INPUT' && e.key === 'Enter') {
            var rawCmd = (activeEl.value || '').trim().toLowerCase();
            if (rawCmd === 'xray' || rawCmd === 'x' || rawCmd === 'xray on' || rawCmd === 'xray off') {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                var desiredState = (rawCmd === 'xray on') ? true : ((rawCmd === 'xray off') ? false : !xrayActive);
                var newState = toggleCyberXRay(desiredState);

                var termOut = document.querySelector('#term-output, .term-output, .term-body, .terminal-body');
                if (termOut) {
                    var cmdLine = makeEl('div', 'term-line', 'lokendra@ai-core:~$ ' + rawCmd);
                    var resLine = makeEl('div', 'term-res', '[X-RAY_ARCHITECTURE_HUD]: ' + (newState ? 'ENABLED -> Launching Live CAD Wireframe...' : 'DISABLED'));
                    resLine.style.color = 'var(--neon-color, #00f3ff)';
                    termOut.appendChild(cmdLine);
                    termOut.appendChild(resLine);
                    termOut.scrollTop = termOut.scrollHeight;
                }

                activeEl.value = '';

                // If X-Ray was turned ON from inside Terminal, auto-close Terminal so user sees the X-Ray HUD!
                if (newState) {
                    setTimeout(closeTerminalModalIfOpen, 350);
                }
                return;
            }
        }

        // CASE B: User presses 'X' anywhere on the page (when NOT typing in an input)
        if (!isTyping && (e.key === 'x' || e.key === 'X') && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            toggleCyberXRay();
        }
    }, true);
})();

// =========================================================
// UNIFIED BOTTOM CONTROL DOCK (SINGLE X-RAY + SFX + TERMINAL)
// =========================================================
(function mountUnifiedCyberDock() {
    var oldBtn = document.getElementById('cyber-xray-floating-btn');
    if (oldBtn) oldBtn.remove();
    var oldStyle = document.getElementById('cyber-xray-btn-style');
    if (oldStyle) oldStyle.remove();

    // Remove any duplicate dock button created by earlier script
    document.querySelectorAll('.cyber-xray-dock-btn').forEach(function(el) {
        el.remove();
    });

    var dockStyle = document.createElement('style');
    dockStyle.id = 'cyber-xray-btn-style';
    dockStyle.textContent = [
        '/* Permanently hide any duplicate legacy X-Ray button */',
        '.cyber-xray-dock-btn {',
        '    display: none !important;',
        '}',
        '/* 1. Unified Bottom-Right Dock for X-RAY, SFX & TERMINAL */',
        '#cyber-control-dock {',
        '    position: fixed !important;',
        '    bottom: 20px !important;',
        '    right: 20px !important;',
        '    left: auto !important;',
        '    top: auto !important;',
        '    z-index: 9999 !important;',
        '    display: inline-flex !important;',
        '    flex-direction: row !important;',
        '    align-items: stretch !important;',
        '    gap: 0px !important;',
        '    background: rgba(5, 8, 12, 0.94) !important;',
        '    box-shadow: 0 0 20px rgba(0, 0, 0, 0.9) !important;',
        '}',
        '#cyber-control-dock > * {',
        '    position: static !important;',
        '    bottom: auto !important;',
        '    right: auto !important;',
        '    left: auto !important;',
        '    top: auto !important;',
        '    transform: none !important;',
        '    margin: 0 !important;',
        '    height: 36px !important;',
        '    padding: 0 14px !important;',
        '    display: inline-flex !important;',
        '    align-items: center !important;',
        '    justify-content: center !important;',
        '    font-family: "Courier New", Consolas, monospace !important;',
        '    font-size: 0.75rem !important;',
        '    font-weight: 700 !important;',
        '    letter-spacing: 0.8px !important;',
        '    white-space: nowrap !important;',
        '    box-sizing: border-box !important;',
        '    border-radius: 0 !important;',
        '    border: 1px solid rgba(var(--neon-rgb, 0, 243, 255), 0.65) !important;',
        '    background: rgba(5, 8, 12, 0.92) !important;',
        '    color: var(--neon-color, #00f3ff) !important;',
        '    cursor: pointer !important;',
        '    transition: all 0.2s ease !important;',
        '}',
        '#cyber-control-dock > *:not(:first-child) {',
        '    margin-left: -1px !important;',
        '}',
        '#cyber-control-dock > *:hover,',
        'body.cyber-xray-active #cyber-xray-floating-btn {',
        '    background: var(--neon-color, #00f3ff) !important;',
        '    color: #050505 !important;',
        '    border-color: var(--neon-color, #00f3ff) !important;',
        '    box-shadow: 0 0 16px var(--neon-color, #00f3ff) !important;',
        '    z-index: 2 !important;',
        '}',
        '#contact form > .xray-node-badge {',
        '    display: none !important;',
        '}',
        '/* 2. Clean 1-Column Mobile HUD & Symmetrical Mobile Bar */',
        '@media (max-width: 768px) {',
        '    #cyber-control-dock {',
        '        bottom: 10px !important;',
        '        left: 8px !important;',
        '        right: 8px !important;',
        '        display: flex !important;',
        '    }',
        '    #cyber-control-dock > * {',
        '        flex: 1 1 0 !important;',
        '        height: 32px !important;',
        '        padding: 0 4px !important;',
        '        font-size: 0.62rem !important;',
        '        letter-spacing: 0.3px !important;',
        '    }',
        '    .xray-hud-panel {',
        '        bottom: 50px !important;',
        '        left: 8px !important;',
        '        right: 8px !important;',
        '        width: auto !important;',
        '        padding: 9px 12px !important;',
        '        display: none !important;',
        '    }',
        '    body.cyber-xray-active .xray-hud-panel {',
        '        display: block !important;',
        '    }',
        '    .xray-hud-title {',
        '        font-size: 0.64rem !important;',
        '        margin-bottom: 5px !important;',
        '        padding-bottom: 4px !important;',
        '    }',
        '    .xray-hud-row {',
        '        display: flex !important;',
        '        justify-content: space-between !important;',
        '        white-space: nowrap !important;',
        '        font-size: 0.64rem !important;',
        '        line-height: 1.4 !important;',
        '    }',
        '    .xray-hud-target {',
        '        font-size: 0.58rem !important;',
        '        margin-top: 5px !important;',
        '        padding-top: 4px !important;',
        '    }',
        '}'
    ].join('\n');
    document.head.appendChild(dockStyle);

    var xrayBtn = document.createElement('button');
    xrayBtn.id = 'cyber-xray-floating-btn';
    xrayBtn.type = 'button';
    xrayBtn.textContent = '⌖ X-RAY: OFF';

    function syncButtonLabel() {
        // Clean up any duplicate button if recreated by toggleCyberXRay
        document.querySelectorAll('.cyber-xray-dock-btn').forEach(function(el) {
            el.remove();
        });
        var isOn = document.body.classList.contains('cyber-xray-active');
        xrayBtn.textContent = isOn ? '⌖ X-RAY: ON' : '⌖ X-RAY: OFF';
    }

    xrayBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window.toggleCyberXRay === 'function') {
            window.toggleCyberXRay();
        }
        syncButtonLabel();
    });

    function findFloatingButtonByKeyword(keyword) {
        var all = Array.from(document.querySelectorAll('button, div, span, a'));
        var match = all.find(function(el) {
            if (el === xrayBtn || el.id === 'cyber-control-dock' || el.classList.contains('cyber-xray-dock-btn')) return false;
            var txt = (el.textContent || '').trim().toUpperCase();
            var rect = el.getBoundingClientRect();
            return (
                txt.indexOf(keyword) !== -1 &&
                txt.indexOf('LOKENDRA_OS') === -1 &&
                el.children.length <= 2 &&
                rect.width > 40 &&
                rect.width < 220 &&
                rect.height > 18 &&
                rect.height < 70
            );
        });
        if (!match) return null;
        return match.closest('button') || match;
    }

    function assembleDock() {
        if (!document.body) return;

        var dock = document.getElementById('cyber-control-dock');
        if (!dock) {
            dock = document.createElement('div');
            dock.id = 'cyber-control-dock';
            document.body.appendChild(dock);
        }

        var sfxEl = findFloatingButtonByKeyword('SFX:');
        var termEl = findFloatingButtonByKeyword('TERMINAL');

        if (!dock.contains(xrayBtn)) {
            dock.insertBefore(xrayBtn, dock.firstChild);
        }
        if (sfxEl && !dock.contains(sfxEl)) {
            dock.appendChild(sfxEl);
        }
        if (termEl && !dock.contains(termEl)) {
            dock.appendChild(termEl);
        }

        syncButtonLabel();
    }

    if (document.body) assembleDock();
    window.addEventListener('DOMContentLoaded', assembleDock);
    setTimeout(assembleDock, 150);
    setTimeout(assembleDock, 500);

    var observer = new MutationObserver(syncButtonLabel);
    if (document.body) {
        observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }
})();

// =========================================================
// DYNAMIC CYBERPUNK 404 PAGE ENGINE (THEME-SYNCED)
// =========================================================
(function initCyber404Engine() {
    function render404IfNeeded() {
        var errSection = document.getElementById('error-404');
        var is404Url = window.location.pathname.indexOf('404.html') !== -1;

        if (!errSection && !is404Url) return;

        document.title = '404 // SECTOR_NOT_FOUND | Lokendra Kushwaha';

        // Hide extra sections (like About / Contact copied from index.html)
        var allSections = Array.from(document.querySelectorAll('section'));
        allSections.forEach(function(sec, idx) {
            if (idx === 0) {
                errSection = sec;
            } else {
                sec.style.display = 'none';
            }
        });

        if (!errSection || errSection.dataset.cyber404Ready === 'true') return;
        errSection.dataset.cyber404Ready = 'true';
        errSection.innerHTML = '';

        errSection.style.minHeight = '85vh';
        errSection.style.display = 'flex';
        errSection.style.alignItems = 'center';
        errSection.style.justifyContent = 'center';
        errSection.style.padding = '40px 20px';

        function make(tag, styles, text) {
            var el = document.createElement(tag);
            if (styles) el.style.cssText = styles;
            if (text !== undefined) el.textContent = text;
            return el;
        }

        var card = make(
            'div',
            'max-width:560px;width:100%;background:rgba(5,8,12,0.94);border:1px solid var(--neon-color,#00f3ff);border-left:4px solid var(--neon-color,#00f3ff);padding:36px 30px;box-shadow:0 0 30px rgba(0,0,0,0.9),0 0 15px rgba(var(--neon-rgb,0,243,255),0.2);font-family:"Courier New",Consolas,monospace;text-align:left;'
        );

        var badge = make(
            'div',
            'font-size:0.75rem;color:var(--neon-color,#00f3ff);letter-spacing:1.5px;margin-bottom:12px;',
            '[ // SYSTEM_ALERT: TELEMETRY_LINK_SEVERED ]'
        );

        var heading = make(
            'h1',
            'font-size:3.4rem;margin:0 0 10px 0;color:#ffffff;letter-spacing:2px;text-shadow:0 0 14px var(--neon-color,#00f3ff);',
            '404_ERR'
        );

        var subTitle = make(
            'div',
            'font-size:0.95rem;color:var(--neon-color,#00f3ff);font-weight:700;margin-bottom:18px;letter-spacing:1px;',
            '\u003e\u003e TARGET_COORDINATES_NOT_FOUND'
        );

        var desc = make(
            'p',
            'font-size:0.88rem;line-height:1.65;color:#8b949e;margin-bottom:26px;',
            'The neural sector or architecture log you requested does not exist in this memory space. It may have been relocated or purged from the main matrix.'
        );

        var diagBox = make(
            'div',
            'padding:12px 14px;background:rgba(var(--neon-rgb,0,243,255),0.06);border:1px dashed rgba(var(--neon-rgb,0,243,255),0.4);font-size:0.76rem;color:#c9d1d9;margin-bottom:28px;line-height:1.6;'
        );

        var line1 = make('div', '', 'STATUS_CODE : 0x00000404 (SECTOR_VOID)');
        var line2 = make('div', '', 'RECOVERY_OP : REROUTE_TO_MAIN_CORE');
        var line3 = make('div', '', 'REQUEST_PATH: ' + window.location.pathname);
        diagBox.appendChild(line1);
        diagBox.appendChild(line2);
        diagBox.appendChild(line3);

        var btnRow = make('div', 'display:flex;gap:14px;flex-wrap:wrap;');

        var homeBtn = make(
            'a',
            'text-decoration:none;background:var(--neon-color,#00f3ff);color:#05080c;font-weight:700;font-size:0.8rem;padding:12px 20px;letter-spacing:1px;border:1px solid var(--neon-color,#00f3ff);',
            '[ RETURN_TO_HOME_CORE ]'
        );
        homeBtn.href = 'index.html';

        var projBtn = make(
            'a',
            'text-decoration:none;background:transparent;color:var(--neon-color,#00f3ff);font-weight:700;font-size:0.8rem;padding:12px 20px;letter-spacing:1px;border:1px solid var(--neon-color,#00f3ff);',
            '[ EXPLORE_PROJECTS ]'
        );
        projBtn.href = 'projects.html';

        btnRow.appendChild(homeBtn);
        btnRow.appendChild(projBtn);

        card.appendChild(badge);
        card.appendChild(heading);
        card.appendChild(subTitle);
        card.appendChild(desc);
        card.appendChild(diagBox);
        card.appendChild(btnRow);

        errSection.appendChild(card);
    }

    if (document.body) render404IfNeeded();
    window.addEventListener('DOMContentLoaded', render404IfNeeded);
    setTimeout(render404IfNeeded, 100);
})();

// =========================================================
// GOOGLE #1 RANKING SEO & KNOWLEDGE GRAPH ENGINE
// =========================================================
(function initCyberSeoEngine() {
    if (window.__cyberSeoInitialized) return;
    window.__cyberSeoInitialized = true;

    var head = document.head || document.getElementsByTagName('head')[0];
    if (!head) return;

    var path = window.location.pathname || '';
    var pageUrl = '[https://lokendra-kushwaha.web.app/](https://lokendra-kushwaha.web.app/)';
    var pageTitle = 'Lokendra Kushwaha | AI Systems Engineer & Custom Math Architectures';
    var pageDesc = 'Official portfolio of Lokendra Kushwaha — AI and Data Science Systems Engineer building zero-dependency math engines, neural architectures, graph crawlers, and hardware memory benchmarks from scratch.';

    if (path.indexOf('projects.html') !== -1) {
        pageUrl = '[https://lokendra-kushwaha.web.app/projects.html](https://lokendra-kushwaha.web.app/projects.html)';
        pageTitle = 'Custom AI & Math Architectures | Lokendra Kushwaha';
        pageDesc = 'Interactive AI systems, 3D Tensor Convolution Cores, Movie Matrix Linear Algebra engines, and Universe Graph Crawlers built from scratch by Lokendra Kushwaha.';
    } else if (path.indexOf('research.html') !== -1) {
        pageUrl = '[https://lokendra-kushwaha.web.app/research.html](https://lokendra-kushwaha.web.app/research.html)';
        pageTitle = 'Engineering Research Logs & Silicon Benchmarks | Lokendra Kushwaha';
        pageDesc = 'Deep-dive systems engineering research logs by Lokendra Kushwaha covering CPU cache locality, NumPy C-strides, and Pandas memory architecture.';
    } else if (path.indexOf('404.html') === -1) {
        document.title = pageTitle;
    }

    function setMetaTag(attrName, attrValue, contentValue) {
        var selector = 'meta[' + attrName + '="' + attrValue + '"]';
        var meta = head.querySelector(selector);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(attrName, attrValue);
            head.appendChild(meta);
        }
        meta.setAttribute('content', contentValue);
    }

    // 1. Standard Google Search Meta Tags
    setMetaTag('name', 'author', 'Lokendra Kushwaha');
    setMetaTag('name', 'description', pageDesc);
    setMetaTag('name', 'keywords', 'Lokendra Kushwaha, Lokendra, AI Systems Engineer, Data Science Portfolio, Custom Math Engine, Neural Optic Core, The Universe Crawler, Matrix Physics');
    setMetaTag('name', 'robots', 'index, follow');

    // 2. Social & OpenGraph Preview Tags (LinkedIn / WhatsApp / X)
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'Lokendra Kushwaha');
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', pageDesc);
    setMetaTag('property', 'og:url', pageUrl);

    // 3. Canonical URL Link
    var canonical = head.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        head.appendChild(canonical);
    }
    canonical.setAttribute('href', pageUrl);

    // 4. Google Knowledge Graph JSON-LD (Tells Google Who "Lokendra Kushwaha" Is)
    var schemaScript = document.getElementById('lokendra-jsonld-schema');
    if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'lokendra-jsonld-schema';
        schemaScript.type = 'application/ld+json';
        schemaScript.textContent = JSON.stringify({
            '@context': '[https://schema.org](https://schema.org)',
            '@type': 'Person',
            'name': 'Lokendra Kushwaha',
            'url': '[https://lokendra-kushwaha.web.app/](https://lokendra-kushwaha.web.app/)',
            'email': 'mailto:thelokendrakushwaha@gmail.com',
            'jobTitle': 'AI & Data Science Systems Engineer',
            'description': pageDesc,
            'knowsAbout': [
                'Artificial Intelligence',
                'Data Science',
                'Linear Algebra',
                'Matrix Physics',
                'Memory Architecture',
                'Python',
                'Computer Vision'
            ],
            'sameAs': [
                '[https://github.com/lokendra-kushwaha](https://github.com/lokendra-kushwaha)',
                '[https://www.linkedin.com/in/lokendra-kushwaha](https://www.linkedin.com/in/lokendra-kushwaha)'
            ]
        });
        head.appendChild(schemaScript);
    }
})();