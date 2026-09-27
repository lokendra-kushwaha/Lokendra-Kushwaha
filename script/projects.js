// ==========================================
// Projects Data
// ==========================================
const projectsData = [
    {
        id: "PRJ_01",
        title: "The Movie Matrix",
        image: "assets/themoviematrix.png",
        tags: ["Custom Vectorization", "Linear Algebra", "Pure NumPy Logic"],
        description: "Engineered a content-based recommendation system entirely from scratch without relying on Scikit-learn. Developed custom NLP pipelines for text-vectorization and data cleaning using Pandas, and implemented the core matching algorithm through raw manual cosine similarity calculations.",
        liveLink: "https://the-movie-matrix.streamlit.app",
        githubLink: "https://github.com/lokendra-kushwaha/The-Movie-Matrix"
    },
    {
        id: "PRJ_02",
        title: "Neural Optic Core",
        image: "assets/vision.png",
        tags: ["Custom Tensor Object", "Scratch Convolutions", "Core CV Logic"],
        description: "Engineered a custom, dependency-free N-Dimensional tensor engine from scratch—featuring native 3D convolutions, a custom tensor object for advanced logging, and a high-performance dual-engine architecture—powering a production-grade web application for real-time visualization of mathematical feature extraction.",
        liveLink: "#", 
        githubLink: "https://github.com/lokendra-kushwaha/Neural-Optic-Core"
    },
    {
        id: "PRJ_03",
        title: "The Universe Crawler",
        image: "assets/y.png",
        tags: ["Data Structures", "Pure Logic", "Algorithmic Scaling"],
        description: "Built a fully custom web crawler from scratch. Engineered the core logic using advanced data structures to handle and process massive data nodes efficiently without relying on bloated external libraries.",
        liveLink: "#",
        githubLink: "https://github.com/lokendra-kushwaha/The-Universe-Crawler"
    },
    {
        id: "PRJ_04",
        title: "Linear Algebra Math Engine",
        image: "images/project2.jpg",
        tags: ["Matrix Physics", "Memory Architecture", "Pure Python"],
        description: "Developed a 45,000-line custom math engine completely independent of NumPy. Handled memory layouts, cache locality, and vector transformations directly at the raw logic level.",
        liveLink: "#",
        githubLink: "https://github.com/lokendra-kushwaha/Linear-Algebra-Engine"
    },
    {
        id: "PRJ_05",
        title: "Calculus Math Engine",
        image: "images/project5.jpg",
        tags: ["Matrix Physics", "Memory Architecture", "Pure Python"],
        description: "Developed a 45,000-line custom math engine completely independent of NumPy. Handled memory layouts, cache locality, and vector transformations directly at the raw logic level.",
        liveLink: "#",
        githubLink: "https://github.com/lokendra-kushwaha/The-Calculus-Engine"
    }
];

// Rendering Logic
const projectsContainer = document.getElementById('projects-container');

if (projectsContainer) {
    projectsData.forEach(project => {
        let tagsHTML = project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');

        const card = document.createElement('div');
        card.classList.add('project-card');

        card.innerHTML = `
            <div class="project-image-box">
                <img src="${project.image}" alt="${project.title}" class="project-img">
            </div>
            <div class="project-content">
                <div class="tags-container">
                    ${tagsHTML}
                </div>
                <h2 class="project-title">${project.title}</h2>
                <p class="project-desc">${project.description}</p>
                
                <div class="project-links">
                    <a href="${project.liveLink}" target="_blank" class="btn-live">
                        <i class="fas fa-external-link-alt"></i> Live Engine
                    </a>
                    <a href="${project.githubLink}" target="_blank" class="btn-github">
                        <i class="fab fa-github"></i> Source Code
                    </a>
                </div>
            </div>
        `;
        projectsContainer.appendChild(card);
    });
}

// 1. Clean 3D Tilt for Project Cards
const projectCards = document.querySelectorAll('.project-card, .card, .project-box, .project-item');

