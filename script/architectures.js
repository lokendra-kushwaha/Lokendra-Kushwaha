/* =========================================================
   ARCHITECTURES REPOSITORY // DATA & FILTER ENGINE (SOP)
   =========================================================*/

const systemsData = [
    {
        id: "SYS_01 // AUTONOMOUS DATA ENGINE",
        title: "NullHunter — Autonomous AI Data Refinery",
        category: "flagship",
        isFlagship: true,
        layer: "OMNICORE SYSTEMS // CORE ARCHITECTURE",
        specs: [
            { label: "Execution Model", val: "Out-of-Core / Zero-IPC Streaming" },
            { label: "COMPUTE & AI CORE", val: "OmniCore Tabular LLM + 60+ C++ Kernels" },
            { label: "Memory Ceiling", val: "100GB+ Stream on <1.5GB RAM (O(1))" },
            { label: "STATE & BLUEPRINT", val: "Editable JSON + Zero-Rescan .pkl Cache" }
        ],
        tags: [
            "OmniCore Tabular LLM",
            "Human-Like Sandbox Testing",
            "Zero-IPC Streaming",
            "60+ C++ & Arrow Kernels",
            "Automated Feature Engineering",
            "Schema Flattener & Reconstructor",
            "AST-to-SIMD & LLVM JIT",
            "O(1) RAM Distributed Sink"
        ],
        description: "Built to replace manual data wrangling with human-like decision-making, NullHunter is an out-of-core AI data refinery powered by OmniCore Tabular Intelligence (OTI)—a custom tabular LLM engineered to reason over structured datasets. Instead of relying on rigid rules, NullHunter thinks like an experienced data scientist: its loader streams massive files within a strict sub-2GB RAM ceiling, flattens nested multi-level headers, optimizes messy column names, and runs a parallel statistical scan across all cores. Before touching the full dataset, an internal validation sandbox tests multiple cleaning and imputation strategies on a live sample to verify which pipeline actually improves downstream ML accuracy and F1-score. Once proven, it locks a 1-second editable JSON blueprint and executes 60+ C++ and PyArrow kernels to heal corrupted data, extract date and text signals, and reconstruct clean, model-ready Parquet datasets—purifying 25 million rows in 44 seconds.",
        liveLink: "#",
        statusText: "Flagship Engine (OmniCore)",
        githubLink: "https://github.com/lokendra-kushwaha/NullHunter"
    },
    {
        id: "SYS_02 // MATHEMATICAL CORE",
        title: "Linear Transformations & Matrix Engine",
        category: "math",
        isFlagship: false,
        layer: "FIRST-PRINCIPLES LINEAR ALGEBRA",
        specs: [
            { label: "Dependencies", val: "Zero (No NumPy / SciPy)" },
            { label: "Core Mechanics", val: "SVD, Eigen-Spectra & 3D Geometry" }
        ],
        tags: [
            "Custom Matrix Object",
            "Singular Value Decomposition",
            "Eigen-Decomposition",
            "Memory Layout Control"
        ],
        description: "Engineered a zero-dependency mathematical compute core from first principles. Bypassing external libraries like NumPy, this framework manages raw memory layouts, 3D spatial geometry, and custom vector operations natively. Features pure-Python implementations of Singular Value Decomposition (SVD), Eigen-decomposition, and Row Echelon transformations to power deterministic machine learning mechanics.",
        liveLink: "#",
        statusText: "Core Math Library",
        githubLink: "https://github.com/lokendra-kushwaha/Core-Math-Algorithms"
    },
    {
        id: "SYS_03 // SYMBOLIC COMPUTE",
        title: "Calculus Dynamics & AST Engine",
        category: "math",
        isFlagship: false,
        layer: "AUTOMATIC DIFFERENTIATION CORE",
        specs: [
            { label: "Architecture", val: "Abstract Syntax Tree (AST)" },
            { label: "Capabilities", val: "Nth-Order Symbolic Differentiation" }
        ],
        tags: [
            "Symbolic Calculus",
            "AST Architecture",
            "Chain & Product Rules",
            "Operator Overloading"
        ],
        description: "Built a pure-Python Symbolic Calculus Engine driven by an Abstract Syntax Tree (AST) architecture. Independent of external solvers, the framework parses complex mathematical expressions into hierarchical nodes using custom operator overloading—supporting Nth-order differentiation across polynomial, trigonometric, and exponential functions with dynamic algebraic simplification.",
        liveLink: "#",
        statusText: "Symbolic AST Core",
        githubLink: "https://github.com/lokendra-kushwaha/Core-Math-Algorithms/tree/master/04_Calculus"
    },
    {
        id: "SYS_04 // STOCHASTIC CORE",
        title: "Statistics & Multi-Core Probability Engine",
        category: "math",
        isFlagship: false,
        layer: "PARALLEL STATISTICAL COMPUTE",
        specs: [
            { label: "Execution", val: "Multi-Core Chunked Processing" },
            { label: "Core Mechanics", val: "Covariance, Bayesian & Distributions" }
        ],
        tags: [
            "Stochastic Models",
            "Multi-Core Chunking",
            "Bayesian Inference",
            "Zero-Dependency Math"
        ],
        description: "Architected a statistical and probabilistic computation engine from scratch to handle variance-covariance matrices, Gaussian/Binomial distributions, and hypothesis testing without third-party libraries. Includes hardware-aware multi-processing benchmarks engineered to eliminate Inter-Process Communication (IPC) bottlenecks across logical CPU cores.",
        liveLink: "#",
        statusText: "Statistical Engine",
        githubLink: "https://github.com/lokendra-kushwaha/Core-Math-Algorithms"
    },
    {
        id: "SYS_05 // TENSOR & VISION CORE",
        title: "Neural Optic Core",
        category: "ai",
        isFlagship: false,
        layer: "N-DIMENSIONAL TENSOR ARCHITECTURE",
        specs: [
            { label: "Data Structure", val: "Custom N-D Tensor Object" },
            { label: "Operations", val: "Scratch 3D Convolutions & Edge Kernels" }
        ],
        tags: [
            "Custom Tensor Object",
            "Scratch Convolutions",
            "Feature Extraction",
            "Dual-Engine Pipeline"
        ],
        description: "Engineered a dependency-free N-Dimensional tensor engine from scratch featuring native 3D convolutions, custom spatial filtering kernels, and a dual-engine architecture. Built to demonstrate how neural feature extraction, edge detection, and matrix convolutions operate at the raw mathematical level without deep learning wrappers.",
        liveLink: "#",
        statusText: "Tensor Vision Engine",
        githubLink: "https://github.com/lokendra-kushwaha/Neural-Optic-Core"
    },
    {
        id: "SYS_06 // GRAPH & SEARCH ENGINE",
        title: "Universe Crawler",
        category: "systems",
        isFlagship: false,
        layer: "GRAPH TRAVERSAL & INDEXING",
        specs: [
            { label: "Ranking Model", val: "Custom PageRank & TF-IDF" },
            { label: "Index Structure", val: "Inverted Matrix Architecture" }
        ],
        tags: [
            "PageRank Algorithm",
            "Inverted Matrix",
            "TF-IDF Scoring",
            "Graph Traversal"
        ],
        description: "Designed a custom web crawler and scalable search engine from first principles. Implements graph-based PageRank authority scoring, TF-IDF vector weighting, and high-speed inverted matrix indexing without relying on external scraping or search frameworks.",
        liveLink: "https://universe-crawler.streamlit.app",
        statusText: "Live Deployment",
        githubLink: "https://github.com/lokendra-kushwaha/Universe-Crawler"
    },
    {
        id: "SYS_07 // VECTOR SIMILARITY ENGINE",
        title: "The Movie Matrix",
        category: "ai",
        isFlagship: false,
        layer: "HIGH-DIMENSIONAL COSINE ENGINE",
        specs: [
            { label: "Matching Core", val: "Manual Cosine Similarity" },
            { label: "Pipeline", val: "Custom NLP Text Vectorization" }
        ],
        tags: [
            "Vector Space Modeling",
            "Cosine Similarity",
            "NLP Tokenization",
            "Recommendation Engine"
        ],
        description: "Engineered a content-based recommendation engine bypassing high-level machine learning libraries like Scikit-learn. Implements custom NLP tokenization, frequency vectorization, and manual dot-product cosine similarity calculations in high-dimensional vector space to deliver real-time semantic matching.",
        liveLink: "https://the-movie-matrix.streamlit.app",
        statusText: "Live Deployment",
        githubLink: "https://github.com/lokendra-kushwaha/The-Movie-Matrix"
    }
];

