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

// =========================================================
// 5. INTERACTIVE BLUEPRINT SANDBOX (WITH DEFAULT CYBER CORE)
// =========================================================
(function initInteractiveBlueprintSandbox() {
    function getThemeColors() {
        var rootStyle = getComputedStyle(document.documentElement);
        var hex = (rootStyle.getPropertyValue('--neon-color') || '#00f3ff').trim();
        var rgb = (rootStyle.getPropertyValue('--neon-rgb') || '0, 243, 255').trim();
        return { hex: hex, rgb: rgb };
    }

    function bootSandbox() {
        var cards = Array.from(document.querySelectorAll('.project-card, .card, .holo-active'));
        if (cards.length === 0) return;

        cards.forEach(function(card, cardIdx) {
            var oldCanvas = card.querySelector('canvas');
            if (!oldCanvas || oldCanvas.dataset.sandboxV2 === 'true') return;

            var wrap = oldCanvas.parentElement;
            if (!wrap) return;

            var canvas = document.createElement('canvas');
            canvas.className = oldCanvas.className;
            canvas.style.cssText = oldCanvas.style.cssText || 'width:100%;height:100%;display:block;';
            canvas.dataset.sandboxV2 = 'true';
            wrap.replaceChild(canvas, oldCanvas);
            wrap.classList.add('cyber-blueprint-wrap');

            // Create or reuse Top-Right Interactive HUD Pill
            var hudPill = wrap.querySelector('.blueprint-hud-pill');
            if (!hudPill) {
                hudPill = document.createElement('span');
                hudPill.className = 'blueprint-hud-pill';
                wrap.appendChild(hudPill);
            }
            hudPill.textContent = '[ CLICK_TO_TEST ]';

            // Detect Mode STRICTLY from Card Title (h3) & Top-Left Badge so Default stays Default!
            var titleEl = card.querySelector('h3, h2');
            var titleText = (titleEl ? titleEl.textContent : '').toLowerCase();
            var wrapText = (wrap.innerText || '').toLowerCase();

            var mode = 'core'; // Default Universal Cyber Core System
            if (wrapText.indexOf('graph_crawler') !== -1 || titleText.indexOf('crawler') !== -1) {
                mode = 'graph';
            } else if (wrapText.indexOf('3d_tensor') !== -1 || titleText.indexOf('optic') !== -1) {
                mode = 'tensor';
            } else if (titleText.indexOf('linear algebra') !== -1) {
                mode = 'matrix';
            } else {
                mode = 'core'; // Used for [ // NEURAL_CORE_ARCHIVE ] & any new project
            }

            var ctx = canvas.getContext('2d');
            var width = 400;
            var height = 210;

            function resizeCanvas() {
                var rect = wrap.getBoundingClientRect();
                width = Math.max(280, Math.floor(rect.width || 400));
                height = Math.max(170, Math.floor(rect.height || 210));
                canvas.width = width;
                canvas.height = height;
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            var mouseX = -1000;
            var mouseY = -1000;

            // -------------------------------------------------
            // MODE 1: GRAPH CRAWLER (BFS / DIJKSTRA WAVE)
            // -------------------------------------------------
            var nodes = [];
            for (var i = 0; i < 14; i++) {
                nodes.push({
                    x: 45 + Math.random() * (width - 90),
                    y: 35 + Math.random() * (height - 70),
                    vx: (Math.random() - 0.5) * 0.45,
                    vy: (Math.random() - 0.5) * 0.45,
                    hop: -1,
                    hitTime: 0
                });
            }
            var bfsWave = { active: false, startX: 0, startY: 0, radius: 0 };

            // -------------------------------------------------
            // MODE 2: MATRIX MATH ENGINE (TRANSPOSE / REF / NORM)
            // -------------------------------------------------
            var matValues = [];
            var matTargets = [];
            for (var r = 0; r < 4; r++) {
                matValues[r] = [];
                matTargets[r] = [];
                for (var c = 0; c < 4; c++) {
                    var v = (Math.random() * 2 - 1);
                    matValues[r][c] = v;
                    matTargets[r][c] = v;
                }
            }
            var matOpIndex = 0;
            var matScanY = -1;
            var matTransposed = false;

            // -------------------------------------------------
            // MODE 3: 3D TENSOR CONV CORE (3x3 SOBEL KERNEL)
            // -------------------------------------------------
            var tensorScan = { active: false, progress: 0, kernelMode: 0 };
            var kernelNames = ['3x3_SOBEL_EDGE', '3x3_LAPLACIAN', '2x2_MAX_POOL'];

            // -------------------------------------------------
            // MODE 4: DEFAULT UNIVERSAL CYBER CORE (ORBITAL + WAVE)
            // -------------------------------------------------
            var coreState = {
                modeIndex: 0,
                pulseRadius: -1,
                boost: 0
            };

            canvas.addEventListener('mousemove', function(e) {
                var rect = canvas.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
            });

            canvas.addEventListener('mouseleave', function() {
                mouseX = -1000;
                mouseY = -1000;
            });

            canvas.addEventListener('click', function(e) {
                var rect = canvas.getBoundingClientRect();
                var clickX = e.clientX - rect.left;
                var clickY = e.clientY - rect.top;

                wrap.classList.add('blueprint-active-pulse');
                setTimeout(function() {
                    wrap.classList.remove('blueprint-active-pulse');
                }, 450);

                if (mode === 'graph') {
                    var startIdx = 0;
                    var bestDist = 999999;
                    nodes.forEach(function(n, idx) {
                        var d = Math.hypot(n.x - clickX, n.y - clickY);
                        if (d < bestDist) {
                            bestDist = d;
                            startIdx = idx;
                        }
                    });

                    nodes.forEach(function(n) { n.hop = -1; n.hitTime = 0; });
                    var queue = [startIdx];
                    nodes[startIdx].hop = 0;
                    nodes[startIdx].hitTime = performance.now();
                    var visitedCount = 1;
                    var maxHop = 0;

                    while (queue.length > 0) {
                        var curr = queue.shift();
                        for (var j = 0; j < nodes.length; j++) {
                            if (nodes[j].hop === -1) {
                                var dist = Math.hypot(nodes[curr].x - nodes[j].x, nodes[curr].y - nodes[j].y);
                                if (dist < 115) {
                                    nodes[j].hop = nodes[curr].hop + 1;
                                    nodes[j].hitTime = performance.now() + nodes[j].hop * 180;
                                    maxHop = Math.max(maxHop, nodes[j].hop);
                                    visitedCount++;
                                    queue.push(j);
                                }
                            }
                        }
                    }

                    bfsWave.active = true;
                    bfsWave.startX = nodes[startIdx].x;
                    bfsWave.startY = nodes[startIdx].y;
                    bfsWave.radius = 5;
                    hudPill.textContent = '[ BFS: N' + startIdx + ' // HOPS: ' + maxHop + ' ]';
                } else if (mode === 'matrix') {
                    matOpIndex = (matOpIndex + 1) % 3;
                    matScanY = 0;

                    if (matOpIndex === 1) {
                        matTransposed = !matTransposed;
                        for (var r1 = 0; r1 < 4; r1++) {
                            for (var c1 = r1 + 1; c1 < 4; c1++) {
                                var tmp = matTargets[r1][c1];
                                matTargets[r1][c1] = matTargets[c1][r1];
                                matTargets[c1][r1] = tmp;
                            }
                        }
                        hudPill.textContent = '[ OP: TRANSPOSE (A^T) ]';
                    } else if (matOpIndex === 2) {
                        matTransposed = false;
                        for (var r2 = 0; r2 < 4; r2++) {
                            for (var c2 = 0; c2 < 4; c2++) {
                                matTargets[r2][c2] = (r2 > c2) ? 0.0 : (r2 === c2 ? 1.0 : (Math.random() * 1.8 - 0.9));
                            }
                        }
                        hudPill.textContent = '[ OP: GAUSSIAN_REF ]';
                    } else {
                        var normSq = 0;
                        for (var r3 = 0; r3 < 4; r3++) {
                            for (var c3 = 0; c3 < 4; c3++) {
                                var val = (Math.random() * 2 - 1);
                                matTargets[r3][c3] = val;
                                normSq += val * val;
                            }
                        }
                        hudPill.textContent = '[ NORM ||A|| = ' + Math.sqrt(normSq).toFixed(2) + ' ]';
                    }
                } else if (mode === 'tensor') {
                    tensorScan.active = true;
                    tensorScan.progress = 0;
                    var kName = kernelNames[tensorScan.kernelMode % kernelNames.length];
                    tensorScan.kernelMode++;
                    hudPill.textContent = '[ SCAN: ' + kName + ' ]';
                } else {
                    // DEFAULT UNIVERSAL CYBER CORE CLICK ACTION
                    coreState.modeIndex = (coreState.modeIndex + 1) % 3;
                    coreState.pulseRadius = 10;
                    coreState.boost = 1.0;

                    if (coreState.modeIndex === 1) {
                        hudPill.textContent = '[ MODE: d/dx_WAVE_SCAN ]';
                    } else if (coreState.modeIndex === 2) {
                        hudPill.textContent = '[ MODE: QUANTUM_OVERDRIVE ]';
                    } else {
                        hudPill.textContent = '[ MODE: ORBITAL_CORE_SYNC ]';
                    }
                }
            });

            // -------------------------------------------------
            // MAIN RENDER LOOP
            // -------------------------------------------------
            var tick = 0;
            function renderFrame() {
                tick += 0.025 + (coreState.boost * 0.04);
                coreState.boost *= 0.96;

                var theme = getThemeColors();
                ctx.clearRect(0, 0, width, height);

                if (mode === 'graph') {
                    if (bfsWave.active) {
                        bfsWave.radius += 3.8;
                        var alpha = Math.max(0, 1 - bfsWave.radius / (width * 0.85));
                        ctx.beginPath();
                        ctx.arc(bfsWave.startX, bfsWave.startY, bfsWave.radius, 0, Math.PI * 2);
                        ctx.strokeStyle = 'rgba(' + theme.rgb + ', ' + (alpha * 0.75) + ')';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        if (alpha <= 0.02) bfsWave.active = false;
                    }

                    var now = performance.now();
                    for (var i = 0; i < nodes.length; i++) {
                        var n1 = nodes[i];
                        n1.x += n1.vx;
                        n1.y += n1.vy;
                        if (n1.x < 30 || n1.x > width - 30) n1.vx *= -1;
                        if (n1.y < 30 || n1.y > height - 30) n1.vy *= -1;

                        for (var j = i + 1; j < nodes.length; j++) {
                            var n2 = nodes[j];
                            var dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
                            if (dist < 105) {
                                var edgeActive = (n1.hop >= 0 && n2.hop >= 0 && now >= Math.max(n1.hitTime, n2.hitTime) && now - Math.max(n1.hitTime, n2.hitTime) < 1800);
                                ctx.beginPath();
                                ctx.moveTo(n1.x, n1.y);
                                ctx.lineTo(n2.x, n2.y);
                                ctx.strokeStyle = edgeActive
                                    ? 'rgba(' + theme.rgb + ', 0.9)'
                                    : 'rgba(' + theme.rgb + ', ' + (0.22 * (1 - dist / 105)) + ')';
                                ctx.lineWidth = edgeActive ? 1.8 : 1;
                                ctx.stroke();
                            }
                        }
                    }

                    nodes.forEach(function(n) {
                        var isHighlighted = (n.hop >= 0 && now >= n.hitTime && now - n.hitTime < 2000);
                        ctx.beginPath();
                        ctx.arc(n.x, n.y, isHighlighted ? 5.2 : 3.2, 0, Math.PI * 2);
                        ctx.fillStyle = isHighlighted ? '#ffffff' : theme.hex;
                        ctx.shadowColor = theme.hex;
                        ctx.shadowBlur = isHighlighted ? 14 : 6;
                        ctx.fill();
                        ctx.shadowBlur = 0;

                        if (isHighlighted) {
                            ctx.font = '10px Consolas, monospace';
                            ctx.fillStyle = theme.hex;
                            ctx.fillText('d=' + n.hop, n.x + 7, n.y - 6);
                        }
                    });
                } else if (mode === 'matrix') {
                    var activeRows = matTransposed ? 4 : 3;
                    var activeCols = matTransposed ? 3 : 4;
                    var boxW = activeCols * 56 + 24;
                    var boxH = activeRows * 30 + 18;
                    var startX = (width - boxW) / 2;
                    var startY = (height - boxH) / 2 + 6;

                    ctx.strokeStyle = theme.hex;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(startX + 10, startY);
                    ctx.lineTo(startX, startY);
                    ctx.lineTo(startX, startY + boxH);
                    ctx.lineTo(startX + 10, startY + boxH);
                    ctx.moveTo(startX + boxW - 10, startY);
                    ctx.lineTo(startX + boxW, startY);
                    ctx.lineTo(startX + boxW, startY + boxH);
                    ctx.lineTo(startX + boxW - 10, startY + boxH);
                    ctx.stroke();

                    ctx.font = '12px Consolas, monospace';
                    ctx.textAlign = 'center';
                    for (var r = 0; r < activeRows; r++) {
                        for (var c = 0; c < activeCols; c++) {
                            var target = matTargets[r][c] + Math.sin(tick + r + c) * 0.008;
                            matValues[r][c] += (target - matValues[r][c]) * 0.14;
                            var mx = startX + 38 + c * 54;
                            var my = startY + 24 + r * 28;
                            var isPivot = (r === c && matOpIndex === 2);
                            ctx.fillStyle = isPivot ? '#ffffff' : 'rgba(' + theme.rgb + ', ' + (r === c ? '0.98' : '0.68') + ')';
                            ctx.fillText(matValues[r][c].toFixed(2), mx, my);
                        }
                    }
                    ctx.textAlign = 'left';

                    if (matScanY >= 0) {
                        matScanY += 4.2;
                        var laserY = startY + matScanY;
                        if (laserY <= startY + boxH) {
                            ctx.beginPath();
                            ctx.moveTo(startX - 8, laserY);
                            ctx.lineTo(startX + boxW + 8, laserY);
                            ctx.strokeStyle = '#ffffff';
                            ctx.lineWidth = 1.6;
                            ctx.stroke();
                        } else {
                            matScanY = -1;
                        }
                    }
                } else if (mode === 'tensor') {
                    var cx = width / 2;
                    var cy = height / 2 + 5;
                    var layerOffsets = [-38, 0, 38];

                    layerOffsets.forEach(function(offset, lIdx) {
                        var shiftX = offset + Math.sin(tick + lIdx) * 3;
                        var w = 64;
                        var h = 76;
                        var skew = -18;

                        ctx.save();
                        ctx.translate(cx + shiftX, cy);
                        ctx.beginPath();
                        ctx.moveTo(-w / 2, -h / 2 - skew / 2);
                        ctx.lineTo(w / 2, -h / 2 + skew / 2);
                        ctx.lineTo(w / 2, h / 2 + skew / 2);
                        ctx.lineTo(-w / 2, h / 2 - skew / 2);
                        ctx.closePath();
                        ctx.fillStyle = 'rgba(' + theme.rgb + ', 0.06)';
                        ctx.fill();
                        ctx.strokeStyle = 'rgba(' + theme.rgb + ', ' + (lIdx === 1 ? '0.95' : '0.55') + ')';
                        ctx.lineWidth = lIdx === 1 ? 1.8 : 1.1;
                        ctx.stroke();

                        ctx.strokeStyle = 'rgba(' + theme.rgb + ', 0.28)';
                        ctx.lineWidth = 0.8;
                        for (var g = 1; g <= 2; g++) {
                            var gx = -w / 2 + (w / 3) * g;
                            var gySkew = (-skew / 2) + (skew / 3) * g;
                            ctx.beginPath();
                            ctx.moveTo(gx, -h / 2 + gySkew);
                            ctx.lineTo(gx, h / 2 + gySkew);
                            ctx.stroke();

                            var gy = -h / 2 + (h / 3) * g;
                            ctx.beginPath();
                            ctx.moveTo(-w / 2, gy - skew / 2);
                            ctx.lineTo(w / 2, gy + skew / 2);
                            ctx.stroke();
                        }
                        ctx.restore();
                    });

                    if (tensorScan.active) {
                        tensorScan.progress += 0.022;
                        var cellIdx = Math.floor(tensorScan.progress * 9);
                        var cellRow = Math.floor(cellIdx / 3) - 1;
                        var cellCol = (cellIdx % 3) - 1;
                        var srcX = cx - 38 + cellCol * 18;
                        var srcY = cy + cellRow * 22;
                        var dstX = cx + 38 + cellCol * 18;
                        var dstY = cy + cellRow * 22;

                        ctx.beginPath();
                        ctx.moveTo(srcX, srcY);
                        ctx.lineTo(dstX, dstY);
                        ctx.strokeStyle = '#ffffff';
                        ctx.lineWidth = 2;
                        ctx.shadowColor = theme.hex;
                        ctx.shadowBlur = 12;
                        ctx.stroke();
                        ctx.shadowBlur = 0;

                        ctx.strokeRect(srcX - 9, srcY - 10, 18, 20);
                        ctx.strokeStyle = theme.hex;
                        ctx.strokeRect(dstX - 9, dstY - 10, 18, 20);

                        if (tensorScan.progress >= 1) {
                            tensorScan.active = false;
                            hudPill.textContent = '[ MAP_EXTRACTED ]';
                        }
                    }
                } else {
                    // =================================================
                    // MODE 4: DEFAULT UNIVERSAL CYBER CORE (FOR ALL NEW PROJECTS)
                    // =================================================
                    var cxCore = width / 2;
                    var cyCore = height / 2 + 4;

                    // Expanding Shockwave on Click
                    if (coreState.pulseRadius > 0) {
                        coreState.pulseRadius += 4.5;
                        var pAlpha = Math.max(0, 1 - coreState.pulseRadius / 140);
                        ctx.beginPath();
                        ctx.arc(cxCore, cyCore, coreState.pulseRadius, 0, Math.PI * 2);
                        ctx.strokeStyle = 'rgba(' + theme.rgb + ', ' + pAlpha + ')';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        if (pAlpha <= 0.02) coreState.pulseRadius = -1;
                    }

                    // Background Continuous Harmonic / Calculus Wave
                    ctx.beginPath();
                    for (var wx = 40; wx <= width - 40; wx += 4) {
                        var freq = (coreState.modeIndex === 1) ? 0.055 : 0.035;
                        var amp = (coreState.modeIndex === 1) ? 24 : 12;
                        var wy = cyCore + Math.sin((wx - cxCore) * freq + tick * 2.2) * amp * Math.cos((wx - cxCore) * 0.012);
                        if (wx === 40) ctx.moveTo(wx, wy);
                        else ctx.lineTo(wx, wy);
                    }
                    ctx.strokeStyle = 'rgba(' + theme.rgb + ', ' + (coreState.modeIndex === 1 ? '0.65' : '0.22') + ')';
                    ctx.lineWidth = coreState.modeIndex === 1 ? 1.8 : 1.1;
                    ctx.stroke();

                    // Outer Dashed Telemetry Ring
                    ctx.save();
                    ctx.translate(cxCore, cyCore);
                    ctx.rotate(tick * 0.4);
                    ctx.setLineDash([8, 6]);
                    ctx.beginPath();
                    ctx.arc(0, 0, 52, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(' + theme.rgb + ', 0.45)';
                    ctx.lineWidth = 1.4;
                    ctx.stroke();
                    ctx.restore();

                    // Inner Counter-Rotating Cyber Ring
                    ctx.save();
                    ctx.translate(cxCore, cyCore);
                    ctx.rotate(-tick * 0.75);
                    ctx.setLineDash([18, 10]);
                    ctx.beginPath();
                    ctx.arc(0, 0, 34, 0, Math.PI * 2);
                    ctx.strokeStyle = theme.hex;
                    ctx.lineWidth = 1.8;
                    ctx.stroke();
                    ctx.restore();

                    // 3 Orbiting Core Satellites + Laser Locks
                    for (var s = 0; s < 3; s++) {
                        var ang = tick * 1.1 + (s * Math.PI * 2) / 3;
                        var sx = cxCore + Math.cos(ang) * 52;
                        var sy = cyCore + Math.sin(ang) * 52;

                        if (coreState.modeIndex === 2) {
                            ctx.beginPath();
                            ctx.moveTo(cxCore, cyCore);
                            ctx.lineTo(sx, sy);
                            ctx.strokeStyle = 'rgba(' + theme.rgb + ', 0.7)';
                            ctx.lineWidth = 1.2;
                            ctx.stroke();
                        }

                        ctx.beginPath();
                        ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
                        ctx.fillStyle = '#ffffff';
                        ctx.shadowColor = theme.hex;
                        ctx.shadowBlur = 8;
                        ctx.fill();
                        ctx.shadowBlur = 0;
                    }

                    // Central Pulsing Nucleus
                    var coreR = 9 + Math.sin(tick * 3) * 2;
                    ctx.beginPath();
                    ctx.arc(cxCore, cyCore, coreR, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(' + theme.rgb + ', 0.25)';
                    ctx.fill();
                    ctx.strokeStyle = '#ffffff';
                    ctx.lineWidth = 1.8;
                    ctx.shadowColor = theme.hex;
                    ctx.shadowBlur = 14;
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }

                requestAnimationFrame(renderFrame);
            }

            requestAnimationFrame(renderFrame);
        });
    }

    bootSandbox();
    window.addEventListener('DOMContentLoaded', bootSandbox);
    setTimeout(bootSandbox, 250);
})();