projectCards.forEach((card) => {
    card.classList.add('holo-active');

    card.addEventListener('mousemove', (e) => {
        const bounds = card.getBoundingClientRect();
        const posX = e.clientX - bounds.left;
        const posY = e.clientY - bounds.top;

        const rotateY = ((posX / bounds.width) - 0.5) * 14;
        const rotateX = (0.5 - (posY / bounds.height)) * 14;

        card.style.transition = 'transform 0.05s linear';
        card.style.transform = 'perspective(900px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.4s ease';
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// 2. Clean Cyber Header & Telemetry Bar
const pageTitle = document.querySelector('.projects-section h1') || document.querySelector('h1');

if (pageTitle) {
    document.querySelectorAll('.cyber-top-tag, .telemetry-bar').forEach(el => el.remove());

    const headerBox = pageTitle.parentElement;
    headerBox.classList.add('cyber-header-wrap');
    pageTitle.classList.add('cyber-main-title');

    // Top Lab Classification Tag
    const topTag = document.createElement('div');
    topTag.className = 'cyber-top-tag';
    topTag.textContent = '[ // AI_ARCHITECTURE_LAB // ]';
    headerBox.insertBefore(topTag, pageTitle);

    // Live Engineering Telemetry HUD Bar
    const telemetryBar = document.createElement('div');
    telemetryBar.className = 'telemetry-bar';

    const pill1 = document.createElement('div');
    pill1.className = 'telemetry-pill';
    const dot = document.createElement('span');
    dot.className = 'status-dot';
    const pill1Text = document.createElement('span');
    pill1Text.textContent = 'CORE_STATUS: ONLINE';
    pill1.appendChild(dot);
    pill1.appendChild(pill1Text);

    const pill2 = document.createElement('div');
    pill2.className = 'telemetry-pill';
    pill2.textContent = 'STACK: ZERO_DEPENDENCY_MATH';

    const pill3 = document.createElement('div');
    pill3.className = 'telemetry-pill';
    pill3.textContent = 'COMPUTE_LATENCY: 0.42ms';

    telemetryBar.appendChild(pill1);
    telemetryBar.appendChild(pill2);
    telemetryBar.appendChild(pill3);

    const subtitle = pageTitle.nextElementSibling;
    if (subtitle) {
        subtitle.insertAdjacentElement('afterend', telemetryBar);
    } else {
        headerBox.appendChild(telemetryBar);
    }

    setInterval(() => {
        const ms = (0.35 + Math.random() * 0.18).toFixed(2);
        pill3.textContent = 'COMPUTE_LATENCY: ' + ms + 'ms';
    }, 1800);
}

// =========================================================
// 3. AUTO LIVE BLUEPRINT ENGINE FOR UNDEPLOYED PROJECTS
// =========================================================
(function initProjectBlueprints() {
    const cards = document.querySelectorAll('.project-card, .card, .holo-active');

    cards.forEach((card, cardIndex) => {
        const img = card.querySelector('img');
        if (!img) return;

        function mountBlueprintIfBroken() {
            if (img.complete && img.naturalWidth > 0) {
                img.style.display = '';
                const existingBp = card.querySelector('.blueprint-canvas-wrap');
                if (existingBp) existingBp.remove();
                return;
            }

            if (card.querySelector('.blueprint-canvas-wrap')) return;

            img.style.display = 'none';

            const titleEl = card.querySelector('.project-title, h2, h3');
            const titleText = (titleEl ? titleEl.textContent : img.alt || '').toLowerCase();

            let mode = 'core';
            let hudLabel = '[ // NEURAL_CORE_ARCHIVE ]';
            if (titleText.indexOf('optic') !== -1 || titleText.indexOf('neural') !== -1) {
                mode = 'optic';
                hudLabel = '[ // 3D_TENSOR_CONV_CORE ]';
            } else if (titleText.indexOf('universe') !== -1 || titleText.indexOf('crawler') !== -1) {
                mode = 'crawler';
                hudLabel = '[ // GRAPH_CRAWLER_TOPOLOGY ]';
            } else if (titleText.indexOf('linear') !== -1 || titleText.indexOf('matrix') !== -1) {
                mode = 'matrix';
                hudLabel = '[ // MATH_ENGINE_BLUEPRINT ]';
            }

            const wrap = document.createElement('div');
            wrap.className = 'blueprint-canvas-wrap';

            const hudTag = document.createElement('span');
            hudTag.className = 'blueprint-hud-tag';
            hudTag.textContent = hudLabel;

            const statusTag = document.createElement('span');
            statusTag.className = 'blueprint-status-tag';
            statusTag.textContent = 'LIVE_SIMULATION // 0' + (cardIndex + 1);

            const canvas = document.createElement('canvas');
            canvas.className = 'blueprint-canvas';

            wrap.appendChild(hudTag);
            wrap.appendChild(statusTag);
            wrap.appendChild(canvas);

            img.insertAdjacentElement('beforebegin', wrap);

            startBlueprintAnimation(canvas, wrap, card, mode);
        }

        img.addEventListener('load', () => {
            if (img.naturalWidth > 0) {
                img.style.display = '';
                const existingBp = card.querySelector('.blueprint-canvas-wrap');
                if (existingBp) existingBp.remove();
            }
        });

        img.addEventListener('error', mountBlueprintIfBroken);

        // Initial check
        mountBlueprintIfBroken();
    });

    function startBlueprintAnimation(canvas, wrap, card, mode) {
        const ctx = canvas.getContext('2d');
        let width = 0;
        let height = 0;
        let mouseX = 0.5;
        let mouseY = 0.5;
        let isHovered = false;
        let tick = 0;

        function resize() {
            const rect = wrap.getBoundingClientRect();
            width = Math.max(260, rect.width || 340);
            height = Math.max(180, rect.height || 215);
            canvas.width = width;
            canvas.height = height;
        }

        resize();
        window.addEventListener('resize', resize);

        card.addEventListener('mousemove', (e) => {
            const r = wrap.getBoundingClientRect();
            mouseX = (e.clientX - r.left) / Math.max(1, r.width);
            mouseY = (e.clientY - r.top) / Math.max(1, r.height);
            isHovered = true;
        });

        card.addEventListener('mouseleave', () => {
            isHovered = false;
        });

        // Pre-generate graph nodes for Universe Crawler
        const nodes = [];
        for (let i = 0; i < 16; i++) {
            nodes.push({
                x: 0.15 + Math.random() * 0.7,
                y: 0.2 + Math.random() * 0.6,
                vx: (Math.random() - 0.5) * 0.0025,
                vy: (Math.random() - 0.5) * 0.0025,
                r: 2.2 + Math.random() * 2
            });
        }

        function drawSubtleGrid() {
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.07)';
            ctx.lineWidth = 1;
            const step = 24;
            for (let x = 0; x < width; x += step) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += step) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }
        }

        function drawOpticTensor() {
            const cx = width / 2 + (isHovered ? (mouseX - 0.5) * 25 : 0);
            const cy = height / 2 + (isHovered ? (mouseY - 0.5) * 15 : 0);

            // Draw 3 Isometric 3D Convolutional Feature Map Layers
            const layers = [-38, 0, 38];
            layers.forEach((offset, idx) => {
                const lx = cx + offset * 1.1;
                const ly = cy + Math.sin(tick * 0.03 + idx) * 4;
                const w = 44;
                const h = 64;

                ctx.strokeStyle = idx === 1 ? '#00f3ff' : 'rgba(0, 243, 255, 0.55)';
                ctx.fillStyle = 'rgba(0, 243, 255, 0.06)';
                ctx.lineWidth = idx === 1 ? 1.6 : 1;

                ctx.beginPath();
                ctx.moveTo(lx - w, ly - h * 0.6);
                ctx.lineTo(lx + w, ly - h);
                ctx.lineTo(lx + w, ly + h * 0.6);
                ctx.lineTo(lx - w, ly + h);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Inner Kernel Grid on Center Tensor Layer
                if (idx === 1) {
                    ctx.strokeStyle = 'rgba(0, 243, 255, 0.35)';
                    ctx.beginPath();
                    ctx.moveTo(lx, ly - h * 0.8);
                    ctx.lineTo(lx, ly + h * 0.8);
                    ctx.moveTo(lx - w, ly + h * 0.2);
                    ctx.lineTo(lx + w, ly - h * 0.2);
                    ctx.stroke();
                }
            });

            // Connecting Synapse Rays Between Tensor Layers
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.3)';
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(cx - 42, cy);
            ctx.lineTo(cx + 42, cy);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        function drawCrawlerGraph() {
            nodes.forEach((n) => {
                n.x += n.vx * (isHovered ? 1.8 : 1);
                n.y += n.vy * (isHovered ? 1.8 : 1);
                if (n.x < 0.12 || n.x > 0.88) n.vx *= -1;
                if (n.y < 0.18 || n.y > 0.82) n.vy *= -1;
            });

            // Draw Edges
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = (nodes[i].x - nodes[j].x) * width;
                    const dy = (nodes[i].y - nodes[j].y) * height;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 95) {
                        const alpha = (1 - dist / 95) * 0.55;
                        ctx.strokeStyle = 'rgba(0, 243, 255, ' + alpha.toFixed(2) + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x * width, nodes[i].y * height);
                        ctx.lineTo(nodes[j].x * width, nodes[j].y * height);
                        ctx.stroke();
                    }
                }
            }

            // Draw Nodes
            nodes.forEach((n, idx) => {
                const nx = n.x * width;
                const ny = n.y * height;
                ctx.fillStyle = '#00f3ff';
                ctx.beginPath();
                ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
                ctx.fill();

                if (idx % 4 === 0) {
                    ctx.strokeStyle = 'rgba(0, 243, 255, 0.45)';
                    ctx.beginPath();
                    ctx.arc(nx, ny, n.r + 4 + Math.sin(tick * 0.05 + idx) * 2, 0, Math.PI * 2);
                    ctx.stroke();
                }
            });
        }

        function drawLinearAlgebraMatrix() {
            const cx = width / 2;
            const cy = height / 2;
            const bw = 135;
            const bh = 58;

            // Left & Right Matrix Brackets [ A ]
            ctx.strokeStyle = '#00f3ff';
            ctx.lineWidth = 2;

            // Left bracket
            ctx.beginPath();
            ctx.moveTo(cx - bw + 12, cy - bh);
            ctx.lineTo(cx - bw, cy - bh);
            ctx.lineTo(cx - bw, cy + bh);
            ctx.lineTo(cx - bw + 12, cy + bh);
            ctx.stroke();

            // Right bracket
            ctx.beginPath();
            ctx.moveTo(cx + bw - 12, cy - bh);
            ctx.lineTo(cx + bw, cy - bh);
            ctx.lineTo(cx + bw, cy + bh);
            ctx.lineTo(cx + bw - 12, cy + bh);
            ctx.stroke();

            // 3x4 Live Floating-Point Matrix Values
            ctx.font = '12px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const cols = 4;
            const rows = 3;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = cx - 82 + c * 55;
                    const y = cy - 32 + r * 32;
                    const val = Math.sin(tick * 0.025 + r * 1.7 + c * 2.3 + (isHovered ? mouseX * 3 : 0));
                    ctx.fillStyle = (r === c) ? '#00f3ff' : 'rgba(0, 243, 255, 0.62)';
                    ctx.fillText(val.toFixed(2), x, y);
                }
            }
        }

        function drawUniversalCore() {
            const cx = width / 2;
            const cy = height / 2;
            const radius = 45;

            // Outer Pulsing Cyber Rings
            ctx.strokeStyle = 'rgba(var(--neon-rgb, 0, 243, 255), 0.35)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(cx, cy, radius + Math.sin(tick * 0.04) * 6, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = 'var(--neon-color, #00f3ff)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(cx, cy, radius - 10, 0, Math.PI * 2);
            ctx.stroke();

            // Inner Rotating Core Node
            ctx.fillStyle = 'rgba(var(--neon-rgb, 0, 243, 255), 0.2)';
            ctx.beginPath();
            ctx.arc(cx, cy, 14, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'var(--neon-color, #00f3ff)';
            ctx.beginPath();
            ctx.arc(cx, cy, 5, 0, Math.PI * 2);
            ctx.fill();

            // Orbiting Data Packets
            for (let i = 0; i < 4; i++) {
                const angle = tick * 0.03 + (i * Math.PI / 2);
                const px = cx + Math.cos(angle) * (radius + 8);
                const py = cy + Math.sin(angle) * (radius + 8);
                ctx.fillStyle = 'var(--neon-color, #00f3ff)';
                ctx.fillRect(px - 2, py - 2, 4, 4);
            }
        }

        function render() {
            tick++;
            ctx.clearRect(0, 0, width, height);
            drawSubtleGrid();

            if (mode === 'optic') {
                drawOpticTensor();
            } else if (mode === 'crawler') {
                drawCrawlerGraph();
            } else if (mode === 'matrix') {
                drawLinearAlgebraMatrix();
            } else {
                drawUniversalCore();
            }

            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
    }
})();

