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
        title: "Universe Crawler",
        image: "assets/y.png",
        tags: ["Page Rank", "Inverted Matrix", "Data Structures", "Algorithmic Scaling"],
        description: "Engineered a custom web crawler and scalable search engine from scratch, implementing PageRank algorithms, TF-IDF scoring, and inverted indexing without relying on heavy external web-scraping frameworks.",
        liveLink: "#",
        githubLink: "https://github.com/lokendra-kushwaha/Universe-Crawler"
    },
    {
        id: "PRJ_04",
        title: "Linear Transformations Engine",
        image: "images/project2.jpg",
        tags: ["Custom Matrix Object", "Memory Architecture", "Pure Python", "Mathematics"],
        description: "Engineered a zero-dependency, full-scale mathematical compute core from first principles. Bypassing libraries like NumPy, this framework handles raw memory layouts, 3D spatial geometry, and advanced Vector computations natively. Features pure-Python implementations of Singular Value Decomposition (SVD), Eigen-decomposition, and operator overloading to drive highly optimized machine learning transformations.",
        liveLink: "#",
        githubLink: "https://github.com/lokendra-kushwaha/Core-Math-Algorithms"
    },
    {
        id: "PRJ_05",
        title: "Calculus Dynamics Engine",
        image: "images/project5.jpg",
        tags: ["Symbolic Calculus", "AST Architecture", "Operator Overloading", "Zero-Deps Logic"],
        description: "Engineered a pure-Python Symbolic Calculus Engine using an Abstract Syntax Tree (AST) architecture. Independent of external solvers, this framework parses complex equations into hierarchical MathNode objects, leveraging Python magic methods for operator overloading. It supports Nth-order differentiation across arithmetic, trigonometric, and exponential functions, while natively applying the Chain Rule and dynamic algebraic simplification for clean, production-grade output.",
        liveLink: "#",
        githubLink: "https://github.com/lokendra-kushwaha/Core-Math-Algorithms/04_Calculus"
    },
    {
        id: "PRJ_06",
        title: "Statistics & Probability Module",
        image: "images/project5.jpg",
        tags: ["Stochastic Models", "Bayesian Inference", "Custom Vector Object", "Zero-Deps Math"],
        description: "Architecting a pure-Python statistical and probabilistic computation engine from scratch. Designed to natively handle variance matrices, probability distributions (Gaussian, Binomial), and hypothesis testing. This module serves as the foundational backend for stochastic machine learning models and Bayesian logic, completely independent of external data science libraries.",
        liveLink: "#",
        githubLink: "https://github.com/lokendra-kushwaha/Core-Math-Algorithms"
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
                        <i class="fab fa-github"></i> Engine Specs
                    </a>
                </div>
            </div>
        `;
        projectsContainer.appendChild(card);
    });
}

// =========================================================
// 3. PURE AUTO LIVE BLUEPRINT ENGINE
// =========================================================
(function initProjectBlueprints() {
    const cards = document.querySelectorAll('.project-card, .card, .holo-active');

    cards.forEach((card, cardIndex) => {
        const img = card.querySelector('img');
        if (!img) return;

        function setupCardVisuals() {
            if (card.querySelector('.blueprint-canvas-wrap')) return;

            let mode = 'core'; 
            let hudLabel = '[ // SYSTEM_CORE ]'; 

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

            // Hover Reveal Setup
            img.insertAdjacentElement('beforebegin', wrap);
            wrap.appendChild(img); 
            img.classList.add('hover-reveal-img');
            img.style.display = 'block'; 

            img.addEventListener('error', () => {
                img.style.display = 'none';
            });

            startBlueprintAnimation(canvas, wrap, card, mode);
        }

        setupCardVisuals();
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

        // --- PRE-GENERATED DATA ---
        const nodes = Array.from({length: 18}, () => ({
            x: 0.1 + Math.random() * 0.8, 
            y: 0.1 + Math.random() * 0.8,
            vx: (Math.random() - 0.5) * 0.003, 
            vy: (Math.random() - 0.5) * 0.003,
            r: 1.5 + Math.random() * 2
        }));

        const matrixVals = Array.from({length: 16}, () => (Math.random() * 2 - 1).toFixed(2));

        // --- DRAW FUNCTIONS ---

        function drawSubtleGrid() {
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.04)'; 
            ctx.lineWidth = 1; 
            const step = 20;

            for (let x = (tick * 0.2) % step; x < width; x += step) { 
                ctx.beginPath(); 
                ctx.moveTo(x, 0); 
                ctx.lineTo(x, height); 
                ctx.stroke(); 
            }

            for (let y = (tick * 0.2) % step; y < height; y += step) { 
                ctx.beginPath(); 
                ctx.moveTo(0, y); 
                ctx.lineTo(width, y); 
                ctx.stroke(); 
            }

            ctx.fillStyle = 'rgba(0, 243, 255, 0.02)'; 
            ctx.fillRect(0, (tick * 1.5) % height, width, 15);
        }

        function drawOpticTensor() {
            const cx = width / 2 + (isHovered ? (mouseX - 0.5) * 20 : 0);
            const cy = height / 2 + (isHovered ? (mouseY - 0.5) * 15 : 0);
            const layers = [-40, 0, 40];

            layers.forEach((offset, idx) => {
                const lx = cx + offset; 
                const ly = cy + Math.sin(tick * 0.04 + idx) * 5 - offset * 0.2; 
                const w = 35; 
                const h = 55; 
                const isMain = idx === 1;

                ctx.strokeStyle = isMain ? '#00f3ff' : 'rgba(0, 243, 255, 0.3)'; 
                ctx.fillStyle = isMain ? 'rgba(0, 243, 255, 0.08)' : 'rgba(0, 243, 255, 0.02)';
                ctx.lineWidth = isMain ? 1.5 : 1;

                ctx.beginPath(); 
                ctx.moveTo(lx - w, ly - h * 0.5); 
                ctx.lineTo(lx + w * 0.3, ly - h * 0.8); 
                ctx.lineTo(lx + w, ly + h * 0.5); 
                ctx.lineTo(lx - w * 0.3, ly + h * 0.8); 
                ctx.closePath(); 
                ctx.fill(); 
                ctx.stroke();

                if (isMain) {
                    ctx.strokeStyle = 'rgba(0, 243, 255, 0.7)'; 
                    ctx.setLineDash([2, 4]);
                    
                    const scan = (tick % 100) / 100; 
                    const lineY = ly - h * 0.5 + (h * 1.3 * scan);
                    
                    ctx.beginPath(); 
                    ctx.moveTo(lx - w * 0.7, lineY); 
                    ctx.lineTo(lx + w * 0.7, lineY - h * 0.15); 
                    ctx.stroke(); 
                    ctx.setLineDash([]);
                }
            });

            ctx.strokeStyle = 'rgba(0, 243, 255, 0.4)'; 
            ctx.beginPath();
            ctx.moveTo(cx - 40, cy + Math.sin(tick * 0.04) * 5); 
            ctx.lineTo(cx, cy + Math.sin(tick * 0.04 + 1) * 5); 
            ctx.lineTo(cx + 40, cy + Math.sin(tick * 0.04 + 2) * 5); 
            ctx.stroke();
        }

        function drawCrawlerGraph() {
            nodes.forEach((n) => {
                n.x += n.vx * (isHovered ? 2 : 1); 
                n.y += n.vy * (isHovered ? 2 : 1);
                
                if (n.x < 0.05 || n.x > 0.95) n.vx *= -1; 
                if (n.y < 0.1 || n.y > 0.9) n.vy *= -1;
            });

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = (nodes[i].x - nodes[j].x) * width; 
                    const dy = (nodes[i].y - nodes[j].y) * height; 
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 85) {
                        ctx.strokeStyle = 'rgba(0, 243, 255, ' + ((1 - dist / 85) * 0.6).toFixed(2) + ')'; 
                        ctx.lineWidth = 1;
                        
                        ctx.beginPath(); 
                        ctx.moveTo(nodes[i].x * width, nodes[i].y * height); 
                        ctx.lineTo(nodes[j].x * width, nodes[j].y * height); 
                        ctx.stroke();

                        if (Math.random() < 0.015) {
                            ctx.fillStyle = '#fff'; 
                            ctx.fillRect(nodes[i].x * width + dx * 0.5 - 1.5, nodes[i].y * height + dy * 0.5 - 1.5, 3, 3);
                        }
                    }
                }
            }

            nodes.forEach((n) => {
                ctx.fillStyle = '#00f3ff'; 
                ctx.beginPath(); 
                ctx.arc(n.x * width, n.y * height, n.r, 0, Math.PI * 2); 
                ctx.fill();
            });
        }

        function drawLinearAlgebraMatrix() {
            const cx = width / 2; 
            const cy = height / 2; 
            const bw = 110; 
            const bh = 55;
            
            ctx.strokeStyle = '#00f3ff'; 
            ctx.lineWidth = 2;
            
            // Left Bracket
            ctx.beginPath(); 
            ctx.moveTo(cx - bw + 15, cy - bh); 
            ctx.lineTo(cx - bw, cy - bh); 
            ctx.lineTo(cx - bw, cy + bh); 
            ctx.lineTo(cx - bw + 15, cy + bh); 
            ctx.stroke();
            
            // Right Bracket
            ctx.beginPath(); 
            ctx.moveTo(cx + bw - 15, cy - bh); 
            ctx.lineTo(cx + bw, cy - bh); 
            ctx.lineTo(cx + bw, cy + bh); 
            ctx.lineTo(cx + bw - 15, cy + bh); 
            ctx.stroke();
            
            ctx.font = '12px "Courier New", monospace'; 
            ctx.textAlign = 'center'; 
            ctx.textBaseline = 'middle';
            
            const size = 4; 
            const spacingX = 50; 
            const spacingY = 25; 
            const activeRow = Math.floor(tick / 40) % size;

            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    const x = cx - (size-1) * spacingX/2 + c * spacingX; 
                    const y = cy - (size-1) * spacingY/2 + r * spacingY;
                    
                    if (tick % 10 === 0 && Math.random() < 0.1) {
                        matrixVals[r * size + c] = (Math.random() * 2 - 1).toFixed(2);
                    }
                    
                    let val = matrixVals[r * size + c];
                    
                    if (isHovered && r === c) val = "1.00"; 
                    if (isHovered && r !== c) val = "0.00";
                    
                    ctx.fillStyle = (r === activeRow) ? '#fff' : (r === c ? '#00f3ff' : 'rgba(0, 243, 255, 0.5)'); 
                    ctx.fillText(val, x, y);
                }
            }
        }

        function drawCalculusEngine() {
            const cx = width / 2; 
            const cy = height / 2;
            
            // Axes
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.15)'; 
            ctx.lineWidth = 1;
            ctx.beginPath(); 
            ctx.moveTo(20, cy); 
            ctx.lineTo(width - 20, cy); 
            ctx.stroke(); 
            
            ctx.beginPath(); 
            ctx.moveTo(cx, 20); 
            ctx.lineTo(cx, height - 20); 
            ctx.stroke();
            
            // Sine Wave
            ctx.strokeStyle = '#00f3ff'; 
            ctx.lineWidth = 2; 
            ctx.beginPath();
            for(let x = 30; x < width - 30; x++) {
                const waveY = cy + Math.sin((x - cx) * 0.04 + tick * 0.05) * 35;
                if(x === 30) {
                    ctx.moveTo(x, waveY);
                } else {
                    ctx.lineTo(x, waveY);
                }
            }
            ctx.stroke();
            
            const pointX = cx + Math.sin(tick * 0.02) * (width/3.5);
            const pointY = cy + Math.sin((pointX - cx) * 0.04 + tick * 0.05) * 35;
            const slope = Math.cos((pointX - cx) * 0.04 + tick * 0.05) * 35 * 0.04;
            const tanLength = 45;
            
            // Tangent Line
            ctx.strokeStyle = '#fff'; 
            ctx.lineWidth = 1.5; 
            ctx.beginPath();
            ctx.moveTo(pointX - tanLength, pointY - slope * tanLength); 
            ctx.lineTo(pointX + tanLength, pointY + slope * tanLength); 
            ctx.stroke();
            
            // Moving Point
            ctx.fillStyle = '#00f3ff'; 
            ctx.beginPath(); 
            ctx.arc(pointX, pointY, 4, 0, Math.PI*2); 
            ctx.fill();
            
            // Area Under Curve (Integral)
            ctx.fillStyle = 'rgba(0, 243, 255, 0.1)'; 
            ctx.beginPath(); 
            ctx.moveTo(cx, cy);
            for(let x = cx; (pointX > cx ? x < pointX : x > pointX); (pointX > cx ? x+=2 : x-=2)) { 
                ctx.lineTo(x, cy + Math.sin((x - cx) * 0.04 + tick * 0.05) * 35); 
            }
            ctx.lineTo(pointX, cy); 
            ctx.closePath(); 
            ctx.fill();
        }

        function drawDefaultCore() {
            const cx = width / 2; 
            const cy = height / 2;
            const radius = 30 + Math.sin(tick * 0.06) * 4;
            
            // Hexagon
            ctx.strokeStyle = '#00f3ff'; 
            ctx.lineWidth = 2; 
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i + (tick * 0.015);
                const hx = cx + radius * Math.cos(angle); 
                const hy = cy + radius * Math.sin(angle);
                
                if (i === 0) {
                    ctx.moveTo(hx, hy);
                } else {
                    ctx.lineTo(hx, hy);
                }
            }
            ctx.closePath(); 
            ctx.stroke();
            
            ctx.fillStyle = 'rgba(0, 243, 255, 0.15)'; 
            ctx.fill();
            
            // Dotted Rings
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.4)'; 
            ctx.setLineDash([8, 12]); 
            ctx.beginPath();
            ctx.arc(cx, cy, radius + 15, -tick * 0.03, Math.PI * 1.5 - tick * 0.03); 
            ctx.stroke(); 
            ctx.setLineDash([]);
            
            // Loading Text
            ctx.fillStyle = '#00f3ff'; 
            ctx.font = '10px "Courier New", monospace'; 
            ctx.textAlign = 'center';
            ctx.fillText(`SYS.LOAD: ${(Math.random()*100).toFixed(1)}%`, cx, cy + radius + 35);
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
            } else if (mode === 'calculus') {
                drawCalculusEngine();
            } else {
                drawDefaultCore();
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
// 5. INTERACTIVE BLUEPRINT SANDBOX
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

        cards.forEach(function(card) {
            var oldCanvas = card.querySelector('canvas');
            if (!oldCanvas || oldCanvas.dataset.sandboxUltimate === 'true') return;

            var wrap = card.querySelector('.blueprint-canvas-wrap') || oldCanvas.parentElement;
            if (!wrap) return;

            var oldTags = wrap.querySelectorAll('.blueprint-hud-pill, .blueprint-hud-tag, .blueprint-status-tag');
            oldTags.forEach(function(tag) { tag.remove(); });

            var canvas = document.createElement('canvas');
            canvas.className = oldCanvas ? oldCanvas.className : 'blueprint-canvas';
            canvas.style.cssText = 'width:100%;height:100%;display:block;';
            canvas.dataset.sandboxUltimate = 'true';
            
            if (oldCanvas) {
                wrap.replaceChild(canvas, oldCanvas);
            } else {
                wrap.appendChild(canvas);
            }
            wrap.classList.add('cyber-blueprint-wrap');

            // --- SMART FILTERING (Detecting Category from Title) ---
            var titleEl = card.querySelector('h3, h2, .project-title');
            var titleText = (titleEl ? titleEl.textContent : '').toLowerCase();
            
            var mode = 'core';
            if (titleText.indexOf('crawler') !== -1 || titleText.indexOf('universe') !== -1 || titleText.indexOf('data') !== -1) {
                mode = 'graph';
            } else if (titleText.indexOf('optic') !== -1 || titleText.indexOf('neural') !== -1 || titleText.indexOf('vision') !== -1) {
                mode = 'tensor';
            } else if (titleText.indexOf('linear') !== -1 || titleText.indexOf('matrix') !== -1) {
                mode = 'matrix';
            } else if (titleText.indexOf('calculus') !== -1) {
                mode = 'calculus';
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

            // --- STATE VARIABLES FOR ANIMATIONS ---
            
            // Graph Data
            var nodes = [];
            for (var i = 0; i < 14; i++) {
                nodes.push({
                    x: 45 + Math.random() * (width - 90), y: 35 + Math.random() * (height - 70),
                    vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
                    hop: -1, hitTime: 0
                });
            }
            var bfsWave = { active: false, startX: 0, startY: 0, radius: 0 };

            // Matrix Data
            var matValues = [], matTargets = [];
            for (var r = 0; r < 4; r++) {
                matValues[r] = []; matTargets[r] = [];
                for (var c = 0; c < 4; c++) {
                    var v = (Math.random() * 2 - 1);
                    matValues[r][c] = v; matTargets[r][c] = v;
                }
            }
            var matOpIndex = 0, matScanY = -1, matTransposed = false;

            // Tensor Data
            var tensorScan = { active: false, progress: 0 };

            // Core & Calculus Data
            var coreState = { pulseRadius: -1, boost: 0 };

            // --- INTERACTION LISTENERS ---
            canvas.addEventListener('mousemove', function(e) {
                var rect = canvas.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
            });

            canvas.addEventListener('mouseleave', function() {
                mouseX = -1000; mouseY = -1000;
            });

            // CLICK EFFECTS!
            canvas.addEventListener('click', function(e) {
                var rect = canvas.getBoundingClientRect();
                var clickX = e.clientX - rect.left;
                var clickY = e.clientY - rect.top;

                wrap.classList.add('blueprint-active-pulse');
                setTimeout(function() { wrap.classList.remove('blueprint-active-pulse'); }, 450);

                if (mode === 'graph') {
                    // BFS Wave Logic 
                    var startIdx = 0, bestDist = 999999;
                    nodes.forEach(function(n, idx) {
                        var d = Math.hypot(n.x - clickX, n.y - clickY);
                        if (d < bestDist) { bestDist = d; startIdx = idx; }
                    });
                    nodes.forEach(function(n) { n.hop = -1; n.hitTime = 0; });
                    var queue = [startIdx];
                    nodes[startIdx].hop = 0; nodes[startIdx].hitTime = performance.now();
                    
                    while (queue.length > 0) {
                        var curr = queue.shift();
                        for (var j = 0; j < nodes.length; j++) {
                            if (nodes[j].hop === -1) {
                                var dist = Math.hypot(nodes[curr].x - nodes[j].x, nodes[curr].y - nodes[j].y);
                                if (dist < 115) {
                                    nodes[j].hop = nodes[curr].hop + 1;
                                    nodes[j].hitTime = performance.now() + nodes[j].hop * 180;
                                    queue.push(j);
                                }
                            }
                        }
                    }
                    bfsWave.active = true; bfsWave.startX = nodes[startIdx].x; bfsWave.startY = nodes[startIdx].y; bfsWave.radius = 5;
                
                } else if (mode === 'matrix') {
                    // Matrix Transpose / Gauss
                    matOpIndex = (matOpIndex + 1) % 3;
                    matScanY = 0;
                    if (matOpIndex === 1) {
                        matTransposed = !matTransposed;
                        for (var r1 = 0; r1 < 4; r1++) {
                            for (var c1 = r1 + 1; c1 < 4; c1++) {
                                var tmp = matTargets[r1][c1]; matTargets[r1][c1] = matTargets[c1][r1]; matTargets[c1][r1] = tmp;
                            }
                        }
                    } else if (matOpIndex === 2) {
                        matTransposed = false;
                        for (var r2 = 0; r2 < 4; r2++) {
                            for (var c2 = 0; c2 < 4; c2++) { matTargets[r2][c2] = (r2 > c2) ? 0.0 : (r2 === c2 ? 1.0 : (Math.random() * 1.8 - 0.9)); }
                        }
                    } else {
                        for (var r3 = 0; r3 < 4; r3++) {
                            for (var c3 = 0; c3 < 4; c3++) { matTargets[r3][c3] = (Math.random() * 2 - 1); }
                        }
                    }
                
                } else if (mode === 'tensor') {
                    // Scanner active
                    tensorScan.active = true; tensorScan.progress = 0;
                
                } else if (mode === 'calculus') {
                    if (typeof coreState.calcMode === 'undefined') {
                        coreState.calcMode = 0;
                    }
                    coreState.calcMode = (coreState.calcMode + 1) % 3; 
                    coreState.boost = 2.5; 
                
                } else {
                    // Default Core Pulse 
                    coreState.pulseRadius = 10;
                    coreState.boost = 1.0;
                }
            });

            // --- RENDER LOOP ---
            var tick = 0;
            function renderFrame() {
                tick += 0.025 + (coreState.boost * 0.04);
                coreState.boost *= 0.96; // Smooth decay

                var theme = getThemeColors();
                ctx.clearRect(0, 0, width, height);

                // Subtle grid for all backgrounds
                ctx.strokeStyle = 'rgba(' + theme.rgb + ', 0.03)';
                ctx.lineWidth = 1;
                for (var x = (tick * 4) % 20; x < width; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
                for (var y = (tick * 4) % 20; y < height; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }

                if (mode === 'graph') {
                    // GRAPH RENDER
                    if (bfsWave.active) {
                        bfsWave.radius += 3.8;
                        var alpha = Math.max(0, 1 - bfsWave.radius / (width * 0.85));
                        ctx.beginPath(); ctx.arc(bfsWave.startX, bfsWave.startY, bfsWave.radius, 0, Math.PI * 2);
                        ctx.strokeStyle = 'rgba(' + theme.rgb + ', ' + (alpha * 0.75) + ')'; ctx.lineWidth = 2; ctx.stroke();
                        if (alpha <= 0.02) bfsWave.active = false;
                    }
                    var now = performance.now();
                    for (var i = 0; i < nodes.length; i++) {
                        var n1 = nodes[i];
                        n1.x += n1.vx; n1.y += n1.vy;
                        if (n1.x < 30 || n1.x > width - 30) n1.vx *= -1;
                        if (n1.y < 30 || n1.y > height - 30) n1.vy *= -1;

                        for (var j = i + 1; j < nodes.length; j++) {
                            var n2 = nodes[j];
                            var dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
                            if (dist < 105) {
                                var edgeActive = (n1.hop >= 0 && n2.hop >= 0 && now >= Math.max(n1.hitTime, n2.hitTime) && now - Math.max(n1.hitTime, n2.hitTime) < 1800);
                                ctx.beginPath(); ctx.moveTo(n1.x, n1.y); ctx.lineTo(n2.x, n2.y);
                                ctx.strokeStyle = edgeActive ? 'rgba(' + theme.rgb + ', 0.9)' : 'rgba(' + theme.rgb + ', ' + (0.22 * (1 - dist / 105)) + ')';
                                ctx.lineWidth = edgeActive ? 1.8 : 1; ctx.stroke();
                            }
                        }
                    }
                    nodes.forEach(function(n) {
                        var isHighlighted = (n.hop >= 0 && now >= n.hitTime && now - n.hitTime < 2000);
                        ctx.beginPath(); ctx.arc(n.x, n.y, isHighlighted ? 5.2 : 3.2, 0, Math.PI * 2);
                        ctx.fillStyle = isHighlighted ? '#ffffff' : theme.hex;
                        ctx.shadowColor = theme.hex; ctx.shadowBlur = isHighlighted ? 14 : 6; ctx.fill(); ctx.shadowBlur = 0;
                    });

                } else if (mode === 'matrix') {
                    // MATRIX RENDER
                    var activeRows = matTransposed ? 4 : 3; var activeCols = matTransposed ? 3 : 4;
                    var boxW = activeCols * 56 + 24; var boxH = activeRows * 30 + 18;
                    var startX = (width - boxW) / 2; var startY = (height - boxH) / 2 + 6;

                    ctx.strokeStyle = theme.hex; ctx.lineWidth = 2; ctx.beginPath();
                    ctx.moveTo(startX + 10, startY); ctx.lineTo(startX, startY); ctx.lineTo(startX, startY + boxH); ctx.lineTo(startX + 10, startY + boxH);
                    ctx.moveTo(startX + boxW - 10, startY); ctx.lineTo(startX + boxW, startY); ctx.lineTo(startX + boxW, startY + boxH); ctx.lineTo(startX + boxW - 10, startY + boxH);
                    ctx.stroke();

                    ctx.font = '12px Consolas, monospace'; ctx.textAlign = 'center';
                    for (var r = 0; r < activeRows; r++) {
                        for (var c = 0; c < activeCols; c++) {
                            var target = matTargets[r][c] + Math.sin(tick + r + c) * 0.008;
                            matValues[r][c] += (target - matValues[r][c]) * 0.14;
                            var mx = startX + 38 + c * 54; var my = startY + 24 + r * 28;
                            var isPivot = (r === c && matOpIndex === 2);
                            ctx.fillStyle = isPivot ? '#ffffff' : 'rgba(' + theme.rgb + ', ' + (r === c ? '0.98' : '0.68') + ')';
                            ctx.fillText(matValues[r][c].toFixed(2), mx, my);
                        }
                    }
                    ctx.textAlign = 'left';
                    if (matScanY >= 0) {
                        matScanY += 4.2; var laserY = startY + matScanY;
                        if (laserY <= startY + boxH) {
                            ctx.beginPath(); ctx.moveTo(startX - 8, laserY); ctx.lineTo(startX + boxW + 8, laserY);
                            ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.6; ctx.stroke();
                        } else matScanY = -1;
                    }

                } else if (mode === 'tensor') {
                    // TENSOR RENDER
                    var cxTensor = width / 2; var cyTensor = height / 2 + 5;
                    [-38, 0, 38].forEach(function(offset, lIdx) {
                        var shiftX = offset + Math.sin(tick + lIdx) * 3;
                        var w = 64; var h = 76; var skew = -18;
                        ctx.save(); ctx.translate(cxTensor + shiftX, cyTensor);
                        ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2 - skew / 2); ctx.lineTo(w / 2, -h / 2 + skew / 2); ctx.lineTo(w / 2, h / 2 + skew / 2); ctx.lineTo(-w / 2, h / 2 - skew / 2); ctx.closePath();
                        ctx.fillStyle = 'rgba(' + theme.rgb + ', 0.06)'; ctx.fill();
                        ctx.strokeStyle = 'rgba(' + theme.rgb + ', ' + (lIdx === 1 ? '0.95' : '0.55') + ')'; ctx.lineWidth = lIdx === 1 ? 1.8 : 1.1; ctx.stroke();
                        ctx.strokeStyle = 'rgba(' + theme.rgb + ', 0.28)'; ctx.lineWidth = 0.8;
                        for (var g = 1; g <= 2; g++) {
                            ctx.beginPath(); ctx.moveTo(-w / 2 + (w / 3) * g, -h / 2 + (-skew / 2) + (skew / 3) * g); ctx.lineTo(-w / 2 + (w / 3) * g, h / 2 + (-skew / 2) + (skew / 3) * g); ctx.stroke();
                            ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2 + (h / 3) * g - skew / 2); ctx.lineTo(w / 2, -h / 2 + (h / 3) * g + skew / 2); ctx.stroke();
                        }
                        ctx.restore();
                    });
                    if (tensorScan.active) {
                        tensorScan.progress += 0.022; var cellIdx = Math.floor(tensorScan.progress * 9);
                        var cellRow = Math.floor(cellIdx / 3) - 1; var cellCol = (cellIdx % 3) - 1;
                        var srcX = cxTensor - 38 + cellCol * 18; var srcY = cyTensor + cellRow * 22;
                        var dstX = cxTensor + 38 + cellCol * 18; var dstY = cyTensor + cellRow * 22;
                        ctx.beginPath(); ctx.moveTo(srcX, srcY); ctx.lineTo(dstX, dstY);
                        ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.shadowColor = theme.hex; ctx.shadowBlur = 12; ctx.stroke(); ctx.shadowBlur = 0;
                        ctx.strokeRect(srcX - 9, srcY - 10, 18, 20); ctx.strokeStyle = theme.hex; ctx.strokeRect(dstX - 9, dstY - 10, 18, 20);
                        if (tensorScan.progress >= 1) tensorScan.active = false;
                    }

                } else if (mode === 'calculus') {
                    // CALCULUS RENDER (Interactive Sine, Cosine, & Complex Waves)
                    var cxCalc = width / 2; 
                    var cyCalc = height / 2;
                    var calcMode = coreState.calcMode || 0; // Default 0
                    
                    // X-Y Axes
                    ctx.strokeStyle = 'rgba(' + theme.rgb + ', 0.15)'; ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.moveTo(20, cyCalc); ctx.lineTo(width - 20, cyCalc); ctx.stroke(); 
                    ctx.beginPath(); ctx.moveTo(cxCalc, 20); ctx.lineTo(cxCalc, height - 20); ctx.stroke();
                    
                    var waveSpeed = tick * 2; 
                    var amp = 35 + (coreState.boost * 12); 
                    
                    // 1. Draw Wave Function
                    ctx.strokeStyle = theme.hex; ctx.lineWidth = 2; ctx.beginPath();
                    for(let x = 30; x < width - 30; x++) {
                        var relX = (x - cxCalc);
                        var waveY = cyCalc;
                        
                        if (calcMode === 0) {
                            waveY += Math.sin(relX * 0.04 + waveSpeed * 0.02) * amp; // Normal Sine
                        } else if (calcMode === 1) {
                            waveY += Math.cos(relX * 0.08 + waveSpeed * 0.03) * (amp * 0.7); // Fast Cosine
                        } else {
                            waveY += (Math.sin(relX * 0.04 + waveSpeed * 0.02) + Math.cos(relX * 0.07 - waveSpeed * 0.01)) * (amp * 0.6); // Complex Interference
                        }
                        
                        if(x === 30) ctx.moveTo(x, waveY); else ctx.lineTo(x, waveY);
                    }
                    ctx.stroke();
                    
                    // 2. Point & Derivative (Tangent Line) Calculation
                    const pointX = cxCalc + Math.sin(tick * 0.02) * (width/3.5);
                    var pRelX = (pointX - cxCalc);
                    var pointY = cyCalc;
                    var slope = 0;
                    
                    if (calcMode === 0) {
                        pointY += Math.sin(pRelX * 0.04 + waveSpeed * 0.02) * amp;
                        slope = Math.cos(pRelX * 0.04 + waveSpeed * 0.02) * amp * 0.04;
                    } else if (calcMode === 1) {
                        pointY += Math.cos(pRelX * 0.08 + waveSpeed * 0.03) * (amp * 0.7);
                        slope = -Math.sin(pRelX * 0.08 + waveSpeed * 0.03) * (amp * 0.7) * 0.08;
                    } else {
                        pointY += (Math.sin(pRelX * 0.04 + waveSpeed * 0.02) + Math.cos(pRelX * 0.07 - waveSpeed * 0.01)) * (amp * 0.6);
                        slope = (Math.cos(pRelX * 0.04 + waveSpeed * 0.02) * 0.04 - Math.sin(pRelX * 0.07 - waveSpeed * 0.01) * 0.07) * (amp * 0.6);
                    }
                    
                    const tanLength = 45;
                    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.beginPath();
                    ctx.moveTo(pointX - tanLength, pointY - slope * tanLength); 
                    ctx.lineTo(pointX + tanLength, pointY + slope * tanLength); ctx.stroke();
                    
                    // Draw moving point
                    ctx.fillStyle = theme.hex; ctx.beginPath(); ctx.arc(pointX, pointY, 4, 0, Math.PI*2); ctx.fill();
                    
                    // 3. Area under curve (Integral Fill)
                    ctx.fillStyle = 'rgba(' + theme.rgb + ', 0.1)'; ctx.beginPath(); ctx.moveTo(cxCalc, cyCalc);
                    for(let x = cxCalc; (pointX > cxCalc ? x < pointX : x > pointX); (pointX > cxCalc ? x+=2 : x-=2)) { 
                        var ixRel = (x - cxCalc);
                        var iy = cyCalc;
                        if (calcMode === 0) iy += Math.sin(ixRel * 0.04 + waveSpeed * 0.02) * amp;
                        else if (calcMode === 1) iy += Math.cos(ixRel * 0.08 + waveSpeed * 0.03) * (amp * 0.7);
                        else iy += (Math.sin(ixRel * 0.04 + waveSpeed * 0.02) + Math.cos(ixRel * 0.07 - waveSpeed * 0.01)) * (amp * 0.6);
                        ctx.lineTo(x, iy); 
                    }
                    ctx.lineTo(pointX, cyCalc); ctx.closePath(); ctx.fill();

                } else {
                    // DEFAULT CORE RENDER
                    var cxCore = width / 2; var cyCore = height / 2 + 4;
                    if (coreState.pulseRadius > 0) {
                        coreState.pulseRadius += 4.5;
                        var pAlpha = Math.max(0, 1 - coreState.pulseRadius / 140);
                        ctx.beginPath(); ctx.arc(cxCore, cyCore, coreState.pulseRadius, 0, Math.PI * 2);
                        ctx.strokeStyle = 'rgba(' + theme.rgb + ', ' + pAlpha + ')'; ctx.lineWidth = 2; ctx.stroke();
                        if (pAlpha <= 0.02) coreState.pulseRadius = -1;
                    }

                    // Outer Dashed Telemetry Ring
                    ctx.save(); ctx.translate(cxCore, cyCore); ctx.rotate(tick * 0.4);
                    ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.arc(0, 0, 52, 0, Math.PI * 2);
                    ctx.strokeStyle = 'rgba(' + theme.rgb + ', 0.45)'; ctx.lineWidth = 1.4; ctx.stroke(); ctx.restore();

                    // Inner Counter-Rotating Cyber Ring
                    ctx.save(); ctx.translate(cxCore, cyCore); ctx.rotate(-tick * 0.75);
                    ctx.setLineDash([18, 10]); ctx.beginPath(); ctx.arc(0, 0, 34, 0, Math.PI * 2);
                    ctx.strokeStyle = theme.hex; ctx.lineWidth = 1.8; ctx.stroke(); ctx.restore();

                    // 3 Orbiting Core Satellites
                    for (var s = 0; s < 3; s++) {
                        var ang = tick * 1.1 + (s * Math.PI * 2) / 3;
                        var sx = cxCore + Math.cos(ang) * 52; var sy = cyCore + Math.sin(ang) * 52;
                        ctx.beginPath(); ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
                        ctx.fillStyle = '#ffffff'; ctx.shadowColor = theme.hex; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0;
                    }

                    // Central Pulsing Nucleus
                    var coreR = 9 + Math.sin(tick * 3) * 2;
                    ctx.beginPath(); ctx.arc(cxCore, cyCore, coreR, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(' + theme.rgb + ', 0.25)'; ctx.fill();
                    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.8; ctx.shadowColor = theme.hex; ctx.shadowBlur = 14; ctx.stroke(); ctx.shadowBlur = 0;
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