(function initArchitecturesPage() {
    const container = document.getElementById('projects-container');
    const filterBar = document.getElementById('arch-filter-bar');
    if (!container) return;

    function renderCards(filterKey) {
        container.innerHTML = '';

        const filtered = systemsData.filter((item) => {
            if (!filterKey || filterKey === 'all') return true;
            return item.category === filterKey;
        });

        filtered.forEach((sys) => {
            const card = document.createElement('article');
            card.className = 'project-card' + (sys.isFlagship ? ' flagship-card' : '');

            const specsHTML = sys.specs.map((s) => `
                <div class="spec-mini-item">
                    <span class="spec-mini-label">${s.label}</span>
                    <span class="spec-mini-val">${s.val}</span>
                </div>
            `).join('');

            const tagsHTML = sys.tags.map((t) => `<span class="tech-tag">${t}</span>`).join('');

            const primaryActionHTML = (sys.liveLink && sys.liveLink !== '#')
                ? `<a href="${sys.liveLink}" target="_blank" rel="noopener noreferrer" class="btn-live">
                       <i class="fas fa-arrow-up-right-from-square"></i> Live Deployment
                   </a>`
                : `<span class="btn-status">
                       <i class="fas fa-microchip"></i> ${sys.statusText || 'Core Architecture'}
                   </span>`;

            card.innerHTML = `
                <div class="arch-spec-banner">
                    <div class="arch-spec-top">
                        <span class="arch-sys-id">${sys.id}</span>
                        <span class="arch-sys-layer">${sys.layer}</span>
                    </div>
                    <div class="arch-spec-metrics">
                        ${specsHTML}
                    </div>
                </div>

                <div class="project-content">
                    <h2 class="project-title">${sys.title}</h2>
                    <p class="project-desc">${sys.description}</p>
                    
                    <div class="tags-container">
                        ${tagsHTML}
                    </div>
                    
                    <div class="project-links">
                        ${primaryActionHTML}
                        <a href="${sys.githubLink}" target="_blank" rel="noopener noreferrer" class="btn-github">
                            <i class="fab fa-github"></i> Inspect Source &amp; Specs
                        </a>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });
    }

    // Initialize Filter Buttons
    if (filterBar) {
        const categories = [
            { key: 'all',      label: `All Architectures (${systemsData.length})` },
            { key: 'flagship', label: 'Flagship Refinery (NullHunter)' },
            { key: 'math',     label: 'First-Principles Math Cores (3)' },
            { key: 'ai',       label: 'Tensor & Vector Engines (2)' },
            { key: 'systems',  label: 'Graph & Search Systems (1)' }
        ];

        categories.forEach((cat, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'arch-filter-btn' + (idx === 0 ? ' active' : '');
            btn.textContent = cat.label;

            btn.addEventListener('click', () => {
                filterBar.querySelectorAll('.arch-filter-btn').forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');
                renderCards(cat.key);
            });

            filterBar.appendChild(btn);
        });
    }

    // Initial Render
    renderCards('all');
})();