// =========================================================
// 4. LIVE STACK FILTER BAR (AUTO-SCANS ALL PROJECTS)
// =========================================================
(function initProjectsFilterBar() {
    const cards = Array.from(document.querySelectorAll('.project-card, .card, .holo-active'));
    if (cards.length === 0) return;

    // Remove existing filter bar if already present
    const oldBar = document.querySelector('.cyber-filter-bar');
    if (oldBar) oldBar.remove();

    const filterBar = document.createElement('div');
    filterBar.className = 'cyber-filter-bar';

    // Smart Categories that auto-match existing + future projects
    const categories = [
        { id: 'all',    label: 'ALL_ENGINES (' + cards.length + ')', keywords: [] },
        { id: 'math',   label: 'MATH_&_MATRIX',   keywords: ['math', 'matrix', 'algebra', 'calculus', 'vector', 'numpy'] },
        { id: 'neural', label: 'NEURAL_&_VISION', keywords: ['neural', 'optic', 'tensor', 'convolution', 'cv', 'vision'] },
        { id: 'algo',   label: 'DATA_&_CRAWLERS', keywords: ['crawler', 'universe', 'data', 'algorithm', 'graph', 'scaling'] },
        { id: 'python', label: 'PURE_SCRATCH_CORE', keywords: ['scratch', 'pure', 'memory', 'logic', 'python'] }
    ];

    function filterProjects(cat) {
        cards.forEach((card) => {
            const cardText = card.innerText.toLowerCase();
            let isMatch = false;

            if (cat.id === 'all') {
                isMatch = true;
            } else {
                isMatch = cat.keywords.some((kw) => cardText.indexOf(kw) !== -1);
            }

            if (isMatch) {
                card.classList.remove('project-card-hidden');
                card.classList.remove('project-card-fade');
                void card.offsetWidth; // Trigger reflow for smooth fade-in
                card.classList.add('project-card-fade');
            } else {
                card.classList.add('project-card-hidden');
            }
        });
    }

    categories.forEach((cat, idx) => {
        const btn = document.createElement('button');
        btn.className = 'cyber-filter-btn' + (idx === 0 ? ' active' : '');
        btn.textContent = '[ ' + cat.label + ' ]';

        btn.addEventListener('click', () => {
            filterBar.querySelectorAll('.cyber-filter-btn').forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects(cat);
        });

        filterBar.appendChild(btn);
    });

    // Place Filter Bar right below Telemetry Bar (or Subtitle)
    const anchorEl = document.querySelector('.telemetry-bar') || document.querySelector('.subtitle') || document.querySelector('h1');
    if (anchorEl) {
        anchorEl.insertAdjacentElement('afterend', filterBar);
    }
})();